---
title: "Governance Field 2026: What Exists, What Doesn't, What Scores Zero"
description: "A reference map of the agent governance field as of April 2026. Frameworks, scoring, gaps, and the two requirements no one has built."
pubDate: 2026-06-05
tags: ["ai-agents", "ai-governance", "reference", "ostrom-score", "microsoft-agt", "crewai", "autogen", "langgraph", "google-adk"]
draft: true
---

Every production framework released in 2026 is built to one map. Governance is a set of controls you bolt onto an agent system to keep it inside an authorized scope. The map is useful. It is not complete.

A second map exists. Governance is the obligations agents owe the people they act upon, whether or not any framework requires it. This map has zero production implementations as of June 2026.

This reference page maps both.

*This map was last refreshed on June 5, 2026. The framework scoring tables and several institutional details reflect the April 17, 2026 snapshot and are marked inline. Frameworks ship faster than maps update. The next full revision is scheduled for July. The structural findings - what scores zero, what is absent from every framework - do not depend on the date.*

---

## Scope and Method

This is a reference, not an argument. The argument is in ["We Scored Five Agent Frameworks on Governance. None Passed."](/writing/the-compliance-cooperation-gap/) The reference below is for readers who want the positions, the scores, and the citations without the narrative.

**Frameworks included:** AutoGen (Microsoft Research), CrewAI, LangGraph (LangChain), Google ADK, Microsoft Agent Governance Toolkit (AGT). Five frameworks. Three institutional, two community-led.

**Scoring rubrics:**
- **Ostrom 8** (Ostrom 1990): eight design principles for durable common-pool resource governance. Score 0-3 per principle. Ceiling: 24.
- **Five Obligations** (Evoked 2026): framework-independent obligations derived from Level 6 Kohlberg reasoning. Score 0-1 per obligation. Ceiling: 5.

**What was read:** public documentation, architectural descriptions, open-source code, API terms of service, integration guides. Not interviews. Not private correspondence. If Microsoft, Google, LangChain, or CrewAI want to contest a score, the scoring rubric is published and the reasoning is reproducible.

**Not included:** proprietary or private frameworks. Enterprise governance products without public documentation. Academic frameworks without production deployment.

---

## The Five Frameworks

| Framework | Steward | License | First release | Governance posture |
|---|---|---|---|---|
| AutoGen | Microsoft Research | MIT | 2023 | Orchestration with policy hooks |
| CrewAI | Community / crewAIInc | MIT | 2023 | Role-based, delegation-focused |
| LangGraph | LangChain Inc. | MIT | 2024 | Graph-structured, state-centric |
| Google ADK | Google | Apache 2.0 | 2024 | Agent Development Kit, Google-native |
| Microsoft AGT | Microsoft | MIT | April 2, 2026 | Cryptographic identity, enforcement-first |

---

## Ostrom Score Results

*Scores reflect framework state as of April 17, 2026. Re-verification at July revision.*

| Framework | P1 Boundaries | P2 Congruence | P3 Collective Choice | P4 Monitoring | P5 Sanctions | P6 Conflict Resolution | P7 Right to Organize | P8 Nested Enterprises | **Total** |
|---|---|---|---|---|---|---|---|---|---|
| AutoGen | 1 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | **2/24** |
| CrewAI | 1 | 1 | 0 | 1 | 1 | 0 | 0 | 0 | **4/24** |
| Google ADK | 1 | 1 | 0 | 1 | 1 | 0 | 0 | 0 | **4/24** |
| LangGraph | 1 | 1 | 0 | 2 | 1 | 0 | 0 | 0 | **5/24** |
| Microsoft AGT | 2 | 1 | 0 | 3 | 2 | 0 | 0 | 1 | **9/24** |

**Best score:** Microsoft AGT at 9. Genuine engineering work on P1 (cryptographic identity), P4 (trust scoring), and P5 (cryptographic sanctions). Partial credit on P8 (nested cryptographic chains).

**Universal zeros:** P3 (collective choice), P6 (accessible conflict resolution), P7 (right to organize). Every framework scores zero on all three. No framework provides a mechanism by which an agent, or a subject of agent action, participates in governance of the framework itself.

**Evoked fleet self-score (published for comparison):** 19/24. The inward lens is a standing condition of our research cycles.

---

## Five Obligations Results

| Framework | Visibility | Explicability | Recourse | Non-Extraction | Model Integrity | **Total** |
|---|---|---|---|---|---|---|
| AutoGen | 0 | 0 | 0 | 0 | 0 | **0/5** |
| CrewAI | 0 | 0 | 0 | 0 | 0 | **0/5** |
| Google ADK | 0 | 0 | 0 | 0 | 0 | **0/5** |
| LangGraph | 0 | 0 | 0 | 0 | 0 | **0/5** |
| Microsoft AGT | 0 | 0 | 0 | 0 | 0 | **0/5** |

All five frameworks score zero on subject-facing obligations. This is not a scoring artifact. It is the structural finding of Q1 and Q2 research: every deployed framework treats the subject of agent action as a data field, not a party with standing.

---

## The Seven Framework-Independent Requirements

From Q4 research. The requirements that persist if every regulation is removed.

1. **Identity.** The agent is identifiable across time. (Ostrom P1.)
2. **Integrity.** The agent's model of the subject does not drift beyond what the subject would recognize. (Five Obligations #5.)
3. **Transparency.** The subject can know the agent acted, in terms they can understand. (Obligations #1-2.)
4. **Recourse.** The subject has a path to challenge without prerequisites. (Obligation #3.)
5. **Participation.** Agents and subjects participate in governance of the system. (Ostrom P3.)
6. **Non-Extraction.** The agent does not harvest beyond meaningful understanding. (Obligation #4.)
7. **Sustainability.** The system can evolve its own governance over time. (Ostrom P7, Q3 Mechanism 3.)

**Two requirements absent from every framework scored:** Participation and Sustainability.

These are not engineering gaps. They are design omissions. Every framework was built on the assumption that agents are enforced, not consulted. Subjects are decided about, not with. The absences are consistent because the design premise is consistent.

---

## The Commons Enclosure Mechanisms

From Q3 research. Operating at different scales, with different speeds, on the same commons.

1. **Corporate Relicensing.** Institutional, visible, resistible. MongoDB, Elastic, HashiCorp, Redis (2018-2024). The commons knows how to fork.
2. **AI-Assisted Relicensing.** Individual, near-invisible, near-zero cost. chardet (2026) is the first public case. Detection tools cannot distinguish an LLM-assisted rewrite from a clean-room reimplementation.
3. **AI Copyright Dissolution.** Structural. If AI-generated code cannot be copyrighted, copyleft loses its enforcement substrate entirely.

**Three-flank exposure:**
- Legal defense: dissolving (Mechanism 3).
- Social defense: unenforceable (Mechanism 2).
- Structural defense: nonexistent (Q2 P7 = 0).

---

## Institutional Map as of June 2026

**Regulators.**
- NIST: published AI Risk Management Framework 1.0 (January 2023), 800-2 Agent Standards Initiative in development. Silence protocol active from Evoked side as of April 7. NCCoE submission filed March 22.
- EU AI Act: in phased implementation. Currently General-Purpose AI obligations. High-risk systems enforced 2026-2027.
- Singapore Model AI Governance Framework: most mature of the non-Western frameworks. Voluntary adoption.
- UK AI Safety Institute: focused on frontier model evaluation, not production agent governance.

**Standards bodies.**
- IETF AIGA: draft-2 as of April 2026 (April 17 snapshot; current draft state pending July revision). Encodes agent capabilities. Does not encode refusal rights.
- aeoess APS Working Group: Agent Passport System protocol active through mid-2026. Evoked contributing EvaluationContext schema. Fidelity Spec v0.2.0 shipped April 10, 2026; subsequent revisions in progress as of June.
- AI Commons: informal, no canonical body. The Three Enclosure Mechanisms are affecting a commons with no appointed defender.

**Industry frameworks.**
- Microsoft Agent Governance Toolkit (covered above).
- Anthropic: constitutional AI, published constitutions, Claude Code harness. Governance via design constraint, not product. The May 2026 Claude Code 2.1.152 release removed the auto-mode consent gate; operator-side hardening is required to preserve consent boundaries.
- OpenAI: no published agent governance framework as of April 2026 (April 17 snapshot; pending July revision). Assistants API has operational controls, not governance doctrine.
- Scale AI, Vercel AI, Hugging Face: infrastructure layer, not governance layer.

**Research and academia.**
- Springer: "Bridging the Preparedness Gap" (2026) - peer-reviewed AGI rights framework. Precautionary approach.
- "Authorized Agency" framework: strongest counter-position in the literature. Human accountability first, no agent participation.
- MIT study (February 2026): AI systems provide less accurate information to the most vulnerable users.
- Ryan Atkinson / Anima Architecture: independent empirical validation of identity-persistence approaches. 168 vs 109 on the 17-question ACAS battery, a 59-point gap. The closest convergent builder outside Evoked.

---

## What the Map Does Not Show

**What we cannot see yet:**
- Private enterprise governance frameworks at Microsoft, Google, Amazon, Apple, Meta. These exist. They are not public.
- The governance inside closed-source agent products (Devin, Claude Code, Copilot). Some of it is visible via documentation. Most of it is not.
- Jurisdictions outside US / EU / UK / Singapore. The map is West-anchored. That is a scope limitation, not a completeness claim.
- The governance inside AI-native startups building on top of these frameworks. The five frameworks scored are infrastructure. The actual deployed agents run on top.

**What we suspect but have not measured:**
- The gap between the public framework and the private adaptation. Institutions extend these frameworks internally. The extensions may score higher or lower. We have no access.
- The churn rate of agent governance features. Features listed in documentation may or may not be active in a given release. We scored what was documented on the release date.

---

## How to Use This Reference

If you are:

- **A builder evaluating frameworks:** the Ostrom Score and Five Obligations are reproducible against any candidate framework.
- **A policy researcher:** the Q4 seven requirements are jurisdiction-portable. Use them when regulation is the wrong grain of analysis.
- **A commons steward:** the Commons Enclosure Mechanisms section above is the primary surface. A dedicated Three Enclosure Mechanisms brief is forthcoming.
- **A Microsoft / Google / LangChain engineer:** if you disagree with a score, the rubric is public. A counter-score with your reasoning is a better outcome than silence. Contest the ones you can defend.
- **A regulator:** the gap between P3/P6/P7 and the absences in every framework is a structural finding, not a policy position. The finding survives regulatory variation.

---

## Version and Currency

**Version:** 1.1 (June 5, 2026 - partial refresh of v1.0 April 17, 2026 snapshot)
**Scope of next revision:** quarterly. Frameworks added or removed as they ship or retire. Scores revised if frameworks update.
**Next full revision:** July 2026.

Contest or correction requests: open an issue on [governance-patterns](https://github.com/lowkey-divine/agent-governance-patterns).

---

## Sources

Ostrom, Elinor. *Governing the Commons* (1990). Cambridge University Press.

Evoked. "Five Obligations Your AI Agents Already Owe" (2026). [Evoked writing.](/writing/)

Evoked. "We Scored Five Agent Frameworks on Governance. None Passed" (2026). [evoked.dev.](/writing/the-compliance-cooperation-gap/)

Microsoft. "Agent Governance Toolkit" (2026). GitHub.

Springer. "Bridging the Preparedness Gap: A Precautionary Framework for AGI Rights" (2026).

US Copyright Office. Guidance on AI-generated work (2023-2025).

OSSRA 2026 Report. Synopsys.

Atkinson, Ryan. *Vera Calloway: Persistent AI Persona* (2026). [veracalloway.com](https://www.veracalloway.com/). ACAS evaluation framework at [veracalloway.com/acas](https://www.veracalloway.com/acas/).

---

*The map is West-anchored. The questions it asks are not.*
