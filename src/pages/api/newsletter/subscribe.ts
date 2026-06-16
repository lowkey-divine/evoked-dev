import type { APIRoute } from 'astro';
import { validateOrigin, rateLimit, safeError } from '../../../lib/api/security';
import { verifyFormToken } from '../../../lib/api/form-token';

/**
 * Newsletter subscribe endpoint - beehiiv backend.
 *
 * Switched from Buttondown to beehiiv 2026-06-16 after the prior service
 * ended Evoked's account access. Same endpoint URL preserved so existing
 * callers (writing/, kitchen-table/, who/, SiteFooter) keep working.
 *
 * Required env vars:
 *   BEEHIIV_API_KEY        - bearer token from beehiiv account settings
 *   BEEHIIV_PUBLICATION_ID - publication ID (pub_xxx...) from beehiiv
 *   FORM_SECRET            - HMAC secret for challenge-token verification
 *
 * Security layers (in order):
 *   1. Origin validation (Referer / Origin must match evoked.dev)
 *   2. Rate limit (per-IP, configured in lib/api/security)
 *   3. Honeypot field (if filled, silent success)
 *   4. Challenge token (HMAC-signed by /api/newsletter/challenge)
 */

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const originBlock = validateOrigin(request, true);
  if (originBlock) return originBlock;

  const rateLimitBlock = rateLimit(request, 'newsletter');
  if (rateLimitBlock) return rateLimitBlock;

  try {
    const body = await request.json();
    const { email, token, ts, hp } = body as {
      email: string;
      token?: string;
      ts?: number;
      hp?: string;
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

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return safeError(error, 'Newsletter subscribe error');
  }
};
