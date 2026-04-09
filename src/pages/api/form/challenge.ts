import type { APIRoute } from 'astro';
import { generateFormToken } from '../../../lib/api/form-token';
import { validateOrigin, rateLimit, safeError } from '../../../lib/api/security';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  // Origin check is lenient on GET — the real security is HMAC verification on POST.
  // Some browsers omit Origin on same-origin GET fetch requests.
  const originBlock = validateOrigin(request, false);
  if (originBlock) return originBlock;

  const rateLimitBlock = rateLimit(request, 'challenge');
  if (rateLimitBlock) return rateLimitBlock;

  try {
    const secret = import.meta.env.FORM_SECRET;
    if (!secret) {
      console.error('FORM_SECRET is not configured');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { token, ts } = await generateFormToken(secret);

    return new Response(JSON.stringify({ token, ts }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return safeError(error, 'Challenge generation error');
  }
};
