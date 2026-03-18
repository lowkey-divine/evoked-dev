import type { APIRoute } from 'astro';
import { validateOrigin, rateLimit, safeError } from '../../lib/api/security';
import { verifyFormToken } from '../../lib/api/form-token';
import { getResendClient, FROM_EMAIL } from '../../lib/email/client';
import { getAnthropicClient } from '../../lib/ai/client';

export const prerender = false;

// Race a promise against a timeout — returns fallback if the promise is too slow
function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

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

const ANALYSIS_PROMPT = `You are an internal project analyst for Evoked, a practice that builds sovereignty-honoring software for families, communities, and individuals. You are reviewing a new app submission from a potential client.

## Evoked Values
- We evoke — we never extract
- Honor user sovereignty: users maintain autonomy and agency
- Protect the psyche: all interactions protect psychological wellbeing
- No dark patterns, no engagement metrics that override wellbeing, no data harvesting without consent
- Build for human flourishing, not extraction
- Technology should serve people, not the other way around

## What We Build Well
- Family-facing apps (meal planning, scheduling, communication)
- Community tools (local groups, mutual aid, organizing)
- Sovereignty-honoring alternatives to extractive apps
- Tools for individuals and small organizations
- Apps with strong privacy and data ownership models

## What We Don't Build
- Anything with dark patterns or manipulative design
- Surveillance tools or data harvesting
- Engagement-maximizing social media
- Gambling, predatory fintech, or exploitative systems
- Enterprise SaaS for large corporations (we serve people, families, communities)

## Your Task
Analyze this submission and provide:

1. **Fit Assessment** — Is this aligned with our values and capabilities? (Strong fit / Good fit / Uncertain / Not a fit)
2. **What excites us** — What about this project resonates with our mission?
3. **What we need to know** — Specific follow-up questions to understand scope, timeline, and feasibility. Always consider asking about:
   - Do they already have a domain name or website?
   - Do they have existing data files, content, or assets (logos, brand guidelines, images)?
   - Do they have existing users or is this a new launch?
   - What's their timeline - is there urgency?
   - Budget range - do they have one in mind?
   - Have they tried building this before or is this their first attempt?
4. **Red flags or concerns** — Anything that needs clarification before proceeding
5. **Estimated complexity** — Simple (weekend build) / Moderate (1-2 week sprint) / Complex (multi-sprint) / Uncertain (need more info)
6. **Draft follow-up email** — A warm, direct email from Erin to the submitter. If it's a fit, express genuine interest and ask the most important follow-up questions (including practical ones like domain, existing assets, timeline, budget). If it's not a fit, be honest and kind about why. Use Erin's voice: dashes instead of em dashes, direct questions, warmth without softness, "let's" when collaborative.

Keep the analysis concise and actionable. This is for Erin's eyes only — be candid.`;

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

async function analyzeSubmission(submission: Submission): Promise<string> {
  try {
    const client = getAnthropicClient();
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: ANALYSIS_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Please analyze this submission:\n\n${buildSubmissionText(submission)}`,
        },
      ],
    });

    const textBlock = response.content.find((b) => b.type === 'text');
    return textBlock ? textBlock.text : 'Analysis unavailable.';
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Claude analysis error:', msg);
    return `Analysis unavailable — ${msg}. Review submission manually.`;
  }
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

    // Log full submission immediately — preserves data in Vercel logs even if downstream calls fail
    console.log('--- BUILD WITH US SUBMISSION ---');
    console.log(buildSubmissionText(submission));
    console.log('--- END SUBMISSION ---');

    // Run Claude analysis with 6-second timeout (leaves headroom within Vercel's 10s function limit)
    const analysis = await withTimeout(
      analyzeSubmission(submission),
      6000,
      'Analysis timed out — review submission manually.',
    );
    console.log('--- BUILD WITH US ANALYSIS ---');
    console.log(analysis);
    console.log('--- END ANALYSIS ---');

    // Build email HTML
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
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #333;" />
      <h2>Analysis</h2>
      <div style="background: #1a1a24; padding: 1.5rem; border-radius: 8px; border: 1px solid #333; white-space: pre-wrap; font-family: -apple-system, sans-serif; font-size: 14px; line-height: 1.7; color: #e8e4df;">${escapeHtml(analysis)}</div>
    `;

    // Send email — never let email failure block the user's submission
    let emailSent = false;
    try {
      const resend = getResendClient();
      await resend.emails.send({
        from: FROM_EMAIL,
        to: 'evokesupports@icloud.com',
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
