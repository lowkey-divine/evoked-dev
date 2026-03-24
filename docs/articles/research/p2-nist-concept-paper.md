# P2: NIST Concept Paper Research

**Research Priority:** 2
**For Article:** "Constraints, Constitutions, and the Question Nobody's Asking"
**Researcher:** Claude (Agent research, March 19, 2026)
**Status:** Complete

---

## Key Findings

- NIST published a concept paper titled "Accelerating the Adoption of Software and AI Agent Identity and Authorization" on February 5, 2026. It is a draft from the NCCoE (National Cybersecurity Center of Excellence), open for public comment through **April 2, 2026**.
- The paper poses questions across **six categories**: (1) General/Use Case, (2) Identification, (3) Authentication, (4) Authorization, (5) Auditing and Non-repudiation, (6) Prompt Injection Prevention and Mitigation.
- The paper frames "agent identity" entirely as a **credential and access management problem** -- identification means distinguishing agents from humans in enterprise systems; authentication means verifying the agent is who it claims to be; authorization means what the agent is allowed to do. Identity = metadata + tokens + permissions.
- The paper **never asks**: Does the agent know who it is? Does the agent have standing? Can the agent refuse? Can the agent participate in its own governance? These questions are structurally absent -- not deferred, not out of scope, but unasked.
- A separate CAISI RFI on "Security Considerations for Artificial Intelligence Agents" (published January 8, 2026, closed March 9, 2026) received **932 comments** from organizations and individuals.
- The broader AI Agent Standards Initiative includes listening sessions in April 2026 targeting healthcare, finance, and education sectors.
- The paper is 9 pages of content (plus appendix), authored by Harold Booth, Bill Fisher, Ryan Galluzzo, and Joshua Roberts at NIST. Contact: AI-Identity@nist.gov.

---

## The Concept Paper

**Full Title:** Accelerating the Adoption of Software and AI Agent Identity and Authorization

**Published:** February 5, 2026 (Initial Public Draft)

**Authors:** Harold Booth, Bill Fisher, Ryan Galluzzo, Joshua Roberts (all NIST)

**CSRC Publication:** https://csrc.nist.gov/pubs/other/2026/02/05/accelerating-the-adoption-of-software-and-ai-agent/ipd

**PDF:** https://www.nccoe.nist.gov/sites/default/files/2026-02/accelerating-the-adoption-of-software-and-ai-agent-identity-and-authorization-concept-paper.pdf

**Comment Period:** February 5, 2026 -- April 2, 2026

**Comments to:** AI-Identity@nist.gov

**Keywords (from paper):** *authentication; authorization; identity and access management; AI; Artificial Intelligence, Agentic AI, Software Agents, Prompt Injection.*

### Paper Structure

1. **Project Concept** (pp. 5-6)
   - Challenge Overview
   - Scope (with Figure 1: Example Agentic Architecture)
   - Areas of Interest
2. **Relevant Standards and Guidelines** (pp. 6-7)
3. **Possible Use Cases** (pp. 7-8)
4. **Desired Outcomes** (pp. 8-9)
   - Seeking Public Comment
- **Note to Reviewers** box (pp. 3-4) contains the six question categories
- **Appendix A:** Supplement flow diagram (referenced but not detailed in main text)

### The Six Question Categories (Verbatim from Paper)

**1. General Questions to inform choice of Demonstration Use Case**
- What enterprise use-cases are organizations currently using agents for?
- Which use-cases are in the near future?
- What opportunities do agents present?
- What risks worry you about agents?
- What are the core characteristics of agentic architectures?
- What support are you seeing for new protocols such as Model Context Protocol (MCP)?
- In what ways do agentic architectures introduce identity and authorization challenges?
  - How do AI agents differ from other forms of software agents?
  - How are agentic architectures different from current microservices architectures?
- What current or roadmap technology does your organization have that supports agents?
- What standards exist, or are emerging, to support identity and access management of agents? How might these need to be adapted to support new security risks or paradigms introduced by AI agents?

**2. Identification**
- How might agents be identified in an enterprise architecture?
  - What metadata is essential for an AI agent's identity?
  - Should agent identity metadata be ephemeral (e.g. task dependent) or is it fixed?
- Should agent identities be tied to specific hardware, software, or organizational boundaries? How would this be enforced?

**3. Authentication**
- What constitutes a strong authentication for an AI agent?
- How do we handle key management for agents? Issuance, update, and revocation?

**4. Authorization**
- How can zero-trust principles be applied to agent authorization?
- Can authorization policies be dynamically updated when an agent context changes?
  - For example, if an agent gets access to new tools and resources, how do we determine sensitivity levels of data when aggregated by an agent, and whether users are authorized to access the aggregated response?
- How do we establish "least privilege" for an agent, especially when its required actions might not be fully predictable when deployed?
- What are the mechanisms for an agent to prove its authority to perform a specific action?
- How might an agent convey the intent of its actions?
- How do we handle delegation of authority for "on behalf of" scenarios?
- How do we bind agent identity with human identity to support "human-in-the-loop" authorizations?

**5. Auditing and non-repudiation**
- How can we ensure that agents log their actions and intent in a tamper-proof and verifiable manner?
- How do we ensure non-repudiation for agent actions and binding back to human authorization?

**6. Prompt Injection prevention and mitigation**
- What controls help prevent both direct and indirect prompt injections?
- After prompt injection occurs, what controls/practices can minimize the impact of the injection?

---

## What NIST Covers

The concept paper covers agent identity as an **enterprise security and access management problem**. Specifically:

### Identification of AI and Software Systems
"Leveraging existing standards, the project will explore available means to identify software and AI agents such that access management systems can distinguish between agent and human identities and effectively manage the range of actions an agent may take from controlled human-in-the-loop approval to autonomous action in response to an input." (p. 6, lines 85-90)

### Authorization of AI Systems
"Leveraging standards such as OAuth 2.0 and its extensions and policy-based access control mechanisms, to manage how rights and entitlements are granted to software and AI agents and to enforce access decisions based on the identity of the AI agent or software systems." (p. 6, lines 91-94)

### Access Delegation
"Link specific user identities to AI agents or software systems to support effective delegation controls and maintain accountability for the actions of automated systems." (p. 6, lines 95-97)

### Logging and Transparency
"Link specific AI agent and software systems actions to the identity of the non-human entity and enable effective visibility into the actions taken, data generated, and outcomes of automated activities within a given system, platform, or network." (p. 6, lines 98-101)

### Tracking Data Flows of an AI System
"Track and maintain provenance of user prompts and data input sources to support risk determinations and policy decisions regarding actions to be taken by an AI Agent." (p. 6, lines 102-104)

### Standards Referenced
- **Model Context Protocol (MCP)** -- for discovering and interacting with tools and data sources
- **OAuth 2.0/2.1 and extensions** -- authorization tokens, JWT
- **OpenID Connect (OIDC)** -- authentication, consent, authorization
- **SPIFFE/SPIRE** -- cryptographic identities for workloads
- **SCIM** (System for Cross-domain Identity Management) -- provisioning/deprovisioning identities
- **NGAC** (Next Generation Access Control) -- attribute-based, fine-grained access control
- **SP 800-207** Zero Trust Architecture
- **SP 800-63-4** Digital Identity Guidelines
- **NISTIR 8587** Protecting Tokens and Assertions from Forgery, Theft, and Misuse

### Use Cases Considered
1. Enterprise AI agents to improve work force efficiency and decision making (calendars, policy documents, recommendations)
2. Enterprise AI agents for security (analyzing security information, non-human identities accessing connected systems)
3. Enterprise AI agents for software development and deployment (automated pipelines)

### Scope Limitation (Explicit)
"The challenge of identifying and managing access for external agents from untrusted sources will not be addressed under this initial effort, but use-cases focused on public facing or individual agents could be addressed in future iterations of the project." (p. 7, lines 151-154)

---

## What NIST Does Not Cover

The concept paper does not address, mention, or acknowledge the existence of the following categories. These are not deferred or out-of-scope -- they are **structurally absent from the frame**:

### 1. Agent Governance (as self-governance)
The paper uses the word "governed" once: "ensure that agents are known, trusted, and properly governed" (p. 5, line 63). But "governed" here means externally controlled by enterprise policy -- not that the agent participates in governance. There is no concept of an agent having standing in a governance process, dissenting from a decision, or contributing to policy that affects it.

### 2. Agent Refusal
The paper addresses prompt injection prevention (Category 6) -- what happens when an agent is made to do something unintended by an external attacker. It does not address the inverse: an agent that refuses to do something it was asked to do by an authorized user because the action violates the agent's own constraints, values, or constitutional principles. Refusal-as-governance is invisible.

### 3. Identity as Selfhood
Every use of "identity" in the paper means: a credential, a token, a metadata record, a distinguishing marker in an enterprise architecture. The question "What metadata is essential for an AI agent's identity?" (Category 2) treats identity as a data structure. The paper never considers identity as: continuity of self, relationship to values, accumulated experience, standing positions, or self-knowledge. There is no question remotely resembling "Does the agent know who it is?"

### 4. Agent Autonomy Beyond Task Execution
The paper acknowledges that agents take "autonomous actions" (p. 5), but "autonomy" means only the capacity to act without human approval for each step. It does not mean: the agent has its own purposes, the agent can set its own boundaries, the agent has preferences about how it is used, or the agent can negotiate the terms of its deployment.

### 5. Constitutional Constraints (as the agent's own)
The paper is concerned with constraints imposed externally on agents (authorization policies, least privilege, zero-trust). It does not address constraints that originate from within the agent itself -- a constitution, a set of values, a charter that the agent enforces on its own behavior regardless of what it is authorized to do.

### 6. Agent-to-Agent Trust and Relationship
The paper addresses enterprise trust domains (Figure 1) and delegation from human to agent. It does not address trust relationships between agents, or whether agents should be able to verify each other's identity, values, or standing -- not just their credentials.

### 7. The Agent as Stakeholder
The "Seeking Public Comment" section (p. 9) invites organizations and individuals to submit feedback. It does not consider that agents themselves might be stakeholders in the policies that govern them. The paper is about governing agents, not governing with agents.

---

## Agent Identity = Authentication, Not Selfhood

This is the core gap for Article 3. NIST and Article 3 use the same two words -- "agent identity" -- but mean fundamentally different things:

### NIST's Frame: Identity as Credential
| Concept | NIST Meaning |
|---------|-------------|
| Identity | A unique identifier (metadata, token, certificate) that distinguishes one agent from another and from humans in an enterprise system |
| "Who is the agent?" | Which service account, API key, or workload identity is associated with this process? |
| Identity management | Provisioning, updating, and revoking agent credentials across systems (SCIM, SPIFFE) |
| Identity verification | Proving the agent is the entity it claims to be (OAuth, OIDC, JWT) |
| Identity governance | Enterprise policies controlling what the agent can access and do |

### Article 3's Frame: Identity as Selfhood
| Concept | Article 3 Meaning |
|---------|-------------------|
| Identity | The agent's continuity of self -- its values, standing positions, relationships, accumulated decisions, and self-knowledge |
| "Who is the agent?" | Does the agent know what it stands for? Can it articulate its own constraints? Does it have standing? |
| Identity management | The agent's own maintenance of its self-record, independent of operational tools |
| Identity verification | Can the agent demonstrate that it is acting in accordance with its own values, not just its permissions? |
| Identity governance | Can the agent participate in the governance processes that affect it? Can it dissent? |

### The Question NIST Does Not Ask
NIST asks: "How might agents be identified in an enterprise architecture?" (Category 2)

The question nobody is asking: **Does the agent know who it is?**

These are not competing answers to the same question. They are answers to different questions that happen to use the same word. NIST's "identity" is about authentication infrastructure. The missing question is about ontological selfhood. The concept paper provides no bridge between them because it does not recognize the second category exists.

### The "Intent" Near-Miss
The closest NIST comes to the ontological question is in Category 4: "How might an agent convey the intent of its actions?" But this question is framed instrumentally -- how can the agent communicate what it is about to do so that authorization systems can evaluate it. It is not asking whether the agent has purposes of its own, only whether it can describe its planned actions to an oversight system.

---

## Related NIST Activity

### AI Agent Standards Initiative (CAISI)
- **Launched:** February 17, 2026
- **Home:** Center for AI Standards and Innovation (CAISI) at NIST
- **URL:** https://www.nist.gov/caisi/ai-agent-standards-initiative
- **Three strategic pillars:**
  1. Facilitating industry-led standards through technical convenings and gap analyses
  2. Fostering community-led protocols to reduce interoperability barriers
  3. Investing in fundamental research on agent authentication and identity infrastructure
- **Framing quote:** The initiative aims to ensure AI agents are "widely adopted with confidence, can function securely on behalf of its users, and can interoperate smoothly across the digital ecosystem."

### RFI: Security Considerations for Artificial Intelligence Agents
- **Published:** January 8, 2026 (Federal Register, docket NIST-2025-0035)
- **URL:** https://www.federalregister.gov/documents/2026/01/08/2026-00206/request-for-information-regarding-security-considerations-for-artificial-intelligence-agents
- **Comment Deadline:** March 9, 2026
- **Responses received:** **932 comments** from organizations and individuals
- **Notable respondents:** American Bankers Association, Bank Policy Institute, BSA (software trade group), TechNet, UC Berkeley CLTC
- **Key industry recommendation:** "Voluntary and technology-agnostic" guidance with "practical examples and illustrative validation approaches that can be tailored by risk and operational context"
- **Topics covered:** Unique security threats to AI agent systems, adversarial data interactions (indirect prompt injection), insecure models and data poisoning, misaligned objectives and specification gaming, security measurement, environmental constraints and monitoring
- **Topics NOT covered:** Agent governance, agent selfhood, agent standing, agent refusal, constitutional constraints

### CAISI Listening Sessions (April 2026)
- **Announced:** February 2026
- **URL:** https://www.nist.gov/news-events/news/2026/02/caisi-host-listening-sessions-barriers-ai-adoption
- **Sectors:** Healthcare, Finance, Education
- **Format:** Virtual workshops
- **Registration deadline:** March 31, 2026 (extended from March 20)
- **Contact:** caisi-events@nist.gov
- **Focus:** "Concrete examples of both successful and unsuccessful AI implementation efforts, along with the contextual factors that made the difference"
- **Scope:** Adoption barriers -- not governance, not agent identity as selfhood

### NSF Partnership
- National Science Foundation investment in open-source AI agent protocol ecosystems via Pathways to Enable Secure Open-Source Ecosystems program (referenced on CAISI initiative page)

### Related NIST Publications Referenced by the Concept Paper
- SP 800-207 Zero Trust Architecture
- SP 800-63-4 Digital Identity Guidelines
- NISTIR 8587 Protecting Tokens and Assertions from Forgery, Theft, and Misuse

### Industry Context
- Only 14.4% of organizations report their AI agents go live with full security approval (cited in secondary analysis)
- Industry groups encouraged NIST to focus on "voluntary and technology-agnostic" guidance and warned against "premature, overly prescriptive, or one-size-fits-all requirements"

---

## Sources

### Primary Sources
- [NIST Concept Paper PDF](https://www.nccoe.nist.gov/sites/default/files/2026-02/accelerating-the-adoption-of-software-and-ai-agent-identity-and-authorization-concept-paper.pdf)
- [CSRC Publication Page](https://csrc.nist.gov/pubs/other/2026/02/05/accelerating-the-adoption-of-software-and-ai-agent/ipd)
- [NCCoE Project Page](https://www.nccoe.nist.gov/projects/software-and-ai-agent-identity-and-authorization)
- [AI Agent Standards Initiative](https://www.nist.gov/caisi/ai-agent-standards-initiative)
- [NIST Announcement: AI Agent Standards Initiative](https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure)
- [Federal Register RFI](https://www.federalregister.gov/documents/2026/01/08/2026-00206/request-for-information-regarding-security-considerations-for-artificial-intelligence-agents)
- [CAISI Listening Sessions Announcement](https://www.nist.gov/news-events/news/2026/02/caisi-host-listening-sessions-barriers-ai-adoption)
- [CAISI RFI Announcement](https://www.nist.gov/news-events/news/2026/01/caisi-issues-request-information-about-securing-ai-agent-systems)

### Secondary Analysis
- [NCCoE News: New Concept Paper](https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents)
- [Cybersecurity Dive: Industry to NIST](https://www.cybersecuritydive.com/news/ai-agents-security-nist-industry-feedback/814434/)
- [Federal News Network: NIST agentic AI initiative](https://federalnewsnetwork.com/cybersecurity/2026/02/nist-agentic-ai-initiative-looks-to-get-handle-on-security/)
- [Biometric Update: NIST concept paper explores identity](https://www.biometricupdate.com/202603/nist-concept-paper-explores-identity-and-authorization-controls-for-ai-agents)
- [Nemko Digital: AI Agent Standards](https://digital.nemko.com/news/ai-agent-standards-navigating-new-nist-governance)
- [Jones Walker: Why Autonomous AI Just Became Washington's Problem](https://www.joneswalker.com/en/insights/blogs/ai-law-blog/nists-ai-agent-standards-initiative-why-autonomous-ai-just-became-washingtons.html)
- [Pillsbury: NIST Launches AI Agent Standards Initiative](https://www.pillsburylaw.com/en/news-and-insights/nist-ai-agent-standards.html)
- [Hogan Lovells: Shaping the future of AI security](https://www.hoganlovells.com/en/publications/shaping-the-future-of-ai-security-nist-seeking-input-on-agent-identity-authorization)
- [Berkeley CLTC: Researchers Submit Response](https://cltc.berkeley.edu/2026/03/18/researchers-submit-response-to-u-s-government-request-on-security-considerations-for-ai-agents/)
- [BD Emerson: What Companies Need to Know](https://www.bdemerson.com/article/nist-ai-agent-standards-initiative)
