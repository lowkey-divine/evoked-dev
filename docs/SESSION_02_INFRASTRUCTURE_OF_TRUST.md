# Session 2: The Infrastructure of Trust

**Stardate:** 2026.037 (February 6, 2026)
**Participants:** Quark (Commerce & Conversion), Miles O'Brien (Engineering), Praxis (Practice Voice)
**Focus:** Booking systems, waitlist capture, operational infrastructure
**Facilitator:** Captain Sisko (observing)

---

## Opening

**Sisko:** *"The philosophy is sound. The messaging is clear. But right now, the entire business runs on mailto links. That's not infrastructure — that's hope. I've asked you three to fix it."*

---

## Current State Audit

**O'Brien's Assessment:**

| Touchpoint | Current Implementation | Problem |
|------------|------------------------|---------|
| Consulting inquiry | `mailto:passionevoked@icloud.com?subject=Consulting Inquiry` | No tracking, no automation, relies on email |
| Coaching inquiry | `mailto:passionevoked@icloud.com?subject=Coaching Inquiry` | Same |
| "Book a Call" | mailto link | Says "book" but doesn't book anything |
| Executive Chef waitlist | mailto link | No list, no capture, no nurture |
| General contact | mailto link | Works, but no backup |

**O'Brien:** *"Every one of these is a manual process. Erin has to check email, respond, schedule back-and-forth, remember to follow up. That works for 5 clients. It doesn't work for 50."*

---

## Quark's Commerce Analysis

*"Let me be clear — I'm not here to turn this into a Ferengi trading post. But even ethical business needs infrastructure. You can't serve people you never hear from."*

**Conversion Points on the Site:**

| Page | CTA | Friction Level |
|------|-----|----------------|
| /coaching | "Inquire" → mailto | High |
| /consulting | "Book a Call" → mailto | High (misleading) |
| /consulting | "Check Project Fit" → /fit | Low (good!) |
| /projects/executive-chef | "Join Waitlist" → mailto | High |
| /about | "Say Hello" → mailto | Medium (appropriate for casual) |
| /ask | Echo chat | Low (excellent) |

**Quark's Observation:** *"The Fit Assessment is genius — it pre-qualifies leads AND provides value. But then you send them to a mailto? You had them. Now you might lose them."*

**The Mailto Problem:**
1. User has to open email client
2. User has to write something
3. User might get distracted
4. User might feel it's "too formal"
5. You have no record until they send
6. No automated follow-up

**Quark's Rule:** *"Every click away from your site is a chance to lose them. Booking should happen HERE."*

---

## Praxis Assessment

*"Practice is what we do repeatedly. The infrastructure should make good practice automatic."*

**Current Practice Gaps:**

| Practice | Current State | Ideal State |
|----------|---------------|-------------|
| Lead capture | Manual email check | Automatic notification + CRM entry |
| Scheduling | Email back-and-forth | Self-service booking |
| Follow-up | Manual memory | Automated reminder sequences |
| Waitlist | Nonexistent | Captured, segmented, nurtured |
| Client intake | Unknown | Structured form before first call |

**Praxis Principle:** *"If it requires memory, it will be forgotten. If it requires manual action, it will be delayed. Automate the mechanics so Erin can focus on presence."*

---

## The Infrastructure Plan

### Layer 1: Scheduling (P0)

**O'Brien's Recommendation: Cal.com**

| Option | Cost | Pros | Cons |
|--------|------|------|------|
| Calendly | Free-$12/mo | Popular, reliable | Less customizable, corporate feel |
| Cal.com | Free-$12/mo | Open source, customizable, privacy-friendly | Slightly less known |
| SavvyCal | $12-24/mo | Beautiful UX | Higher cost |
| Acuity | $16-45/mo | Full-featured | Expensive, complex |

**Recommendation:** Cal.com

*"It's open source, which aligns with the philosophy. It's privacy-friendly — no dark patterns. And it integrates with everything."*

**Implementation:**

```
1. Create Cal.com account
2. Set up event types:
   - "Discovery Call" (30 min, free) — for consulting inquiries
   - "Coaching Inquiry" (30 min, free) — for coaching inquiries
   - "Follow-up Session" (60 min) — for existing relationships
3. Connect to Google Calendar / iCloud Calendar
4. Embed or link on site
```

**Site Changes:**

| Current | New |
|---------|-----|
| `mailto:...?subject=Consulting Inquiry` | `https://cal.com/erin-stanley/discovery` |
| "Book a Call" | "Schedule a Call" (accurate language) |

---

### Layer 2: Waitlist Capture (P0)

**Quark's Recommendation: Simple Form → Email Service**

For Executive Chef waitlist, we need:
1. Capture email
2. Store it somewhere
3. Eventually notify them

**Options:**

| Service | Cost | Notes |
|---------|------|-------|
| Buttondown | Free-$9/mo | Simple, privacy-focused, markdown |
| ConvertKit | Free-$29/mo | More features, creator-focused |
| Mailchimp | Free-$13/mo | Popular but bloated |
| Loops | $49/mo | Modern, but pricey |
| Simple form → Airtable | Free | Manual but works |

**Recommendation:** Buttondown

*"Privacy-focused, simple, affordable. No dark patterns. Aligns with the philosophy. And it can send the eventual launch announcement."*

**Implementation:**

```
1. Create Buttondown account
2. Create "Executive Chef Waitlist" list
3. Get embed form code
4. Add to /projects/executive-chef page
5. Create simple welcome email: "You're on the list. We'll let you know when it's ready."
```

---

### Layer 3: Contact Form Backup (P1)

**O'Brien's Recommendation: Simple Contact Form**

For /about "Say Hello" — mailto is fine for casual contact. But a backup form catches people who don't want to open their email client.

**Options:**

| Service | Cost | Notes |
|---------|------|-------|
| Formspree | Free-$10/mo | Simple, reliable |
| Basin | Free-$8/mo | Clean, modern |
| Netlify Forms | Free with Netlify | Not applicable (Vercel) |
| Custom API route | Free | More control, more work |

**Recommendation:** Formspree (or simple custom form)

Could add a small form below the button:

```
Or leave a message:
[Name] [Email] [Message]
[Send]
```

**Priority:** P1 — Less urgent than scheduling and waitlist.

---

### Layer 4: Intake Forms (P2)

**Praxis Recommendation: Pre-call Intake**

Before a discovery call, capture:
- What they're looking for
- How they found evoked.dev
- Timeline/urgency
- Budget range (for consulting)

**Options:**

| Service | Cost | Notes |
|---------|------|-------|
| Tally | Free | Beautiful, privacy-friendly |
| Typeform | $25+/mo | Pretty but expensive |
| Google Forms | Free | Works, not pretty |
| Cal.com booking questions | Free | Built into scheduling |

**Recommendation:** Cal.com booking questions (built-in)

*"Cal.com lets you add questions to the booking flow. No extra tool needed."*

Example questions for Discovery Call:
1. "What brings you here today?" (text)
2. "How did you find evoked.dev?" (dropdown)
3. "Is there anything specific you'd like to discuss?" (text)

---

## Quark's Commerce Architecture

*"Here's how the conversion flow should work:"*

```
Visitor arrives
       │
       ├──→ Browses site
       │         │
       │         ├──→ Has question → Echo answers → Satisfied OR directed to call
       │         │
       │         ├──→ Interested in consulting
       │         │         │
       │         │         ├──→ /fit assessment → Gets fit score
       │         │         │         │
       │         │         │         └──→ "Schedule a Call" → Cal.com booking
       │         │         │
       │         │         └──→ Direct "Schedule a Call" → Cal.com booking
       │         │
       │         ├──→ Interested in coaching
       │         │         │
       │         │         └──→ "Schedule a Call" → Cal.com booking
       │         │
       │         └──→ Interested in Executive Chef
       │                   │
       │                   └──→ "Join Waitlist" → Buttondown form
       │
       └──→ Casual contact → "Say Hello" → mailto (fine) or form (backup)
```

**Quark's Summary:** *"Three tools. Cal.com for scheduling, Buttondown for waitlist, optionally Formspree for contact backup. That's it. No CRM yet — that's P2 when volume demands it."*

---

## Implementation Priority

### P0 — This Week

| Task | Tool | Pages Affected |
|------|------|----------------|
| Set up Cal.com | Cal.com | — |
| Create Discovery Call event | Cal.com | — |
| Create Coaching Inquiry event | Cal.com | — |
| Replace mailto on /consulting | Code edit | /consulting |
| Replace mailto on /coaching | Code edit | /coaching |
| Set up Buttondown | Buttondown | — |
| Create waitlist form | Buttondown | — |
| Add waitlist form to Executive Chef | Code edit | /projects/executive-chef |

### P1 — Next Week

| Task | Tool | Pages Affected |
|------|------|----------------|
| Add intake questions to Cal.com | Cal.com | — |
| Consider contact form backup | Formspree | /about |
| Add "How did you find us?" tracking | Cal.com | — |

### P2 — When Volume Demands

| Task | Tool | Notes |
|------|------|-------|
| CRM (Notion, Airtable, or similar) | TBD | When >20 active leads |
| Email sequences | Buttondown | Welcome sequence, nurture |
| Analytics on conversion | Vercel Analytics | Already recommended |

---

## Code Changes Required

**O'Brien's Implementation Notes:**

### /consulting.astro — Update CTAs

```html
<!-- Current -->
<a href="mailto:passionevoked@icloud.com?subject=Consulting Inquiry" class="btn btn-primary">Book a Call</a>

<!-- New -->
<a href="https://cal.com/YOUR_USERNAME/discovery" class="btn btn-primary" target="_blank" rel="noopener">Schedule a Call</a>
```

### /coaching.astro — Update CTA

```html
<!-- Current -->
<a href="mailto:passionevoked@icloud.com?subject=Coaching Inquiry" class="btn mt-md">Inquire</a>

<!-- New -->
<a href="https://cal.com/YOUR_USERNAME/coaching" class="btn mt-md" target="_blank" rel="noopener">Schedule a Conversation</a>
```

### /projects/executive-chef.astro — Add Waitlist Form

```html
<!-- Current -->
<a href="mailto:passionevoked@icloud.com?subject=Executive Chef Waitlist" class="btn mt-md">Join Waitlist</a>

<!-- New: Embedded Buttondown form -->
<form
  action="https://buttondown.email/api/emails/embed-subscribe/YOUR_USERNAME"
  method="post"
  target="popupwindow"
  class="waitlist-form"
>
  <input type="email" name="email" placeholder="your@email.com" required />
  <button type="submit" class="btn">Join Waitlist</button>
</form>
```

---

## Session Summary

**Quark:** *"Three tools. Cal.com, Buttondown, optionally Formspree. Total cost: $0-20/month. Return: every lead you're currently losing to mailto friction."*

**O'Brien:** *"I can have this running in an afternoon. The hardest part is Erin setting up the accounts and connecting calendars."*

**Praxis:** *"Once this is in place, the practice runs smoother. Erin focuses on presence, not logistics. That's the goal."*

**Sisko:** *"Do it. This station needs docking bays."*

---

## Action Items for Erin

1. **Create Cal.com account** — https://cal.com (free tier works)
2. **Create Buttondown account** — https://buttondown.email (free tier works)
3. **Share usernames/embed codes** — So we can update the site
4. **Connect calendar** — Google or iCloud to Cal.com
5. **Set availability** — When are discovery calls available?

Once those are ready, we implement the code changes.

---

**Session Complete**
**Stardate 2026.037**
