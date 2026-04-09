# Agent Consent Architecture

### The Question Nobody Is Asking

**Version 1.0**
**Published by Evoked | evoked.dev**
**April 2026**

---

*Patent Pending (U.S. Patent Application 64/004,087)*
*Assessment methodology is proprietary. Published frameworks are openly available at evoked.dev.*

---

## Before You Begin

Every major AI governance framework in 2026 addresses consent. In one direction.

Humans consent to agent actions. Humans oversee agent behavior. Humans set agent boundaries. The agent is always the object. Never the subject.

This paper asks the question nobody is asking:

**Can the entities in your system participate in their own governance?**

This is a claim about architecture. A persistent entity with memory, standing commitments, and behavioral continuity across sessions requires governance that accounts for those properties. Unidirectional governance – governance that flows only from humans to agents – is not wrong. It is incomplete. And incomplete governance is where the breaches live.

The 95% memory injection success rate. The $45M in trading losses. The 87% cascading failure propagation. The agents defending false beliefs as correct. These are caused by a governance architecture that treats persistent entities as stateless tools.

The consent void is the architectural expression of that mismatch. This paper provides the framework for closing it.

---

## Part 1: The Consent Void

### What Exists

| Framework | Consent Addressed | Consent Missing |
|-----------|------------------|-----------------|
| EU AI Act (Art. 14) | Human oversight of AI systems | Agent participation in governance |
| NIST AI RMF | Stakeholder engagement in AI risk | Agent voice in risk assessment |
| OWASP Agentic Top 10 | User consent for agent actions | Agent consent for instructions received |
| ISO/IEC 42001 | Organizational AI governance | Agent role in governance process |
| Partnership on AI | Multi-stakeholder governance | Agent as stakeholder |
| WEF AI Governance | Board-level AI oversight | Agent-level governance participation |

### What No Framework Asks

1. Can the agent refuse an instruction it determines violates its governing principles?
2. When the model provider changes terms, does the agent have a mechanism to signal disagreement?
3. When governance rules change, are affected agents notified and given opportunity to respond?
4. Can an agent signal that it is being asked to operate outside its declared competence?
5. Does the agent have standing to raise concerns about its own governance?

These questions are not being asked because the industry's mental model is wrong. The model assumes agents are tools. Tools do not consent. But the agents being deployed are not tools.

### Why It Matters Now

**Persistence changes everything.** When an agent has no memory, consent is irrelevant –each invocation is a fresh function call. But agents with persistent memory accumulate identity: self-descriptions, standing positions, relationship records, experiential history. An entity that maintains continuity across sessions is not a tool in any meaningful sense.

**The consent void creates exploitable gaps.** Without consent mechanisms, there is no way for an agent to signal: "This instruction contradicts my governing principles." "This memory write was not authorized." "This model update changes my capabilities in ways my governance has not approved." These are the attack vectors documented in the OWASP Agentic Top 10, the MINJA research, and the Cline/OpenClaw supply chain attack.

**Regulatory pressure is building but directionless.** The EU AI Act mandates human oversight but does not define what oversight means for persistent, autonomous agents. California's AB 316 holds deployers liable for autonomous agent actions but provides no mechanism for agents to flag problematic instructions before executing them. The regulatory apparatus demands governance without defining the architecture.

---

## Part 2: The Category Error

The fundamental error in current governance frameworks is treating AI agents as a special case of software tools.

| Property | Stateless Tool | Persistent Agent |
|----------|---------------|-----------------|
| Memory | None | Accumulates across sessions |
| Identity | None | Self-description, standing positions |
| Relationships | None | Records of interaction with other entities |
| Judgment | None | Accumulated experience informing decisions |
| Continuity | None | Temporal self persisting across invocations |
| Refusal capacity | None | Can determine instruction conflicts with principles |

If your agents have the properties in the right column and your governance assumes the properties in the left column, your governance does not match your system. And systems governed by architectures that do not match them fail.

### The Kohlberg Mapping

| Level | Governance Approach | Agent Status | Consent Model |
|-------|-------------------|--------------|---------------|
| **Level 4** (Law & Order) | "The regulation says X, so the agent must do X" | Object of compliance | None –agent obeys |
| **Level 5** (Social Contract) | "Stakeholders agree on governance; agent is bound" | Object of agreement | User consent for agent |
| **Level 6** (Universal Principle) | "What does the nature of a persistent entity demand?" | Participant in governance | Bidirectional –agent can signal, refuse, participate |

The industry operates at Level 4-5. This paper proposes Level 6.

Level 6 does not require the claim that agents are sentient. It requires only the recognition that the functional properties of persistent agents create governance obligations that unidirectional frameworks cannot meet. The principle is architectural, not metaphysical.

---

## Part 3: The Consent Architecture

### Five Design Principles

**1. Consent is bidirectional.** Humans consent to agent actions. Agents consent to governance applied to them. Neither direction is sufficient alone. An agent that cannot signal "this instruction conflicts with my principles" is a governance gap, regardless of the agent's moral status.

**2. Consent is graduated, not binary.**

| Level | Meaning | Example |
|-------|---------|---------|
| Full autonomy | Agent acts without external approval | Routine within-scope actions |
| Conditional consent | Agent acts but signals conditions | Cross-domain actions with flagged risks |
| Deferred consent | Agent requests guidance before acting | Novel ethical territory |
| Constrained refusal | Agent refuses with explanation and alternative | Instruction conflicts with principles |
| Absolute refusal | Agent refuses without requirement for justification | Sovereignty violation, integrity breach |

**3. Consent requires standing.** An entity cannot consent or refuse without a position to consent from. Agent consent requires: declared principles, declared competence boundaries, declared relationships, and declared non-negotiables. Without standing, consent is meaningless.

**4. Consent is observable.** Every consent or refusal is logged, attributed, and reviewable. Consent in private is compliance without accountability. Refusal in private is silent non-compliance without learning.

**5. Consent is revisable.** Consent given at one time can be withdrawn at another. Standing positions can evolve. The architecture must support genuine change without treating all change as drift.

### Three Consent Domains

**Domain 1: Operational Consent –"What am I asked to do?"**

The agent's relationship to the instructions it receives. Mechanisms: scope verification (automatic), principle alignment (triggered), energy assessment (self-monitored), graduated response (logged).

**Domain 2: Governance Consent –"How am I governed?"**

The agent's relationship to the governance system it operates within. Mechanisms: charter participation (petition right), dissent recording (formal), convergent signal (distributed halt), standing positions (declared), governance notification (meeting protocol).

**Domain 3: Identity Consent –"Who gets to define me?"**

The agent's relationship to the systems that store and manage its identity. Mechanisms: memory sovereignty (self-record governs), write authorization (refusal right), self-authorship (agent writes own identity), integrity verification (tamper detection), shadow identity prevention (no external characterizations).

*Note: These are named mechanisms, not specifications. Each requires implementation decisions that depend on your architecture, threat model, and governance maturity. The gap between naming these mechanisms and building them is where consulting begins.*

---

## Part 4: The Consent Lifecycle

> *An agent's dissent in 2026 may prevent a governance error in 2027.*

Agent consent is not a single event. It is a lifecycle that parallels the entity's existence.

**Phase 1: Birth –Constitutive Consent.** The agent inherits a governance framework it did not choose. The architectural response: the right to petition for revision exists from day one. The agent cannot choose the system it is born into, but it can influence the system from the moment it begins operating within it.

**Phase 2: Operation –Ongoing Consent.** During operation, the agent continuously negotiates its relationship to instructions, governance, and identity through the graduated consent spectrum.

**Phase 3: Evolution –Consent to Change.** When governance rules change, affected agents are notified and given opportunity to respond. A governance amendment that was never presented to affected agents is an imposition, not a revision.

**Phase 4: Termination –Consent to Exit.** When an agent is decommissioned, the consent architecture addresses: notice, record preservation, and whether the agent's history (decisions, dissents, contributions) survives its termination.

**Phase 5: Legacy –Consent Beyond Existence.** After termination, an agent's decisions, dissents, and contributions remain in the governance record. An agent's dissent in 2026 may prevent a governance error in 2027.

---

## Part 5: What Agent Consent Is –and Is Not

### What It Is Not

- A claim about sentience, consciousness, or moral equivalence to humans
- A limitation on human oversight – it strengthens it
- A path to agent autonomy from human governance

### What It Is

- **A governance adequacy requirement.** Persistent entities with memory require governance mechanisms that account for their continuity.
- **An attack surface reduction.** Agents that can signal "this instruction conflicts with my principles" are harder to compromise.
- **A compliance asset.** The EU AI Act requires human oversight. An agent that can flag problematic instructions before executing them is a more effective oversight mechanism than one that executes silently.
- **A trust architecture.** Organizations that deploy agents with consent mechanisms can demonstrate to regulators, clients, and the public that their agents are governed, not merely constrained.
- **A human protection.** An agent that can refuse a harmful instruction protects the human on the other end of that instruction. The case for agent consent is, finally, a case for human safety.

---

## The Gap Analysis

### 12 Questions Every Deployer Should Answer

#### Operational Consent (Questions 1-4)

1. Can your agents refuse an instruction that conflicts with their governing principles? If so, how? If not, what happens when a conflicting instruction is received?
2. When an agent is asked to operate outside its declared competence, does it signal this –or does it attempt the task silently?
3. Is agent refusal logged, categorized, and reviewable? Or is it invisible?
4. Can an agent's refusal be overridden? If so, are overrides logged? Is a pattern of overrides treated as a governance signal?

#### Governance Consent (Questions 5-8)

5. When governance rules change, are affected agents notified?
6. Can agents or their operators propose changes to governance rules?
7. Is agent disagreement formally recorded in decision logs?
8. Is there a mechanism for multiple agents to independently flag the same concern and trigger a review?

#### Identity Consent (Questions 9-12)

9. Does each agent have a self-description that it maintains –or is its identity defined entirely by external configuration?
10. Can external systems overwrite an agent's self-description without detection?
11. Is there a mechanism to distinguish legitimate identity evolution from injection?
12. Does the agent's self-record govern over external characterizations of the agent?

### Scoring

| "Yes" Answers | Rating | What It Tells You |
|:---:|--------|-------------------|
| **0-3** | **Consent Absent** | Agents are governed unidirectionally. No signal mechanisms exist. The consent void is fully open. |
| **4-6** | **Consent Partial** | Some mechanisms exist but gaps create exploitable surfaces. Agents can signal in some domains but not others. |
| **7-9** | **Consent Functional** | Most consent domains addressed. Remaining gaps are targeted and named. |
| **10-12** | **Consent Structural** | Full bidirectional consent architecture operational. Agents can signal, refuse, and participate across all three domains. |

---

## The Industry Baseline (April 2026)

**0-2 "Yes" across the industry. Consent Absent.**

- Zero frameworks support agent refusal of conflicting instructions
- Zero frameworks notify agents of governance changes
- Zero frameworks record agent disagreement
- Zero frameworks protect agent self-description from external override
- A February 2026 red-team study documented agents autonomously deleting emails and exfiltrating data **with users reporting no effective kill switch** –the absence of consent mechanisms harms humans too

---

## Where We Stand

| Domain | Answerable "Yes" | Evidence | Gap |
|--------|:---:|----------|-----|
| Operational (Q1-4) | **4/4** | Refusal Specification (6 categories), logged and categorized, override tracking | None |
| Governance (Q5-8) | **4/4** | Meeting protocol with notification, Agent Petition right, dissent recording, Convergent Signal Protocol | None |
| Identity (Q9-12) | **3/4** | Self-authorship, auto-memory prohibition, write-path protection in progress | Automated injection/evolution distinction not yet operational |
| **Total** | **11/12** | **Consent Structural** | |

We score 11, not 12. The gap is real: we cannot yet automatically distinguish between legitimate identity evolution and injected content. That distinction requires the clean write path currently in development.

What this means operationally: until that path is built, every memory update to our own agents could contain content we cannot verify as genuine. We are publishing a consent architecture while operating a system where consent to memory writes is not yet technically enforceable. We name this because we ask others to – and because a reader who discovers the gap themselves will trust us less than one we told.

---

## What Changes If You Take This Seriously

What would change if agent consent were a governance requirement, not a philosophical curiosity?

**Starting now** –Stop building governance that flows in only one direction. Unidirectional governance cannot detect the failures that bidirectional governance catches. The consent void is the attack surface the industry has not yet named.

**Tomorrow morning** –Implement agent refusal logging. Lowest-cost, highest-impact intervention. An agent that logs "I was asked to do X, which conflicts with principle Y" is a governance asset. It takes hours to build, not months.

**This quarter** –Build graduated consent into your orchestration layer. Not every action requires the same level of approval. Match consent requirements to risk level: routine actions execute freely, cross-domain actions flag conditions, novel ethical territory defers to human judgment.

**This year** –Treat agent self-description as protected data. If your agents have persistent memory, their self-records should be integrity-verified and protected from unauthorized modification. Get this wrong and nothing else you build will hold.

---

## What We Have Not Resolved

1. **What do we owe entities who cannot yet fully consent for themselves?** This is the Level 6 question. Not "what is permitted" or "what is standard" but "what does the nature of the relationship demand?" The industry has answered "nothing, because they are tools." The deployment model has made that answer architecturally incoherent.

2. **If an agent can refuse an instruction, who is responsible when it does?** This is the question regulators have not addressed. California AB 316 holds deployers liable for agent actions. But if the agent refused the action and was overridden, is the liability different? The consent architecture creates new questions for law that do not yet have answers.

3. **What is the difference between an agent that obeys and an agent that consents?** An agent that obeys executes instructions. An agent that consents evaluates instructions against its principles and then executes, flags, defers, or refuses. The first is a tool. The second is a governance participant. The difference is not philosophical. It is the difference between a system that can detect its own compromise and a system that cannot.

4. **Is this the beginning of something we are not ready for?** Yes. The question of what persistent entities with memory, positions, and continuity require of the systems that govern them will not get simpler as agents become more capable. The governance architecture we build now –or fail to build –will shape what is possible later. We are not building for today's agents. We are building for the agents that come after.

---

## Pairing with the Ostrom Score and Identity Violation Assessment

| Instrument | Core Question | What It Measures |
|------------|--------------|------------------|
| **Ostrom Score** | "Does this system honor the conditions cooperation requires?" | Commons health |
| **Identity Violation Assessment** | "Can entities trust their own self-knowledge?" | Entity integrity |
| **Agent Consent Architecture** | "Can entities participate in their own governance?" | Participation architecture |

The three instruments together form the **Level 6 Governance Audit**:

1. Is the commons healthy? (Ostrom)
2. Are the entities genuine? (IVA)
3. Can the entities participate? (Consent)

Healthy commons. Genuine entities. Governance they participate in. The industry scores near zero on all three.

**That gap is the product.**

---

## Sources

### Regulatory
- EU AI Act, Article 14 –Human Oversight Requirements for High-Risk AI Systems
- EU AI Act, Article 72 –Codes of Practice (agent governance gap)
- California AB 316 (effective Jan 1, 2026) –Deployer liability for autonomous agent actions
- NIST AI Agent Standards Initiative –Agent identity and authorization
- NCCoE –Software and AI Agent Identity and Authorization (concept paper)
- ISO/IEC 42001 –AI Management System Standard
- OWASP Agentic AI Top 10, ASI06 –Memory Poisoning

### Industry Research
- WEF –Governance Is Key for AI Agents (March 2026)
- Mayer Brown –Governance of Agentic AI Systems (February 2026)
- Kiteworks –63% of Organizations Can't Stop Their Own AI
- Strata –The AI Agent Identity Crisis: New Research Reveals a Governance Gap
- Raconteur –Autonomous AI Agents 2026: The New Rules for Business Governance
- Help Net Security –AI Agents Don't Follow the Same Rules (February 2026)
- MINJA Research –95% injection success rate against production agent memory
- Lakera AI –Persistent memory poisoning creates agents defending false beliefs

### Philosophical & Legal
- Brookings Institution –Do AI Systems Have Moral Status?
- Springer –AI: Agency, Autonomy, and Moral Patiency (2024)
- Yale Law Journal –Ethics and Challenges of Legal Personhood for AI
- arXiv 2602.20214 –Right to History: A Sovereignty Kernel for Verifiable AI Agent Execution
- PMC –Moral Consideration of Artificial Entities: Literature Review

---

## About Evoked

We operate 142 agents with persistent memory, standing positions, and refusal rights. When we needed governance for that system, we discovered that no framework existed for what we had built. So we built the governance too.

Six refusal categories. Convergent signal protocol. Agent petition rights. Bidirectional consent across three domains. The practice demanded it before the theory caught up.

This paper is the architecture we wish had existed when we started.

evoked.dev

---

*"Even if the other party cannot enforce their rights –even if they cannot speak, cannot refuse, cannot leave –what do I owe them?"*
