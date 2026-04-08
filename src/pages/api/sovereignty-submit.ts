import type { APIRoute } from 'astro';
import { sql } from '../../lib/db';
import { validateOrigin, corsHeaders, rateLimit, safeError } from '../../lib/api/security';
import { verifyFormToken } from '../../lib/api/form-token';

export const prerender = false;

function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase().slice(0, 254);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export const POST: APIRoute = async ({ request }) => {
  const originBlock = validateOrigin(request, true);
  if (originBlock) return originBlock;

  const rateLimitBlock = rateLimit(request, 'sovereignty');
  if (rateLimitBlock) return rateLimitBlock;

  try {
    const body = await request.json();
    const { email, answers, score, type, token, ts, hp } = body as {
      email: string;
      answers: Record<string, number>;
      score: number;
      type?: 'quick' | 'full';
      token?: string;
      ts?: number;
      hp?: string;
    };

    const assessmentType = type === 'full' ? 'full' : 'quick';

    // Honeypot check
    if (hp) {
      return new Response(JSON.stringify({ success: true, score: 0 }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Verify HMAC token
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

    // Validate inputs
    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
      return new Response(JSON.stringify({ error: 'Valid email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!answers || typeof answers !== 'object' || Object.keys(answers).length === 0) {
      return new Response(JSON.stringify({ error: 'Assessment answers are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const maxScore = assessmentType === 'quick' ? 15 : 60;
    if (typeof score !== 'number' || score < 0 || score > maxScore) {
      return new Response(JSON.stringify({ error: 'Invalid score' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sanitizedEmail = sanitizeEmail(email);

    // Store submission
    await sql`
      INSERT INTO sovereignty_submissions (email, answers, score, type, version, submitted_at)
      VALUES (${sanitizedEmail}, ${JSON.stringify(answers)}, ${score}, ${assessmentType}, '1.0', NOW())
    `;

    // Compute rating
    const ratings = assessmentType === 'quick'
      ? ['Governance Absent', 'Governance Emerging', 'Governance Developing', 'Governance Structural']
      : ['Commons Failure', 'Nominal Governance', 'Partial Commons', 'Functional Commons', 'Sovereign Commons'];
    const thresholds = assessmentType === 'quick' ? [4, 8, 12] : [4, 9, 15, 20];
    let ratingIndex = 0;
    for (const t of thresholds) {
      if (score >= t) ratingIndex++;
    }
    const rating = ratings[ratingIndex];

    return new Response(JSON.stringify({ success: true, score, maxScore, rating, type: assessmentType }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
    });
  } catch (error) {
    return safeError(error, 'Sovereignty submission API error');
  }
};
