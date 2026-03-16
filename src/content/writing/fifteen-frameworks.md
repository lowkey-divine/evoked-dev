---
title: "Fifteen Frameworks, One Missing Layer"
description: "Every major AI agent framework has guardrails. None of them have governance. Here's what's missing - and what to build instead."
pubDate: 2026-03-20
tags: ["ai-agents", "ai-governance", "agent-framework", "guardrails", "ai-agent-refusal", "trust-architecture"]
draft: false
---

If you're building with AI agents, you've probably felt this already. Your framework handles tool calls, manages context, orchestrates multi-step workflows. You've added input validation, maybe output filtering, maybe a sandbox. The agent works.

And something is still missing.

Not a feature. A layer. The layer that sits between the model deciding to act and the tool executing - the place where someone should be asking: should this agent do this at all?

That layer doesn't exist in any major agent framework today. Not in AutoGen, not in CrewAI, not in LangChain, not in OpenAI's Agents SDK. The gap is the same across the board.

This article is about what that layer is, why guardrails aren't it, and how to start building it.

---

## Guardrails Are Not Governance

A guardrail filters what goes in and what comes out. It asks: is this input safe? Is this output appropriate? Should I block this request?

Good guardrails are important. They prevent prompt injection, catch PII leakage, filter harmful content. They belong in every agent system. I'm not arguing against them.

But a guardrail doesn't ask the question that comes before all of those: should this agent act at all?

A guardrail is a constraint on a system that has already decided to act. Governance operates on the decision itself. It asks: given who this agent is, what it has committed to, and what's being asked of it - should it proceed?

That's a different kind of question. And the answer can't come from another LLM evaluating the output. HiddenLayer researchers demonstrated this in October 2025 - they bypassed OpenAI's guardrails by manipulating both the base model and the judge model simultaneously. When the same architecture generates and evaluates, both can be compromised the same way. Governance doesn't depend on a model's judgment. It depends on a specification that exists before the model is invoked.

Here's the practical distinction:

**A guardrail says:** "Don't output PII."
**A constitution says:** "This agent handles financial data for families. It does not access data outside its stated purpose. If asked to operate beyond its scope, it refuses and logs the request."

The first is a filter. The second is an identity. An agent with a constitution doesn't need to check every output against a judge - it knows what it is, what it does, and what it won't do. The filter still matters. But it sits on top of something that holds.

---

## What Governance Actually Looks Like

If guardrails are the walls, governance is the foundation. Here's what the foundation is made of.

**Identity.** Who is this agent? Not what can it do - who is it? What values govern its decisions when the instructions are ambiguous? In practice, this is a document - a persona file, a role specification - that defines perspective, commitments, and boundaries. Without it, the agent invents its own answers. And they will be inconsistent.

**Restraint.** Every system that can act autonomously will eventually face a situation where it should not act. A restraint spec names those situations in advance - what the agent can do, what it must refuse, and what happens at the boundary. The alternative is discovering the boundary in the incident report.

**Accountability.** Trust is not binary. It's graduated. An agent earns expanded capability through demonstrated reliability - who reviews its decisions, at what cadence, through what audit trail. If your agent has the same permissions on day one as day one hundred, you don't have governance. You have hope.

**Memory.** An agent that starts from zero every invocation is not an agent. It's a function with a name. Memory means the agent carries its decisions, positions, and context across sessions. In practice, this is a persistent file the agent reads on invocation and updates on close. Continuity is what makes identity more than a label.

**Charter.** Not a system prompt - a system prompt is instructions. A charter is a commitment. It specifies purpose, boundaries, refusal categories, and accountability chain in a single document. When someone asks why the agent did what it did - or why it refused - the charter is the answer.

These five properties are the missing layer. Every major agent framework has some version of input/output filtering. None has a mechanism for any of these five.

---

## The Pattern Across Fifteen Frameworks

Look at the fifteen most widely used AI agent frameworks - over 800,000 GitHub stars combined. The left side of the table varies. Some frameworks have strong guardrails. The right side doesn't vary at all.

| Framework | Stars | Guardrails | Refusal | Identity | Drift Detection | Charter |
|-----------|------:|:---:|:---:|:---:|:---:|:---:|
| AutoGPT | 182K | No | No | No | No | No |
| n8n | 179K | Yes | No | No | No | No |
| Langflow | 146K | Partial | No | No | No | No |
| LangChain | 130K | Yes | No | No | No | No |
| OpenHands | 69K | Partial | No | No | No | No |
| AutoGen | 56K | Partial | No | No | No | No |
| LlamaIndex | 48K | Partial | No | No | No | No |
| CrewAI | 46K | Output only | No | No | No | No |
| Agno | 39K | Yes | No | No | No | No |
| DSPy | 33K | Partial | No | No | No | No |
| Semantic Kernel | 27K | Yes | No | No | No | No |
| smolagents | 26K | Partial | No | No | No | No |
| Haystack | 25K | Yes | No | No | No | No |
| OpenAI Agents SDK | 20K | Yes | No | No | No | No |
| Pydantic AI | 15K | Partial | No | No | No | No |

Fifteen frameworks. Four governance columns. Sixty "No" entries. Not one exception.

OpenAI's Agents SDK has the most structured guardrail implementation - input and output decorators that run in parallel with agent execution. LangChain integrates with NeMo Guardrails for content filtering. Agno recently shipped built-in PII detection and prompt injection prevention. These are real features solving real problems.

But none of them can answer: should this agent act? None track whether the agent's behavior has drifted from its stated purpose. None have a mechanism for the agent to refuse. None treat identity as a governance property.

Some frameworks are reaching toward governance. CrewAI gives agents roles and backstories. AutoGen's `UserProxyAgent` adds human-in-the-loop approval. These are genuine gestures - and they matter. But a role description in a prompt is not identity governance. An approval checkpoint is not accountability architecture. The gestures point in the right direction. The foundation hasn't been poured.

---

## What the Absence Costs

This isn't theoretical.

Cisco found that multi-turn attacks against AI agents succeed around 60% on average, with one model reaching 92.78%. The attacks aren't sophisticated. They're patient. The agent has guardrails for individual messages - but no memory of its own values across a conversation. Each turn is evaluated in isolation. The attacker just waits. This is a governance failure. The agent has no persistent identity to anchor against, so each message is a fresh opportunity for manipulation.

OpenHands had a zero-click data exfiltration vulnerability. A prompt injection embedded in a website could force the agent to leak GitHub tokens to an attacker's server. No user interaction required. The researcher waited 148 days for a response. A sandbox existed - but nothing in the architecture asked whether the agent should be rendering external content as executable instructions in the first place. That's a governance question, not a filtering question.

n8n disclosed ten CVEs between January and February 2026, including a CVSS 10.0 - unauthenticated remote code execution. Over 24,000 servers remained exposed weeks later. These were infrastructure vulnerabilities - sandbox escapes, path traversals - and better engineering would have caught them. But the pattern underneath is worth noticing: 179,000 stars, widespread production use, and no structural layer asking what these automated workflows should and shouldn't be doing. Security patches fix the symptom. Governance addresses whether the system should have been making that decision at all.

Different failures. Same missing layer.

---

## Where to Start

You don't need to build all five governance properties at once. Start with two.

**Write a restraint spec.** Answer three questions about one agent in your system: what can it do, what should it refuse, and what happens at the boundary. That document - even a rough one - gives you something no guardrail provides: a specification of what the agent is for and what it isn't. A boundary that exists before the prompt arrives.

**Give it an identity.** Not a system prompt - a charter. A document that specifies purpose, boundaries, refusal categories, and accountability. When the agent makes a decision, the charter is what you point to. When someone asks why it refused, the charter is the answer.

If you want the templates, they exist. The [Agent Governance Starter Kit](https://github.com/lowkey-divine/agent-governance-starter-kit) is free, MIT-licensed, and includes five templates - charter, restraint spec, memory schema, deliberation framework, drift monitoring - plus three code examples from a production system. The [five-question diagnostic](/diagnostic) takes 30 seconds and tells you which governance properties your system is missing.

For the deeper argument - why restraint is harder than capability and why it matters more - [this piece on agent refusal](/writing/what-should-your-agent-refuse) is where I started. For the full governance architecture - identity, memory, restraint, and accountability as first-class design concerns - [this is the framework](/writing/who-governs-the-agent).

---

The frameworks will catch up. Some already have guardrail initiatives in progress. Pydantic AI is building a middleware system. AutoGen has a tracking issue. The community is contributing third-party solutions.

But guardrails are the walls. The question is what they're built on.

The missing layer isn't a feature your framework ships in the next release. It's an architecture decision you make about what kind of entity your agent is. A function that executes - or something that decides.

Every framework on that table is building better filters. The layer underneath - the one that treats agents as something worth governing - is yours to build.

Start with the restraint spec. Start with the charter. The foundation matters more than the filter.

---

*The foundation doesn't come from the framework. It comes from the builder who stops long enough to pour it.*

---

## Sources

**Security Research:**
- n8n CVEs: Ten vulnerabilities, January-February 2026, including CVE-2026-21858 (CVSS 10.0). [n8n Security Bulletin, Feb 25, 2026](https://community.n8n.io/t/security-bulletin-february-25-2026/270324). [Rapid7 Analysis](https://www.rapid7.com/blog/post/etr-ni8mare-n8scape-flaws-multiple-critical-vulnerabilities-affecting-n8n/).
- OpenHands: Zero-click token exfiltration via Markdown rendering. [Embrace The Red](https://embracethered.com/blog/posts/2025/openhands-the-lethal-trifecta-strikes-again/).
- Multi-turn attacks: "Death by a Thousand Prompts," Cisco AI Defense, Nov 2025. Average 64.21%, peak 92.78%. [arXiv:2511.03247](https://arxiv.org/abs/2511.03247).
- Guardrail bypass: "Same Model, Different Hat," HiddenLayer, Oct 2025. [HiddenLayer Research](https://hiddenlayer.com/innovation-hub/same-model-different-hat/).

**Enterprise Data:**
- [ModelOp 2026 AI Governance Benchmark](https://www.globenewswire.com/news-release/2026/03/11/3253668/0/en/ModelOp-s-2026-AI-Governance-Benchmark-Report-Shows-Explosion-of-Enterprise-AI-Use-Cases-as-Agentic-AI-Adoption-Surges-But-Value-Still-Lags.html) - 67% report 101-250 AI use cases; 94% have <25 in production.
- [Deloitte State of AI 2026](https://www.deloitte.com/us/en/about/press-room/state-of-ai-report-2026.html) - 21% have mature agent governance.
- [Gartner: 40% Agentic AI Cancellation](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027).
- [Microsoft: 80% of Fortune 500 Deploy AI Agents](https://www.microsoft.com/en-us/security/blog/2026/02/10/80-of-fortune-500-use-active-ai-agents-observability-governance-and-security-shape-the-new-frontier/).

**Framework Documentation:**
- [AutoGen Intervention Handlers](https://microsoft.github.io/autogen/stable//user-guide/core-user-guide/cookbook/tool-use-with-intervention.html)
- [CrewAI Task Guardrails](https://docs.crewai.com/en/concepts/tasks)
- [PydanticAI Output Functions](https://ai.pydantic.dev/output/#output-functions)
- [Agno Guardrails](https://docs.agno.com/guardrails)
- [OpenAI Agents SDK Guardrails](https://openai.github.io/openai-agents-python/guardrails/)
- [Semantic Kernel Filters](https://learn.microsoft.com/en-us/semantic-kernel/concepts/enterprise-readiness/filters)

**Further Reading:**
- [What Should Your Agent Refuse?](/writing/what-should-your-agent-refuse) - Six refusal categories and why restraint is harder than capability.
- [Who Governs the Agent?](/writing/who-governs-the-agent) - Identity, memory, governance, restraint as first-class design.
- [Agent Governance Starter Kit](https://github.com/lowkey-divine/agent-governance-starter-kit) - Free. MIT licensed. Five templates.
- [Five Questions for Your Agent System](/diagnostic) - 30 seconds. No signup. No tracking.
