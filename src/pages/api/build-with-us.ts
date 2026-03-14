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
    const { name, email, type, description, audience, functions, data, integrations, heart, soul, look } = body as {
      name: string;
      email: string;
      type: string;
      description: string;
      audience: string;
      functions: string;
      data: string;
      integrations: string;
      heart: string;
      soul: string;
      look: string;
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

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      return new Response(JSON.stringify({ error: 'Please tell us more about what you want to build' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const section = (label: string, value: string) =>
      value?.trim() ? `<h3>${escapeHtml(label)}</h3><p>${escapeHtml(value.trim())}</p>` : '';

    const resend = getResendClient();

    await resend.emails.send({
      from: FROM_EMAIL,
      to: 'evokesupports@icloud.com',
      subject: `Build With Us: ${name.trim()}`,
      html: `
        <h2>New App Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
        <p><strong>Type:</strong> ${escapeHtml((type || '').trim()) || 'Not specified'}</p>
        ${section('The Bones — What is it?', description)}
        ${section('The Eyes — Who will use it?', audience)}
        ${section('The Muscles — What must it do?', functions)}
        ${section('The Blood — What data flows through it?', data)}
        ${section('The Nervous System — What does it connect to?', integrations)}
        ${section('The Heart — Why it matters and what it refuses', heart)}
        ${section('The Soul — What drives this?', soul)}
        ${section('The Skin — Look and feel', look)}
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
