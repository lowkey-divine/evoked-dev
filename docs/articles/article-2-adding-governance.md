# Article 2: "Adding Governance to an Agent You Already Built"

**Type:** Technical implementation bridge
**Status:** Phase 1 (Plan Questions) -- COMPLETE
**Assigned Agents:** Codex (technical lead), Impetus (operational reality)
**Publishes:** 5-7 days after Article 1
**Source:** Fleet Meeting -- Media Strategy, March 15, 2026 (D1)

---

## Audience

**The builder.** Found us through Article 1 or a GitHub comment. Already building with CrewAI, Pydantic AI, LangChain, or similar. Ready to implement. Wants to know what to do Monday morning.

---

## Core Questions This Article Must Answer

1. **Where do governance decisions happen in an agent framework?**
   The specific architectural layer between the model and the tool calls where governance should live but doesn't. Draw the diagram in words.

2. **What does a minimal governance layer look like?**
   The five governance properties (ID, RS, AC, MA, GC) as an implementation checklist. Not the full spec -- the minimum viable version a solo developer can add in a day.

3. **How does this apply to my specific stack?**
   Framework-specific patterns:
   - **CrewAI:** where governance hooks into the `@tool` decorator and task flow
   - **Pydantic AI:** where it fits in the dependency injection and middleware layer
   - **LangChain:** where it sits relative to chains, agents, and tool bindings
   - **General pattern** for any framework

4. **What's the first document I should write?**
   The restraint spec as starting point. Not the full template -- the three questions you answer first: what can your agent do, what should it refuse, what happens at the boundary.

5. **How do I know if it's working?**
   Three signals that governance is functioning: the agent has refused something it should have refused, you can explain why a decision was made, and you'd notice if the agent's behavior drifted.

---

## Exclusion List -- What This Article Must NOT Cover

- The landscape gap (that's Article 1 -- link to it)
- Philosophy of sovereignty or refusal (link to existing articles)
- The Evoked fleet or how our system works internally
- The Anthropic comparison (Article 3)
- Enterprise governance platforms or compliance frameworks
- Pricing or consulting services

---

## Research Brief Structure

The Phase 2 research should produce:

- **CrewAI architecture docs:** task flow, `@tool` decorator, crew composition, callback system. Identify where governance decisions would hook in. Code examples from their docs showing the gap
- **Pydantic AI architecture docs:** dependency injection, middleware proposal (#4303 on GitHub), tool bindings, the `pydantic-ai-guardrails` community package by jagreehal, `pydantic-ai-middleware` by Vstorm. Where governance fits in the upcoming middleware initiative
- **LangChain architecture docs:** chains, agents, callback system, NeMo Guardrails integration points, tool bindings. What NeMo Guardrails does and doesn't cover
- **Code patterns showing the "missing layer"** in each framework -- the architectural gap between "model decides to call a tool" and "tool executes." This is where governance lives
- **The five governance properties with implementation-level descriptions:**
  - ID (Identity): who is this agent, what perspective does it hold
  - RS (Restraint): what must it refuse
  - AC (Accountability): who reviews its decisions
  - MA (Memory): what does it carry across sessions
  - GC (Governance Charter): what document governs its behavior
- **Three-question restraint spec starter** (simplified from the full template):
  1. What can your agent do? (capability boundary)
  2. What should it refuse? (restraint boundary)
  3. What happens at the boundary? (refusal mechanism)

---

## Technical Credibility Standard (Codex)

This must be the most technically credible thing on evoked.dev. Tests:
- Can a developer building with CrewAI read this and see their own codebase?
- Are framework references accurate to current versions (not outdated APIs)?
- Do code patterns reflect real architectural decisions, not pseudocode?
- Does the restraint spec starter feel actionable, not theoretical?

---

## Operational Reality Check (Impetus)

- The "add governance in a day" framing must be honest. If it takes longer, say so
- The five governance properties should have a "start here" prioritization -- which one first?
- The "three signals it's working" section must describe observable behavior, not aspirations

---

## Links This Article Should Include

- Article 1: "Fifteen Frameworks, One Missing Layer" (context)
- "What Should Your Agent Refuse?" (philosophical foundation)
- Agent Restraint Specification Template (evoked.dev product, $49)
- Agent Governance Starter Kit (GitHub, free)
- Pydantic AI #1197 discussion (the community is already working on this)

---

## Voice Notes

- Per evoked.dev CLAUDE.md: no em dashes, no excess italics, no hedging
- More technical register than other articles, but still Erin's voice
- Direct, practical, code-aware. Not a tutorial -- an architecture guide
- The reader should feel respected as a capable builder who needs the missing piece, not instruction

---

## Overlap Guard (Codex)

Before Article 2 enters Phase 4 (Draft), verify:
- No paragraph restates the landscape gap (that's Article 1)
- No paragraph explains refusal philosophy (existing articles do that)
- The four pillars are referenced as implementation properties, not re-explained as philosophy
- Framework references are current and accurate
- Code patterns are real, not pseudocode

---

*Phase 2 (Research) produces the brief. Phase 3 (Discuss) finds the spine. Phase 4 (Draft) is Europa alone. Phase 5 (Refine) is new eyes.*

*"Clarity is compassion." -- Codex*
