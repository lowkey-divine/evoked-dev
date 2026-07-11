import { Resend } from 'resend';

let resendClient: Resend | null = null;

export function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = import.meta.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is required');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export const FROM_EMAIL = 'Evoked <noreply@evoked.dev>';

// Newsletter broadcasts send from Erin directly - no platform branding in the
// chain, and a distinct sender from the transactional FROM_EMAIL above so this
// never changes the sender of existing transactional mail. Requires evoked.dev
// to be a verified Resend sending domain.
export const NEWSLETTER_FROM = 'Erin Stanley <erin@evoked.dev>';
