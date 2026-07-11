import type { APIRoute } from 'astro';
import { rateLimit } from '../../../lib/api/security';
import { sql } from '../../../lib/db';

/**
 * Newsletter unsubscribe endpoint - tokenized, one-click.
 *
 * The token IS the authorization. There is deliberately NO challenge/form-token
 * here (unlike subscribe.ts): this is a link clicked from an email, there is no
 * page to issue a challenge, and requiring one would break the click. The token
 * is a 256-bit single-purpose capability (see lib/newsletter/unsubscribe-token.ts).
 *
 *   GET  ?token=...  the human-clicked footer link. Flips the row to
 *                    unsubscribed, SPENDS the token (sets it NULL), then
 *                    redirects to the /unsubscribed confirmation page. No PII
 *                    and no token in that redirect URL.
 *   POST ?token=...  RFC 8058 `List-Unsubscribe-Post: List-Unsubscribe=One-Click`
 *                    (a mail client's native Unsubscribe button). Same state
 *                    change; returns a bare 200 - one-click clients render nothing.
 *
 * Privacy / security wall (Tutela + Polaris):
 *   - a single UPDATE ... WHERE unsubscribe_token = $1 AND status = 'active'
 *   - the token is NEVER logged, never sent to analytics, and never placed in a
 *     redirect that could leak it via Referer
 *   - NOT an enumeration oracle: valid, already-spent, malformed, and unknown
 *     tokens all lead to the identical neutral confirmation. We never confirm or
 *     deny that an address exists.
 *   - idempotent: a second click is a no-op that still lands on "you're
 *     unsubscribed." Withdrawal is a promise kept, not a transaction that fails.
 *   - one-click, honored BEFORE anything renders: by the time the person sees
 *     the page, the state change has already happened.
 *
 * Known trade-off (documented, accepted for v0.1): a GET that mutates can in
 * principle be triggered by an email client that prefetches links. The one-click
 * posture is deliberate (Polaris: no "are you sure?" friction), and the harm is
 * bounded and reversible - the confirmation page offers a symmetric re-subscribe
 * link. Mail clients that implement RFC 8058 use the POST path, which is not
 * subject to prefetch.
 */

export const prerender = false;

// Flip an active subscriber to unsubscribed and spend the token. Behavior does
// NOT branch on the outcome - callers treat "unsubscribed" and "no matching
// active row" identically, so this is never an oracle. The token is never
// logged, on success or failure.
async function unsubscribeByToken(token: string | null): Promise<void> {
  // Cheap shape check so junk never touches the DB. A real token is a 43-char
  // base64url string; we bound generously rather than pin the exact length.
  if (!token || typeof token !== 'string' || token.length < 20 || token.length > 200) {
    return;
  }
  try {
    await sql`
      UPDATE newsletter_subscribers
      SET status = 'unsubscribed',
          unsubscribed_at = now(),
          unsubscribe_token = NULL,
          updated_at = now()
      WHERE unsubscribe_token = ${token} AND status = 'active'
    `;
  } catch {
    // Never surface DB internals to an unauthenticated caller, and never log the
    // token. The neutral confirmation is returned regardless of what happened.
  }
}

export const GET: APIRoute = async ({ request, url, redirect }) => {
  const rateLimitBlock = rateLimit(request, 'newsletterUnsubscribe');
  if (rateLimitBlock) return rateLimitBlock;

  await unsubscribeByToken(url.searchParams.get('token'));
  // Always the same destination - no status leak. The page copy is neutral.
  return redirect('/unsubscribed', 303);
};

export const POST: APIRoute = async ({ request, url }) => {
  const rateLimitBlock = rateLimit(request, 'newsletterUnsubscribe');
  if (rateLimitBlock) return rateLimitBlock;

  // RFC 8058 one-click: the token arrives via the List-Unsubscribe URL's query
  // string, or (per some clients) a form-encoded body. Prefer the query param.
  let token = url.searchParams.get('token');
  if (!token) {
    try {
      const ct = request.headers.get('content-type') || '';
      if (ct.includes('application/x-www-form-urlencoded')) {
        const form = await request.formData();
        const v = form.get('token');
        if (typeof v === 'string') token = v;
      }
    } catch {
      /* ignore malformed body - still return a neutral 200 below */
    }
  }
  await unsubscribeByToken(token);
  return new Response(null, { status: 200 });
};
