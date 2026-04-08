// Shared security middleware for API routes.
// Rate limiting, origin validation, and safe error responses.

const ALLOWED_ORIGINS = [
  'https://evoked.dev',
  'https://www.evoked.dev',
];

// Allow localhost in development
if (import.meta.env.DEV) {
  ALLOWED_ORIGINS.push('http://localhost:4321', 'http://localhost:4322', 'http://localhost:3000');
}

// --- Origin validation ---

export function validateOrigin(request: Request, requireOrigin: boolean = false): Response | null {
  const origin = request.headers.get('origin');

  // When requireOrigin is true, block requests without an Origin header.
  // This prevents direct curl/Postman calls to form endpoints.
  if (!origin) {
    if (requireOrigin) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return null;
  }

  if (!ALLOWED_ORIGINS.includes(origin)) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return null;
}

export function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('origin');
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
  }
  return {};
}

// --- Rate limiting (in-memory, per Vercel function instance) ---

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}, 60_000);

interface RateLimitConfig {
  windowMs: number;   // Time window in milliseconds
  maxRequests: number; // Max requests per window
}

const RATE_LIMITS: Record<string, RateLimitConfig> = {
  chat:          { windowMs: 60_000, maxRequests: 10 },   // 10 per minute
  assessFit:     { windowMs: 60_000, maxRequests: 5 },    // 5 per minute
  newsletter:    { windowMs: 60_000, maxRequests: 3 },    // 3 per minute
  buildWithUs:   { windowMs: 300_000, maxRequests: 1 },   // 1 per 5 minutes
  fitFollowup:   { windowMs: 60_000, maxRequests: 5 },    // 5 per minute
  challenge:     { windowMs: 60_000, maxRequests: 10 },   // 10 per minute (serves all forms)
  sovereignty:   { windowMs: 300_000, maxRequests: 3 },   // 3 per 5 minutes
};

function getClientIP(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

export function rateLimit(request: Request, endpoint: string): Response | null {
  const config = RATE_LIMITS[endpoint];
  if (!config) return null;

  const ip = getClientIP(request);
  const key = `${endpoint}:${ip}`;
  const now = Date.now();

  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + config.windowMs });
    return null;
  }

  entry.count++;

  if (entry.count > config.maxRequests) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return new Response(JSON.stringify({ error: 'Too many requests. Please try again shortly.' }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retryAfter),
      },
    });
  }

  return null;
}

// --- Safe error responses ---

export function safeError(error: unknown, context: string): Response {
  // Log the full error server-side
  console.error(`${context}:`, error);

  // Return generic message to client
  return new Response(JSON.stringify({ error: 'Something went wrong. Please try again.' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
  });
}
