// Stateless HMAC-based form tokens.
// Prevents direct API calls (curl/Postman) by requiring a server-issued token.
// Works on Vercel serverless — no shared state needed.

const encoder = new TextEncoder();

async function hmacSign(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function generateFormToken(secret: string): Promise<{ token: string; ts: number }> {
  const ts = Date.now();
  const token = await hmacSign(secret, `form:${ts}`);
  return { token, ts };
}

export async function verifyFormToken(
  secret: string,
  token: string,
  ts: number,
  maxAgeMs: number = 600_000, // 10 minutes
): Promise<boolean> {
  if (!token || !ts || typeof token !== 'string' || typeof ts !== 'number') {
    return false;
  }

  const age = Date.now() - ts;

  // Token expired or timestamp is in the future
  if (age > maxAgeMs || age < 0) return false;

  // Verify HMAC
  const expected = await hmacSign(secret, `form:${ts}`);

  // Constant-time comparison
  if (token.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < token.length; i++) {
    mismatch |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}
