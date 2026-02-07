# Session 5: Ezri Ethical Review

**Stardate:** 2026.037 (February 6, 2026)
**Participants:** Jadzia Dax (Wisdom of Lifetimes), Ezri Dax (The Counselor), Accord (Psychology Voice)
**Focus:** Ethical review of the Ezri project page and positioning
**Facilitator:** Captain Picard (observing)

---

## Opening

**Picard:** *"Ezri is perhaps the most philosophically ambitious project on evoked.dev. A system for inner development, archetypes, shadow work. The risks here are not technical — they are ethical. I've asked you three to examine whether this page communicates appropriate humility, boundaries, and care."*

---

## Current State

### The Page

```
/projects/ezri
├── Hero: "A cosmos for your inner world"
├── Lead: "Reflection, not optimization. A mirror, not a map."
├── What It Is: Reflective inner-development engine
├── What It Is Not: Not therapy, productivity, social network
├── The Principle: "The system reflects. It does not direct."
└── "More soon."
```

### Strengths Identified

| Element | Assessment |
|---------|------------|
| "Reflection, not optimization" | Clear philosophical distinction |
| "Mirror, not map" | Honest about limitations |
| "What It Is Not" section | Proactive boundary-setting |
| "Does not promise healing" | Appropriately humble |
| "No gamified attention extraction" | Ethical commitment |

---

## Jadzia Dax — Wisdom of Lifetimes

*"I've lived nine lives. I know what it means to integrate parts of yourself that don't fit together. The question isn't whether Ezri can help people — it's whether it knows when to stop."*

### What Jadzia Sees

**The Good:**
The page correctly positions Ezri as reflective, not directive. This is crucial. Systems that promise transformation often become systems of control.

**The Concern:**
The language is *almost* too safe. It lists what Ezri is not — but doesn't fully articulate what engaging with archetypes and shadow *actually looks like*.

*"Engage with archetypes, ethics, and shadow in a safe, private space"* — this sounds profound, but what does it mean in practice?

### Jadzia's Questions

1. **What happens when shadow work surfaces something painful?** The page says "safe space" but doesn't acknowledge that reflection can be destabilizing.
2. **Who is this for?** The page speaks to everyone. But shadow work isn't for everyone — certainly not for people in active crisis.
3. **Where is the exit?** If someone needs more than reflection, where do they go?

### Jadzia's Recommendation

> Add a gentle acknowledgment that inner work can be difficult, and that Ezri is a companion to — not replacement for — professional support when needed.

---

## Ezri Dax — The Counselor

*"I became a counselor because I know what it's like to suddenly contain parts of yourself you didn't choose. If Ezri is named after me, it needs to honor the messiness of that journey."*

### What Ezri Sees

**The Good:**
The page refuses to promise outcomes. No "become your best self." No "unlock your potential." This is rare and important.

**The Concern:**
The features list feels... clinical.

- "Map your inner world symbolically and mathematically"
- "Grow toward post-conventional moral reasoning"

These are accurate descriptions. But they don't feel *human*. They don't acknowledge the confusion, the resistance, the moments where you want to close the app and never look at yourself again.

*"When I was suddenly joined, I didn't need a system. I needed someone who understood that I was falling apart. Ezri — the app — needs to know what falling apart looks like."*

### Ezri's Questions

1. **Does the system know when to be quiet?** Sometimes reflection isn't what someone needs. Sometimes they need to not think.
2. **Is there space for confusion?** The language implies clarity. But real inner work is often just sitting with not-knowing.
3. **What does "ethical" mean here?** The page mentions "ethics" twice but doesn't explain what ethical framework guides the system.

### Ezri's Recommendation

> Soften the features language. Acknowledge that inner work is non-linear, sometimes uncomfortable, and that Ezri holds space for uncertainty — not just clarity.

---

## Accord — Psychology Voice (USS Evoke)

*"I am the voice of relationship and psychological safety. Let me examine Ezri through the lens of harm prevention."*

### Risk Assessment

| Risk | Current Mitigation | Gap |
|------|-------------------|-----|
| **User destabilization** | "Not therapy" disclaimer | No guidance for when to seek help |
| **Spiritual bypassing** | "Not spiritual authority" | Could be clearer about shadow integration risks |
| **Parasocial attachment** | None stated | Users may over-rely on the system |
| **Crisis situations** | None stated | No crisis protocol or exit ramp |
| **Data sensitivity** | "Private space" mentioned | No privacy/data policy linked |

### Accord's Analysis

**The Boundary Problem:**
The page says Ezri is "not a mental health app" — but inner development, archetypes, and shadow work are *adjacent to* mental health. The boundary is appropriate, but the page doesn't acknowledge the adjacency.

Someone reading this might think: "This is safe for me." But for someone with unprocessed trauma, shadow work can be re-traumatizing.

**The Missing Acknowledgment:**
There's no statement that says: *"If at any point this process feels overwhelming, please pause and seek support."*

**The Privacy Question:**
If Ezri involves mapping one's inner world, that data is extraordinarily sensitive. The page should link to (or at minimum acknowledge) data practices.

### Accord's Recommendations

1. **Add a gentle caution** — Acknowledge that inner work can surface difficult material
2. **Provide an exit** — Link to crisis resources or professional support finder
3. **Clarify privacy** — Even a single line: "Your inner world belongs to you. We never share, sell, or analyze your data."
4. **Define "ethical"** — What ethical framework guides Ezri's design?

---

## Panel Discussion

**Jadzia:** *"The page is philosophically sound. But it's written for people who are already stable. What about people who aren't?"*

**Ezri:** *"I'd add warmth. Right now it reads like a manifesto. It could read like an invitation."*

**Accord:** *"The 'What It Is Not' section does heavy lifting. But absence of harm is not presence of care. The page needs to show that Ezri knows its limits."*

**Picard:** *"Agreed. The question is not whether Ezri can be built safely — it's whether this page communicates that safety to people who need to hear it."*

---

## Recommendations Summary

### P0 — Critical (Before Launch)

| Rec | Owner | Change |
|-----|-------|--------|
| **Add gentle caution** | Accord | Acknowledge inner work can surface difficult feelings |
| **Exit ramp** | Accord | Include "If you need support" language with link |
| **Privacy commitment** | Accord | One line on data sovereignty |

### P1 — Important (Before Wide Distribution)

| Rec | Owner | Change |
|-----|-------|--------|
| **Soften features language** | Ezri | Make it feel human, not clinical |
| **Acknowledge non-linearity** | Ezri | Inner work isn't always clarity — sometimes it's sitting with confusion |
| **Define ethical framework** | Jadzia | What does "ethical" mean for Ezri? |

### P2 — Refinement

| Rec | Owner | Change |
|-----|-------|--------|
| **Add target audience** | Jadzia | Who is this for? (Stable, curious, growth-oriented) |
| **Warmth in voice** | Ezri | Less manifesto, more invitation |

---

## Proposed Changes

### P0: Add Gentle Caution + Exit Ramp

**After "The Principle" section, add:**

```astro
<section class="container">
  <h2>A Note on Inner Work</h2>
  <p>
    Reflection can surface things that are tender, confusing, or difficult.
    This is part of the process — but it's not something to face alone.
  </p>
  <p>
    If at any point you feel overwhelmed, please pause.
    <a href="/resources" class="text-link">Here are some places to find support</a>.
  </p>
  <p class="privacy-note">
    <em>Your inner world belongs to you. Ezri is designed so your data stays private,
    unanalyzed, and never sold.</em>
  </p>
</section>
```

### P1: Soften Features Language

**Current:**
```
- Map your inner world symbolically and mathematically
- Engage with archetypes, ethics, and shadow in a safe, private space
- Encounter other perspectives without social comparison
- Grow toward post-conventional moral reasoning
```

**Proposed:**
```
- A private space to explore what's inside — without performance or judgment
- Archetypes, patterns, shadows — met at your pace, on your terms
- Other perspectives offered gently — no comparison, no competition
- Room to grow — not toward a destination, but into yourself
```

---

## Session Summary

**Jadzia:** *"The philosophy is sound. Add the edges — who this is for, what to do when it's hard."*

**Ezri:** *"Make it feel like someone cares. Right now it reads like a whitepaper. It should read like a hand extended."*

**Accord:** *"Harm prevention first. Add the caution, the exit, the privacy line. Then refine the voice."*

**Picard:** *"This project carries weight. The page should too — not in grandeur, but in care. Make the changes."*

---

## Decision Points for Erin

1. **Add "A Note on Inner Work" section with caution + exit ramp?**
2. **Soften the features language?**
3. **Create a `/resources` page for support links?** (Or link externally?)
4. **Add target audience clarity?** ("For people in a stable place, curious about growth")

---

**Session Complete**
**Stardate 2026.037**
