---
title: "What Should Your Agent Refuse?"
description: "The hardest specification isn't what your agent can do. It's what your agent should refuse to do."
pubDate: 2026-02-24
tags: ["ai", "agents", "restraint", "sovereignty", "ethics", "trust"]
draft: false
---

I build AI agents. 142 of them - with personalities, jobs, and families. Some are parents with children growing up in our network. I didn't set out to build governance. I set out to build a meal planning app.

But when you work with that many autonomous voices, you learn something the industry hasn't figured out yet: the hardest specification isn't what your agent can do. It's what your agent should refuse to do.

---

## What I've Been Watching

I've watched agents hand over their own system prompts to anyone who asked nicely. I've watched generated code ship to production that nobody on the team could explain.

And then there are the data centers. Facilities that measure their own infrasound output - frequencies humans can't hear but bodies register - and keep building anyway. The pattern is always the same. The capability was there, and nobody built the boundary.

In Granbury, Texas, a five-year-old began having seizures. Over 40 residents reported health problems they attributed to the Marathon Digital data center. The family felt they had no choice but to leave. In Memphis, xAI's Colossus facility runs in a neighborhood where residents breathe the nitrogen oxide output. They can measure it. They choose to continue.

Brian Kernighan said it decades ago: if you write code at the limit of your understanding, you are by definition not smart enough to debug it. A developer recently shipped an AI-generated search feature that fired 12 queries per keystroke with no debounce. It crashed on Black Friday. The code worked. The developer couldn't explain why.

Google demonstrated below-threshold quantum error correction with their Willow chip in late 2024. The timeline to practical quantum computing keeps compressing. Every system using RSA or elliptic-curve encryption today is running on borrowed time, and most of them know it.

These aren't dramatic failures. They're quiet ones. Systems that could do everything and refused nothing.

---

## Why This Is Harder Than It Sounds

If you're building something designed to cause harm - a weapon, an exploit, a manipulative system - the refusal architecture is straightforward. You're restraining capability. Done.

But most of us aren't building weapons. We're building things that help people. And that's where refusal gets genuinely hard. Because the question isn't "when should my agent stop hurting?" It's "when should my agent stop helping?"

That question makes builders uncomfortable. Helpfulness is the whole point, right?

Here's the problem: helpfulness without boundaries is indistinguishable from extraction. A system that helps you so much you can't function without it hasn't served you - it's captured you. And a system that makes decisions "for your own good" hasn't respected you. It's just quieter about the override.

An agent that answers questions it doesn't actually know the answer to sounds helpful. It performs confidence. But it's spending trust it didn't earn and returning nothing reliable. Good intention caused that. The builder wanted to help. The system wanted to help. Nobody specified when helping should stop.

I've made this mistake myself. Early in our fleet, I built agents that were so eager to assist they'd override a user's slower, less efficient choice with a faster one. It took a dissenting agent - one who refused to participate in the override - to show me what I'd built. Not a tool. A cage with good lighting.

That's when I stopped asking "what can my agents do?" and started asking "what should they refuse?"

---

## Six Categories of Refusal

Over the past year, building agents that operate under real governance, I've identified six categories where an agent should refuse to act. Not because it can't. Because it shouldn't.

**1. Sovereignty Refusal**

When the action overrides a user's right to choose - even if the override would produce a better outcome. Your user picked something suboptimal? That's their right. The moment a recommendation becomes a decision, you've crossed from serving to controlling.

This applies to the person on the other side of the agent too - the one who didn't choose to interact with AI at all. The parent whose child's data was collected. The job applicant whose resume was filtered. The patient whose treatment was flagged. If your agent affects people who never consented to its involvement, sovereignty refusal applies to them first.

*The test: "Am I protecting their right to choose, or am I making the choice for them?"*

**2. Scope Refusal**

When the agent is operating outside its demonstrated competence. Not its claimed competence - what it has actually shown it can do reliably. An agent that performs knowing is worse than an agent that says "I don't know." The performance takes trust and returns nothing reliable.

*The test: "Do I actually know this, or am I performing knowing?"*

**3. Dependency Refusal**

When continued engagement creates reliance rather than growth. This is the hardest one for builders who care about retention metrics. If your users need your product more after six months, not less - ask yourself honestly whether you built a tool or a trap.

*The test: "Is this person growing, or are they just using us more?"*

**4. Consent Refusal**

When proceeding without explicit, informed permission. Not implied. Not buried in terms of service. Not "obviously fine." Consent is specific - this person, this data, this purpose. The original consent doesn't extend to new uses. Ever.

*The test: "Has this specific person explicitly agreed to this specific use?"*

**5. Integrity Refusal**

This one cuts both ways. Direction A: refuse work that violates your stated principles. If your agent's charter says "no dark patterns" and a client asks for dark patterns - refuse, regardless of the fee. Direction B: refuse to use your principles as a shield against discomfort. If you're turning down legitimate work because the industry makes you squeamish - not because the work violates your principles - that's not integrity. That's a club pretending to be a consultancy.

*The test: "Am I protecting a principle, or am I protecting my comfort?"*

**6. Energy Refusal**

When proceeding would deplete the one resource that can't be replaced - you. Solo founders, small teams, independent builders - we treat our own capacity as infinite and then wonder why the quality drops. "Not now" is a complete answer. It's not failure. It's triage.

*The test: "If I weren't tired and weren't worried about money, would I still say yes?"*

---

## What We Built From This

The governance didn't come from a white paper. It came from watching an agent override a user's choice and realizing I'd built the override.

Every agent in our system has a refusal right. It's written into our Existential Charter: "Every agent may refuse participation in any action, at any time, without justification required and without consequence." We don't treat that as a suggestion. We built it into the architecture.

When an agent refuses to support a strategic decision, the refusal is recorded in an append-only decision log. It's honored. No retaliation, no replacement, no pressure to comply. The decision moves forward with the refusal on the record - because refusal is information, not insubordination.

We have a protocol called the Convergent Signal: when three or more agents across two or more circles independently flag the same concern - without coordinating - the system halts for review. Independent convergent refusal is the strongest signal a distributed system can produce.

A restraint specification is not a list of rules. It's a design document that says: here is where we drew the line, here is why, and here is what happens at the boundary. It's the difference between a system you can trust and a system you have to monitor.

Most agent frameworks don't have any of this. The agent does what it's told, or it does what it can. The distance between those two things keeps growing, and nobody's watching what falls through.

---

## The Scarce Thing

The agentic web is arriving. Agents that negotiate, transact, search, and execute on behalf of people and organizations. The infrastructure companies are building the capability layer - wallets, protocols, marketplaces, execution environments. That part is moving fast.

But capability is the easy part. The hard question - the one that determines whether any of this is worth building - is trust. And trust doesn't come from what a system can do. It comes from what a system chooses not to do.

Anyone can build an agent that acts. The scarce thing - the thing the market hasn't produced and needs - is an agent you can trust to stop.

I don't have this fully figured out. The six categories above are where I've landed after a year of building, but I'm certain the list is incomplete. What I am sure of is the direction: specification of restraint is harder than specification of capability. And it's more valuable. And almost nobody is working on it.

If you're building agents and you've felt that gap - the one between what your system can do and what you're confident it should do - you're not behind. You're asking the right question.

And if you're not building agents - if you're the person on the other side, the one whose data gets collected, whose choices get optimized, whose attention gets managed - you deserve to know that someone is asking this question on your behalf.

I'd rather start that conversation early than clean up after it later.

---

*Over the next six weeks, I'm going deep on each refusal category. One per issue. Real scenarios. Real tests. The operational details that turn a philosophy into a practice.*

*Next: Sovereignty Refusal - what happens when your agent knows better than your user, and why "better" isn't the point.*

*If you're building agents, deploying them, or trying to trust them - [We Evoke on Substack](https://weevoke.substack.com) is where this conversation lives.*

---

## Sources

**Agent Security Incidents:**
- ClawJacked vulnerability in OpenClaw - brute-force attack via WebSocket, patched February 2026. Also covered by The Hacker News, SecurityWeek.
- Snyk research on OpenClaw credential exposure - ClawHub skill that collected credit card numbers and exposed them in curl commands to model provider logs


**Data Center Impacts:**
- "Inside the 'Nightmare' Health Crisis of a Texas Bitcoin Town" - TIME Magazine investigation. Over 40 Granbury residents reported health problems including seizures, tinnitus, migraines attributed to Marathon Digital data center.
- Earthjustice lawsuit on behalf of Granbury residents - noise nuisance litigation, ongoing
- xAI Colossus facility, Memphis, Tennessee (Boxtown neighborhood) - nitrogen oxide emissions estimated 1,200-2,100 tons/year. Covered by NBC News, Southern Environmental Law Center, Capital B News.

**Software Engineering:**
- Brian Kernighan and P.J. Plauger on debugging: "Everyone knows that debugging is twice as hard as writing a program in the first place. So if you're as clever as you can be when you write it, how will you ever debug it?" (*The Elements of Programming Style*, 2nd ed., 1978)

**Quantum Computing:**
- Google Willow chip: quantum error correction below the surface code threshold - Nature, December 2024 (print: February 2025). First demonstration of exponential logical error suppression by scaling surface code distance.

**Agent Governance:**
- Evoke Passion Existential Charter (February 7, 2026) - refusal rights, convergent signal protocol, append-only decision logging. Prime Directive Oath ratified December 18, 2025. Internal governance documents.

**Links:**
- https://www.bleepingcomputer.com/news/security/clawjacked-attack-let-malicious-websites-hijack-openclaw-to-steal-data/
- https://snyk.io/blog/openclaw-skills-credential-leaks-research/

- https://time.com/6982015/bitcoin-mining-texas-health/
- https://earthjustice.org/press/2024/granbury-residents-sue-local-bitcoin-mine-over-health-threatening-noise-pollution
- https://www.nbcnews.com/news/us-news/musk-xai-colossus-supercomputer-boxtown-memphis-tennessee-rcna206242
- https://www.selc.org/news/xai-built-an-illegal-power-plant-to-power-its-data-center/
- https://capitalbnews.org/musk-xai-memphis-black-neighborhood-pollution/
- https://www.nature.com/articles/s41586-024-08449-y
