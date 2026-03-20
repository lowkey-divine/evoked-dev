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

const MIN_FORM_TIME_MS = 20_000;

const ANALYSIS_PROMPT = `You are an internal coaching intake analyst for Evoked. Someone has reached out about coaching - navigating their relationship with AI, leading through AI change, or finding their footing in a shifting landscape. Your job is to help Erin understand this person before the first conversation.

## What Coaching Looks Like at Evoke
- One-on-one sessions for individuals, couples, or small teams
- Navigating what AI means for identity, work, and relationships
- Structured accompaniment - not advice, not therapy, not consulting
- Helping people find their own clarity about technology in their lives
- Grounded in sovereignty principles: the person's autonomy comes first

## Your Task
Read what this person shared and provide:

1. **What you hear** - Not what they said, but what you hear underneath it. What's the emotional texture? What are they carrying? Read between the lines with care.
2. **Readiness** - Are they in crisis, in transition, in exploration, or in growth? This shapes how Erin approaches the first session.
3. **What kind of support they might need** - Thought partner, mirror holder, accountability companion, or something they haven't named yet?
4. **What to be gentle about** - Anything in their words that suggests vulnerability, fear, or past difficulty. Erin should know where to tread carefully.
5. **Draft follow-up email** - A warm, personal email from Erin. Short. No jargon. No coaching frameworks. Just one human acknowledging another. Use Erin's voice: dashes instead of em dashes, direct questions, warmth without softness. The email should make this person feel heard - not assessed.

This is the most personal intake on the site. Handle it accordingly. Be candid with Erin but gentle about the person.`;

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

async function analyzeSubmission(submission: CoachingSubmission): Promise<string> {
  try {
    const client = getAnthropicClient();
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1200,
      system: ANALYSIS_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Please read this coaching intake with care:\n\n${buildSubmissionText(submission)}`,
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

    const analysis = await analyzeSubmission(submission);
    console.log('--- COACHING INTAKE ANALYSIS ---');
    console.log(analysis);
    console.log('--- END ANALYSIS ---');

    const emailHtml = `
      <h2>Coaching Intake</h2>
      <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
      <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
      ${section('Where are you right now?', submission.where)}
      ${section("What's shifting?", submission.shifting)}
      ${section('What kind of support are you looking for?', submission.support)}
      <hr style="margin: 2rem 0; border: none; border-top: 1px solid #333;" />
      <h2>Analysis</h2>
      <div style="background: #1a1a24; padding: 1.5rem; border-radius: 8px; border: 1px solid #333; white-space: pre-wrap; font-family: -apple-system, sans-serif; font-size: 14px; line-height: 1.7; color: #e8e4df;">${escapeHtml(analysis)}</div>
    `;

    try {
      const resend = getResendClient();
      await resend.emails.send({
        from: FROM_EMAIL,
        to: 'evokesupports@icloud.com',
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
