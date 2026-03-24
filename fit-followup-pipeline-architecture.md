# Fit Assessment Follow-Up Pipeline: Technical Architecture

**Date:** March 22, 2026
**Status:** Draft for Fleet Review
**Scope:** Architecture and flow only - no copy, messaging, or brand voice

---

## Current State

The `/fit` page is a single-page AI assessment. A visitor describes their project in free text (up to 5,000 characters), and Claude Haiku returns a structured evaluation:

- **fitLevel**: `strong`, `moderate`, `limited`, or `not-recommended`
- **score**: 1-10
- **summary**: one-sentence assessment
- **strengths**: alignment points
- **considerations**: questions or concerns
- **suggestedServices**: relevant offerings from the consulting menu
- **nextStep**: recommended action

After results display, the visitor sees two buttons: "Assess Another Project" and "Get in Touch" (a `mailto:` link). There is no email capture, no segmentation, no automated follow-up, and no connection to the existing Stripe payment links or intake forms.

The assessment data - including fit level, score, and suggested services - exists only in the browser and is lost when the visitor leaves the page.

### What Already Exists

| Capability | Tool | Status |
|---|---|---|
| Newsletter email list | Buttondown | Live |
| Transactional email | Resend | Live |
| Payment processing | Stripe payment links | Live (7 products) |
| Consulting intake | `/consulting-intake` form | Live |
| Coaching intake | `/coaching-intake` form | Live |
| Build submission | `/build-with-us` form | Live |
| Form security | HMAC challenge tokens, honeypot, rate limiting | Live |
| AI assessment | Claude Haiku via `/api/assess-fit` | Live |

---

## Architecture Overview

The pipeline adds three capabilities to the existing assessment: (1) optional email capture after results display, (2) server-side persistence of assessment + email, and (3) a single automated follow-up email routed by fit level.

```
[Visitor describes project]
        │
        ▼
[Claude Haiku assesses fit]
        │
        ▼
[Results display: fitLevel, score, suggestedServices, nextStep]
        │
        ▼
[Email capture form appears below results]  ◄── NEW
  "Want a copy of this assessment + relevant next steps?"
        │
        ▼
[POST /api/fit-followup]  ◄── NEW
  Receives: email, fitLevel, score, suggestedServices, projectDescription
  Does:
    1. Persists to lightweight store (see Storage section)
    2. Sends segmented follow-up email via Resend
    3. Optionally subscribes to Buttondown (if checkbox opted in)
        │
        ▼
[Visitor receives follow-up email]  ◄── NEW
  Content varies by fitLevel (see Segmentation Logic)
```

---

## 1. Email Capture Mechanism

### Where in the Flow

The email capture appears **after** results display, as an additional section below the existing result card. It does not gate the results - the visitor sees their full assessment first, then is offered the option to receive it by email with relevant next steps.

This placement matters. The assessment is the value. The email ask comes after value delivery, not before.

### Form Fields

- **Email address** (required) - validated client-side and server-side
- **Newsletter opt-in checkbox** (optional, unchecked by default) - `[NEEDS FLEET REVIEW: checkbox label copy]`
- **Honeypot field** (hidden) - matches existing anti-spam pattern

### Hidden Fields (passed from assessment result)

- `fitLevel` - from the assessment response
- `score` - from the assessment response
- `suggestedServices` - array from the assessment response
- `projectDescription` - the original input (or a hash of it, for privacy)

### Security

Follows the existing form security pattern already used across the site:

- HMAC-SHA256 challenge token from `/api/form/challenge` (10-minute expiry)
- Honeypot field - silent success if filled
- Origin validation (evoked.dev only)
- Rate limiting: 3 submissions per IP per hour
- Email normalization (lowercase, trimmed)
- No duplicate submissions for the same email + fitLevel within 24 hours

### Implementation Notes

The email capture UI is added to `FitAssessment.astro` inside the existing `#fit-result` div, appearing after the `result-actions` section. No new page or component needed - it extends the current results view.

```
src/components/ai/FitAssessment.astro  ◄── modify (add email form after results)
src/pages/api/fit-followup.ts          ◄── new endpoint
```

---

## 2. Segmentation Logic

The assessment already produces the data needed for segmentation. No additional AI call is required. Routing is a simple mapping from `fitLevel` to follow-up path.

### Segment Definitions

#### Segment A: Strong Fit (fitLevel = `strong`, score 7-10)

**Profile:** Teams building AI agents needing governance/specification, family apps needing COPPA, sensitive data products, sovereignty-honoring design.

**Follow-up email contains:**
- Their assessment summary, strengths, and considerations
- `[NEEDS FLEET REVIEW: framing copy for why this is a strong fit]`
- Direct links to the 1-2 most relevant Stripe product pages based on `suggestedServices` mapping (see Service-to-Product Map below)
- Link to the appropriate intake form:
  - If suggestedServices includes implementation-tier services → `/consulting-intake`
  - If suggestedServices includes workshops → `/consulting-intake`
  - If suggestedServices mentions "build" or app development → `/build-with-us`
- `[NEEDS FLEET REVIEW: CTA copy for booking]`

#### Segment B: Moderate Fit (fitLevel = `moderate`, score 4-6)

**Profile:** Teams strong at prompt craft but unsure about context/intent engineering, general privacy reviews, security audits.

**Follow-up email contains:**
- Their assessment summary, strengths, and considerations
- `[NEEDS FLEET REVIEW: framing copy for moderate fit - what would sharpen the fit]`
- Links to relevant self-serve products (typically Sovereignty Assessment Toolkit or Agent Governance Starter Kit)
- Link to `/consulting-intake` for a deeper conversation
- `[NEEDS FLEET REVIEW: CTA copy - softer than Segment A, more exploratory]`

#### Segment C: Limited Fit (fitLevel = `limited`, score 2-3)

**Profile:** Growth hacking, surveillance, extraction-focused, quick-fix seekers.

**Follow-up email contains:**
- Their assessment summary and considerations
- `[NEEDS FLEET REVIEW: honest, warm redirection copy - not a slam, but a clear "this isn't what we do"]`
- Link to one relevant article from `/writing` if applicable (manually curated mapping, not AI-selected)
- No product links, no intake form links
- Newsletter opt-in reminder if they didn't check the box

#### Segment D: Not Recommended (fitLevel = `not-recommended`, score 1)

**No follow-up email sent.** The on-page assessment result is sufficient. Sending email to someone whose project involves dark patterns or exploitation creates unnecessary engagement with misaligned work.

If they provided an email, it is stored for analytics purposes only (count of not-recommended assessments) but no email is sent and the address is not added to any list.

### Service-to-Product Mapping

The `suggestedServices` array from the assessment contains service names from the consulting menu. These map to self-serve products as a "start here" option before the full engagement:

| suggestedServices contains | Recommended Product(s) | Stripe Link Source |
|---|---|---|
| "Context Engineering Review" | Agent Memory Architecture Guide ($49) | `agent-memory-architecture-guide` |
| "Four-Discipline Audit" | Trust Architecture Complete ($149) | `trust-architecture-complete` |
| "Intent Engineering Workshop" | Agent Voice Architecture Guide ($49) | `agent-voice-architecture-guide` |
| "Specification Engineering Sprint" | Agent Restraint Specification ($49) | `agent-restraint-specification` |
| "Sovereignty Assessment Workshop" | Sovereignty Assessment Toolkit ($49) | `sovereignty-assessment-toolkit` |
| "COPPA Technical Review" | (no self-serve equivalent) | Link to `/consulting-intake` only |
| "Child Safety Implementation" | (no self-serve equivalent) | Link to `/consulting-intake` only |
| "Privacy Architecture Review" | Sovereignty Assessment Toolkit ($49) | `sovereignty-assessment-toolkit` |
| "Security Code Review" | (no self-serve equivalent) | Link to `/consulting-intake` only |
| "Ethical AI Architecture" | Trust Architecture Complete ($149) | `trust-architecture-complete` |
| "Advisory" | Trust Architecture Complete ($149) | `trust-architecture-complete` |
| Multiple matches | Show up to 2, prioritize the bundle | - |

This mapping lives in a config file (`src/lib/followup/service-product-map.ts`), not hardcoded in the email template, so it can be updated as products evolve.

---

## 3. Booking Path

There is no new booking infrastructure to build. The existing Stripe payment links and intake forms are the booking path. The follow-up email connects the visitor to the right one based on their assessment.

### Flow by Engagement Level

```
Self-Serve Products ($49-$149)
  Assessment result → Follow-up email → Stripe payment link → Stripe checkout →
  Webhook → Resend delivery email → Thank-you page
  (This entire flow already exists and is live.)

Consulting Engagements ($3,000-$20,000)
  Assessment result → Follow-up email → /consulting-intake →
  Claude Sonnet analysis → Email to Erin → Manual follow-up
  (This flow already exists. The pipeline just routes people to it.)

Build Projects (custom)
  Assessment result → Follow-up email → /build-with-us →
  Claude Sonnet analysis → Email to Erin → Manual follow-up
  (This flow already exists.)

Coaching
  Assessment result → Follow-up email → /coaching-intake →
  Claude Sonnet analysis → Email to Erin → Manual follow-up
  (This flow already exists. Only linked if suggestedServices hints at it.)
```

### What's New

The pipeline doesn't create new purchase or booking flows. It creates a bridge between the assessment (which currently dead-ends at a mailto link) and the existing flows. The follow-up email is that bridge.

---

## 4. Automation Tooling

### Stack (All Currently in Use)

| Layer | Tool | Role in Pipeline | Sovereignty Status |
|---|---|---|---|
| Email sending | **Resend** | Sends follow-up emails | API-based, no lock-in, data stays transient |
| Email list | **Buttondown** | Newsletter opt-in (if checked) | Independent, privacy-respecting, no tracking pixels by default |
| Payments | **Stripe** | Payment links in follow-up emails | Standard, no alternative needed |
| AI assessment | **Claude Haiku** | Already runs the assessment | Anthropic API, already integrated |
| Hosting | **Vercel** | Serverless function for `/api/fit-followup` | Already deployed here |
| Storage | See below | Persist assessment + email for analytics | - |

No new services are introduced. The pipeline uses Resend (already integrated for product delivery), Buttondown (already integrated for newsletter), and Stripe payment links (already live). The only new code is the `/api/fit-followup` endpoint and the email template.

### Storage Options

Assessment + email data needs lightweight persistence for two purposes: (1) deduplication (don't send the same person the same email twice in 24 hours), and (2) analytics (how many assessments convert to email capture, by segment).

**Option A: Vercel KV (Redis)**
- Pros: Already on Vercel, simple key-value, TTL support for deduplication
- Cons: Adds a Vercel dependency layer
- Implementation: `fit:{email}:{fitLevel}` key with 24h TTL for dedup. Increment counters for analytics.

**Option B: JSON file via Vercel Blob or local**
- Pros: No new service
- Cons: No TTL, manual cleanup, concurrency risk

**Option C: Buttondown tags as implicit storage**
- Pros: No new storage at all. When someone opts in to the newsletter, tag them with their fitLevel. Analytics come from Buttondown's subscriber tags.
- Cons: Only works for people who opt in to newsletter. Doesn't cover deduplication for non-subscribers.

**Recommendation: Option A (Vercel KV)** for deduplication, combined with **Option C (Buttondown tags)** for anyone who opts in. This keeps storage minimal and sovereignty-aligned - no user database, no CRM, no third-party analytics platform.

If Vercel KV feels like too much dependency, deduplication can be handled in-memory (matching the existing Stripe idempotency pattern in `webhooks/stripe.ts`) with the tradeoff that it resets on cold starts. For a low-traffic site, this is likely fine.

---

## 5. Email Template Architecture

### Template Structure

A single Resend email template with conditional sections based on `fitLevel`. This follows the same pattern as the existing product delivery emails in `src/lib/email/product-delivery.ts`.

```
src/lib/email/fit-followup.ts  ◄── new file
```

**Template sections:**

1. **Header** - `[NEEDS FLEET REVIEW: subject line per segment]`
2. **Assessment recap** - fitLevel badge, score, summary (pulled from stored data)
3. **Strengths** - from assessment (all segments except D)
4. **Considerations** - from assessment (all segments)
5. **Recommended products** - conditional, Segments A and B only, with Stripe payment links
6. **Next step CTA** - conditional by segment:
   - Segment A: intake form link + `[NEEDS FLEET REVIEW: CTA copy]`
   - Segment B: product link + intake form link + `[NEEDS FLEET REVIEW: CTA copy]`
   - Segment C: article link + `[NEEDS FLEET REVIEW: redirection copy]`
7. **Footer** - `[NEEDS FLEET REVIEW: closing copy]`

### Subject Lines

`[NEEDS FLEET REVIEW: all subject lines - these carry voice and must match Erin's tone]`

---

## 6. New Files Summary

| File | Type | Purpose |
|---|---|---|
| `src/pages/api/fit-followup.ts` | API route | Receives email + assessment data, sends follow-up, handles dedup |
| `src/lib/email/fit-followup.ts` | Library | Email template builder for segmented follow-up |
| `src/lib/followup/service-product-map.ts` | Config | Maps suggestedServices → product slugs for Stripe links |
| `src/components/ai/FitAssessment.astro` | Modified | Add email capture form below results |

### Files NOT Changed

- `/api/assess-fit.ts` - no changes to the assessment itself
- Product registry - no changes
- Stripe webhook - no changes
- Buttondown subscribe endpoint - reused as-is (called from `fit-followup.ts` if opt-in checked)

---

## 7. Privacy and Sovereignty Notes

- Email is captured only after value delivery (assessment results shown first)
- Newsletter opt-in is explicit, unchecked by default (matches existing post-purchase pattern - no auto-enrollment, per TCC security review)
- No tracking pixels in Resend emails (Buttondown already configured for no tracking)
- Assessment data stored minimally: email, fitLevel, score, timestamp. Project descriptions are NOT stored server-side (they contain potentially sensitive business information)
- Deduplication keys use email hash, not plaintext, if using Vercel KV
- Segment D (not-recommended) receives no email - respects the boundary
- No third-party analytics, no CRM, no retargeting
- Unsubscribe link in every email (Resend handles this)

---

## 8. Sequence Diagram

```
Visitor                    Browser                  /api/assess-fit       /api/fit-followup      Resend       Buttondown
  │                          │                          │                      │                   │              │
  ├─ Describes project ─────►│                          │                      │                   │              │
  │                          ├─ POST assessment ───────►│                      │                   │              │
  │                          │◄─ fitLevel, score, etc ──┤                      │                   │              │
  │◄─ Shows results ─────────┤                          │                      │                   │              │
  │                          │                          │                      │                   │              │
  │  (assessment data held in browser JS)               │                      │                   │              │
  │                          │                          │                      │                   │              │
  ├─ Enters email ──────────►│                          │                      │                   │              │
  ├─ [opt-in checkbox] ─────►│                          │                      │                   │              │
  │                          ├─ POST email + assessment ┼─────────────────────►│                   │              │
  │                          │                          │                      ├─ Send email ─────►│              │
  │                          │                          │                      │                   │              │
  │                          │                          │                      ├─ (if opted in) ───┼─────────────►│
  │                          │                          │                      │                   │   Subscribe  │
  │                          │◄─ success ───────────────┼──────────────────────┤                   │              │
  │◄─ "Check your inbox" ───┤                          │                      │                   │              │
  │                          │                          │                      │                   │              │
```

---

## 9. Open Questions for Fleet Review

1. **Email timing** - Send immediately after capture, or introduce a short delay (e.g., 5 minutes)? Immediate feels more natural for a "here's your assessment" email. A delay might feel more considered for the segmented recommendations.

2. **Assessment persistence** - Should the full assessment (strengths, considerations, etc.) be stored server-side for Erin's visibility, or only the segment metadata (email, fitLevel, score)? Storing the full assessment lets Erin see what kinds of projects are coming through. Not storing it keeps the data minimal.

3. **Repeat assessments** - If someone runs the assessment multiple times and provides their email each time, should they get multiple follow-up emails (one per assessment) or only the first? Current recommendation: one per email per 24 hours per fitLevel.

4. **Segment C article mapping** - The architecture suggests linking to a relevant article from `/writing` for limited-fit visitors. This mapping would need to be manually curated. Is this worth maintaining, or should Segment C emails omit article links entirely?

5. **Analytics visibility** - Where does Erin see pipeline metrics? Options range from Vercel KV dashboard (minimal), to a simple `/admin/fit-metrics` page (more work), to just relying on Resend's send logs + Buttondown subscriber tags (no new UI needed).

6. **All email copy, subject lines, and CTA text** - flagged throughout this document as `[NEEDS FLEET REVIEW]`. The architecture is ready to implement, but every piece of visitor-facing language needs to carry Erin's voice.
