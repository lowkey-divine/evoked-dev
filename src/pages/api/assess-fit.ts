import type { APIRoute } from 'astro';
import { getAnthropicClient, MODEL, MAX_TOKENS } from '../../lib/ai/client';
import { FIT_ASSESSMENT_SYSTEM_PROMPT } from '../../lib/ai/prompts';

export const prerender = false;

interface FitAssessment {
  fitLevel: 'strong' | 'moderate' | 'limited' | 'not-recommended';
  score: number;
  summary: string;
  strengths: string[];
  considerations: string[];
  suggestedServices: string[];
  nextStep: string;
}

// Basic input sanitization
function sanitizeInput(input: string): string {
  return input
    .slice(0, 5000) // Limit length
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ''); // Remove control characters
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { projectDescription } = body as { projectDescription: string };

    if (!projectDescription || typeof projectDescription !== 'string') {
      return new Response(JSON.stringify({ error: 'Project description is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sanitizedDescription = sanitizeInput(projectDescription);

    if (!sanitizedDescription.trim()) {
      return new Response(JSON.stringify({ error: 'Project description is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (sanitizedDescription.length > 5000) {
      return new Response(JSON.stringify({ error: 'Project description too long (max 5000 characters)' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const client = getAnthropicClient();

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: FIT_ASSESSMENT_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Please assess the fit for this project:\n\n${sanitizedDescription}`,
        },
      ],
    });

    // Extract text from response
    const textBlock = response.content.find((block) => block.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      throw new Error('No text response from AI');
    }

    // Parse the JSON response
    const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse assessment response');
    }

    const assessment: FitAssessment = JSON.parse(jsonMatch[0]);

    // Validate the response structure
    if (!assessment.fitLevel || !assessment.summary) {
      throw new Error('Invalid assessment structure');
    }

    return new Response(JSON.stringify(assessment), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Fit assessment API error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
