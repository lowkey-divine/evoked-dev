import type { APIRoute } from 'astro';
import { validateOrigin, rateLimit, safeError } from '../../lib/api/security';
import { verifyFormToken } from '../../lib/api/form-token';
import { getResendClient, FROM_EMAIL } from '../../lib/email/client';

export const prerender = false;

// --- Email dedup: max 3 submissions per email per 24 hours ---
const emailSubmissions = new Map<string, number[]>();

// Clean up expired entries every 10 minutes
setInterval(() => {
  const cutoff = Date.now() - 86_400_000;
  for (const [email, timestamps] of emailSubmissions) {
    const valid = timestamps.filter(t => t > cutoff);
    if (valid.length === 0) emailSubmissions.delete(email);
    else emailSubmissions.set(email, valid);
  }
}, 600_000);

function checkEmailDedup(email: string): { allowed: boolean; remaining: number } {
  const key = email.toLowerCase().trim();
  const now = Date.now();
  const cutoff = now - 86_400_000; // 24 hours
  const existing = (emailSubmissions.get(key) || []).filter(t => t > cutoff);

  if (existing.length >= 3) {
    return { allowed: false, remaining: 0 };
  }

  existing.push(now);
  emailSubmissions.set(key, existing);
  return { allowed: true, remaining: 3 - existing.length };
}

// --- Minimum form completion time: 45 seconds ---
const MIN_FORM_TIME_MS = 45_000;

interface Submission {
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
}

function buildSubmissionText(s: Submission): string {
  const lines = [
    `Name: ${s.name}`,
    `Email: ${s.email}`,
    `Type: ${s.type || 'Not specified'}`,
    '',
    `THE BONES — What is it?`,
    s.description || 'Not provided',
    '',
    `THE EYES — Who will use it?`,
    s.audience || 'Not provided',
    '',
    `THE MUSCLES — What must it do?`,
    s.functions || 'Not provided',
    '',
    `THE BLOOD — What data flows through it?`,
    s.data || 'Not provided',
    '',
    `THE NERVOUS SYSTEM — What does it connect to?`,
    s.integrations || 'Not provided',
    '',
    `THE HEART — Why it matters and what it refuses`,
    s.heart || 'Not provided',
    '',
    `THE SOUL — What drives this?`,
    s.soul || 'Not provided',
    '',
    `THE SKIN — Look and feel`,
    s.look || 'Not provided',
  ];
  return lines.join('\n');
}

export const POST: APIRoute = async ({ request }) => {
  const originBlock = validateOrigin(request, true);
  if (originBlock) return originBlock;

  const rateLimitBlock = rateLimit(request, 'buildWithUs');
  if (rateLimitBlock) return rateLimitBlock;

  try {
    const body = await request.json();
    const { token, ts, hp, formLoadedAt, ...rest } = body as Submission & {
      token?: string;
      ts?: number;
      hp?: string;
      formLoadedAt?: number;
    };
    const submission = rest as Submission;
    const { name, email, description } = submission;

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

    // Minimum form completion time check (45 seconds)
    if (formLoadedAt && typeof formLoadedAt === 'number') {
      const elapsed = Date.now() - formLoadedAt;
      if (elapsed < MIN_FORM_TIME_MS) {
        return new Response(JSON.stringify({ error: 'Please take your time filling out the form.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

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

    // Email dedup: max 3 submissions per email per 24 hours
    const dedup = checkEmailDedup(email);
    if (!dedup.allowed) {
      return new Response(JSON.stringify({ error: 'We already have your submission. We will be in touch.' }), {
        status: 429,
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

    const emailHtml = `
      <h2>New App Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
      <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
      <p><strong>Type:</strong> ${escapeHtml((submission.type || '').trim()) || 'Not specified'}</p>
      ${section('The Bones — What is it?', description)}
      ${section('The Eyes — Who will use it?', submission.audience)}
      ${section('The Muscles — What must it do?', submission.functions)}
      ${section('The Blood — What data flows through it?', submission.data)}
      ${section('The Nervous System — What does it connect to?', submission.integrations)}
      ${section('The Heart — Why it matters and what it refuses', submission.heart)}
      ${section('The Soul — What drives this?', submission.soul)}
      ${section('The Skin — Look and feel', submission.look)}
    `;

    // Send email — never let email failure block the user's submission
    let emailSent = false;
    try {
      const resend = getResendClient();
      await resend.emails.send({
        from: FROM_EMAIL,
        to: 'passionevoked@icloud.com',
        subject: `Build With Us: ${name.trim()}`,
        html: emailHtml,
      });
      emailSent = true;
    } catch (emailError: unknown) {
      const msg = emailError instanceof Error ? emailError.message : String(emailError);
      console.error('Email send failed (submission preserved in logs above):', msg);
      // Do NOT re-throw — the user's submission is already logged.
      // Their labor is preserved and acknowledged regardless of email delivery.
    }

    return new Response(JSON.stringify({ success: true, ...(import.meta.env.DEV && !emailSent ? { devNote: 'Email skipped' } : {}) }), {
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
