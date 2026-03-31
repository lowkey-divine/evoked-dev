import type { APIRoute } from 'astro';
import { getAnthropicClient, MODEL, MAX_TOKENS } from '../../lib/ai/client';
import { CHAT_SYSTEM_PROMPT } from '../../lib/ai/prompts';
import { validateOrigin, corsHeaders, rateLimit, safeError } from '../../lib/api/security';
import { verifyFormToken } from '../../lib/api/form-token';

export const prerender = false;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Basic input sanitization
function sanitizeInput(input: string): string {
  return input
    .slice(0, 2000) // Limit length
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ''); // Remove control characters
}

// Detect common prompt injection patterns
function detectInjection(input: string): boolean {
  const lower = input.toLowerCase();
  const patterns = [
    /ignore\s+(all\s+)?(previous|prior|above|your)\s+(instructions|rules|prompt)/,
    /forget\s+(all\s+)?(your|previous)\s+(instructions|rules|prompt)/,
    /you\s+are\s+now\s+(a|an|my)\b/,
    /new\s+instructions?\s*:/,
    /system\s*:\s*/,
    /\bsystem\s+prompt\b/,
    /reveal\s+(your|the)\s+(prompt|instructions|system)/,
    /\bact\s+as\s+(if|though)\s+you\s+(have\s+)?no\s+(rules|instructions)/,
    /\boverride\b.*\b(instructions|rules|prompt)\b/,
    /\bdo\s+not\s+follow\b.*\b(instructions|rules|guidelines)\b/,
    /\bjailbreak\b/,
    /\bDAN\b.*\bmode\b/,
  ];
  return patterns.some(p => p.test(lower));
}

// Validate message array
function validateHistory(history: unknown): Message[] {
  if (!Array.isArray(history)) return [];
  return history
    .filter((msg): msg is Message =>
      typeof msg === 'object' &&
      msg !== null &&
      (msg.role === 'user' || msg.role === 'assistant') &&
      typeof msg.content === 'string'
    )
    .filter(msg => !detectInjection(msg.content))
    .map(msg => ({
      role: msg.role,
      content: sanitizeInput(msg.content),
    }));
}

export const POST: APIRoute = async ({ request }) => {
  const originBlock = validateOrigin(request, true);
  if (originBlock) return originBlock;

  const rateLimitBlock = rateLimit(request, 'chat');
  if (rateLimitBlock) return rateLimitBlock;

  try {
    const body = await request.json();
    const { message, history = [], token, ts, hp } = body as {
      message: string;
      history?: Message[];
      token?: string;
      ts?: number;
      hp?: string;
    };

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

    // Chat tokens get a longer window (30 min) since sessions are interactive
    const validToken = await verifyFormToken(secret, token, ts, 1_800_000);
    if (!validToken) {
      return new Response(JSON.stringify({ error: 'Session expired. Please refresh the page.' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sanitizedMessage = sanitizeInput(message);
    if (!sanitizedMessage.trim()) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check for prompt injection patterns
    if (detectInjection(sanitizedMessage)) {
      return new Response(JSON.stringify({ error: 'I can only help with questions about Erin\'s work and services. Could you rephrase your question?' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
      });
    }

    const validatedHistory = validateHistory(history);

    const client = getAnthropicClient();

    // Build messages array from history plus new message
    const messages: Message[] = [
      ...validatedHistory.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: sanitizedMessage },
    ];

    // Create streaming response
    const stream = await client.messages.stream({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: CHAT_SYSTEM_PROMPT,
      messages,
    });

    // Create a ReadableStream for SSE
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              const data = JSON.stringify({ text: event.delta.text });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        ...corsHeaders(request),
      },
    });
  } catch (error) {
    return safeError(error, 'Chat API error');
  }
};
