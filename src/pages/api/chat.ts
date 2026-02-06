import type { APIRoute } from 'astro';
import { getAnthropicClient, MODEL, MAX_TOKENS } from '../../lib/ai/client';
import { CHAT_SYSTEM_PROMPT } from '../../lib/ai/prompts';

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
    .map(msg => ({
      role: msg.role,
      content: sanitizeInput(msg.content),
    }));
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { message, history = [] } = body as { message: string; history?: Message[] };

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
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
