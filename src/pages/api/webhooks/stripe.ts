import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { getResendClient, FROM_EMAIL } from '../../../lib/email/client';
import { productDeliveryEmail } from '../../../lib/email/product-delivery';
import { getProductBySlug, getDefaultProduct } from '../../../lib/products/registry';

export const prerender = false;

// Idempotency: track processed checkout sessions to prevent duplicate deliveries on Stripe retries
const processedSessions = new Set<string>();

function getStripeClient(): Stripe {
  const key = import.meta.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY environment variable is required');
  }
  return new Stripe(key);
}

export const POST: APIRoute = async ({ request }) => {
  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return new Response(JSON.stringify({ error: 'Missing stripe-signature header' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured');
    return new Response(JSON.stringify({ error: 'Webhook not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Read raw body for signature verification
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    const stripe = getStripeClient();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', message);
    return new Response(JSON.stringify({ error: 'Invalid signature' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Idempotency check: skip if this session was already processed
    if (processedSessions.has(session.id)) {
      console.log('Duplicate webhook for session:', session.id, '— skipping');
      return new Response(JSON.stringify({ received: true, duplicate: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name;

    if (!customerEmail) {
      console.error('No customer email in checkout session:', session.id);
      return new Response(JSON.stringify({ error: 'No customer email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Route to correct product based on metadata, fallback to sovereignty toolkit
    const productSlug = session.metadata?.product_slug;
    const product = productSlug ? getProductBySlug(productSlug) : getDefaultProduct();

    if (!product) {
      console.error('Unknown product slug:', productSlug, 'for session:', session.id);
      return new Response(JSON.stringify({ error: 'Unknown product' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Processing order for product:', product.name, 'session:', session.id);

    try {
      const resend = getResendClient();
      await resend.emails.send({
        from: FROM_EMAIL,
        to: customerEmail,
        subject: product.emailSubject,
        html: productDeliveryEmail(product, customerName ?? undefined),
      });
      console.log('Delivery email sent to:', customerEmail, 'for product:', product.name);
      // Mark session as processed only after successful email delivery
      processedSessions.add(session.id);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('Failed to send email:', message);
      return new Response(JSON.stringify({ error: 'Email delivery failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Newsletter opt-in is handled via link in the delivery email.
    // Auto-subscribe was removed per TCC security review (sovereignty + GDPR compliance).
  }

  // Acknowledge receipt — Stripe expects 200 for all handled events
  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
