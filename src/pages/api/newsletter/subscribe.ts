import type { APIRoute } from 'astro';
import { validateOrigin, rateLimit, safeError } from '../../../lib/api/security';
import { verifyFormToken } from '../../../lib/api/form-token';

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

    // Honeypot check — if filled, silently return success
    if (hp) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verify challenge token
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

    const apiKey = import.meta.env.BUTTONDOWN_API_KEY;
    if (!apiKey) {
      console.error('BUTTONDOWN_API_KEY is not configured');
      return new Response(JSON.stringify({ error: 'Newsletter not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const res = await fetch('https://api.buttondown.com/v1/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: normalizedEmail,
        type: 'regular',
      }),
    });

    if (!res.ok) {
      const data = await res.json() as { code?: string; detail?: string };
      // Already subscribed — treat as success (email saved only once)
      if (res.status === 400 && (data.code === 'email_already_exists' || JSON.stringify(data).includes('already'))) {
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      // Firewall blocked
      if (data.code === 'subscriber_blocked') {
        return new Response(JSON.stringify({ error: 'Unable to subscribe with that email. Please try a different address or contact us directly.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      console.error('Buttondown subscribe error:', data);
      return new Response(JSON.stringify({ error: 'Subscription failed' }), {
        status: 500,
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
