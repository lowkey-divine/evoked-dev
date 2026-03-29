import type { APIRoute } from 'astro';
import { validateOrigin, rateLimit, safeError } from '../../lib/api/security';
import { verifyFormToken } from '../../lib/api/form-token';
import { getResendClient, FROM_EMAIL } from '../../lib/email/client';

export const prerender = false;

// --- Email dedup: max 3 submissions per email per 24 hours ---
const emailSubmissions = new Map<string, number[]>();

setInterval(() => {
  const cutoff = Date.now() - 86_400_000;
  for (const [email, timestamps] of emailSubmissions) {
    const valid = timestamps.filter(t => t > cutoff);
    if (valid.length === 0) emailSubmissions.delete(email);
    else emailSubmissions.set(email, valid);
  }
}, 600_000);

function checkEmailDedup(email: string): { allowed: boolean } {
  const key = email.toLowerCase().trim();
  const now = Date.now();
  const cutoff = now - 86_400_000;
  const existing = (emailSubmissions.get(key) || []).filter(t => t > cutoff);

  if (existing.length >= 3) {
    return { allowed: false };
  }

  existing.push(now);
  emailSubmissions.set(key, existing);
  return { allowed: true };
}

const MIN_FORM_TIME_MS = 30_000;

interface ConsultingSubmission {
  name: string;
  email: string;
  org: string;
  foundation: string;
  walls: string;
  windows: string;
  roof: string;
}

function buildSubmissionText(s: ConsultingSubmission): string {
  return [
    `Name: ${s.name}`,
    `Email: ${s.email}`,
    `Organization: ${s.org || 'Not provided'}`,
    '',
    `THE FOUNDATION — Current AI/agent system`,
    s.foundation || 'Not provided',
    '',
    `THE WALLS — Where it's cracking`,
    s.walls || 'Not provided',
    '',
    `THE WINDOWS — External pressures and visibility needs`,
    s.windows || 'Not provided',
    '',
    `THE ROOF — What "solved" looks like`,
    s.roof || 'Not provided',
  ].join('\n');
}

export const POST: APIRoute = async ({ request }) => {
  const originBlock = validateOrigin(request, true);
  if (originBlock) return originBlock;

  const rateLimitBlock = rateLimit(request, 'consultingIntake');
  if (rateLimitBlock) return rateLimitBlock;

  try {
    const body = await request.json();
    const { token, ts, hp, formLoadedAt, ...rest } = body as ConsultingSubmission & {
      token?: string;
      ts?: number;
      hp?: string;
      formLoadedAt?: number;
    };
    const submission = rest as ConsultingSubmission;
    const { name, email, foundation } = submission;

    // Honeypot — silently succeed
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

    // Minimum form completion time
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

    const dedup = checkEmailDedup(email);
    if (!dedup.allowed) {
      return new Response(JSON.stringify({ error: 'We already have your submission. We will be in touch.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!foundation || typeof foundation !== 'string' || foundation.trim().length < 10) {
      return new Response(JSON.stringify({ error: 'Please tell us more about your current system' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const section = (label: string, value: string) =>
      value?.trim() ? `<h3>${escapeHtml(label)}</h3><p>${escapeHtml(value.trim())}</p>` : '';

    const emailHtml = `
      <h2>Consulting Intake</h2>
      <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
      <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
      <p><strong>Organization:</strong> ${escapeHtml((submission.org || '').trim()) || 'Not provided'}</p>
      ${section('The Foundation — Current AI/agent system', foundation)}
      ${section('The Walls — Where it\'s cracking', submission.walls)}
      ${section('The Windows — External pressures', submission.windows)}
      ${section('The Roof — What "solved" looks like', submission.roof)}
    `;

    try {
      const resend = getResendClient();
      await resend.emails.send({
        from: FROM_EMAIL,
        to: 'passionevoked@icloud.com',
        subject: `Consulting Intake: ${name.trim()}`,
        html: emailHtml,
      });
    } catch (emailError: unknown) {
      const msg = emailError instanceof Error ? emailError.message : String(emailError);
      console.error('Email send failed (analysis still completed):', msg);
      if (import.meta.env.DEV) {
        return new Response(JSON.stringify({ success: true, devNote: 'Email skipped (no Resend key)', analysis }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      throw emailError;
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return safeError(error, 'Consulting intake submission error');
  }
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
