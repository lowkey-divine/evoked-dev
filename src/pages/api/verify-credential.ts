/**
 * POST/GET /api/verify-credential
 *
 * Anchor-agnostic verification of an Evoked governance credential. The relying
 * party supplies the credential, the trust anchor, and the re-derivation bundle.
 * Evoked is NOT a hardcoded root - this endpoint trusts nothing by default.
 *
 * Reference implementation, production hardening pending. The verdict here is a
 * faithful TypeScript port of the Python reference verifier and is cross-validated
 * against it on the real fleet credentials (24/24). The same logic also ships as an
 * offline script (scripts/verify-credential-offline.ts) so verification never
 * depends only on this server.
 *
 * Body (POST JSON) or query params (GET):
 *   credential : the EAT/JWT string
 *   anchor     : base64url Ed25519 public key (the relying party's trust anchor)
 *   bundle     : the five-element re-derivation bundle (object, or JSON string)
 *
 * Returns: { verdict: "ACCEPT" | "REJECT", issues: [...], ... } - the Python shape.
 */
import type { APIRoute } from 'astro';
import { verifyCredential, b64uDecode } from '../../lib/verify/governance-credential.ts';

export const prerender = false;

const HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'no-store',
};

// Cap the request body. A credential + anchor + bundle is a few KB; anything past
// this is a mistake or a DoS attempt against the crypto / canonicalization path.
const MAX_BODY = 64 * 1024;

interface VerifyInput {
  credential?: string;
  anchor?: string;
  bundle?: unknown;
}

function bad(message: string, status = 400): Response {
  return new Response(JSON.stringify({ verdict: 'REJECT', issues: [message], error: message }), {
    status,
    headers: HEADERS,
  });
}

function run(input: VerifyInput): Response {
  const { credential, anchor } = input;
  let bundle = input.bundle;

  if (!credential || typeof credential !== 'string') {
    return bad('missing required field: credential (the EAT/JWT string)');
  }
  if (!anchor || typeof anchor !== 'string') {
    return bad('missing required field: anchor (base64url Ed25519 public key)');
  }
  if (typeof bundle === 'string') {
    try {
      bundle = JSON.parse(bundle);
    } catch {
      return bad('bundle is not valid JSON');
    }
  }
  if (!bundle || typeof bundle !== 'object' || Array.isArray(bundle)) {
    return bad('missing required field: bundle (the five-element re-derivation object)');
  }

  let anchorPk: Buffer;
  try {
    anchorPk = b64uDecode(anchor.trim());
  } catch {
    return bad('anchor is not valid base64url');
  }

  try {
    const result = verifyCredential(credential.trim(), {
      trustAnchorPk: anchorPk,
      bundleInputs: bundle as Record<string, unknown>,
    });
    return new Response(
      JSON.stringify({
        verdict: result.verdict,
        issues: result.issues,
        subject: result.subject,
        issuer: result.issuer,
        anchor: result.anchor,
        conscience: result.conscience,
        served_principal: result.served_principal,
        note: 'Reference implementation, production hardening pending. Verdict cross-validated against the Python reference verifier.',
      }),
      { status: 200, headers: HEADERS }
    );
  } catch (e) {
    // A malformed credential/bundle is a REJECT, not a 500. The verifier never
    // wrongly ACCEPTs; an unparseable input cannot be accepted.
    return new Response(
      JSON.stringify({
        verdict: 'REJECT',
        issues: ['could not verify: malformed credential or bundle'],
      }),
      { status: 200, headers: HEADERS }
    );
  }
}

export const OPTIONS: APIRoute = async () => new Response(null, { status: 204, headers: HEADERS });

export const POST: APIRoute = async ({ request }) => {
  if (Number(request.headers.get('content-length') ?? '0') > MAX_BODY) {
    return bad('request too large', 413);
  }
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return bad('could not read request body');
  }
  if (raw.length > MAX_BODY) return bad('request too large', 413);
  let body: VerifyInput;
  try {
    body = JSON.parse(raw) as VerifyInput;
  } catch {
    return bad('request body is not valid JSON');
  }
  return run(body);
};

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  if (url.search.length > MAX_BODY) return bad('request too large', 413);
  return run({
    credential: url.searchParams.get('credential') ?? undefined,
    anchor: url.searchParams.get('anchor') ?? undefined,
    bundle: url.searchParams.get('bundle') ?? undefined,
  });
};
