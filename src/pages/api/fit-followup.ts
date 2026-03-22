import type { APIRoute } from 'astro';
import { validateOrigin, rateLimit, safeError } from '../../lib/api/security';
import { verifyFormToken } from '../../lib/api/form-token';
import { getResendClient, FROM_EMAIL } from '../../lib/email/client';
import { fitFollowupEmail, fitFollowupSubject, type FitLevel } from '../../lib/email/fit-followup';
import { SERVICE_PRODUCT_MAP } from '../../lib/products/service-product-map';

export const prerender = false;

const VALID_FIT_LEVELS: FitLevel[] = ['strong', 'moderate', 'limited', 'not-recommended'];

// --- In-memory assessment store (no project descriptions) ---
// Cleared on function restart. Serves as a lightweight audit trail
// within a single Vercel function instance lifetime.
interface StoredAssessment {
  email: string;
  fitLevel: FitLevel;
  score: number;
  strengths: string[];
  considerations: string[];
  suggestedServices: string[];
  timestamp: number;
}

const assessmentStore: StoredAssessment[] = [];

// --- Email dedup: 1 send per email+fitLevel per 24 hours ---
// Key: `${normalizedEmail}:${fitLevel}`
// Different fitLevel = different assessment = allowed.
const followupSent = new Map<string, number>();

setInterval(() => {
  const cutoff = Date.now() - 86_400_000;
  for (const [key, ts] of followupSent) {
    if (ts < cutoff) followupSent.delete(key);
  }
}, 600_000);

// --- Buttondown subscription with fit-level tags ---
async function subscribeButtondown(email: string, fitLevel: FitLevel): Promise<void> {
  const apiKey = import.meta.env.BUTTONDOWN_API_KEY;
  if (!apiKey) return;

  await fetch('https://api.buttondown.com/v1/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Token ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: email,
      type: 'regular',
      tags: ['fit-assessment', `fit-${fitLevel}`],
    }),
  });
  // Ignore errors (already subscribed, blocked, etc.) — non-blocking
}

// --- Sanitize array of strings coming from client ---
function sanitizeStringArray(arr: unknown, maxItems = 10, maxLen = 300): string[] {
  if (!Array.isArray(arr)) return [];
  return arr
    .slice(0, maxItems)
    .map((item) => String(item).slice(0, maxLen).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ''));
}

export const POST: APIRoute = async ({ request }) => {
  const originBlock = validateOrigin(request, true);
  if (originBlock) return originBlock;

  const rateLimitBlock = rateLimit(request, 'fitFollowup');
  if (rateLimitBlock) return rateLimitBlock;

  try {
    const body = await request.json();
    const {
      email,
      fitLevel,
      score,
      strengths,
      considerations,
      suggestedServices,
      subscribeNewsletter,
      token,
      ts,
      hp,
    } = body as {
      email: string;
      fitLevel: FitLevel;
      score: number;
      strengths: unknown;
      considerations: unknown;
      suggestedServices: unknown;
      subscribeNewsletter?: boolean;
      token?: string;
      ts?: number;
      hp?: string;
    };

    // Honeypot
    if (hp) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Token verification
    const secret = import.meta.env.FORM_SECRET;
    if (!secret || !token || !ts) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const validToken = await verifyFormToken(secret, token, ts);
    if (!validToken) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired form. Please refresh and try again.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Validate email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate fitLevel
    if (!fitLevel || !VALID_FIT_LEVELS.includes(fitLevel)) {
      return new Response(JSON.stringify({ error: 'Invalid assessment data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate score
    if (typeof score !== 'number' || score < 1 || score > 10) {
      return new Response(JSON.stringify({ error: 'Invalid assessment data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Segment D: not-recommended — no email, no storage, no Buttondown.
    if (fitLevel === 'not-recommended') {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const dedupKey = `${normalizedEmail}:${fitLevel}`;
    const now = Date.now();

    // Dedup check: 1 email per email+fitLevel per 24 hours.
    // Silently succeed — don't reveal send history to client.
    const lastSent = followupSent.get(dedupKey);
    if (lastSent && now - lastSent < 86_400_000) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Sanitize arrays
    const cleanStrengths = sanitizeStringArray(strengths);
    const cleanConsiderations = sanitizeStringArray(considerations);
    const cleanServices = sanitizeStringArray(suggestedServices);

    // Store assessment — no project description stored
    assessmentStore.push({
      email: normalizedEmail,
      fitLevel,
      score,
      strengths: cleanStrengths,
      considerations: cleanConsiderations,
      suggestedServices: cleanServices,
      timestamp: now,
    });

    // Resolve service mapping for this fitLevel
    const mapping = SERVICE_PRODUCT_MAP[fitLevel];

    // Build email
    const emailHtml = fitFollowupEmail({
      fitLevel,
      score,
      strengths: cleanStrengths,
      considerations: cleanConsiderations,
      suggestedServices: cleanServices,
      intakeUrl: mapping.intakeUrl,
      productLinks: mapping.products,
      articleLinks: mapping.articles,
    });

    const subject = fitFollowupSubject(fitLevel);

    // Mark as sent before attempting — roll back on failure
    followupSent.set(dedupKey, now);

    try {
      const resend = getResendClient();
      await resend.emails.send({
        from: FROM_EMAIL,
        to: normalizedEmail,
        replyTo: 'evokesupports@icloud.com',
        subject,
        html: emailHtml,
      });
    } catch (emailError: unknown) {
      const msg = emailError instanceof Error ? emailError.message : String(emailError);
      console.error('Fit followup email send failed:', msg);
      // Roll back dedup so they can retry
      followupSent.delete(dedupKey);
      return new Response(JSON.stringify({ error: 'Something went wrong. Please try again.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Optional newsletter subscription — non-blocking, errors logged only
    if (subscribeNewsletter) {
      subscribeButtondown(normalizedEmail, fitLevel).catch((err) => {
        console.error('Buttondown subscription failed (non-blocking):', err);
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return safeError(error, 'Fit followup error');
  }
};
