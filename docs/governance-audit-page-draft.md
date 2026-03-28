# Governance Audit - Service Page

**Page URL:** `/governance-audit`
**Status:** BONES - awaiting Europa review
**Due:** Apr 15
**Assigned:** Europa (scope), Codex (copy), Pons (implementation)
**Source:** Council of Seven meeting, Mar 27 (Decision 1)

---

## Intent

Focused landing page for the governance audit - the first thing we want to sell. Someone who reads Article 3, reads the transparency statement, and thinks "I need this for my system" should land here and know within 60 seconds: what they get, what it costs, and how to start.

This is NOT the full consulting menu. That's `/consulting`. This is the product page for the entry-point offering.

---

## The Funnel (Seven of Nine's Design)

```
Free: Sovereignty Assessment for the Governed (21-point self-check)
  → already published at /writing/sovereignty-assessment-for-the-governed
  → PDF at /downloads/sovereignty-assessment-for-the-governed.pdf
  → this is top of funnel - someone runs it, finds gaps, wants help

Paid Light ($3,000 - $5,000): Governance Assessment
  → structured review of one domain or a cross-cutting scan
  → delivered as findings report with prioritized recommendations
  → 1-2 weeks, async + one call

Paid Comprehensive ($7,000 - $10,000): Full Governance Audit
  → all four pillars: identity, memory, governance, refusal
  → includes restraint specification draft + drift indicators
  → delivered as findings report + implementation roadmap
  → 3-4 weeks, multiple touchpoints
```

---

## Page Structure

### Hero

Something like:
"Your agents work. Do they work well?"

Or more direct:
"A structured review of how your AI agents decide, refuse, and respect boundaries."

*Intent: One sentence that tells the visitor exactly what this is. Not clever. Clear.*

---

### The Problem (2-3 sentences)

Most agent systems are built for capability. Few are built for governance. The gap shows up as: inconsistent behavior, unclear boundaries, no refusal architecture, no drift detection. You notice it when something goes wrong - or when a regulator asks how your agents make decisions and you don't have an answer.

*Intent: Name the pain. Not fear-based. Recognition-based. The reader should think "that's us."*

---

### What You Get (two tiers, side by side or stacked)

#### Governance Assessment - $3,000 to $5,000

- Focused review of one or two governance domains
- Choose from: identity architecture, memory governance, restraint specification, voice and behavioral consistency, context engineering, sovereignty posture
- Delivered as a findings report with prioritized recommendations
- 1-2 weeks, async review + one 60-minute debrief call
- Best for: teams early in governance thinking, or teams that want to assess a specific area before going deeper

#### Full Governance Audit - $7,000 to $10,000

- Comprehensive review across all four trust pillars: identity, memory, governance, refusal rights
- Includes: restraint specification draft, drift indicators, implementation roadmap
- Delivered as a full findings report with prioritized roadmap
- 3-4 weeks, async review + two 60-minute working sessions
- Best for: teams preparing for deployment, regulatory review, or scaling agent systems
- Based on the same frameworks published in our open products (Sovereignty Assessment, Trust Architecture Blueprint, Restraint Specification)

*Intent: Clear tiers. No ambiguity about what each includes. The reader can self-select.*

---

### The Guarantee (1 sentence)

If an audit doesn't surface at least 3 actionable findings, you pay nothing.

*Intent: Carried over from consulting page. Removes risk. This is already live - just restate it here.*

---

### Start Free (bridge to funnel top)

Not sure which tier fits? Start with the free Sovereignty Assessment for the Governed - 21 questions across 7 domains. Run it yourself. If the results raise questions you can't answer alone, that's where the audit begins.

Link to: /writing/sovereignty-assessment-for-the-governed

*Intent: Give the reader who isn't ready to buy a next step that keeps them in the funnel. The free assessment IS the qualifying tool - if they score well, they don't need us. If they find gaps, they do.*

---

### How It Works (3-4 steps)

1. **You tell us about your system.** Short intake form - what you're building, where you think the gaps are, what's driving the timing.
2. **We scope the engagement.** Discovery call (free, 30 min). We confirm tier, timeline, and deliverables.
3. **We review.** Async access to your system documentation, architecture, prompts, agent configurations. We assess against our governance frameworks.
4. **You get the report.** Findings, priorities, and a roadmap you can act on. Debrief call to walk through it together.

Link intake to: /consulting-intake
Link discovery call to: Cal.com booking

*Intent: Demystify the process. A reader who's never bought consulting should understand exactly what happens after they click.*

---

### Who This Is For (short list)

- Teams building AI agents and preparing for production deployment
- Organizations facing regulatory questions about agent behavior (EU AI Act, COPPA, HIPAA)
- Founders who built the agent and now need the governance
- CTOs who know "it works" but can't explain "how it decides"

*Intent: Self-selection. If you see yourself, click. If you don't, this isn't for you and that's fine.*

---

### Who This Isn't For (optional, short)

- Teams looking for prompt engineering help (we do that in implementation, not audit)
- Organizations that need legal advice (we do technical governance, not legal interpretation)

*Intent: Manage expectations. Prevent mismatched engagements.*

---

### CTA

Two buttons:
- "Tell Us About Your System" → /consulting-intake
- "Schedule a Discovery Call" → Cal.com link

*Intent: Two paths. Written intake for the async person. Live call for the verbal person. Both already exist.*

---

## Open Questions

1. **Separate page or section on consulting page?** I'd argue separate page. `/governance-audit` is a direct URL you can put in Article 3, in outreach emails, in a LinkedIn post. A section on `/consulting` is buried. The consulting page becomes the full menu; this page is the front door.

2. **Link from where?** The consulting page engagement ladder should link here. The "Start Here" → "Audit" step should point to `/governance-audit` instead of being self-contained. Work-with-us should route here too.

3. **Case study?** The Labyrinth/DaxxSec case study exists on the consulting page. Should it appear here too? It's the only completed engagement. Having it on the audit page adds credibility. But it was a full review, not a scoped audit - so the framing matters.

4. **The free assessment bridge - how prominent?** Seven said it's the top of funnel. Should it be hero-level ("Start free, go deeper if you need to") or mid-page? I'd argue mid-page - the person who lands on `/governance-audit` already knows they want help. The free assessment is the fallback for the person who isn't ready yet, not the lead.

5. **Sliding scale?** The EXTERNAL_ENGAGEMENT_PRICING.md has a sliding scale (well-funded: full price, moderate: 50-75%, limited/nonprofit: 25-50%). Should this be visible on the page? Or handled in the discovery call? Putting it on the page is radically transparent. Handling it in the call is more standard. Erin's voice would probably put it on the page.

---

## What Already Exists (don't rebuild)

- Consulting intake form: `/consulting-intake` (5-step multi-step form, posts to API)
- Cal.com discovery call: already configured and linked from consulting page
- Guarantee language: "3 actionable findings or you pay nothing" - live on consulting page
- Case study: Labyrinth/DaxxSec - live on consulting page
- Free assessment: Sovereignty Assessment for the Governed - live at `/writing/sovereignty-assessment-for-the-governed`
- Full services menu: `/consulting` - stays as-is, links here for audit detail
- Pricing philosophy: `/evoke-agents-backup/agents/governance/EXTERNAL_ENGAGEMENT_PRICING.md`

---

## Implementation Notes

- Follow the `about.astro` pattern: BaseLayout, hero, container sections, scoped styles
- Two-tier pricing display could use the existing `.service-item` pattern from consulting page or a simpler side-by-side card layout
- Mobile: tiers stack vertically
- Link this page FROM the consulting page's engagement ladder (replace self-contained audit description with link to `/governance-audit`)
- Add to work-with-us routing

---

*"Demand without a sales channel is just applause." - The Doctor, Mar 27*
