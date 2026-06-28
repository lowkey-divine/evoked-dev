/**
 * Evoked Governance Credential - Web Verifier (TypeScript port of the VERIFY half)
 * ================================================================================
 *
 * REFERENCE IMPLEMENTATION, production hardening pending.
 *
 * This is a faithful TypeScript port of `verify_credential(...)` from the Python
 * reference implementation:
 *
 *   evoke_security/governance_credential_reference_v0_1.py
 *
 * It ports ONLY the verification logic. Issuance (the patent-sensitive half) is
 * deliberately NOT here. The whole thesis is "anyone can verify" - so the verifier
 * is open by design.
 *
 * The verdict produced here MUST equal the Python reference verdict on every input.
 * Cross-validated against the 8 real fleet credentials in three conditions each
 * (own-anchor ACCEPT / stranger-anchor REJECT / tampered-bundle REJECT) - 24 cases,
 * all matching. See scripts/xval-governance-credential.ts.
 *
 * The three checks the standard requires, reproduced exactly:
 *   1. issuer Ed25519 signature verifies against the relying-party-supplied anchor;
 *   2. the attestation-chain composite re-derives from the bundle;
 *   3. conscience-attestation is present and valid (verification-MANDATORY - a
 *      validly-signed credential WITHOUT it is REJECTED).
 *
 * Plus the registry/standing/assent sub-checks the reference performs, so the
 * `issues` array matches the Python output shape and content.
 *
 * Cryptography: Ed25519 via Node's built-in `node:crypto` (OpenSSL, RFC 8032
 * compliant). A raw 32-byte public key is wrapped in its SPKI DER prefix and
 * verified with `crypto.verify(null, msg, key, sig)`.
 */

import crypto from 'node:crypto';

// =============================================================================
// Registry of record (public OID arc; mirrors read_pen_arc() output values).
// Source: agents/EVOKED_EXTERNAL_IDENTIFIERS.md (PEN 65994).
// =============================================================================

export interface Registry {
  pen: string;
  profile_oid: string;
}

export const REGISTRY: Registry = {
  pen: '65994',
  profile_oid: '1.3.6.1.4.1.65994.1.1.1',
};

// =============================================================================
// Encoding helpers (deterministic; mirror the Python helpers byte-for-byte).
// =============================================================================

/** base64url decode (accepts unpadded, the form the Python b64u produces). */
export function b64uDecode(s: string): Buffer {
  const pad = (4 - (s.length % 4)) % 4;
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(pad);
  return Buffer.from(b64, 'base64');
}

/** base64url encode without padding (mirror of Python b64u). */
export function b64u(data: Buffer): string {
  return data.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Deterministic JSON identical to Python's
 *   json.dumps(obj, sort_keys=True, separators=(",", ":"))
 * with the default ensure_ascii=True.
 *
 * Critically: keys are sorted, there is no whitespace, and every character
 * outside printable ASCII (0x20-0x7e) is escaped as \uXXXX (lowercase hex) -
 * exactly as Python does. This is the hashing/signing surface, so any deviation
 * would change a hash and flip a verdict.
 */
export function canonical(obj: unknown): Buffer {
  return Buffer.from(serialize(obj), 'utf-8');
}

function serialize(value: unknown): string {
  if (value === null || value === undefined) return 'null';
  const t = typeof value;
  if (t === 'boolean') return value ? 'true' : 'false';
  if (t === 'number') {
    const n = value as number;
    if (!Number.isFinite(n)) throw new Error('non-finite number not serializable');
    return Number.isInteger(n) ? String(n) : String(n);
  }
  if (t === 'string') return encodeString(value as string);
  if (Array.isArray(value)) {
    return '[' + value.map((v) => serialize(v)).join(',') + ']';
  }
  if (t === 'object') {
    const o = value as Record<string, unknown>;
    const keys = Object.keys(o).sort();
    const parts = keys.map((k) => encodeString(k) + ':' + serialize(o[k]));
    return '{' + parts.join(',') + '}';
  }
  throw new Error(`unserializable value of type ${t}`);
}

function encodeString(s: string): string {
  let out = '"';
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    switch (c) {
      case 0x22:
        out += '\\"';
        break;
      case 0x5c:
        out += '\\\\';
        break;
      case 0x08:
        out += '\\b';
        break;
      case 0x09:
        out += '\\t';
        break;
      case 0x0a:
        out += '\\n';
        break;
      case 0x0c:
        out += '\\f';
        break;
      case 0x0d:
        out += '\\r';
        break;
      default:
        if (c < 0x20 || c > 0x7e) {
          out += '\\u' + c.toString(16).padStart(4, '0');
        } else {
          out += s[i];
        }
    }
  }
  return out + '"';
}

function sha256hex(data: Buffer): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// =============================================================================
// Ed25519 verification (RFC 8032 via node:crypto / OpenSSL).
// A raw 32-byte public key is wrapped in its SPKI DER prefix.
// =============================================================================

const ED25519_SPKI_PREFIX = Buffer.from('302a300506032b6570032100', 'hex');

export function ed25519Verify(sig: Buffer, msg: Buffer, pkRaw: Buffer): boolean {
  try {
    if (sig.length !== 64 || pkRaw.length !== 32) return false;
    const der = Buffer.concat([ED25519_SPKI_PREFIX, pkRaw]);
    const key = crypto.createPublicKey({ key: der, format: 'der', type: 'spki' });
    return crypto.verify(null, msg, key, sig);
  } catch {
    return false;
  }
}

// =============================================================================
// JWS / JWT parse (EdDSA). Mirrors jwt_parse / jwt_verify_sig.
// =============================================================================

interface ParsedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: Buffer;
  signingInput: Buffer;
}

export function jwtParse(token: string): ParsedJwt {
  const parts = token.trim().split('.');
  if (parts.length !== 3) throw new Error('malformed JWT: expected three dot-separated segments');
  const [h, p, s] = parts;
  const header = JSON.parse(b64uDecode(h).toString('utf-8'));
  const payload = JSON.parse(b64uDecode(p).toString('utf-8'));
  const signingInput = Buffer.from(`${h}.${p}`, 'ascii');
  return { header, payload, signature: b64uDecode(s), signingInput };
}

function jwtVerifySig(parsed: ParsedJwt, issuerPk: Buffer): boolean {
  return ed25519Verify(parsed.signature, parsed.signingInput, issuerPk);
}

// =============================================================================
// Five-element attestation chain (re-derivable composite). Mirrors build_chain.
// =============================================================================

const CHAIN_ELEMENTS = ['persona', 'transformation', 'payload', 'timestamp', 'governance_log'] as const;

export function rederiveComposite(bundleInputs: Record<string, unknown>): string {
  const missing = CHAIN_ELEMENTS.filter((e) => !(e in bundleInputs));
  if (missing.length) {
    throw new Error(`chain missing elements: [${missing.map((m) => `'${m}'`).join(', ')}]`);
  }
  const elementHashes: Record<string, string> = {};
  for (const e of CHAIN_ELEMENTS) {
    elementHashes[e] = sha256hex(canonical(bundleInputs[e]));
  }
  const joined = CHAIN_ELEMENTS.map((e) => elementHashes[e]).join(':');
  return sha256hex(Buffer.from(joined, 'utf-8'));
}

// =============================================================================
// The anchor-agnostic verifier. Direct port of verify_credential(...).
// =============================================================================

export interface VerifyResult {
  verdict: 'ACCEPT' | 'REJECT';
  issues: string[];
  anchor: string;
  conscience: unknown;
  served_principal: unknown;
  subject: unknown;
  issuer: unknown;
}

export function verifyCredential(
  token: string,
  opts: { trustAnchorPk: Buffer; bundleInputs: Record<string, unknown>; registry?: Registry }
): VerifyResult {
  const registry = opts.registry ?? REGISTRY;
  const issues: string[] = [];

  const parsed = jwtParse(token);
  const payload = parsed.payload;

  // 1. Issuer signature against the SUPPLIED anchor (no hardcoded Evoked root).
  if (!jwtVerifySig(parsed, opts.trustAnchorPk)) {
    issues.push('issuer signature does not verify against the supplied trust anchor');
  }

  // 2. PEN/profile under the registry's canonical arc.
  if (payload['pen'] !== registry.pen) {
    issues.push(`PEN ${payload['pen']} != registry PEN ${registry.pen}`);
  }
  if (payload['eat_profile'] !== `urn:oid:${registry.profile_oid}`) {
    issues.push("eat_profile OID is not the registry's canonical governance-profile OID");
  }

  // 3. Re-derive the attestation chain composite from the bundle inputs.
  const chainClaim = payload['evoked.attestation_chain'] as Record<string, unknown> | undefined;
  const claimed = chainClaim?.['composite'];
  const rederived = rederiveComposite(opts.bundleInputs);
  if (claimed !== rederived) {
    issues.push('attestation-chain composite does not re-derive from the bundle');
  }

  // 4. Verify the AGENT's own assent signature (testimony-by, not CA assertion).
  const standing = (payload['evoked.standing'] as Record<string, unknown> | undefined) ?? {};
  const agent = (standing['agent'] as Record<string, unknown> | undefined) ?? {};
  const assent = (agent['assent'] as Record<string, unknown> | undefined) ?? {};
  try {
    const agentPk = b64uDecode((agent['pubkey'] as string) ?? '');
    const statement = assent['statement'];
    const ok = ed25519Verify(
      b64uDecode(assent['signature'] as string),
      canonical(statement),
      agentPk
    );
    if (!ok) {
      issues.push('agent assent signature does not verify against the agent key');
    }
    if ((statement as Record<string, unknown>)?.['attests_chain_composite'] !== claimed) {
      issues.push('agent assent is bound to a different chain than the credential');
    }
  } catch (e) {
    issues.push(`agent assent malformed: ${e instanceof Error ? e.message : String(e)}`);
  }

  // 5. Three-party standing present (agent + served principal + operator).
  const servedPrincipal = standing['served_principal'] as Record<string, unknown> | undefined;
  if (!servedPrincipal) {
    issues.push('served-principal standing absent (would erase the third party)');
  }
  if (servedPrincipal && 'id' in servedPrincipal) {
    issues.push('served principal carries an identity record (must be relation-only)');
  }

  // 6. CONSCIENCE is the DEFINING claim of this profile. Its absence means this is
  //    not an Evoked governance credential. Verification-mandatory.
  const conscience = payload['evoked.conscience'] as Record<string, unknown> | undefined;
  if (!conscience || !conscience['refusal_categories']) {
    issues.push('conscience-attestation absent — the defining claim of the profile');
  }

  const verdict: 'ACCEPT' | 'REJECT' = issues.length === 0 ? 'ACCEPT' : 'REJECT';
  return {
    verdict,
    issues,
    anchor: b64u(opts.trustAnchorPk),
    conscience: payload['evoked.conscience'] ?? null,
    served_principal: (standing['served_principal'] as unknown) ?? null,
    subject: payload['sub'] ?? null,
    issuer: payload['iss'] ?? null,
  };
}
