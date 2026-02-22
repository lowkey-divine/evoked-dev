import type { APIRoute } from 'astro';
import { getResendClient } from '../../../lib/email/client';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, firstName } = body as { email: string; firstName?: string };

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const segmentId = import.meta.env.RESEND_AUDIENCE_ID;
    if (!segmentId) {
      console.error('RESEND_AUDIENCE_ID is not configured');
      return new Response(JSON.stringify({ error: 'Newsletter not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const resend = getResendClient();
    await resend.contacts.create({
      email: email.toLowerCase().trim(),
      firstName: firstName || undefined,
      segments: [{ id: segmentId }],
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
