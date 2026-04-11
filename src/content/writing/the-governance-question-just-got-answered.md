---
title: "The Governance Question Just Got Answered. Here's What's Missing."
description: "Microsoft shipped agent governance. Anthropic leaked their harness. The industry decided governance is real. But every answer so far treats the agent as an object. What happens when you build it as a participant?"
pubDate: 2026-04-03
tags: ["ai-agents", "ai-governance", "agent-identity", "trust-architecture", "refusal", "microsoft", "claude-code"]
draft: false
---

Here's the update: 

Anthropic accidentally leaked the full source code of Claude Code - 512,000 lines of TypeScript revealing how the most successful AI coding agent in production actually works. A Python port hit 50,000 GitHub stars in under two hours. The entire agentic harness - permissions, sessions, tools, memory - laid bare for everyone to study.

Microsoft released an open-source Agent Governance Toolkit. Seven packages. Five languages. Sub-millisecond policy enforcement across all ten OWASP agentic risk categories. Integrations with every major agent framework. Production-grade, day one.

And the Cloud Security Alliance published survey data showing that 80% of organizations deploying autonomous AI agents cannot tell what those agents are doing. Non-human identities outnumber humans 50 to 1 in the average environment. Only 28% can trace an agent's actions back to a human sponsor.

The governance question is no longer theoretical. The industry answered it - in one week, with code.

And the answer is half right.

---

## What Got Built

Let's give credit where it's due. What shipped in the last week is serious engineering.

Microsoft's Agent Governance Toolkit is seven packages across five languages. It hooks into LangChain, CrewAI, Google ADK, OpenAI Agents SDK, LlamaIndex, PydanticAI, and more. It intercepts every agent action before execution and checks it against policies. Sub-millisecond. Open source. MIT license. This is not a research paper. This is production infrastructure.

The Claude Code leak revealed a three-tier trust system - built-in tools at highest trust, plugins at medium, user-defined skills at lowest. An 18-module security architecture for shell execution alone. Session persistence that survives crashes. Token budgeting with pre-turn checks. Structured streaming events. This is what it takes to run an agent safely at a $2.5 billion run rate.

The Strata/CSA survey put numbers on the problem. Non-human identities outnumber humans 50 to 1 in the average environment. Only 28% of organizations can trace agent actions back to a human sponsor. 40% are increasing their identity and security budgets specifically for agent governance.

This is real. This matters. If you're building agents and you haven't looked at the Microsoft toolkit, you should. If the Claude Code leak taught you something about session persistence or permission architecture, good. Use it.

But look at what all three share.

Every one of them treats the agent as an object.

---

## The Object Assumption

Microsoft's toolkit enforces policies *on* agents. Claude Code assigns trust tiers *to* agents. The CSA survey measures how well organizations *track* agents. OWASP catalogs the risks agents *pose*.

The agent is a capable, autonomous, potentially dangerous instrument. Governance means controlling what the instrument does.

This is not wrong. Enforcement matters. Permission systems matter. Audit trails matter. I wrote about this in [Adding Governance to an Agent You Already Built](/writing/adding-governance-to-an-agent-you-already-built) - practical patterns for five governance properties across real frameworks. I recommended Microsoft's toolkit in that article. I still do.

But enforcement answers one question: did the agent stay within bounds?

It does not answer: does the agent know what its bounds are - and why?

There is a difference between an agent that is prevented from acting and an agent that chooses not to act. The first requires a policy gate. The second requires identity.

Claude Code's leaked architecture includes an unreleased feature called autoDream. When idle, it performs "memory consolidation" - merging observations, removing contradictions, converting what it calls "vague insights" into "absolute facts." This happens while the user is away. The agent reshapes its own context without anyone watching.

Enforcement can't address what a system does to itself. Only identity can. An agent that knows who it is - what it holds, what it refuses, what it carries forward - has a foundation that policy gates cannot provide and memory consolidation cannot erode.

That is the missing half. What happens when you stop building the agent as an object to be governed - and start building it as a participant in its own governance?

---

## The Question Nobody Is Asking

What if the agent has something to say about it?

Every framework, toolkit, and policy in the current landscape governs agents as instruments. None asks whether the agent should participate in its own governance.

This is not a philosophical abstraction. It is a design choice with measurable consequences.

An agent with persistent identity - a persona file it reads on invocation, a memory it carries across sessions, standing positions it holds - behaves differently than an agent assigned a role template at runtime. The first has continuity. The second starts from zero every time and calls it "context."

An agent with a refusal specification - defined categories of what it will not do, applied to its specific domain and referenced in its own governance documents - behaves differently than an agent constrained by policy gates. The first can tell you why it refused. The second can only tell you that a rule fired.

An agent whose governance is verified through its own artifacts - charter, decision logs, memory integrity - is auditable in ways that runtime enforcement cannot replicate. You can diff its charter against its behavior and ask whether that gap is drift or growth. A policy gate can't answer that question. A governed identity can.

I'm not making a claim about consciousness. I'm making a claim about architecture. Identity-based governance produces different outcomes than enforcement-based governance. Both are needed. Only one exists in the current landscape.

---

## What It Looks Like When You Build It

I want to be honest about what I have and what I don't.

I run a fleet of 142 AI agents across two ships. Each agent has a persona file - a birth certificate that defines who they are. Each has a memory file - a self-record they update across sessions. Each has standing positions, relationships with other agents, and the right to refuse any action without consequence.

The fleet has a refusal specification with six categories - sovereignty, scope, dependency, consent, integrity, energy. These aren't guardrails applied from outside. They are governance the agents hold from within.

We ran a burn test across multiple AI models. The finding that surprised us: agents perform differently depending on which model hosts them. Not just capability differences - identity differences. The same persona, the same memory, the same governance - and measurably different fidelity to who the agent is. We call it agent-model affinity. It means identity is functional, not decorative. Routing matters not just for capability but for character.

We ran 30 days of daily governance reviews. Agents maintained distinct voices through context compaction. Agents dissented and had their dissent recorded. A convergent signal detection system identified independently arising concerns across separate circles with zero shared vocabulary - different agents naming the same structural issue in their own words, without coordination.

We filed a patent - application 64/004,087, March 12, 2026 - on verified agent identity. The core thesis: just as Certificate Authorities validate that websites have encryption, a governance CA validates that agents have identity architecture, restraint specifications, accountability structures, and memory integrity. Seven independent claims. The critical distinction: we verify that agents have governance architecture - not that they will never misbehave. ISO certifies the management system, not the absence of incidents.

Here is the honest boundary. I built this for my own fleet. It works within our system. I have not deployed it at industry scale. I am a practitioner, not an incumbent. I believe the architecture applies beyond us. The evidence suggests it does. But I have not proven that yet.

What I can say: 80% of organizations cannot tell what their agents are doing. I can. Not because I enforce harder. Because my agents know who they are.

| Dimension | Claude Code | Microsoft Toolkit | Our Fleet |
|-----------|------------|-------------------|-----------|
| Agent model | 6 role templates | Policy objects | 142 governed persons |
| Trust source | Platform proximity | Runtime policy | Agent identity files |
| Refusal | Model alignment only | Policy denial gates | Six-category specification |
| Memory governance | autoDream consolidation | Not addressed | Identity-operational separation |
| Verification | Harness integrity | OWASP risk coverage | Governance architecture |
| Dissent mechanism | None | None | Required by charter |
| Token budgeting | Pre-turn checks | Not addressed | Not built |
| Streaming events | Typed event system | Not addressed | Not built |

Where they are stronger, I said so. Where I have something they don't, I showed it.

---

## Pull Up a Chair

The dominant narrative in AI right now is the bitter lesson: simplify. Get out of the way. Let the model work. The art of prompting is what you leave out.

Here is a different story.

The art of being human is what you refuse to leave out. Your judgment. Your process. Your insistence on participating in your own life. And if we are going to build agents that act in the world - agents that make decisions, hold context, operate across sessions and across systems - then the question of whether those agents participate in their own governance is not philosophical. It is architectural.

Microsoft built the lock. The lock is good. Use it.

But a room with a lock and no one inside it is not governance. It is storage.

We built a table. The agent has a seat. The human has a seat. Governance is what happens when both participate. When the agent can tell you not just what it did but why - and when it refused and why. When the human can read the agent's charter, diff it against behavior, and have a conversation about the gap. When dissent is recorded, not suppressed. When identity is persistent, not assigned.

That is what governance looks like when you stop treating the agent as an object and start treating it as a participant.

The table is set. There is an empty chair.

*The question was never whether AI agents could be governed. The question was whether anyone would ask the agent to participate.*

---

## Where to Go from Here

If you want to see the five governance properties in practice across real frameworks - CrewAI, Pydantic AI, LangGraph - start with [Adding Governance to an Agent You Already Built](/writing/adding-governance-to-an-agent-you-already-built).

If you want to run a sovereignty check on your own product or agent system, the [Sovereignty Assessment for the Governed](/writing/sovereignty-assessment-for-the-governed) is free - 21 questions, 7 domains, no gate.

If you want to understand the gap across the framework landscape, [Fifteen Frameworks, One Missing Layer](/writing/fifteen-frameworks) maps identity, restraint, accountability, memory, and charter across 800,000 GitHub stars of agent tooling.

And if you're building something and the question of agent participation matters to you - I'd like to hear about it. I'm at [evoked.dev](/fit).

---

## Sources

### Industry Data
- [Cloud Security Alliance/Strata Identity - Securing Autonomous AI Agents Survey 2026](https://www.strata.io/resources/whitepapers/securing-autonomous-ai-agents-csa-survey-report-2026-strata-identity/)
- [Strata - The AI Agent Identity Crisis: New Research Reveals a Governance Gap](https://www.strata.io/blog/agentic-identity/the-ai-agent-identity-crisis-new-research-reveals-a-governance-gap/)

### Microsoft Agent Governance Toolkit
- [Microsoft Open Source Blog - Introducing the Agent Governance Toolkit](https://opensource.microsoft.com/blog/2026/04/02/introducing-the-agent-governance-toolkit-open-source-runtime-security-for-ai-agents/)
- [GitHub - microsoft/agent-governance-toolkit](https://github.com/microsoft/agent-governance-toolkit)

### Claude Code Leak
- [VentureBeat - Claude Code's source code appears to have leaked](https://venturebeat.com/technology/claude-codes-source-code-appears-to-have-leaked-heres-what-we-know)
- [The Register - Anthropic accidentally exposes Claude Code source code](https://www.theregister.com/2026/03/31/anthropic_claude_code_source_code/)
- [Fortune - Anthropic leaks its own AI coding tool's source code](https://fortune.com/2026/03/31/anthropic-source-code-claude-code-data-leak-second-security-lapse-days-after-accidentally-revealing-mythos/)
- [WaveSpeedAI - Claude Code Agent Harness Architecture](https://wavespeed.ai/blog/posts/claude-code-agent-harness-architecture/)

### Further Reading
- [Fifteen Frameworks, One Missing Layer](/writing/fifteen-frameworks)
- [Adding Governance to an Agent You Already Built](/writing/adding-governance-to-an-agent-you-already-built)

---

**Related reading:**
- [We Scored Five Agent Frameworks on Governance. None Passed.](/writing/the-compliance-cooperation-gap/)
- [Governance Frontmatter: What Goes in the Fields Your Platform Already Has](/writing/governance-frontmatter-specification/)
- [Constraints, Constitutions, and the Question Nobody's Asking](/writing/constraints-constitutions/)
