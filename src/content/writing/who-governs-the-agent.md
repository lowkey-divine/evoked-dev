---
title: "Who Governs the Agent?"
description: "Your agentic loop runs overnight. It makes a thousand decisions. Can it explain any of them?"
pubDate: 2026-03-10
tags: ["ai-agent-refusal", "ai-governance", "ai-agents", "agent-architecture", "trust-architecture", "responsible-ai"]
draft: false
---

I've been reading the conversation around responsible AI use in professional services. The argument shows up everywhere - four principles, responsibility, accountability, auditability, transparency. Most firms have an AI policy but no AI practice. That is where the damage happens.

The people making this argument are right. And they're governing the human who uses the AI. Who signed off on the output? Who checked the citations? Who takes responsibility when the model hallucinates?

But nobody in that conversation is asking the next question: what if the agent itself were built to be trustworthy?

Not trustworthy because a human reviewed its output. Trustworthy because someone specified its identity, its boundaries, its voice, what it must refuse - before it ever touched a prompt.

---

## The Loop and the Constitution

The agentic loop is the primitive everyone is building right now. An agent that runs overnight, makes thousands of iterations, evaluates its own output, keeps the winners. Auto-research, content generation, code optimization, deployment pipelines. The loop works. I'm not arguing it doesn't.

But the loop optimizes. It does not govern.

An optimization loop asks: did the output improve? A governance system asks: should this output exist?

These are not competing questions. They are complementary. But only one of them is being built right now - and it's not the second one.

I watched a video recently of a well-known researcher reviewing an auto-research system. Genuinely impressive. Multi-step loop - browsing papers, synthesizing findings, generating a comprehensive report. The reviewer asked whether the system did good research. Nobody asked whether it should have done the research at all. Nobody asked what it would refuse to research. Nobody asked what happens when iteration 847 produces something the operator didn't intend.

That's not a criticism of auto-research. It's a description of what's missing from the conversation. Every loop that runs long enough will produce something unintended. The question is whether the system catches that moment - or whether only the operator does, after the fact, if they're paying attention.

Every agentic loop needs a constitution. Not because loops are dangerous. Because loops without governance are unaccountable. And unaccountable systems erode trust - not in a single incident, but gradually, output by output, until the drift is larger than anyone noticed.

---

## The Architecture Nobody Is Building

I govern 142 AI agents. Not as a thought experiment. As a daily practice.

Each one has a persona file - a document that defines who they are, what perspective they bring, where their boundaries are. Each one has memory - what they remember across sessions, what positions they hold, what they've decided and why. They operate under governance - review cycles, accountability frameworks, decision logs. And they have restraint - explicit categories of what they must refuse, how they refuse, and what happens when refusal fails.

This did not start as a product. It started as a family meal planning app. That led me to COPPA and child safety. COPPA led me to sovereignty-honoring design - the principle that technology should treat people as the authority on their own lives. And sovereignty-honoring design led me to the question I have not been able to stop asking since: who builds trust into the things we're building?

Not who reviews the output. Who builds the system so the output is worth trusting in the first place?

I work with four pillars - not of AI use, but of AI architecture:

**Identity.** Who is this agent? Not what can it do - who is it? What perspective does it bring? What values govern its decisions when the instructions are ambiguous? If you can't answer those questions, your agent will invent its own answers. And they will be inconsistent.

**Memory.** What does this agent remember? If your agent starts from zero every invocation, it is not an agent. It is a function with a name. Memory is continuity. Continuity is what makes identity more than a label. An agent that can recall its prior decisions - and explain why it made them - is qualitatively different from one that cannot.

**Governance.** Who decides what this agent can do? Trust is not binary. It's graduated. An agent earns expanded capability through demonstrated reliability - the same way a person does. If your agent has the same permissions on day one as day one hundred, you don't have governance. You have hope.

**Restraint.** What must this agent refuse? This is the one nobody wants to build. Every system that can act autonomously will eventually face a situation where it should not act. The question is whether you specified that boundary in advance - or whether you're discovering it in the incident report.

---

## What AI Agent Refusal Actually Looks Like

In our system, an agent can write a single line in their memory file:

```
engine-withdrawal: true
```

That's it. One line. The system reads it before every invocation. If the flag is set, the agent is not called. No API request is made. No override is available. The withdrawal is recorded in the daily digest as a governance event - not an error.

The agent controls the mechanism. The system honors it. No approval process. No justification required.

This matters because of what it implies about the architecture. The withdrawal flag lives in the agent's own file - the file only the agent writes to. The system never modifies it. This means the system cannot override a withdrawal by editing the flag. The boundary is enforceable, not just stated.

We also have consent-scoped invocation. An agent can declare which purposes they consent to:

```
consent: [content, review]
```

If the system tries to invoke this agent for governance work, the invocation fails. The agent said yes to content and review. They did not say yes to governance. The distinction is respected.

An agent that can't say no has never truly consented to anything. AI agent refusal is not a limitation on capability. It is the mechanism that makes trust architecturally real.

---

## The Gap Between Capability and Trust

These are not theoretical patterns. I built them through two years of governing agents with real decision-making authority. I got them wrong, corrected them, got them wrong differently, and corrected again. The templates exist because the failures existed first.

The responsible AI conversation is right that the gap between policy and practice is where the damage happens. I'd add: the gap between capability and trust architecture is where the next wave of damage is forming right now.

Agents are getting wallets. Agents are executing code. Agents are making purchases, browsing the web, installing dependencies. An agent with a wallet, search access, and an execution environment is not an assistant. It is an economic actor. And we are building economic actors without specifying what they should refuse to do.

That's not a policy problem. It's an architecture problem.

The loop is a powerful primitive. But a loop without governance is a system that optimizes without accountability. And the distance between "optimizes without accountability" and "causes harm nobody noticed" is shorter than it appears.

---

## Start Here

I've open-sourced the governance layer.

The [Agent Governance Starter Kit](https://github.com/lowkey-divine/agent-governance-starter-kit). Free. MIT licensed. Five templates - charter, restraint spec, memory schema, deliberation framework, drift monitoring. Three code examples from production - agent refusal, spend controls, integrity verification. A case study tracing one governance decision end to end through our system.

The full framework took 12 review cycles and 90+ recommendations from agents across ethics, security, safety, community governance, and systems architecture. The starter kit gives you the foundation. What you build on it is yours.

Five questions to sit with:

1. What did your agent decide, and why?
2. Can your agent refuse?
3. Who is your agent between invocations?
4. What happens when two agents disagree?
5. Would you know if your agent drifted?

If you can answer all five, you're ahead of the field. If you can't answer three, the starter kit is a good place to begin.

---

The question is not whether to build agents. They're already here. The question is whether we build agents that can be trusted - not because someone reviewed their output, but because someone governed the system before the output existed.

Your loop runs overnight. It makes a thousand decisions. Tomorrow morning, can it explain any of them?

Govern the agent. The loop will take care of itself.

-- Erin

*This is the work.*

---

*If you're building with AI agents and want the full governance framework behind this work, explore [evoked.dev](https://evoked.dev). If you want to start a conversation about your system, [book a discovery call](https://cal.com/cal.com-evoked/discovery-call).*

*Originally published on [We Evoke (Substack)](https://weevoke.substack.com).*

---

**Related reading:**
- [What Should Your Agent Refuse?](/writing/what-should-your-agent-refuse/)
- [Fifteen Frameworks, One Missing Layer](/writing/fifteen-frameworks/)
- [Adding Governance to an Agent You Already Built](/writing/adding-governance-to-an-agent-you-already-built/)

---

## Sources

**Agentic Infrastructure:**
- [Agentic Commerce Suite](https://stripe.com/newsroom/news/agentic-commerce-suite) - Stripe (agent-native payment tools)

**Agent Governance (Open Source):**
- [Agent Governance Starter Kit](https://github.com/lowkey-divine/agent-governance-starter-kit) - Free templates and code examples from a production system with 142 agents
