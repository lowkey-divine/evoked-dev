// Unsubscribe token - the single-purpose capability behind the one-click
// unsubscribe link.
//
// Design owned by Tutela (privacy guardian), Phase 1 review:
//   - 256 bits of CSPRNG entropy (crypto.getRandomValues over 32 bytes).
//   - Random-and-stored, NOT HMAC-derived. We have a DB row, so the token can
//     simply BE a high-entropy stored secret: no signing key to manage or
//     compromise, a smaller blast radius than a derived scheme.
//   - base64url, no padding: URL-safe, survives email clients and forwarding.
//   - Single-purpose: authorizes exactly one action (unsubscribe). Never a
//     session credential, never a general subscriber identifier. Spent (set to
//     NULL) on use; re-minted on resubscribe.
//
// Lookup is a plain indexed equality match in Postgres. Constant-time
// comparison is NOT needed here: at 256 bits of entropy there is no feasible
// search for a timing side-channel to accelerate - the entropy IS the defense.
// (Contrast form-token.ts, which compares a derived HMAC and IS constant-time.)
//
// NOTE: the send CLI (scripts/newsletter-send.mjs) mints a token the same way
// for its --test upsert, using Node's crypto.randomBytes(32).toString('base64url').
// Both produce 256-bit base64url. Keep the two in sync if this spec ever changes.

/**
 * Generate a fresh 256-bit unsubscribe token (base64url, no padding).
 * Uses the runtime WebCrypto CSPRNG - available in the Astro/Vercel Node
 * runtime and matching the crypto usage already in lib/api/form-token.ts.
 */
export function generateUnsubscribeToken(): string {
  const bytes = new Uint8Array(32); // 256 bits
  crypto.getRandomValues(bytes);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
