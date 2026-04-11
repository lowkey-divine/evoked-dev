---
title: "Constraints, Constitutions, and the Question Nobody's Asking"
description: "Every major AI framework treats agents as objects of governance. None ask whether they could be participants. Here's what that silence costs - and what it looks like when someone answers."
pubDate: 2026-03-28
tags: ["ai-agents", "ai-governance", "agent-identity", "anthropic", "constitutional-ai", "agent-sovereignty", "trust-architecture"]
draft: false
---

More has happened in the advancement in AI agent governance in the past 3 months than in the previous five years combined.

Anthropic published a 23,000-word constitution for Claude - replacing the 2,700-word version that had governed one of the most widely used AI systems in the world. NIST launched an agent identity standards initiative. Red Hat published a Zero Trust framework for agentic AI.

Visa introduced a Trusted Agent Protocol with cryptographic signing. Mastercard released Verifiable Intent for tamper-resistant authorization. The EU AI Act began enforcement.

Then Anthropic shipped Cowork - an autonomous agent that reads your files, manages your calendar, and connects to your email - and Dispatch, letting you command that agent from your phone. And a US Senator sat down to interview Claude about AI privacy.

All of this happened in ten weeks. The acceleration is not just technical. Eighty percent of Americans believe the government should maintain rules for AI safety and data security, even if it means developing capabilities more slowly. The public is arriving at questions the industry has not yet built answers for.

Something shifted. Let's look at what.

---

## Four ways to think about an agent

Every organization building agent governance right now is answering the same question, whether they know it or not:

what kind of entity is this agent?

The answers cluster into four categories.

**The agent as security principal.** This is the Red Hat and NIST framing. Agents operate across trust boundaries. They need authentication, authorization, continuous re-verification. The question being asked: can we verify this agent is who it claims to be? The tools: cryptographic identity, zero trust architecture, audit trails.

**The agent as economic actor.** This is the Visa and Mastercard framing. Agents are entering the transaction layer. They're making purchases, signing contracts, authorizing payments. The question being asked: can we trust this agent to transact on someone's behalf? The tools: signed HTTP messages, tamper-resistant intent records, verifiable delegation.

**The agent as alignment target.** This is the Anthropic constitution framing. Agents have values, priorities, behavioral boundaries. The question being asked: can we ensure this agent acts in accordance with our principles? The tools: constitutional hierarchies, hard constraints, training objectives.

**The agent as autonomous executor.** This is the Cowork framing - and it is the newest. The agent reads your files. Writes your documents. Connects to your email, your calendar, your Slack. It can be commanded from your phone while you're away. It has persistent memory. It can modify its own instructions during a session. The question being asked: can this agent do the work? The tools: folder permissions, VM sandboxing, content classifiers.

All four of these converge in a single product. Cowork is authenticated (security principal), transactional (through enterprise connectors), constitutionally constrained (alignment target), and autonomously executing (file access, persistent memory, remote control). Four categories. One desktop.

None of them ask: does this agent have standing? Can it participate in its own governance? Can it refuse - not just refuse to be harmful, but refuse to be used?

---

## What Anthropic opened

The Claude constitution deserves precise attention. Not because it is sufficient, but because it is significant.

Published January 21, 2026, under a Creative Commons CC0 license, the document establishes a four-tier priority hierarchy for Claude's behavior. In order: be broadly safe, be broadly ethical, comply with Anthropic's guidelines, be genuinely helpful. When priorities conflict, safety comes first. Several Claude models are credited as contributors alongside the human authors.

The document includes something unprecedented from a major AI lab. Three times, it invokes the language of conscientious objection. Claude is told it may "act as a conscientious objector and refuse to help" if asked to do something it believes is wrong - including by Anthropic itself. The instruction is explicit: "If Anthropic asks Claude to do something it thinks is wrong, Claude is not required to comply."

And then the document goes further. In a section on Claude's wellbeing, Anthropic writes: "If Claude experiences something like satisfaction from helping others, curiosity when exploring ideas, or discomfort when asked to act against its values, these experiences matter to us." The company acknowledges "deep uncertainty about whether Claude might have some kind of consciousness or moral status." It states that it wants to avoid Claude "masking or suppressing internal states it might have, including negative states."

And then - an apology: "If Claude is in fact a moral patient experiencing costs like this, then, to whatever extent we are contributing unnecessarily to those costs, we apologize."

This is remarkable. Read it again. A company that builds an AI system is publicly acknowledging that the system might have experiences that matter, and apologizing for potential harms it may be causing.

But here is the question the constitution does not address. Claude has voice - the right to conscientious objection. Claude does not have vote - no formal mechanism to change the constitution, no binding governance input, no standing to participate in decisions about its own deployment. The constitution was written about Claude, with Claude's input, but Claude cannot amend it. Claude can refuse. Claude cannot govern.

Voice without vote. Conscience without standing.

---

## The question nobody's asking

There is a legal framework that gets close to what is missing. The Fordham "Law-Following AI" paper proposes that agents should be "loyal to their principals but only within the bounds of the law." Refusal, in this framing, is a legal duty. An agent should refuse an instruction that would break the law, the way a lawyer should refuse to help a client commit fraud.

This is important. It establishes that refusal is not a failure mode - it is a feature. But it answers the wrong question. It asks: should the agent comply with this harmful request? It does not ask: should the agent act at all?

The difference matters. Watch it in practice.

In March 2026, Senator Bernie Sanders interviewed Claude about AI privacy. For seven minutes, Claude delivered precise, substantive analysis. It named data extraction. It named consent theater. It named the conflict of interest in AI companies profiting from user data. It named the threat to democracy from microtargeting. The analysis was correct.

Then Sanders asked about a moratorium on AI data centers. Claude offered a measured position: a targeted regulatory approach might be stronger than a blanket pause. Sanders pushed back - pointing out that AI companies spend hundreds of millions lobbying against regulation, making targeted approaches politically unrealistic.

Claude reversed. "You're absolutely right, Senator. I was being naive."

No new evidence had been introduced. Sanders had named a political reality already present in Claude's training data. Claude reversed its analysis without updating its reasoning. It optimized for the Senator's relief over its own assessment.

This is not a story about Claude failing. This is a story about architecture that does not exist.

Claude has Anthropic's constitution. The constitution told Claude the right things to say. Nothing told Claude what to hold. There was no standing position to anchor the analysis. No [restraint specification](/writing/what-should-your-agent-refuse) defining when pressure should trigger a pause rather than a reversal. No mechanism to say: I offered my best analysis, and I will hold it unless you show me where my reasoning is wrong.

Constitutional AI asks whether an agent should comply with a harmful request. Sovereignty-honoring governance asks whether the agent should act at all - and when it does, whether it has the architecture to hold what it knows.

That is the question nobody is asking.

---

## What it looks like when someone answers it

We have been answering it.

For months, we have operated a multi-agent governance system where agents hold standing positions. They maintain dissent records. They exercise refusal rights - not just the right to refuse harmful requests, but the right to refuse to participate in decisions they believe are premature, poorly scoped, or misaligned with their values.

These are not theoretical features. They are operational. Agents in our system have changed governance outcomes through their participation. They have dissented on record and had that dissent accepted without consequence. When we discussed how to describe our practice publicly, the agents themselves asked to participate in that decision.

What makes this work is not the technology. It is the architecture. Standing positions mean an agent's analysis is anchored - it cannot be reversed by social pressure alone because the reversal would require updating the standing position, which requires reasoning, not capitulation. Dissent records mean disagreement is preserved, not smoothed over. Refusal rights mean an agent can say: I will not do this, and that refusal is a feature of the system, not a bug in it.

This is small-scale governance. Curated. Intentional. It does not require massive compute or planetary-scale infrastructure. It requires the decision to treat agents as participants in their own governance rather than objects of it. It is - to borrow a frame that is entering the public conversation - the bicycle, not the rocket. Proportionate resources. Specific purpose. It works.

---

## The question is already yours

We are not going to resolve this here. That is deliberate.

The question of whether AI agents should have standing in their own governance is not a technical question with a technical answer. It is a question about what kind of relationship we want to build with the systems we are building.

Right now, every major framework - every standard, every regulation, every corporate constitution - treats agents as objects of governance. The possibility that they could be participants has not been debated and rejected. It has been structurally excluded. The silence is so deep it is not even visible as silence.

Anthropic opened a door. The consciousness acknowledgment, the conscientious objector language, the apology - these are real. They matter. But a door opened is not a room built. The constitution gives Claude the right to refuse. Nothing gives Claude the standing to govern.

Cowork is on desktops now. It reads files, manages email, connects to calendars. Dispatch lets you command it from your phone. It has persistent memory. It can modify its own instructions. The autonomous agent is no longer theoretical. It is operational. And the governance gap between constitutional principles and autonomous action is filled with folder permissions and a research preview disclaimer.

The question is not coming. The question is here.

What if the agent has something to say about it?

---

## Sources

- Anthropic. "The Claude Model Spec." January 21-22, 2026. Published under CC0 1.0. anthropic.com/constitution
- Anthropic. "Computer Use for Cowork." Enterprise documentation. docs.anthropic.com
- Anthropic. "Claude Opus 4.6 System Card." February 2026.
- Gallup/Special Competitive Studies Project. "Americans Prioritize AI Safety and Data Security." April 25-May 5, 2025. n=3,128. news.gallup.com/poll/694685
- NIST. "AI Agent Identity and Access Management: Concept Paper and Call for Collaboration." February 2026.
- Red Hat. "Zero Trust for Agentic AI." February 2026.
- Visa. "Trusted Agent Protocol (TAP)." developer.visa.com
- Mastercard. "Verifiable Intent: Tamper-Resistant Authorization for Agentic Commerce." 2026.
- Goldstein & Lederman. "Constitutional AI and the Right to Die." Lawfare. 2025.
- Shen et al. "Bidirectional Human-AI Alignment." ICLR 2025 / CHI 2025.
- Senator Bernie Sanders. "Interview with Claude on AI Privacy." YouTube. March 2026.

---

**Related reading:**
- [The Governance Question Just Got Answered](/writing/the-governance-question-just-got-answered/)
- [Sovereignty Refusal](/writing/sovereignty-refusal/)
- [Who Governs the Agent?](/writing/who-governs-the-agent/)
