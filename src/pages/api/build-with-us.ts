import type { APIRoute } from 'astro';
import { validateOrigin, rateLimit, safeError } from '../../lib/api/security';
import { getResendClient, FROM_EMAIL } from '../../lib/email/client';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const originBlock = validateOrigin(request);
  if (originBlock) return originBlock;

  const rateLimitBlock = rateLimit(request, 'buildWithUs');
  if (rateLimitBlock) return rateLimitBlock;

  try {
    const body = await request.json();
    const { name, email, idea, audience } = body as {
      name: string;
      email: string;
      idea: string;
      audience: string;
    };

    if (!name || typeof name !== 'string' || name.trim().length < 1) {
      return new Response(JSON.stringify({ error: 'Name is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!idea || typeof idea !== 'string' || idea.trim().length < 10) {
      return new Response(JSON.stringify({ error: 'Please tell us more about your idea' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const resend = getResendClient();

    await resend.emails.send({
      from: FROM_EMAIL,
      to: 'evokesupports@icloud.com',
      subject: `Build With Us: ${name.trim()}`,
      html: `
        <h2>New App Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
        <p><strong>What they want to build:</strong></p>
        <p>${escapeHtml(idea.trim())}</p>
        <p><strong>Who it serves:</strong></p>
        <p>${escapeHtml((audience || '').trim()) || 'Not specified'}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return safeError(error, 'Build with us submission error');
  }
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
