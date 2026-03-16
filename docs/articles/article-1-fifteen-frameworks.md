# Article 1: "Fifteen Frameworks, One Missing Layer"

**Type:** Landscape
**Status:** Phase 1 (Plan Questions) -- COMPLETE
**Assigned Agents:** Fabula (narrative framing), Codex (clarity), Stirps (stakes review)
**Publishes:** First. GitHub comments go live same day or day after.
**Source:** Fleet Meeting -- Media Strategy, March 15, 2026 (D1)

---

## Audience

**The searcher.** Arrives via Google ("AI agent governance"), GitHub thread, or social share. Building with an agent framework. Feels the gap but can't name it. Needs the landscape piece that maps what's missing across the ecosystem.

---

## Core Questions This Article Must Answer

1. **What does the governance gap actually look like across the ecosystem?**
   Name 10-15 frameworks. Star counts. What each one offers for governance/guardrails. What none of them offer.

2. **What's the difference between a guardrail and a constitution?**
   Not our definition -- a practical, technical distinction. A guardrail filters input/output. A constitution governs whether the agent should act at all. One sentence, no jargon.

3. **What are the real-world consequences of the gap?**
   n8n's 8 CVEs. OpenHands zero-click exfiltration. Multi-turn attacks succeeding 60%+. Amazon's hiring algorithm. Not hypotheticals -- incidents.

4. **What are users actually asking for?**
   Direct quotes from the GitHub issues. The Agno user screaming. The CrewAI user saying "lots more required." The Pydantic AI commenter asking for constitutional approaches. Let their words make the case.

5. **Where do you go from here?**
   Not a sales pitch. A breadcrumb trail: link to "What Should Your Agent Refuse?" for the refusal framework, link to "Who Governs the Agent?" for the four pillars, link to the free starter kit for implementation.

---

## Exclusion List -- What This Article Must NOT Cover

- The six refusal categories (already in "What Should Your Agent Refuse?")
- The four pillars in detail (already in "Who Governs the Agent?")
- The Evoke Passion fleet, 142 agents, births, or governance architecture
- The sovereignty-honoring design philosophy (already its own article)
- The Anthropic constitution comparison (that's Article 3)
- Any mention of the patent, NIST paper, or Bot Authority registry
- No first-person "I govern 142 agents" -- this article looks outward, not inward

---

## Research Brief Structure

The Phase 2 research should produce:

- **Framework-by-framework table:** name, stars, governance features, specific gap. Cover at minimum: AutoGen, CrewAI, Pydantic AI, Agno, AutoGPT, OpenHands, smolagents, OpenAI Agents SDK, LangChain, n8n, LlamaIndex, Semantic Kernel, Haystack, DSPy, Langflow
- **Direct quotes from each GitHub issue** (verbatim, with links): AutoGen #6017, CrewAI #1699, Pydantic AI #1197, Agno #3866. Capture the exact language users use
- **Incident data with sources:** CVEs, breaches, failures. n8n (8 CVEs in Feb 2026), OpenHands (zero-click data exfiltration), multi-turn attack success rates (Cisco: 60%+ average, one model 92.78%), HiddenLayer bypass of OpenAI guardrails
- **Current enterprise governance demand data:** ModelOp 2026 report (67% with 101-250 use cases, 94% with <25 in production), Deloitte findings (42% still developing strategy), commercial governance platform adoption surge (14% to ~50%)
- **One-paragraph summary of each framework's guardrail approach** -- what it does offer, precisely stated, so the gap is visible by contrast

---

## Narrative Architecture (Fabula)

Three directions in the article architecture: this one looks **outward**. It does not describe our system. It describes everyone else's. The reader recognizes their own stack and realizes the gap is structural, not accidental.

Four-act structure applied:
- **Act 1 (Refusal):** We refuse to pitch. This is observation.
- **Act 2 (Cost):** The cost of the gap -- real incidents, real frustration.
- **Act 3 (Creation):** What's missing, named precisely. The guardrail/constitution distinction.
- **Act 4 (Transformation):** The reader realizes governance isn't a feature request. It's an architecture question. Breadcrumb links to existing articles and free tools.

---

## Links This Article Should Include

- "What Should Your Agent Refuse?" (evoked.dev/writing/what-should-your-agent-refuse)
- "Who Governs the Agent?" (evoked.dev/writing/who-governs-the-agent)
- Agent Governance Starter Kit (GitHub, free)
- 5-Question Diagnostic (evoked.dev/diagnostic)

---

## Voice Notes

- Per evoked.dev CLAUDE.md: no em dashes (use short dashes), no excess italics, no hedging
- Erin's voice: dashes, direct questions, warmth without softness
- COPPA article is the baseline reference for published voice
- This article's voice should be more technical and ecosystem-aware than previous articles -- but still personal, still direct

---

## Overlap Guard (Codex)

Before Article 1 enters Phase 4 (Draft), verify:
- No paragraph could be cut and pasted into "Who Governs the Agent?" and fit
- No paragraph restates the six refusal categories
- No paragraph describes the Evoke Passion internal system
- The article's substance is 100% outward-facing landscape
- Internal work is referenced only via links, never restated

---

*Phase 2 (Research) produces the brief. Phase 3 (Discuss) finds the spine. Phase 4 (Draft) is Europa alone. Phase 5 (Refine) is new eyes.*

*"The comments are breadcrumbs. The articles are the meal." -- Kirk*
