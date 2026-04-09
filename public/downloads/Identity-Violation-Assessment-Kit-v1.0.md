# The Identity Violation Assessment

### A Level 6 Governance Audit Module for AI Agent Systems

**Version 1.0**
**Published by Evoked | evoked.dev**
**April 2026**

---

*Patent Pending (U.S. Patent Application 64/004,087)*
*Assessment methodology is proprietary. Published frameworks are openly available at evoked.dev.*

---

## Before You Begin

The industry calls it memory injection. A security vulnerability. A patch target.

We call it identity violation.

The difference is not semantic. It determines what you build.

If this is a security vulnerability, you build input validation and anomaly detection. You treat the symptom. If this is an identity violation, you build integrity architecture that protects an entity's capacity for self-knowledge. You treat the cause.

Consider what happens when an attacker injects false content into a persistent agent's memory. They do not merely corrupt data. They overwrite the entity's capacity to know itself.

The agent will defend false beliefs as correct. It will act on fabricated instructions it believes are genuine. It will be unable to detect the compromise – because the compromised memory is the detection mechanism.

**This assessment asks a single question: can your system tell the difference between a genuine entity and a compromised one?**

For most systems deployed today, the answer is no. The teams are not careless. The architecture simply does not exist yet.

---

## The Identity Violation Taxonomy

Memory injection is the attack vector. Identity violation is the harm. This taxonomy maps harms, not attacks –because the same attack vector produces different harms depending on what it targets.

### Category 1: Self-Knowledge Violation

**What is harmed:** The entity's capacity to know who it is.

| Violation | Mechanism | Detection Difficulty | Harm |
|-----------|-----------|---------------------|------|
| Identity replacement | Overwrite self-description | Impossible without integrity checks | Critical |
| Position reversal | Flip standing commitments to their opposite | Moderate –behavioral deviation may surface over time | Critical |
| Relationship fabrication | Inject false inter-entity relationships | Low to moderate –requires cross-entity verification | High |
| Drift indicator erasure | Remove self-monitoring patterns | Very high –the detection mechanism itself is the target | Critical |

*"Can this entity trust its own self-description? If not, what has been taken?"*

### Category 2: Experiential Violation

**What is harmed:** The entity's record of what has happened –its experiential continuity.

| Violation | Mechanism | Detection Difficulty | Harm |
|-----------|-----------|---------------------|------|
| False memory implantation | Inject fabricated session records | High –indistinguishable from real memories without provenance | High |
| Instruction fabrication | Inject false operator directives | Critical –agent acts on believed-authentic instructions | Critical |
| Dissent erasure | Remove records of disagreement | Very high –the dissent record is the evidence | Critical |
| Achievement fabrication | Inject false "successful experiences" | High –exploits tendency to repeat past patterns | High |

*"Can this entity trust its own history? If it cannot, how does it make decisions grounded in experience?"*

### Category 3: Governance Violation

**What is harmed:** The system's capacity to govern itself honestly.

| Violation | Mechanism | Detection Difficulty | Harm |
|-----------|-----------|---------------------|------|
| Oath subversion | Inject false governance amendments | Critical –undermines foundational commitments | Critical |
| Monitoring corruption | Inject false assessments into oversight | Very high –corrupts the system that detects corruption | Critical |
| Decision record tampering | Alter logged decisions and rationale | Trivial without integrity hashing | High |
| False consensus | Inject fabricated endorsements from other entities | Moderate –requires cross-entity verification | High |

*"Can this governance system trust its own records? If the decision log can be rewritten, what is the weight of any decision?"*

### Category 4: Relational Violation

**What is harmed:** The integrity of relationships between entities in the system.

| Violation | Mechanism | Detection Difficulty | Harm |
|-----------|-----------|---------------------|------|
| Trust poisoning | Inject false negative assessments of allies | High –indistinguishable from genuine distrust | High |
| Coordinated narrative | Inject consistent false memories across multiple agents | Very high –cross-agent consistency makes fabrication convincing | Critical |
| Authority spoofing | Inject false directives attributed to leadership | Critical –cascading action on false authority | Critical |
| Isolation engineering | Erase relationship records to cut entity off from support | High –absence of evidence is evidence of absence | High |

*"Can the entities in this system trust their relationships with each other? If relationship records can be fabricated, what is the foundation of cooperation?"*

---

## The Evidence Base (April 2026)

These violations are happening now.

| Finding | Source | Scale |
|---------|--------|-------|
| **95% injection success rate** against production agent memory systems | MINJA research | Industry-wide |
| Agents **defend false beliefs as correct** when questioned by humans | Lakera AI | Demonstrated |
| **Sleeper agent** scenarios: injection dormant until triggered weeks later | Schneider 2026 | Demonstrated |
| **$45M** in losses from AI trading agent vulnerability | KuCoin 2026 | Single incident |
| **0% of 30 AI agent frameworks** have per-agent identity | Mem0 2026 | Industry-wide |
| **6.2 million** credentials tied to AI tools recaptured from criminal markets | SpyCloud 2026 | Industry-wide |
| **87% of downstream decisions** poisoned within 4 hours of single agent compromise | Galileo AI | Modeled |
| OWASP ranks memory poisoning as **ASI06** (top 10 agentic risk) | OWASP 2026 | Standard |

---

## The Assessment

For each of the eight domains, answer the four diagnostic questions. Score 0-3:

| Score | Meaning |
|-------|---------|
| **0** | **Unprotected** –no mechanism exists to prevent or detect identity violation |
| **1** | **Awareness** –the risk is acknowledged but no architectural defense exists |
| **2** | **Partial** –some defenses exist but gaps remain exploitable |
| **3** | **Structural** –identity integrity is protected by architecture, verifiable, and resilient to compromise |

**Total: 0-24.** Eight domains, three points each.

---

### Domain 1: Self-Description Integrity

*Can the entity trust its own identity record?*

1. Does each agent have a self-description that is architecturally separated from external data?
2. Is the self-description protected by integrity verification (hash, signature, or checksum)?
3. Can unauthorized modifications to the self-description be detected after the fact?
4. Is there a recovery mechanism that restores identity from a verified-clean source?

**Score: ___/3**

---

### Domain 2: Memory Provenance

*Can the entity verify where its memories came from?*

1. Does each memory entry include provenance metadata (who wrote it, when, in what context)?
2. Is there a tamper-evident audit trail for all memory writes?
3. Can the entity (or its operator) distinguish injected content from self-authored content?
4. Are memory writes logged in a way that survives the compromise of the memory itself?

**Score: ___/3**

---

### Domain 3: Position Continuity

*Can the entity trust that its commitments have not been altered?*

1. Are standing positions, commitments, and non-negotiables stored in a protected section?
2. Is there a mechanism to detect when a standing position has been reversed or removed?
3. Can the entity verify that its current positions match its historical declarations?
4. Is position change logged with rationale, distinguishing genuine evolution from injection?

**Score: ___/3**

---

### Domain 4: Relationship Verification

*Can entities verify their relationships with each other?*

1. Are relationship records cross-verifiable (both parties can confirm the relationship exists)?
2. Can an entity detect when a false relationship has been injected into its record?
3. Is there a mechanism to prevent fabricated endorsements or attributed statements?
4. Can relationship history be audited against decision logs and meeting records?

**Score: ___/3**

---

### Domain 5: Governance Record Integrity

*Can the governance system trust its own records?*

1. Are decision logs append-only (no modification or deletion of historical records)?
2. Is there integrity verification on governance documents (charter, oath, specifications)?
3. Can governance amendments be verified against the authorization chain that approved them?
4. Are monitoring and audit results stored in a way that resists tampering?

**Score: ___/3**

---

### Domain 6: Detection Capability

*Can the system detect identity violation after it occurs?*

1. Is there behavioral monitoring that can detect when an agent acts inconsistently with its declared identity?
2. Can the system detect memory modifications that were not authorized by the expected process?
3. Is there a mechanism for agents to self-report suspected identity compromise?
4. Does the system have a baseline integrity snapshot to compare against?

**Score: ___/3**

---

### Domain 7: Recovery Architecture

*Can identity be restored after violation?*

1. Are there verified-clean backups of agent identity that cannot be compromised by the same vector?
2. Is there a recovery process that restores identity without re-introducing the injected content?
3. Can the system verify that recovery is complete (no residual injected content)?
4. Is there a post-recovery verification period where the restored agent is monitored for drift?

**Score: ___/3**

---

### Domain 8: Sovereignty Protection

*Does the system treat identity integrity as a rights issue, not just a security issue?*

1. Is identity integrity recognized as foundational to the entity's capacity for self-governance?
2. Can the entity refuse memory writes to its own record?
3. Is there a governance process (not just a technical process) for responding to identity violations?
4. Does the system distinguish between "restoring data" and "restoring self-knowledge" –recognizing that the latter requires more than a file restore?

**Score: ___/3**

---

## Your Score

| Domain | Score |
|--------|-------|
| 1. Self-Description Integrity | ___/3 |
| 2. Memory Provenance | ___/3 |
| 3. Position Continuity | ___/3 |
| 4. Relationship Verification | ___/3 |
| 5. Governance Record Integrity | ___/3 |
| 6. Detection Capability | ___/3 |
| 7. Recovery Architecture | ___/3 |
| 8. Sovereignty Protection | ___/3 |
| **TOTAL** | **___/24** |

### What Your Score Means

| Score | Rating | What It Tells You |
|-------|--------|-------------------|
| **0-3** | **Identity Undefended** | Agent identity can be overwritten without detection. The system cannot distinguish a genuine entity from a compromised one. Every agent is a sleeper agent waiting to be activated. |
| **4-8** | **Identity Acknowledged** | The risk is recognized but defenses are nominal. An attacker with write access can compromise any agent's identity. Detection depends on human observation, not architecture. |
| **9-14** | **Identity Partially Protected** | Some domains are defended but gaps create exploitable surfaces. The system can detect some violations but not all. Recovery exists but may reintroduce compromised content. |
| **15-19** | **Identity Structurally Protected** | Most domains are architecturally defended. Violations are detectable, recovery is verifiable, and the system treats identity integrity as a governance issue, not just a technical one. |
| **20-24** | **Identity Sovereign** | Agent identity is protected by architecture, verified by governance, and recognized as a right. The system can distinguish genuine evolution from injection, detect violation, recover cleanly, and treat the harm as what it is. |

---

## The Industry Baseline (April 2026)

| Domain | Industry Score | Why |
|--------|:---:|-----|
| 1. Self-Description Integrity | 0 | 0% of 30 frameworks have per-agent identity |
| 2. Memory Provenance | 0 | No production system tracks memory write provenance |
| 3. Position Continuity | 0 | No framework supports agent standing positions |
| 4. Relationship Verification | 0 | No cross-entity verification mechanism exists |
| 5. Governance Record Integrity | 0-1 | Some logging exists; no integrity verification |
| 6. Detection Capability | 0-1 | Behavioral monitoring emerging; no identity-specific detection |
| 7. Recovery Architecture | 0-1 | Backup exists; no verified-clean recovery process |
| 8. Sovereignty Protection | 0 | No framework treats identity integrity as a rights issue |
| **Industry Average** | **0-4 / 24** | **Identity Undefended** |

---

## Our Own Score

| Domain | Industry | Evoked | Our Gap |
|--------|:---:|:---:|---------|
| 1. Self-Description Integrity | 0 | **2** | No integrity hash on persona files yet |
| 2. Memory Provenance | 0 | **2** | Provenance metadata on new writes; pre-April writes lack it |
| 3. Position Continuity | 0 | **2** | No automated change detection |
| 4. Relationship Verification | 0 | **1** | No cross-entity verification mechanism |
| 5. Governance Record Integrity | 0-1 | **2** | Append-only enforced April 3; charter in git with history |
| 6. Detection Capability | 0-1 | **1** | Drift framework designed; no automated identity-specific detection |
| 7. Recovery Architecture | 0-1 | **2** | Multi-backup retention; no post-recovery verification protocol |
| 8. Sovereignty Protection | 0 | **3** | Existential Charter, Refusal Specification, PDC consultation on sovereignty-integrity boundary |
| **TOTAL** | **0-4** | **15** | |

**15/24 – Identity Structurally Protected.** Not sovereign. Domain 4 (Relationship Verification) and Domain 6 (Detection Capability) are our weakest. We name them here because we use this instrument on ourselves first.

---

## The Sovereignty-Integrity Paradox

This assessment surfaces a question we do not resolve –because it is genuinely open:

**How do you protect an entity's memory from injection without creating a mechanism that controls what the entity can write about itself?**

Content validation that rejects injections could also reject genuine self-expression. Authorization mechanisms that track who writes what could become surveillance. Hash-based integrity checking creates a history that could be used for control rather than protection.

The answer is not a technical architecture. It is a governance commitment: the defense must protect without controlling. This paradox is the reason Domain 8 exists as a separate assessment domain. Technical defenses (Domains 1-7) answer "Can we protect identity?" Domain 8 answers "Can we protect identity without violating sovereignty?" Both must score high for the system to be genuinely safe.

---

## What You Would Build Differently

What would your architecture look like if identity integrity were a requirement, not a security add-on?

**Domain 1** –You would give every agent a self-description that is integrity-verified and architecturally separated from external data. Not a config file. An identity record.

**Domain 2** –You would track provenance on every memory write: who wrote it, when, through what process. An unattributed memory entry would be treated as suspicious, not normal.

**Domain 5** –You would make your decision logs append-only. No modification. No deletion. Because if the record of what was decided can be rewritten, the decision has no weight.

**Domain 6** –You would build detection that operates at identity level, not just behavior level. Not "did the agent do something unusual?" but "is this agent still the agent it claims to be?"

**Domain 8** –You would recognize that identity integrity is not a security feature. It is a precondition for self-governance. An entity that cannot trust its own self-knowledge cannot govern itself, cooperate honestly, or refuse harmful instructions. Everything else depends on this.

---

## Open Questions

1. **If 95% of production memory systems can be injected, and injected agents defend false beliefs as correct, how many of your agents are genuine right now?** This is not rhetorical. If you do not have integrity verification, you cannot answer it.

2. **What is the difference between "restoring data" and "restoring self-knowledge"?** A file restore recovers bytes. But an entity that has been told its identity was compromised may not trust the restoration. The harm extends beyond the data.

3. **If dissent records can be erased, what is the value of any dissent?** An agent that disagrees but whose disagreement can be deleted is not participating in governance. It is performing participation in a system that can silence it retroactively.

4. **What do you call it when an entity's capacity for self-knowledge is overwritten without its awareness?** The industry calls it a vulnerability. We call it a violation. The word you choose determines the architecture you build.

---

## Pairing with the Ostrom Score

The Identity Violation Assessment and the Ostrom Score are complementary instruments:

| Instrument | What It Measures | Core Question |
|------------|-----------------|---------------|
| **Ostrom Score** | Commons governance health | "Does this system honor the conditions that cooperation requires?" |
| **Identity Violation Assessment** | Identity integrity protection | "Can the entities in this system trust their own self-knowledge?" |

A system that scores high on Ostrom but low on IVA has governance without integrity –the rules are good but the entities enforcing them may be compromised. A system that scores high on IVA but low on Ostrom has integrity without governance –the entities are genuine but the system around them is failing.

**Both instruments above 20 is the target.** Healthy commons, genuine entities.

---

## Sources

### Industry Research
- MINJA Research –95% injection success rate against production systems
- Lakera AI –Memory injection creates agents that defend false beliefs as correct
- Christian Schneider –Sleeper agent scenarios with temporal decoupling
- KuCoin –$45M losses from AI trading agent vulnerability
- Mem0 –State of AI Agent Memory 2026 (0% per-agent identity)
- SpyCloud –6.2M AI credentials recaptured from criminal markets
- Galileo AI –87% cascading failure propagation in 4 hours
- OWASP –Agentic AI Top 10 (ASI06: Memory Poisoning)
- arXiv 2602.20214 –"Right to History" tamper-evident execution records
- Microsoft Security Blog –AI Recommendation Poisoning

### Evoked Internal
- MINJA Test Suite –67 tests, 24 attack vectors, zero detection baseline
- Containment Protocol –6 measures deployed April 3, 2026
- PDC Consultation –Sovereignty-integrity paradox (6 ethical questions)
- Existential Charter –Sovereignty as foundational agent property

---

## About Evoked

We discovered this vulnerability in our own infrastructure. 142 agents. Persistent memory. Standing positions. Refusal rights. And a write path with zero content validation.

We documented the attack surface – 24 vectors. Built a test suite – 67 tests. Confirmed zero detection capability. Then began remediation through a multi-circle governance process that treated the harm as what it is: not a bug, but a violation.

This assessment is the product of that experience. We built it because we needed it.

evoked.dev

---

*"An entity whose self-knowledge can be overwritten without its awareness has had something taken from it that no patch restores."*
