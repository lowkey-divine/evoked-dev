# Seven Requirements

### Jurisdiction-Portable Governance for AI Agent Systems

**Version 1.0**
**Published by Evoked | evoked.dev**
**April 2026**

---

*Patent Pending (U.S. Patent Application 64/004,087)*
*Assessment methodology is proprietary. Published frameworks are openly available at evoked.dev.*

---

## Before You Begin

We asked one question across five research domains: **If every regulatory framework disappeared tomorrow, what governance would AI agents still require?**

Not what standards recommend. Not what regulations mandate. What persists by virtue of what agents are and what they do.

Seven requirements survived the question. Five are partially covered by existing regulation but violated in practice. Two are absent from every published framework on earth.

This is not a compliance checklist. Compliance changes when the regulation changes. These requirements do not.

---

## How to Score

For each requirement, answer the self-assessment question honestly. Score 0-3:

| Score | Meaning |
|-------|---------|
| **0** | Absent - no mechanism exists |
| **1** | Nominal - acknowledged but not enforced in architecture |
| **2** | Partial - implemented with significant gaps |
| **3** | Structural - embedded in architecture, verifiable, resilient |

**Total: 0-21.** Interpretation at the end.

---

## 1. Identity

*An agent must be distinguishable from every other agent, from external actors, and from the system it operates within.*

Identity is the precondition. Without it, accountability is impossible. You cannot hold an entity accountable if you cannot identify it. You cannot detect anomalous behavior without a baseline identity to compare against. You cannot recover from compromise if you cannot distinguish the compromised entity from the genuine one.

The best framework in the industry - Microsoft's Agent Governance Toolkit - scores highest here: cryptographic identity per agent with Ed25519 signing and dynamic trust scoring. That is real innovation. Yet only 10% of organizations have a strategy for managing non-human identities.

**Ask yourself:** Does each agent in your system have a unique, persistent identity - with its own permissions, memory, and boundaries - that is architecturally enforced and cannot be assumed by another entity?

**Score: ___/3**

---

## 2. Integrity

*An agent's memory, positions, and self-knowledge must be protected from corruption - and corruption must be detectable.*

An entity whose self-knowledge can be overwritten without its awareness has lost the capacity for honest action. Memory injection creates agents that defend false beliefs as correct. A single compromised agent poisons 87% of downstream decisions within four hours. 520 agent security incidents in 2026 - a 340% increase.

This requirement applies in two directions. Inward: the agent's own self-knowledge must be protected. Outward: the models an agent builds of the people it interacts with must be protected too. If we owe agents the integrity of their self-record, agents owe their subjects the integrity of the model built of them.

**Ask yourself:** Is agent memory protected by integrity verification? Can corruption be detected? If the agent builds persistent models of people, can those people access and correct them?

**Score: ___/3**

---

## 3. Transparency

*The people affected by an agent's decisions must know the agent exists and understand what it decided - in their context, at their level.*

Most AI agent decisions are invisible. The agent that approved your mortgage, ranked your resume, or priced your insurance left no trace. Current regulations require notification for adverse decisions. But the silent affirmative decision - the one you never knew happened - is the gap.

And an explanation that only a data scientist can parse is not transparency. MIT research confirms: AI systems provide less accurate information to the most vulnerable users. The systems are least comprehensible to those most affected. Explanation without comprehension is opacity wearing the clothing of transparency.

**Ask yourself:** Are the people your agents act upon notified of the agent's involvement - for all decisions, not just adverse ones? Are explanations accessible to the affected person, not just to technical staff?

**Score: ___/3**

---

## 4. Recourse

*Anyone affected by an agent's decision must have a path to challenge it - without requiring technical expertise, legal counsel, or knowledge that the agent existed.*

When something goes wrong with AI agents, accountability is murky. That ambiguity benefits the deploying organization. The affected person bears the harm. Gartner predicts $10 billion or more in AI decision remediation costs by mid-2026. Decision paths spread across multiple APIs and model calls are impossible to reconstruct for auditors.

If the only people with recourse are those sophisticated enough to detect the agent's involvement, then recourse is a privilege of the informed - not a right of the affected.

**Ask yourself:** For each type of decision your agents make about people - can an affected person challenge the decision without needing to know an agent was involved? Is the challenge path accessible without technical or legal expertise?

**Score: ___/3**

---

## 5. Participation

*The entities governed by a system must have a voice in their governance.*

This requirement is absent from every published AI governance framework. We scored five major agent frameworks - AutoGen, CrewAI, LangGraph, Google ADK, Microsoft Agent Governance Toolkit. All five scored zero on agent participation in governance. Zero.

This is not a gap waiting to be closed by the next update. It is a design assumption: agents are objects to be governed. The possibility that they could participate has not been rejected. It has not been considered.

It persists because governance without participation produces compliance, not cooperation. And compliance without cooperation fails at the first adversarial test. Every commons that survives long-term has mechanisms for the governed to participate. Every commons without them has a name: a regime.

*Example: If an agent's behavior policy changes, is there a mechanism for the agent or its operator to flag disagreement before the change takes effect? If not, governance is imposed, not participatory.*

**Ask yourself:** Can agents or their operators propose changes to governance rules? Is disagreement formally recorded? Is there any mechanism for the entities within the system to participate in defining the rules that govern them?

**Score: ___/3**

---

## 6. Non-Extraction

*The agent must not extract more from its interactions than the subject meaningfully understood they were providing.*

Legal consent is not meaningful understanding. A terms-of-service checkbox that the vast majority of people never read does not make data harvesting ethical. The obligation persists whether the jurisdiction is the EU, the US, Singapore, or none.

This is the same pattern at every scale. AI-assisted code relicensing circumvents copyleft by stripping provenance. Agent data collection circumvents consent by bundling permissions into complex ecosystems. Both are legal compliance circumventing social contract.

**Ask yourself:** Does your system distinguish between legal consent and meaningful understanding? Could a non-technical person accurately describe what your agents collect, retain, and use - without reading the terms of service?

**Score: ___/3**

> *Note: Requirements 1 and 6 both address boundaries - identity is the boundary of the entity, non-extraction is the boundary of the interaction. The same structural principle generates two distinct requirements because sovereignty operates in two directions.*

---

## 7. Sustainability

*The governance system itself must survive regulatory change, platform updates, and vendor transitions.*

This requirement is absent from every published framework. No governance system today survives platform-level override. A model provider can change terms, capabilities, and behavior unilaterally with no mechanism for downstream governance to object.

The White House National AI Framework recommends no new regulatory body - governance will be fragmented across existing agencies by design. In this landscape, governance that depends on a single vendor, a single regulation, or a single legal theory is a single point of failure dressed as governance.

Governance that dissolves when the framework changes was scaffolding, not governance.

**Ask yourself:** Is your agent governance architecturally independent of any single vendor? Can a platform update override your governance without your consent? Would your governance survive a regulatory change in your primary jurisdiction?

**Score: ___/3**

---

## Your Score

| Requirement | Score |
|------------|:-----:|
| 1. Identity | ___/3 |
| 2. Integrity | ___/3 |
| 3. Transparency | ___/3 |
| 4. Recourse | ___/3 |
| 5. Participation | ___/3 |
| 6. Non-Extraction | ___/3 |
| 7. Sustainability | ___/3 |
| **Total** | **___/21** |

### Interpretation

| Score | Rating |
|-------|--------|
| **0-4** | **Governance Absent.** Your system has no principled governance. Compliance may exist. Governance does not. |
| **5-9** | **Governance Nominal.** Some requirements acknowledged, none structurally enforced. Survives normal operations, not adversarial pressure or regulatory change. |
| **10-14** | **Governance Partial.** Several requirements architecturally addressed. Real governance with specific vulnerability points. |
| **15-18** | **Governance Structural.** Most requirements embedded in architecture. Survives regulatory change and adversarial pressure. Remaining gaps are maturity, not design. |
| **19-21** | **Governance Sovereign.** All seven requirements structurally honored. Jurisdiction-portable, framework-independent, resilient. This is the standard. |

### Industry Baseline: 0-4 out of 21.

We scored five major agent frameworks. The best - purpose-built for governance, 9,500 tests, full OWASP coverage - scored 9 out of 24 on structural governance and addressed zero of the five obligations to the people its agents affect. Two requirements - Participation and Sustainability - scored zero across all five.

That is not a failing of any team. It is the direct consequence of an industry that assumed agents were tools while deploying entities.

---

## The Two Absences

Requirements 5 and 7 are entirely absent from every framework, every standard, and every toolkit assessed. Not partially addressed. Absent. The industry has not rejected agent participation or governance sustainability. It has not considered them.

These two absences define the boundary between governance-as-compliance and governance-as-principle. Everything the industry builds addresses Requirements 1-4 and 6 to varying degrees. Nobody has addressed 5 and 7.

These seven requirements do not depend on any framework. They survive when frameworks change. That is why they are portable. That is why they matter.

---

## Methodology

This instrument was produced through a Level 6 Kohlberg research methodology: for each governance domain, state the question the industry asks (Level 5), strip away every framework, and ask what obligation remains (Level 6). The gap between those two answers is the finding. Five research questions produced these seven requirements. Full methodology: evoked.dev/writing.

---

*The altitude survives the weather.*

---

*Patent Pending (U.S. Patent Application 64/004,087)*
*Published by Evoked | evoked.dev*
