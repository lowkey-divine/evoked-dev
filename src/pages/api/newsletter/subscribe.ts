import type { APIRoute } from 'astro';
import { validateOrigin, rateLimit, safeError } from '../../../lib/api/security';
import { verifyFormToken } from '../../../lib/api/form-token';
import { sql } from '../../../lib/db';
import { generateUnsubscribeToken } from '../../../lib/newsletter/unsubscribe-token';

/**
 * Newsletter subscribe endpoint - beehiiv backend + Neon dual-write.
 *
 * Switched from Buttondown to beehiiv 2026-06-16 after the prior service
 * ended Evoked's account access. Same endpoint URL preserved so existing
 * callers (writing/, kitchen-table/, who/, SiteFooter) keep working.
 *
 * Uses beehiiv API V2. (Switched from V1 to V2 on 2026-06-17 after
 * beehiiv deprecated V1 - V1 endpoint now returns 404. BEEHIIV_API_KEY
 * in Vercel must be the V2 key.)
 *
 * 2026-07-08 (newsletter Phase 1): after a successful beehiiv subscribe we ALSO
 * write the subscriber to our own Neon `newsletter_subscribers` table, so we can
 * send directly via Resend and own the list end to end. The beehiiv write is
 * unchanged and remains the source of truth during the transition; the Neon
 * write is additive, second, and failure-isolated - a DB error never breaks a
 * subscribe. (beehiiv Posts API is Enterprise-gated, which is why sends move to
 * Resend; subscriptions keep working on both lists in parallel for now.)
 *
 * Required env vars:
 *   BEEHIIV_API_KEY        - bearer token from beehiiv account settings (V1)
 *   BEEHIIV_PUBLICATION_ID - publication ID (pub_xxx...) from beehiiv
 *   FORM_SECRET            - HMAC secret for challenge-token verification
 *   DATABASE_URL           - Neon connection string (for the dual-write)
 *
 * Security layers (in order):
 *   1. Origin validation (Referer / Origin must match evoked.dev)
 *   2. Rate limit (per-IP, configured in lib/api/security)
 *   3. Honeypot field (if filled, silent success)
 *   4. Challenge token (HMAC-signed by /api/newsletter/challenge)
 */

export const prerender = false;

// Coarse, non-tracking provenance label. Set by our own forms only. We lowercase
// and whitelist the charset so a caller can never turn `source` into a tracking
// or campaign-attribution string (Tutela's storage rule: coarse provenance, not
// behavior). Defaults to a safe generic when absent or unusable.
function sanitizeSource(raw: unknown): string {
  if (typeof raw !== 'string') return 'website-form';
  const cleaned = raw.trim().toLowerCase().replace(/[^a-z0-9/_-]/g, '').slice(0, 40);
  return cleaned || 'website-form';
}

export const POST: APIRoute = async ({ request }) => {
  const originBlock = validateOrigin(request, true);
  if (originBlock) return originBlock;

  const rateLimitBlock = rateLimit(request, 'newsletter');
  if (rateLimitBlock) return rateLimitBlock;

  try {
    const body = await request.json();
    const { email, token, ts, hp, source } = body as {
      email: string;
      token?: string;
      ts?: number;
      hp?: string;
      source?: string;
    };

    // Honeypot - if filled, silently return success
    if (hp) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Challenge token verification
    const secret = import.meta.env.FORM_SECRET;
    if (!secret || !token || !ts) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const validToken = await verifyFormToken(secret, token, ts);
    if (!validToken) {
      return new Response(JSON.stringify({ error: 'Invalid or expired form. Please refresh and try again.' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = import.meta.env.BEEHIIV_API_KEY;
    const publicationId = import.meta.env.BEEHIIV_PUBLICATION_ID;
    if (!apiKey || !publicationId) {
      console.error('BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID is not configured');
      return new Response(JSON.stringify({ error: 'Newsletter not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const res = await fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: normalizedEmail,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: 'evoked.dev',
        utm_medium: 'website',
      }),
    });

    if (!res.ok) {
      let data: { errors?: Array<{ message?: string }>; message?: string } = {};
      try { data = await res.json(); } catch { /* non-JSON error body */ }

      // Already subscribed - beehiiv returns success with status:active, but if we
      // got 400 with a duplicate hint, treat as success.
      const errMsg = data?.errors?.[0]?.message || data?.message || '';
      if (res.status === 400 && /already|duplicate|exists/i.test(errMsg)) {
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      console.error('beehiiv subscribe error:', res.status, errMsg || data);
      return new Response(JSON.stringify({ error: 'Subscription failed. Please try again in a moment.' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Dual-write to our own Neon list. Additive and SECOND: we only reach here
    // after beehiiv accepted the subscribe, and the write is wrapped so a DB
    // error never turns a successful beehiiv subscribe into a user-facing
    // failure (mirrors sovereignty-submit.ts).
    //
    // ON CONFLICT handling encodes the consent lifecycle:
    //   - new email          -> insert active, mint a token
    //   - already active      -> keep the existing token (COALESCE), so unsubscribe
    //                            links in already-sent emails keep working for years
    //   - previously unsubbed -> token was spent (NULL) on unsubscribe, so COALESCE
    //                            takes the freshly minted one: rotation on resubscribe
    // subscribed_at is never overwritten, preserving the original consent date.
    try {
      const freshToken = generateUnsubscribeToken();
      await sql`
        INSERT INTO newsletter_subscribers (email, status, source, unsubscribe_token)
        VALUES (${normalizedEmail}, 'active', ${sanitizeSource(source)}, ${freshToken})
        ON CONFLICT (email) DO UPDATE SET
          status = 'active',
          unsubscribed_at = NULL,
          unsubscribe_token = COALESCE(newsletter_subscribers.unsubscribe_token, EXCLUDED.unsubscribe_token),
          updated_at = now()
      `;
    } catch (dbError: unknown) {
      const msg = dbError instanceof Error ? dbError.message : String(dbError);
      console.error('Newsletter Neon dual-write failed (beehiiv subscribe preserved):', msg);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return safeError(error, 'Newsletter subscribe error');
  }
};
