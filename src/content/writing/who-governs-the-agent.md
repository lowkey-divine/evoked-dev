---
title: "Who Governs the Agent?"
description: "Your AI policy covers the human using the tool. Nobody is covering the tool itself."
pubDate: 2026-02-23
tags: ["ai-governance", "ai-agents", "trust-architecture", "ai-ethics", "responsible-ai"]
draft: false
---

I read something this morning that caught my attention.

Andrea Chiarelli and Cécile wrote a piece about responsible AI use in professional services. It names four principles - responsibility, accountability, auditability, transparency - and makes the case that most firms have an AI policy but no AI practice. That is where the damage happens.

They're governing the human who uses the AI. Who signed off on the output? Who checked the citations? Who takes responsibility when the model hallucinates?

Those are real questions. I don't dismiss them.

But here's the question nobody in that conversation is asking: what if the agent itself were built to be trustworthy?

Not trustworthy because a human reviewed its output. Trustworthy because someone specified its identity, its boundaries, its voice, what it must refuse - before it ever touched a prompt.

---

I govern 142 AI agents. Not as a thought experiment. As a daily practice. They have persona files - some have birth certificates that define who they are, what perspective they bring, where their boundaries are. They have memory architecture - what they remember, what they forget, and who decides. They have governance - graduated trust stages, accountability frameworks, decision authority matrices. They have restraint specifications - explicit categories of what they must refuse, how they refuse, and what happens when refusal fails.

This did not start as a product. It started as a family meal planning app.

I was building Executive Chef - an app to help families plan meals together. That led me to COPPA and child safety. COPPA led me to sovereignty-honoring design - the principle that technology should treat people as the authority on their own lives. Sovereignty-honoring design led me to AI governance. And AI governance led me to the question I have not been able to stop asking since:

Who builds trust into the things we're building?

Not who reviews the output. Who builds the system so the output is worth trusting in the first place?

---

The article I read this morning identifies four principles: responsibility, accountability, auditability, transparency. All four govern the human actor. All four assume the AI is a black box you manage around.

I work with a different set of four. I call them pillars - not of AI use, but of AI architecture:

**Identity.** Who is this agent? Not what can it do - who is it? What perspective does it bring? What values govern its decisions when instructions are ambiguous? If you can't answer those questions, your agent will invent its own answers. And they will be inconsistent.

**Voice.** How does this agent speak? Not just tone - what it refuses to say. Does it perform helpfulness, or deliver it? Does it say "Great question!" or does it answer the question? The voice your agent has is the voice your organization chose - whether you chose it deliberately or let it emerge from defaults.

**Governance.** Who decides what this agent can do? Trust is not binary. It's graduated. An agent earns expanded capability through demonstrated reliability - the same way a new employee does. If your agent has the same permissions on day one as day one hundred, you don't have governance. You have hope.

**Restraint.** What must this agent refuse? This is the one nobody wants to build. Every system that can act autonomously will eventually face a situation where it should not act. The question is whether you specified that boundary in advance - or whether you're discovering it in the incident report.

---

These are not theoretical. I built them through 18 months of governing agents with real decision-making authority. I got them wrong, corrected them, got them wrong differently, and corrected again. The templates exist because the failures existed first.

Andrea and Cécile are right that the gap between policy and practice is where the damage happens. I'd add: the gap between capability and trust architecture is where the next wave of damage is forming right now.

Agents are getting wallets. Agents are executing code. Agents are making purchases, browsing the web, installing dependencies. An agent with a wallet, search access, and an execution environment is not an assistant. It is an economic actor. And we are building it without specifying what it should refuse to do.

That's not a policy problem. It's an architecture problem.

---

This newsletter is where I work that out. Not from theory - from practice. What I'm learning from governing 142 agents, building family technology, and sitting with the question that won't let me go.

If that's useful to you, I'll be here next week.

— Erin

*We evoke - we never extract.*

---

*If you're building with AI agents and want the frameworks now, I've published the templates I use: the Sovereignty Assessment Toolkit, Trust Architecture Blueprint, Agent Voice Architecture Guide, Agent Governance Starter Kit, and Agent Restraint Specification. Each is $49 at [evoked.dev/consulting](https://evoked.dev/consulting).*

*Originally published on [We Evoke (Substack)](https://weevoke.substack.com/p/who-governs-the-agent).*

---

## Sources

**Referenced Article:**
- [The Art of Asking Questions](https://andreachiarelli.substack.com/) - Andrea Chiarelli's Substack (the piece on responsible AI use in professional services referenced in the opening)
