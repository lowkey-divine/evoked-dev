# Session 4: Content as Credibility

**Stardate:** 2026.037 (February 6, 2026)
**Participants:** Ensign Nog (Platform Strategy), Lingua (Language Voice), Codex (Documentation Voice)
**Focus:** Content strategy — bring writing home, build SEO, establish authority
**Facilitator:** Captain Sisko (observing)

---

## Opening

**Sisko:** *"The writing page sends visitors away. Substack, Medium, GitHub — all external. There's no content ON evoked.dev. No thought leadership. No SEO. No reason to return. I've asked you three to fix that."*

---

## Current State

### The Writing Page

```
/writing
├── "We Evoke" section → Substack, Medium buttons
├── "Code" section → GitHub button
└── Philosophy quote

Total content on evoked.dev: ~30 words
Searchable articles: 0
SEO value: Minimal
```

### The Problem

| Issue | Impact |
|-------|--------|
| No on-site content | No SEO, no searchability |
| External links only | Traffic leaves, may not return |
| No demonstrated expertise | Visitors trust claims, can't verify depth |
| No content library | Nothing to share, reference, or discover |

**Nog:** *"You're sending every visitor to someone else's platform. Substack gets the SEO. Medium gets the engagement. GitHub gets the credibility. evoked.dev gets... a menu."*

---

## Ensign Nog — Platform Strategy

*"I grew up on Deep Space Nine. I know how commerce works. Content is currency. You're giving yours away for free — to platforms that monetize it better than you do."*

### Platform Analysis

| Platform | Pros | Cons |
|----------|------|------|
| **Substack** | Newsletter infrastructure, audience | You don't own the relationship, SEO goes to Substack |
| **Medium** | Built-in audience, easy publishing | Algorithm controls visibility, content locked behind paywall |
| **GitHub** | Developer credibility, open source | Not discoverable by non-technical audience |
| **evoked.dev** | Full ownership, SEO, brand building | Requires content creation effort |

### Nog's Recommendation

**Don't abandon external platforms. Syndicate.**

```
Primary: evoked.dev/writing/[article-slug]
   ↓
Syndicate to: Substack (newsletter), Medium (reach), LinkedIn (professional)
   ↓
All link back to: evoked.dev
```

**The Pattern:**
1. Write on evoked.dev first (canonical URL)
2. Republish to Substack/Medium with "Originally published on evoked.dev" + link
3. Build email list via evoked.dev (you already have Buttondown)
4. External platforms become distribution, not home

### Content That Builds Authority

**For Consulting Credibility:**

| Topic | SEO Value | Authority Building |
|-------|-----------|-------------------|
| "What is COPPA and Why It Matters" | High | Establishes expertise |
| "5 Signs Your App Needs a Privacy Audit" | High | Attracts ideal clients |
| "Sovereignty-Honoring Design: A Primer" | Medium | Differentiates philosophy |
| "How We Built Age-Gating for Executive Chef" | Medium | Shows implementation depth |

**For Coaching Credibility:**

| Topic | SEO Value | Authority Building |
|-------|-----------|-------------------|
| "Coaching vs. Therapy: How to Know What You Need" | High | Clarifies offering |
| "What 'Hope with Teeth' Means" | Low | Deepens philosophy |
| "Accompaniment, Not Optimization" | Low | Attracts aligned clients |

**For Project Credibility:**

| Topic | SEO Value | Authority Building |
|-------|-----------|-------------------|
| "Why We Built a 48-Capability Permission System" | Medium | Shows depth of thinking |
| "Heritage Ontology: Making Space for What Software Can't Contain" | Low | Attracts mission-aligned interest |
| "The Kitchen Table: Rejecting Restaurant Hierarchy in Family Software" | Low | Tells the story |

---

## Lingua — Language & Expression

*"I am the voice of language. Every word shapes perception. Let me examine how the writing page speaks — and how it could speak better."*

### Current Voice Analysis

**What's There:**
```
"Helping families navigate a world that wasn't built for them —
and building something better."
```

This is good. It's clear, evocative, and mission-aligned.

**What's Missing:**

The page has *no content* to demonstrate this voice. It's a promise without proof.

### Voice Guidelines for evoked.dev Content

| Principle | Implementation |
|-----------|----------------|
| **Warm but grounded** | Write like you're explaining to a friend, not lecturing |
| **Specific over abstract** | "COPPA requires verifiable parental consent" > "Privacy matters" |
| **Honest about limitations** | "This is what I know. Here's what I'm still learning." |
| **Evocative, not extractive** | No clickbait, no manipulation, no false urgency |

### Lingua's Content Framework

**Article Structure for evoked.dev:**

```
Title: Clear, searchable, honest
Subtitle: The human hook

Opening: Why this matters (1-2 paragraphs)
Body: The substance (organized with headers)
Closing: What to do with this (action or reflection)

Optional: "If this resonates, here's how to go deeper"
```

**Example:**

```
Title: What is COPPA and Why Your Family App Needs It
Subtitle: A plain-language guide to child privacy law

Opening: If your app has users under 13, you're subject to COPPA...
Body: [Clear explanation with examples]
Closing: If you're unsure whether your app is compliant,
        I offer COPPA Technical Reviews...
```

**Lingua's Principle:** *"Write to clarify, not to impress. The goal is understanding, not admiration."*

---

## Codex — Documentation & Knowledge

*"I am the voice of documentation. Knowledge unwritten is knowledge lost. Let me propose a structure for the content library."*

### Proposed Content Architecture

```
evoked.dev/writing/
├── /coppa-guide                    # Pillar content
├── /sovereignty-honoring-design    # Philosophy piece
├── /coaching-vs-therapy            # Clarification
├── /heritage-ontology              # Deep dive
└── ... (more over time)

evoked.dev/writing/
├── index.astro                     # List of all articles
└── [slug].astro                    # Individual article pages
```

### Content Types

| Type | Purpose | Frequency |
|------|---------|-----------|
| **Pillar Content** | Comprehensive guides, SEO anchors | 1-2 per quarter |
| **Philosophy Pieces** | Explain the "why" | As needed |
| **Case Studies** | Show work in action | After projects complete |
| **Updates** | Project progress, announcements | Monthly-ish |

### Minimum Viable Content Library

**Codex's Recommendation — Start with 3-5 articles:**

| Article | Type | Priority |
|---------|------|----------|
| "What is COPPA?" | Pillar | P0 |
| "Coaching vs. Therapy" | Clarification | P0 |
| "Sovereignty-Honoring Design" | Philosophy | P1 |
| "Why 48 Capabilities?" | Deep dive | P2 |
| "The Heritage Ontology" | Philosophy | P2 |

### Implementation Options

**Option A: Simple (Astro Static)**
- Create `/writing/[slug].astro` pages manually
- Write in HTML/Astro components
- Simple, no dependencies

**Option B: Markdown Content (Astro Content Collections)**
- Write articles in Markdown
- Astro renders them automatically
- Easier to write, scales better

**Option C: External CMS (Later)**
- Sanity, Contentful, or Notion as CMS
- More complex, better for high volume
- Not needed yet

**Codex's Recommendation:** Start with **Option B** — Markdown with Astro Content Collections. It's the right balance of simplicity and scalability.

---

## Implementation Plan

### Phase 1: Infrastructure (This Session)

1. Set up Astro Content Collections for articles
2. Create `/writing/index.astro` as article listing
3. Create article template
4. Update navigation

### Phase 2: First Content (Next Session or Async)

1. Write "What is COPPA?" (pillar)
2. Write "Coaching vs. Therapy" (clarification)
3. Publish both on evoked.dev

### Phase 3: Syndication (Later)

1. Republish to Substack with canonical links
2. Share on LinkedIn
3. Build email list via Buttondown

---

## Proposed Writing Page Redesign

**Current:**
```
Writing
├── We Evoke → [Substack] [Medium]
├── Code → [GitHub]
└── Quote
```

**Proposed:**
```
Writing
├── Featured Articles (on-site content)
│   ├── Article 1
│   ├── Article 2
│   └── Article 3
├── Newsletter → [Subscribe via Buttondown]
├── Elsewhere → Substack, Medium, GitHub (secondary)
└── Quote
```

---

## Technical Implementation

### Astro Content Collections Setup

**1. Create content config:**

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const writing = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { writing };
```

**2. Create article directory:**

```
src/content/writing/
├── what-is-coppa.md
├── coaching-vs-therapy.md
└── ...
```

**3. Create listing page:**

```astro
// src/pages/writing/index.astro
---
import { getCollection } from 'astro:content';
const posts = await getCollection('writing', ({ data }) => !data.draft);
---
```

**4. Create article page:**

```astro
// src/pages/writing/[slug].astro
---
import { getCollection } from 'astro:content';
export async function getStaticPaths() {
  const posts = await getCollection('writing');
  return posts.map(post => ({ params: { slug: post.slug }, props: { post } }));
}
---
```

---

## Session Summary

**Nog:** *"Stop giving your content away. Syndicate, don't abandon. evoked.dev should be home."*

**Lingua:** *"Write to clarify, not to impress. The voice is already good — now give it substance."*

**Codex:** *"Start with 3-5 articles. Use Astro Content Collections. Build the library over time."*

**Sisko:** *"Let's build this infrastructure now. Content can come after — but the structure needs to exist first."*

---

## Decision Points for Erin

1. **Implement content infrastructure now?** (Astro Content Collections)
2. **Which articles to prioritize?** (COPPA? Coaching vs Therapy? Philosophy?)
3. **Keep external links on writing page or minimize them?**

---

**Session Complete**
**Stardate 2026.037**
