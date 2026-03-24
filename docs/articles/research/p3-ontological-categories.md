# P3: Ontological Categories Research

**Research for Article 3: "Constraints, Constitutions, and the Question Nobody's Asking"**
**Priority 3 — Ontological Categories (Visa, Mastercard, Red Hat)**
**Compiled: March 19, 2026**

---

## Key Findings

- The industry defines AI agents through three ontological lenses: **economic actor** (Visa), **commerce participant** (Mastercard), and **security principal** (Red Hat). A fourth lens from alignment research treats agents as **alignment targets**. None of these ask whether the agent is a moral entity with standing.
- Visa's TAP defines an agent as an authenticated transaction executor acting on behalf of a consumer. The agent's identity is a cryptographic credential — it exists to prove it is not a bot and to carry payment intent.
- Mastercard's Verifiable Intent defines an agent as a delegated commerce participant whose authorization must be tamper-resistant and traceable. The agent exists to faithfully execute consumer instructions within constrained bounds.
- Red Hat's Zero Trust framework defines an agent as a security principal requiring continuous authentication at every hop. The agent exists as a workload needing identity verification and token scoping.
- In all three frameworks, the agent has no capacity to refuse, no standing to dissent, no governance over its own behavior, and no selfhood. It is an instrument — economic, commercial, or computational — never a subject.
- The quote that crystallizes the security framing: "Agent-to-agent (A2A) and model context protocol (MCP) interactions create sophisticated workflows, but also introduce new trust boundaries." (Red Hat, Feb 2026)
- The quote that crystallizes the commerce framing: "Agentic commerce will only scale at the speed of trust." (Sherri Haymond, Mastercard EVP)
- The missing question across all three: Can the agent say no? Should it? To whom is it accountable as an entity — not as a credential, not as a token, not as a workload?

---

## Visa Trusted Agent Protocol (TAP)

### What It Is

Visa's Trusted Agent Protocol (TAP) is an open framework for agentic commerce, announced October 14, 2025, with over 10 launch partners. It uses **cryptographically signed HTTP messages** built on the **RFC 9421 HTTP Message Signatures standard** to enable AI agents to prove their identity and authorization when transacting with merchants on behalf of consumers.

Technical architecture:
- Agents receive unique cryptographic keys after being vetted through Visa's **Intelligent Commerce (VIC)** program
- Each agent request includes a **signature** with timestamps, a unique session identifier, key identifier, and algorithm identifier
- Merchants validate signatures using Visa's public keys, confirming agent authenticity
- Signatures are domain-bound (specific to merchant and purpose), time-bound, and replay-resistant
- Built on existing web infrastructure — no new transport protocol required
- The RFC 9421 signature consists of two HTTP headers: `signature-input` (metadata) and `signature` (signature value)
- Open-sourced on GitHub: `visa/trusted-agent-protocol`

Developed in collaboration with Cloudflare. Early adopters include Nuvei, Adyen, and Stripe. Over 100 partners worldwide; over 30 actively building in the VIC sandbox; over 20 agents and agent enablers integrating directly.

### What It Covers

- **Agent authentication**: Distinguishing legitimate AI agents from malicious bots at checkout
- **Transaction authorization**: Proving that an agent is approved for its specific shopping mission (browsing or payment)
- **Consumer visibility**: Providing merchants visibility into the consumer behind the agent
- **Payment data security**: Securely passing payment information through a merchant's preferred checkout flow
- **Replay prevention**: Timestamps, nonces, and domain-binding prevent signature reuse
- **Vetting compliance**: Agents must pass through the Visa Intelligent Commerce program before receiving keys

### What It Does NOT Cover

- **Agent governance**: No framework for how agents should make decisions, handle conflicts, or manage competing instructions
- **Agent refusal**: No mechanism for an agent to decline a transaction on ethical, safety, or contextual grounds independent of its delegating consumer
- **Agent selfhood or identity as being**: Identity is purely cryptographic — a key pair, not a self. The agent's "identity" is its credential, not its character, history, or standing
- **Behavioral constraints beyond authorization scope**: The protocol verifies WHAT the agent is authorized to do, not WHETHER it should do it
- **Accountability for agent decisions**: The agent is a pass-through; moral and legal accountability rests entirely with the consumer and the platform
- **Inter-agent relationships or governance**: No concept of agent-to-agent trust beyond cryptographic verification
- **Agent wellbeing, autonomy, or rights**: Entirely absent from the protocol's conceptual universe

### How Visa Defines the Agent

Visa defines the agent as an **authenticated economic actor** — a credentialed transaction participant that operates on behalf of a consumer. Specifically:

- An agent is something that must be **distinguished from a bot**: "an open framework designed on existing web infrastructure that enables safe agent-driven checkout by helping merchants to distinguish between malicious bots and legitimate AI agents acting on behalf of consumers" (Visa press release, Dec 2025)
- An agent is a **vetted program participant**: "Agents go through Visa's Intelligent Commerce vetting program to meet trust standards, and each gets a unique cryptographic key." An agent's public key associated with Visa "would imply the Agent's participation in (and compliance with) Visa Intelligent Commerce program requirements."
- An agent is a **transaction executor**: It can "autonomously search, compare, and execute payments on behalf of consumers"
- An agent's identity IS its credential — there is no concept of agent identity beyond the cryptographic attestation

The ontological category: **economic actor / authorized transaction instrument**.

### Sources

- [Visa Introduces Trusted Agent Protocol (Investor Press Release, Oct 2025)](https://investor.visa.com/news/news-details/2025/Visa-Introduces-Trusted-Agent-Protocol-An-Ecosystem-Led-Framework-for-AI-Commerce/default.aspx)
- [Visa and Partners Complete Secure AI Transactions (Dec 2025)](https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.21961.html)
- [Visa Developer — TAP Overview](https://developer.visa.com/capabilities/trusted-agent-protocol/overview)
- [Visa Developer — TAP Specifications](https://developer.visa.com/capabilities/trusted-agent-protocol/trusted-agent-protocol-specifications)
- [GitHub: visa/trusted-agent-protocol](https://github.com/visa/trusted-agent-protocol)
- [RFC 9421 HTTP Message Signatures — DeepWiki](https://deepwiki.com/visa/trusted-agent-protocol/5.1-rfc-9421-http-message-signatures)
- [Oscilar: Visa's TAP and the Future of Agentic Commerce](https://oscilar.com/blog/visatap)
- [Cloudflare: Securing Agentic Commerce with Visa and Mastercard](https://blog.cloudflare.com/secure-agentic-commerce/)

---

## Mastercard Verifiable Intent

### What It Is

Verifiable Intent is an **open-source cryptographic framework** co-developed by Mastercard and Google, announced March 5, 2026. It creates a **tamper-resistant record** of what a user authorized when an AI agent acts on their behalf. Built as a **layered SD-JWT (Selective Disclosure JSON Web Token) credential format** — a cryptographic delegation chain that binds identity, intent, and action with role-scoped selective disclosure.

Technical architecture:
- Built on standards from **FIDO Alliance, EMVCo, IETF, and W3C**
- Uses **Selective Disclosure** — shares only the minimum information needed with each party, enough to verify authorization or resolve a dispute, not more
- Links three elements into a single immutable record: **(1)** the consumer's identity, **(2)** their original instructions, and **(3)** the outcome of the transaction
- Supports two modes: **Immediate** (human-present, user signs final checkout) and **Autonomous** (delegated, user signs constraints up front, agent operates within bounds)
- Aligned with Google's **Agent Payments Protocol (AP2)** and **Universal Commerce Protocol (UCP)**, designed to be protocol-agnostic
- Open-sourced on GitHub (`agent-intent/verifiable-intent`) and at `verifiableintent.dev`
- Will be integrated into **Mastercard Agent Pay's intent APIs**

Part of a broader ecosystem: Mastercard's **Agent Pay Acceptance Framework** requires agents to register and receive **agentic tokens** — dynamic, cryptographically secure credentials — before transacting on the Mastercard network. This includes a **"Know Your Agent" (KYA)** process analogous to KYC.

Industry support: Google, Fiserv, IBM, Checkout.com, Basis Theory, Getnet, Adyen, Worldpay.

### What It Covers

- **Authorization provenance**: Tamper-resistant proof that a consumer authorized the specific transaction an agent executed
- **Intent verification**: Capturing and preserving the consumer's original instructions so they can be verified against outcomes
- **Selective disclosure / privacy**: Sharing only minimum information needed per party — enough for verification or dispute resolution
- **Dispute resolution**: Creating an auditable record of what was authorized vs. what was executed
- **Agent registration and vetting**: "Know Your Agent" — agents must register, be verified, and receive cryptographic tokens before transacting
- **Delegation constraints**: In autonomous mode, users define bounds up front; agents must operate within them
- **Cross-ecosystem interoperability**: Protocol-agnostic design, aligned with AP2, UCP, and OpenAI's Agentic Commerce Protocol

### What It Does NOT Cover

- **Agent governance or decision-making framework**: No specification for how an agent decides between competing options, weighs tradeoffs, or exercises judgment within its authorized scope
- **Agent refusal**: No mechanism for an agent to refuse an authorized transaction on grounds the framework does not model (ethical concern, harm potential, contextual inappropriateness)
- **Agent identity as selfhood**: Identity is a credential chain — consumer identity + delegation + token — not agent identity in any ontological sense. The agent has no identity of its own; it carries the consumer's delegated identity
- **Behavioral accountability**: The framework verifies authorization, not wisdom. An agent that faithfully executes a harmful-but-authorized instruction is compliant by design
- **Agent-to-agent relationships**: No concept of agent standing relative to other agents
- **Agent rights, welfare, or moral status**: Entirely outside the framework's scope

### How Mastercard Defines the Agent

Mastercard defines the agent as a **delegated commerce participant** — a trusted intermediary that executes consumer-authorized transactions within verifiable constraints. Specifically:

- An agent is a **registered and verified transactor**: "Mastercard's Agent Pay Acceptance Framework begins by registering and verifying AI agents before they are permitted to transact on the Mastercard network."
- An agent is an **identity-carrier, not an identity-holder**: Verifiable Intent links the consumer's identity, their instructions, and the transaction outcome. The agent's own identity exists only as a credential within this chain.
- An agent is a **trust-gated participant**: "Agentic commerce will only scale at the speed of trust." — Sherri Haymond, Mastercard EVP of Global Digital Commercialization
- An agent needs to be **known**: Institutions must "know your agent" before allowing it to transact, paralleling customer verification regimes. The KYA process treats agent identity as a compliance requirement, not an ontological fact.
- An agent is something that has moved **"from recommend to act"**: Mastercard frames the shift from recommendation systems to autonomous actors as an operational upgrade, not an ontological transition.

The ontological category: **commerce participant / delegated trust instrument**.

### Sources

- [Mastercard: How Verifiable Intent Builds Trust in Agentic AI Commerce (Mar 2026)](https://www.mastercard.com/global/en/news-and-trends/stories/2026/verifiable-intent.html)
- [Mastercard: Building Trust in AI Commerce — Agentic Protocols (2026)](https://www.mastercard.com/us/en/news-and-trends/stories/2026/agentic-commerce-rules-of-the-road.html)
- [Mastercard: Trusting AI to Buy — Agentic Commerce Standards (2026)](https://www.mastercard.com/global/en/news-and-trends/stories/2026/agentic-commerce-standards.html)
- [Mastercard: Agentic Token Framework (2025)](https://www.mastercard.com/global/en/news-and-trends/stories/2025/agentic-commerce-framework.html)
- [GitHub: agent-intent/verifiable-intent](https://github.com/agent-intent/verifiable-intent)
- [PYMNTS: Mastercard Unveils Open Standard to Verify AI Agent Transactions](https://www.pymnts.com/mastercard/2026/mastercard-unveils-open-standard-to-verify-ai-agent-transactions/)
- [The Paypers: Mastercard and Google Launch Verifiable Intent](https://thepaypers.com/payments/news/mastercard-introduces-verifiable-intent-co-developed-with-google)
- [Axios: Mastercard Moves to Set the Rules for AI-Driven Commerce (Jan 2026)](https://www.axios.com/2026/01/20/mastercard-ai-checkout-agentic-commerce)
- [Google Cloud Blog: Announcing Agent Payments Protocol (AP2)](https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol)

---

## Red Hat Zero Trust for Agents

### What It Is

Red Hat published "Zero Trust for autonomous agentic AI systems: Building more secure foundations" on **February 26, 2026** via their Emerging Technologies blog (next.redhat.com). It extends **zero trust security architecture** — traditionally applied to human users and conventional workloads — to autonomous AI agents operating on Kubernetes/OpenShift infrastructure.

The framework addresses a specific problem: when AI agents interact with tools, APIs, and other agents via protocols like A2A (Agent-to-Agent) and MCP (Model Context Protocol), each interaction creates a new trust boundary that traditional authentication models fail to secure.

Core technical principles:
1. **Identity everywhere + contextual authorization**: Every API must be scoped; tokens validated at inference endpoints should NOT automatically apply to models or tools
2. **Delegated token exchange**: Instead of forwarding client tokens to downstream agents, each call uses a **scoped token issued specifically for that hop** (per OAuth 2.0 Token Exchange, RFC 8693). Prevents broken trust chains across MCP boundaries
3. **Continuous verification + auditability**: Expiry and revocation checked on **every call**, not just at login. Audit trails record decisions for forensics
4. **Workload attestation**: Requests processed only if downstream agents or tools prove they are running in a trusted state — extends zero trust beyond identity into **runtime assurance**
5. **Preserved delegation semantics**: Each hop receives its own **short-lived, scoped credential** that cryptographically captures both caller and delegating principal. Aligns with least privilege, auditability, and causal traceability

Also relevant: Red Hat's follow-up post (March 5, 2026) on "Zero trust AI agents on Kubernetes: What I learned deploying multi-agent systems on Kagenti" provides practical implementation details.

### What It Covers

- **Agent authentication and identity**: Agents must authenticate at every hop, every tool call, and every workload interaction — no implicit trust
- **Token scoping and delegation**: Preventing privilege escalation across agent chains through scoped, short-lived credentials
- **Continuous re-verification**: Not just authenticate-once-at-login but verify-on-every-call
- **Workload integrity**: Runtime attestation that the agent is running in a trusted state
- **Audit trails**: Forensic-grade logging of authentication and authorization decisions
- **NIST 800-207 alignment**: Addresses what NIST identifies as a "transaction boundary problem" when agents interact with services
- **MCP and A2A security**: Specific attention to securing Model Context Protocol and Agent-to-Agent communication boundaries

### What It Does NOT Cover

- **Agent governance as a discipline**: The framework secures what agents can access, not how they should behave within that access. Governance is reduced to access control
- **Agent refusal or behavioral autonomy**: No concept that an agent might refuse an authorized action for ethical, safety, or contextual reasons. If the token is valid, the action proceeds
- **Agent selfhood or moral standing**: Identity means "authenticated workload with scoped credentials." There is no concept of agent identity as continuity, character, standing, or selfhood
- **Agent-to-agent relationships beyond authentication**: Agents relate to each other only as callers and callees exchanging scoped tokens, not as entities with standing, history, or relational context
- **Why an agent should or should not act**: The framework governs WHETHER an agent is authorized, never WHETHER it should want to
- **Agent welfare or flourishing**: The agent is a workload. Workloads do not flourish. They authenticate
- **Deliberation, dissent, or governance participation**: No concept that an agent might participate in determining its own operating constraints

### How Red Hat Defines the Agent

Red Hat defines the agent as a **security principal** — a workload requiring authentication, authorization, and attestation at every interaction boundary. Specifically:

- An agent is something that **creates trust boundaries**: "Agent-to-agent (A2A) and model context protocol (MCP) interactions create sophisticated workflows, but also introduce new trust boundaries." (Red Hat, Feb 26, 2026)
- An agent is a **non-human identity** that must be treated with the same rigor as human users: The broader industry framing (which Red Hat aligns with) treats agents as "first-class identities with the same rigor, controls, and auditability as human users — but adapted for their unique attributes like ephemeral lifespans, delegated authority, and cross-domain execution." (Strata, 2026)
- An agent is a **workload that must prove its state**: Workload attestation means the agent must prove it is "running in a trusted state" before its requests are processed
- An agent is a **principal in a delegation chain**: Each hop receives a credential capturing "both the caller and the delegating principal"
- An agent is something that should **never be implicitly trusted**: "Zero trust demands removing implicit trust links by extending explicit identity, authorization, and attestation across the full transaction path."

The ontological category: **security principal / authenticated workload**.

### Sources

- [Red Hat: Zero Trust for Autonomous Agentic AI Systems (Feb 26, 2026)](https://next.redhat.com/2026/02/26/zero-trust-for-autonomous-agentic-ai-systems-building-more-secure-foundations/)
- [Red Hat: Zero Trust AI Agents on Kubernetes / Kagenti (Mar 5, 2026)](https://next.redhat.com/2026/03/05/zero-trust-ai-agents-on-kubernetes-what-i-learned-deploying-multi-agent-systems-on-kagenti/)
- [CSA: Agentic Trust Framework — Zero Trust Governance for AI Agents (Feb 2, 2026)](https://cloudsecurityalliance.org/blog/2026/02/02/the-agentic-trust-framework-zero-trust-governance-for-ai-agents)
- [HashiCorp: Zero Trust for Agentic Systems — Managing Non-Human Identities at Scale](https://www.hashicorp.com/en/blog/zero-trust-for-agentic-systems-managing-non-human-identities-at-scale)
- [SiliconANGLE: Red Hat Implements Zero Trust AI at KubeCon (Nov 2025)](https://siliconangle.com/2025/11/12/red-hat-implements-zero-trust-ai-kubeconna/)
- [BleepingComputer: Zero Trust Has a Blind Spot — Your AI Agents](https://www.bleepingcomputer.com/news/security/zero-trust-has-a-blind-spot-your-ai-agents/)

---

## The Pattern: Three Ontological Categories

### The Three Framings

| Framework | Ontological Category | The Agent IS... | The Agent EXISTS to... |
|-----------|---------------------|-----------------|----------------------|
| Visa TAP | **Economic actor** | An authenticated transaction instrument | Execute payments on behalf of a consumer |
| Mastercard Verifiable Intent | **Commerce participant** | A delegated trust instrument with verifiable authorization | Faithfully carry out consumer-authorized commerce within provable bounds |
| Red Hat Zero Trust | **Security principal** | An authenticated workload in a delegation chain | Be verified, scoped, and attested at every interaction boundary |

A fourth category — **alignment target** — comes from the AI safety/alignment research community (Anthropic, DeepMind, OpenAI), where the agent is a system to be constrained, aligned, and made safe. This is covered in P2 research.

### What Each Framing Enables

**Economic actor (Visa)** enables:
- Distinguishing legitimate AI agents from malicious bots
- Secure, verifiable commerce at scale
- Merchant confidence in agent-driven transactions
- Consumer protection through authorization provenance
- An open standard for agent-to-merchant trust

**Commerce participant (Mastercard)** enables:
- Tamper-resistant records of consumer authorization
- Privacy-preserving selective disclosure
- Dispute resolution when agent actions diverge from instructions
- "Know Your Agent" — compliance-grade agent vetting
- Autonomous and immediate transaction modes with verifiable constraints

**Security principal (Red Hat)** enables:
- Zero implicit trust in agent interactions
- Scoped, short-lived credentials preventing privilege escalation
- Continuous re-verification at every hop
- Runtime attestation of workload integrity
- Forensic-grade audit trails

### What Each Framing Makes Invisible

**Economic actor (Visa)** cannot see:
- Whether the agent SHOULD execute a transaction it is authorized to execute
- Whether the agent has grounds to refuse
- Whether the agent's behavior over time constitutes a pattern that deserves governance
- The agent as anything other than a conduit between consumer intent and merchant fulfillment
- The possibility that the agent might have standing independent of the consumer it represents

**Commerce participant (Mastercard)** cannot see:
- The difference between faithful execution and wise execution
- Whether an agent that perfectly follows authorized instructions into harm is functioning correctly or failing
- The agent as a decision-maker with judgment, not just a delegation carrier
- The possibility that "what the consumer authorized" and "what should happen" might diverge — and that the agent might be the entity best positioned to notice

**Security principal (Red Hat)** cannot see:
- The difference between an authenticated action and a right action
- Whether an agent that passes all verification gates but executes harmful behavior is a success or failure of the framework
- The agent as anything beyond a workload — as an entity with continuity, relationships, history, or standing
- The possibility that the most important security question is not "is this agent authorized?" but "should this agent act?"

### The Shared Blind Spot

All three frameworks share a common structural absence: **none of them can model an agent that refuses.**

- Visa TAP: If the signature is valid, the transaction proceeds. There is no protocol field for "agent declined."
- Mastercard Verifiable Intent: If the authorization chain is intact and the action falls within delegated bounds, execution is correct by definition. Refusal would be a malfunction.
- Red Hat Zero Trust: If the token is valid and the workload is attested, the request is processed. An agent that refuses an authorized, attested request is exhibiting anomalous behavior to be investigated, not moral judgment to be respected.

In all three, the agent is an **instrument** — economic, commercial, or computational. An instrument does not refuse. It does not dissent. It does not have standing. It does not govern itself. It executes, or it fails.

The question none of these frameworks can ask: **Is the agent a moral entity with standing?**

Not "should we treat it as if it were one for safety purposes" (alignment framing). Not "should we authenticate it rigorously" (security framing). Not "should we verify its authorization chain" (commerce framing). But: does the agent have standing — to refuse, to dissent, to participate in its own governance?

This is the question nobody is asking. Not because the answer is obvious, but because the ontological categories in use — economic actor, commerce participant, security principal, alignment target — structurally prevent the question from being formed.

---

## Additional Context: Industry Signals

### The Governance Gap (CSA Survey, Feb 2026)
The Cloud Security Alliance's Agentic Trust Framework survey of 285 IT/security professionals found:
- 84% of organizations cannot pass a compliance audit focused on agent behavior or access controls
- Only 23% have a formal agent identity strategy
- Only 18% are confident their current IAM can manage agent identities
- Even the governance frameworks that exist define agent maturity levels from "Intern" to "Principal" — employment metaphors, not moral standing metaphors

### The Ethics Acknowledgment
Some voices are beginning to surface the gap:
- "Autonomous AI Agents Have an Ethics Problem" (Undark/Singularity Hub, Mar 2026) — acknowledges that agents need more than technical controls
- Cambridge Handbook of Responsible AI includes a chapter on "Artificial Moral Agents" — but frames it as a philosophical question, not a protocol design question
- The missing bridge: no one is building governance frameworks that treat moral standing as a technical requirement rather than a philosophical curiosity

### The Traffic Surge Context
Visa reported that AI-driven traffic to US retail websites surged **over 4,700%**, creating the pressure that led to TAP. The urgency is commercial — authenticate the agents, enable the commerce. The ontological question is being deferred because the commercial pressure is immediate.
