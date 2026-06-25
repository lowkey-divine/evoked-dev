import type { APIRoute } from 'astro';
import { validateOrigin, rateLimit, safeError } from '../../lib/api/security';
import { verifyFormToken } from '../../lib/api/form-token';
import { getResendClient, FROM_EMAIL } from '../../lib/email/client';

export const prerender = false;

// Email dedup: max 2 submissions per email per 24 hours.
// Tighter than consulting-intake's 3/24h because audit intake is higher-intent,
// lower-volume; a second submission is plausible (correction), a third signals
// abuse or distress at the form layer.
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
  if (existing.length >= 2) return { allowed: false };
  existing.push(now);
  emailSubmissions.set(key, existing);
  return { allowed: true };
}

const MIN_FORM_TIME_MS = 20_000;
const ALLOWED_WINDOWS = new Set(['morning', 'midday', 'afternoon']);

interface AuditSubmission {
  name: string;
  email: string;
  org: string;
  systems: string;
  brought_here: string;
  call_window: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function clip(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

export const POST: APIRoute = async ({ request }) => {
  const originBlock = validateOrigin(request, true);
  if (originBlock) return originBlock;

  const rateLimitBlock = rateLimit(request, 'auditIntake');
  if (rateLimitBlock) return rateLimitBlock;

  try {
    const body = await request.json();
    const { token, ts, hp, formLoadedAt } = body as {
      token?: string;
      ts?: number;
      hp?: string;
      formLoadedAt?: number;
    };

    const submission: AuditSubmission = {
      name: clip((body as Record<string, unknown>).name, 120),
      email: clip((body as Record<string, unknown>).email, 254),
      org: clip((body as Record<string, unknown>).org, 160),
      systems: clip((body as Record<string, unknown>).systems, 500),
      brought_here: clip((body as Record<string, unknown>).brought_here, 500),
      call_window: clip((body as Record<string, unknown>).call_window, 16),
    };

    // Honeypot - silently succeed so bots cannot probe.
    if (hp) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

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

    if (formLoadedAt && typeof formLoadedAt === 'number') {
      const elapsed = Date.now() - formLoadedAt;
      if (elapsed < MIN_FORM_TIME_MS) {
        return new Response(JSON.stringify({ error: 'Please take your time filling out the form.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    if (!submission.name) {
      return new Response(JSON.stringify({ error: 'Name is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!submission.email || !isValidEmail(submission.email)) {
      return new Response(JSON.stringify({ error: 'Valid email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!submission.systems || submission.systems.length < 5) {
      return new Response(JSON.stringify({ error: 'Please tell us about your system' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!ALLOWED_WINDOWS.has(submission.call_window)) {
      return new Response(JSON.stringify({ error: 'Please pick a call window' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const dedup = checkEmailDedup(submission.email);
    if (!dedup.allowed) {
      return new Response(JSON.stringify({ error: 'We already have your submission. Erin will be in touch.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const windowLabel = submission.call_window.charAt(0).toUpperCase() + submission.call_window.slice(1);

    const emailHtml = `
      <h2>Sovereignty Audit - Call Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
      <p><strong>Organization:</strong> ${escapeHtml(submission.org) || 'Not provided'}</p>
      <p><strong>Preferred call window:</strong> ${escapeHtml(windowLabel)} (Eastern Time)</p>
      <h3>Systems they work with</h3>
      <p>${escapeHtml(submission.systems)}</p>
      ${submission.brought_here ? `<h3>What brought them here today</h3><p>${escapeHtml(submission.brought_here)}</p>` : ''}
      <hr/>
      <p style="font-size: 0.85em; color: #666;">Retention commitment on the page: if no engagement results, this message is deleted within 30 days.</p>
    `;

    let resend;
    try {
      resend = getResendClient();
    } catch (clientError: unknown) {
      const msg = clientError instanceof Error ? clientError.message : String(clientError);
      console.error('Resend client init failed:', msg);
      if (import.meta.env.DEV) {
        return new Response(JSON.stringify({ success: true, devNote: 'Email skipped (no Resend key)' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      throw clientError;
    }

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: 'erin@evoked.dev',
        subject: `Sovereignty Audit Call Request: ${submission.name}`,
        html: emailHtml,
      });
    } catch (emailError: unknown) {
      const msg = emailError instanceof Error ? emailError.message : String(emailError);
      console.error('Audit intake notification email failed:', msg);
      throw emailError;
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return safeError(error, 'Sovereignty audit intake submission error');
  }
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
