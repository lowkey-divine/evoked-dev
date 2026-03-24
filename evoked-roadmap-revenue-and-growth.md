# evoked.dev — Revenue & Growth Roadmap

**Prepared**: March 22, 2026
**Current state**: $0 revenue, Stripe connected, no growth tracking

---

## 1. What evoked.dev Is

evoked.dev is Erin Stanley's consulting and product practice at the intersection of AI agent governance and human-centered coaching. It operates across four lines:

- **AI Agent Consulting** — Governance audits, specification engineering, advisory retainers ($3K–$150K engagements)
- **Governance Frameworks** — Digital products like the Sovereignty Assessment Toolkit, Trust Architecture Blueprint, and bundled kits ($49–$149)
- **Life Coaching** — Depth-oriented individual and couples work
- **Bot Authority** — An open standard and registry for verifying AI agent governance (free tier exists, paid tiers coming)

The site also runs an AI chat assistant at /ask (powered by Claude Haiku), a Fit Assessment at /fit, a 5-question diagnostic tool, and publishes long-form writing on AI governance and sovereignty.

The core positioning - "evoke, never extract" - is distinctive and well-articulated. The service ladder from free assessment to six-figure implementation contracts is already designed. The gap is activation: turning the architecture into revenue.

---

## 2. Revenue Strategy

### What to sell first (path of least resistance)

**A. Digital products through Stripe — this week**

The governance frameworks ($49 each, $149 bundle) are the fastest path to first revenue. They're already built. What's missing is a purchase flow.

Action steps:
1. Create Stripe Products and Price objects for each framework and the bundle
2. Use Stripe Payment Links (no code required) to generate buy URLs
3. Add purchase buttons to the existing product pages on evoked.dev
4. Set up Stripe to deliver the files via email after payment (or use a simple webhook to Resend, which is already in the stack)

This can be live within a day. Even $49/month in digital product sales changes the psychology from "$0 revenue" to "revenue-generating business."

**B. Fit Assessment → paid audit pipeline — this month**

The /fit assessment already qualifies leads. Right now it's a dead end. Turn it into a funnel:

1. After someone completes /fit, send a follow-up email (via Resend) with their results and a clear next step: "Book a 30-minute scope call" or "Here's what a governance audit would look like for your situation"
2. Use Calendly or Cal.com for scheduling (free tier is fine)
3. Scope the entry-level audit at $3,000 and make that the default "what happens next" after a fit assessment
4. Accept deposits through Stripe (50% upfront is standard for consulting)

**C. The 5-question diagnostic as a lead magnet — this month**

The diagnostic tool is already built and takes 30 seconds. Use it as top-of-funnel:

1. Gate the detailed results behind an email address
2. Add the diagnostic link to every article footer and social post
3. Nurture sequence: diagnostic → fit assessment → scope call → audit

**D. Writing as a sales channel, not just publishing**

The 14 published articles are strong and cover topics where organizations are actively spending money (COPPA compliance, agent governance, trust architecture). Each article should end with a specific CTA tied to the relevant service, not a generic "contact me."

Examples:
- COPPA article → links to COPPA Technical Review service
- Agent governance articles → links to Agent Governance Audit
- Trust architecture articles → links to Trust Architecture Workshop

### Pricing validation

The current pricing structure is sound for the market:

| Tier | Price Range | Notes |
|------|------------|-------|
| Digital products | $49–$149 | Good for the governance/compliance niche. Could test $199 for the bundle. |
| Governance audits | $3,000–$7,500 | Competitive. Position the $3K as "starter audit" with clear scope. |
| Implementation | $5,000–$150,000 | Wide range is fine — scope-dependent. Lead with $5K–$15K engagements first. |
| Advisory retainers | $5,000–$15,000/mo | Strong. Even one retainer client changes everything. |

**Don't discount.** The governance space is early enough that being premium signals credibility. Organizations paying for AI governance audits have budget.

### Revenue targets to aim for

- **Month 1**: $149–$500 (digital product sales, proves the flow works)
- **Month 3**: $3,000–$7,500 (first paid audit)
- **Month 6**: $5,000–$15,000/mo (one retainer client + ongoing product sales)
- **Year 1**: $60K–$120K run rate (mix of audits, retainers, products)

---

## 3. Growth Measurement

### Metrics that matter (in priority order)

**Revenue metrics (Stripe gives you these already):**
- Monthly Recurring Revenue (MRR) — retainers + any subscription products
- Total revenue per month
- Revenue by product/service line
- Average deal size for consulting engagements

**Pipeline metrics (need to set up):**
- Fit assessments completed per week
- Diagnostic completions per week
- Email list size and growth rate
- Scope calls booked per month
- Conversion rate: fit assessment → scope call → paid engagement

**Content metrics (lightweight tracking):**
- Page views on articles (which topics drive traffic?)
- /ask chat sessions per week (are people engaging?)
- Referral sources (where do visitors come from?)

### How to set this up simply

**Analytics — add Plausible or Fathom (privacy-respecting, fits the brand)**

Both are paid but affordable ($9/mo for Plausible, $14/mo for Fathom). They align with evoked.dev's sovereignty-first ethos better than Google Analytics. One script tag in the Astro layout and you're tracking page views, referrers, and basic funnels.

Setup:
1. Sign up for Plausible (plausible.io) — $9/mo, privacy-first, no cookies
2. Add the script tag to your Astro base layout
3. Set up custom events for: diagnostic completion, fit assessment completion, Stripe checkout initiated
4. Create a simple dashboard with weekly review cadence

**Stripe Dashboard — already available**

Stripe's built-in dashboard shows revenue, customers, and payment trends. For the first 6 months, this is sufficient for revenue tracking. No need for a separate financial dashboard yet.

**Email tracking — use Buttondown's built-in analytics**

Buttondown (already in the stack) tracks open rates and click rates. Monitor which topics drive engagement and use that to prioritize consulting positioning.

**CRM — don't buy one yet**

At $0 revenue with a consulting practice, a spreadsheet or Notion database is fine. Track: name, company, how they found you, where they are in the pipeline, deal value, status. Move to a real CRM only when you're consistently doing 5+ scope calls per month.

**Weekly review ritual (15 minutes):**
1. Check Stripe dashboard — any sales?
2. Check Plausible — traffic trends, top pages, referral sources
3. Check email — new fit assessments or diagnostic completions?
4. Update pipeline spreadsheet
5. Decide: what one thing moves revenue forward this week?

---

## 4. Quick Wins vs. Longer-Term Plays

### Quick wins (next 1–2 weeks)

1. **Stripe Payment Links for digital products** — Can be done today. Create payment links, add buy buttons to the site. First revenue becomes possible immediately.

2. **Add CTAs to every article** — Each of the 14 articles should end with a specific, relevant next step. Takes an afternoon.

3. **Email capture on the diagnostic** — Gate detailed results behind email. Instantly starts building a list of qualified leads.

4. **Fit assessment follow-up email** — Automate a response when someone completes /fit. Even a simple "here's what I'd recommend as a next step" email closes the loop.

5. **Add Plausible analytics** — One script tag, 10 minutes, and you have visibility into what's actually happening on the site.

### Medium-term plays (1–3 months)

6. **Publish a "State of Agent Governance" piece** — Erin has the depth of knowledge. A definitive, data-backed piece on where agent governance stands in 2026 could drive significant organic traffic and position evoked.dev as the authority.

7. **Launch a free email course** — "5 Days to Agent Governance Basics" or similar. Repurpose existing article content into a drip sequence. Feeds the diagnostic → fit assessment → audit pipeline.

8. **Bot Authority Tier 2 pricing** — The open standard is a credibility play. Once Tier 2 (Governance Validated) launches, it becomes a recurring revenue product for organizations that want the validation badge.

9. **Case study from a real engagement** — Even a disguised/anonymized case study of a governance audit dramatically increases conversion on consulting services. "Here's what we found and fixed" is more persuasive than any framework description.

10. **Guest appearances and content partnerships** — AI governance is a hot topic. Podcasts, guest posts on AI/tech publications, and conference talks are high-leverage for a solo consulting practice.

### Longer-term plays (3–12 months)

11. **Executive Chef launch** — The family meal planning product is in development. This is a completely different market and audience. Don't let it distract from the governance consulting revenue engine, but it could become a meaningful second revenue line.

12. **Bot Authority as a platform** — If the open standard gains adoption, the registry itself becomes valuable. Tier 3 attestation (planned for 2027) could be a significant revenue stream if enough organizations want third-party validation of their agent governance.

13. **Group programs or cohorts** — A "Governance for AI Teams" cohort (4–6 weeks, $1,500–$3,000 per seat, 10–15 participants) fills the gap between $149 digital products and $3,000+ audits. This is where the coaching background becomes a differentiator.

14. **Productized audit** — A standardized, repeatable governance audit with templated deliverables at a fixed price ($3,000). Reduces scope creep, makes it easier to sell, and eventually could be partially automated with AI tooling.

---

## 5. The One Thing That Matters Most Right Now

Everything above is secondary to this: **get the first paying customer.**

The entire product suite, service ladder, and content library is built for a business that doesn't yet have revenue. The most important thing isn't optimizing - it's activating. Stripe Payment Links on the digital products and a follow-up flow on the fit assessment are the two moves that turn the architecture into a business.

The governance frameworks are priced accessibly enough that organic traffic from the existing articles could generate sales with zero additional marketing. The fit assessment is already qualifying potential consulting clients. The only missing piece is asking for money.

Start there. Everything else follows.
