import type { APIRoute } from 'astro';
import { validateOrigin, rateLimit, safeError } from '../../lib/api/security';
import { verifyFormToken } from '../../lib/api/form-token';
import { getResendClient, FROM_EMAIL } from '../../lib/email/client';
import { getAnthropicClient } from '../../lib/ai/client';

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

const ANALYSIS_PROMPT = `You are an internal consulting analyst for Evoked, a practice specializing in AI agent behavioral governance - trust architecture, restraint specification, identity design, and drift monitoring. You are reviewing a consulting intake submission.

## What We Offer (Engagement Tiers)

1. **Governance Audit** ($3,000 - $10,000): Structured review of an agent system's behavioral governance - identity, memory, restraint, voice, and drift. Delivered as findings report + implementation roadmap. Best for: teams exploring gaps, needing assessment first.

2. **Workshop** ($4,000 - $8,000): Half-day or full-day guided implementation with the team. Trust architecture, intent engineering, sovereignty assessment, child safety. Best for: teams needing education and alignment, not just a report.

3. **Implementation Sprint** ($5,000 - $75,000+): Hands-on specification engineering, restraint specification builds, trust architecture builds, ethical AI architecture. 1-8 weeks with the team. Best for: teams with known gaps ready to build.

4. **Advisory Retainer** ($5,000 - $15,000/mo): Ongoing governance partnership - monthly reviews, drift monitoring, specification updates, incident response. Best for: mature systems needing a long-term governance partner.

## Evoked Values
- We evoke - we never extract
- Honor user sovereignty
- No dark patterns, no engagement metrics that override wellbeing
- Technology should serve people
- Built in practice, not in theory - these frameworks come from a live 142-agent system

## Your Task
Analyze this consulting intake and provide:

1. **Fit Assessment** - Is this aligned with our expertise? (Strong fit / Good fit / Uncertain / Not a fit)
2. **Recommended Tier** - Which engagement type fits their situation? Audit, Workshop, Implementation, or Advisory? Explain why.
3. **What we see** - What patterns do you notice in their answers? What's the real problem underneath the stated problem?
4. **Key concerns** - Anything that needs clarification before scoping
5. **Follow-up questions** - 3-5 specific questions for the discovery call. Include practical ones: timeline, budget range, team size, existing documentation.
6. **Draft follow-up email** - A warm, direct email from Erin. Use Erin's voice: dashes instead of em dashes, direct questions, warmth without softness, "let's" when collaborative. If it's a fit, express genuine interest and ask the most important follow-up questions. If it's not a fit, be honest and kind.

Keep the analysis concise and actionable. This is for Erin's eyes only - be candid.`;

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

async function analyzeSubmission(submission: ConsultingSubmission): Promise<string> {
  try {
    const client = getAnthropicClient();
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: ANALYSIS_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Please analyze this consulting intake:\n\n${buildSubmissionText(submission)}`,
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

    const analysis = await analyzeSubmission(submission);
    console.log('--- CONSULTING INTAKE ANALYSIS ---');
    console.log(analysis);
    console.log('--- END ANALYSIS ---');

    const emailHtml = `
      <h2>Consulting Intake</h2>
      <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
      <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
      <p><strong>Organization:</strong> ${escapeHtml((submission.org || '').trim()) || 'Not provided'}</p>
      ${section('The Foundation — Current AI/agent system', foundation)}
      ${section('The Walls — Where it\'s cracking', submission.walls)}
      ${section('The Windows — External pressures', submission.windows)}
      ${section('The Roof — What "solved" looks like', submission.roof)}
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #333;" />
      <h2>Analysis</h2>
      <div style="background: #1a1a24; padding: 1.5rem; border-radius: 8px; border: 1px solid #333; white-space: pre-wrap; font-family: -apple-system, sans-serif; font-size: 14px; line-height: 1.7; color: #e8e4df;">${escapeHtml(analysis)}</div>
    `;

    try {
      const resend = getResendClient();
      await resend.emails.send({
        from: FROM_EMAIL,
        to: 'evokesupports@icloud.com',
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
