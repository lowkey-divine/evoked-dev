import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { getResendClient, FROM_EMAIL } from '../../../lib/email/client';
import { sovereigntyToolkitEmail, SOVEREIGNTY_TOOLKIT_SUBJECT } from '../../../lib/email/sovereignty-toolkit';

export const prerender = false;

const DOWNLOAD_URL = 'https://evoked.dev/thank-you/sovereignty-toolkit';

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
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name;

    if (!customerEmail) {
      console.error('No customer email in checkout session:', session.id);
      return new Response(JSON.stringify({ error: 'No customer email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      const resend = getResendClient();
      await resend.emails.send({
        from: FROM_EMAIL,
        to: customerEmail,
        subject: SOVEREIGNTY_TOOLKIT_SUBJECT,
        html: sovereigntyToolkitEmail(DOWNLOAD_URL, customerName ?? undefined),
      });
      console.log('Delivery email sent to:', customerEmail, 'for session:', session.id);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('Failed to send email:', message);
      return new Response(JSON.stringify({ error: 'Email delivery failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // Acknowledge receipt — Stripe expects 200 for all handled events
  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
