# Security Posture — evoked.dev Product Pipeline

Last reviewed: 2026-02-22

## Data Flow

```
Customer → Stripe Checkout → Stripe Webhook → Vercel Serverless Function
                                                    ↓
                                              Resend Email API → Customer inbox
                                                    ↓
                                              Thank-you page → Static PDF download
```

### Customer Data Collected
- Email address (from Stripe checkout)
- Name (from Stripe checkout, optional)

### Where Customer Data Lives

| System | Data | Retention | Access |
|--------|------|-----------|--------|
| Stripe | Email, name, payment info | Stripe retention policy | Stripe Dashboard |
| Resend | Email (delivery logs) | Resend retention policy | Resend Dashboard |
| Vercel | Email, name (function logs) | 1 hour (free tier) | Vercel Dashboard |

No customer data is stored in our codebase, database, or filesystem.

## Secrets & Keys

| Secret | Location | Purpose |
|--------|----------|---------|
| STRIPE_SECRET_KEY | Vercel env vars | Stripe API access |
| STRIPE_WEBHOOK_SECRET | Vercel env vars | Webhook signature verification |
| RESEND_API_KEY | Vercel env vars | Email delivery |
| ANTHROPIC_API_KEY | Vercel env vars | Echo AI chat feature |

### Key Rotation Schedule
- Rotate all keys quarterly or immediately upon suspected compromise
- Stripe webhook secret: rotate via Stripe Dashboard > Webhooks > Signing secret
- Resend API key: rotate via Resend Dashboard > API Keys
- After rotation: update Vercel env vars, redeploy

## Account Security

All accounts in the deployment chain must have MFA enabled:

| Account | Service | MFA Status | Last Verified |
|---------|---------|------------|---------------|
| GitHub (erinstanley358) | Code hosting, auto-deploy | [ ] Verify | — |
| Vercel | Hosting, env vars, serverless | [ ] Verify | — |
| Stripe | Payments, webhook config | [ ] Verify | — |
| Resend | Email delivery | [ ] Verify | — |

Europa: check and fill in MFA status for each account before shipping.

## Webhook Security

- **Authentication:** Stripe signature verification on every request (HMAC-SHA256)
- **Idempotency:** In-memory Set tracks processed checkout session IDs. Limitation: resets on Vercel cold starts. Acceptable at current volume. Upgrade to KV store if duplicate deliveries are confirmed.
- **Unknown products:** Webhook returns 400 error if `product_slug` metadata is present but unrecognized. Falls back to default product only when metadata is entirely absent.
- **Error handling:** Email delivery failures return 500 to Stripe, triggering retry. Signature failures return 400.

## Accepted Risks

| Risk | Severity | Decision | Trigger to Revisit |
|------|----------|----------|---------------------|
| Public download URLs (no auth) | Low | Accepted — $49 PDFs, piracy cost < prevention cost | Higher price tier or volume |
| In-memory idempotency | Low | Accepted — warm-instance optimization at current volume | First confirmed duplicate |
| No rate limiting on webhook | Low | Accepted — Stripe signature check blocks unsigned requests | High volume or abuse detected |

## Incident Response

### Key Compromise
1. Immediately rotate the compromised key in the service dashboard
2. Update Vercel environment variables
3. Redeploy: `git push` triggers auto-deploy
4. Review access logs in the compromised service for unauthorized activity
5. If customer data was exposed: notify affected customers within 72 hours

### Webhook Failure
1. Check Vercel function logs for error details
2. Check Stripe Dashboard > Webhooks > Recent events for failed deliveries
3. Cross-reference with Resend Dashboard for email delivery status
4. Manually resend via Resend if customer was charged but not delivered

### Contacts
- Primary: Europa (evokesupports@icloud.com)
- Stripe support: dashboard.stripe.com/support
- Vercel support: vercel.com/support
- Resend support: resend.com/support
