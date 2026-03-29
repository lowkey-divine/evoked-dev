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

const MIN_FORM_TIME_MS = 20_000;

interface CoachingSubmission {
  name: string;
  email: string;
  where: string;
  shifting: string;
  support: string;
}

function buildSubmissionText(s: CoachingSubmission): string {
  return [
    `Name: ${s.name}`,
    `Email: ${s.email}`,
    '',
    `WHERE ARE YOU RIGHT NOW?`,
    s.where || 'Not provided',
    '',
    `WHAT'S SHIFTING?`,
    s.shifting || 'Not provided',
    '',
    `WHAT KIND OF SUPPORT ARE YOU LOOKING FOR?`,
    s.support || 'Not provided',
  ].join('\n');
}

export const POST: APIRoute = async ({ request }) => {
  const originBlock = validateOrigin(request, true);
  if (originBlock) return originBlock;

  const rateLimitBlock = rateLimit(request, 'coachingIntake');
  if (rateLimitBlock) return rateLimitBlock;

  try {
    const body = await request.json();
    const { token, ts, hp, formLoadedAt, ...rest } = body as CoachingSubmission & {
      token?: string;
      ts?: number;
      hp?: string;
      formLoadedAt?: number;
    };
    const submission = rest as CoachingSubmission;
    const { name, email } = submission;

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
        return new Response(JSON.stringify({ error: 'Please take your time.' }), {
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
      return new Response(JSON.stringify({ error: 'We already have your message. We will be in touch.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const section = (label: string, value: string) =>
      value?.trim() ? `<h3>${escapeHtml(label)}</h3><p>${escapeHtml(value.trim())}</p>` : '';

    const emailHtml = `
      <h2>Coaching Intake</h2>
      <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
      <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
      ${section('Where are you right now?', submission.where)}
      ${section("What's shifting?", submission.shifting)}
      ${section('What kind of support are you looking for?', submission.support)}
    `;

    try {
      const resend = getResendClient();
      await resend.emails.send({
        from: FROM_EMAIL,
        to: 'passionevoked@icloud.com',
        subject: `Coaching Intake: ${name.trim()}`,
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
    return safeError(error, 'Coaching intake submission error');
  }
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
