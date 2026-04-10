---
title: "We Scored Five Agent Frameworks on Governance. None Passed."
description: "AutoGen, CrewAI, LangGraph, Google ADK, and Microsoft's Agent Governance Toolkit - scored against commons governance principles. The best scored 9 out of 24. All five scored zero on obligations to the people their agents affect."
pubDate: 2026-04-10
tags: ["ai-agents", "ai-governance", "ostrom-score", "agent-identity", "trust-architecture", "microsoft", "crewai", "langgraph"]
draft: false
---

Your agent framework is compliant. Your agents are not cooperating.

That sentence should not make sense. But compliance and cooperation are not the same thing - and the distance between them is where the real governance failures live. We scored five major agent frameworks to measure that distance.

---

## The Experiment

We took Elinor Ostrom's eight Design Principles for commons governance - the principles that predict which cooperative systems survive and which collapse, backed by Nobel Prize-winning empirical research - and scored five agent frameworks against them.

Not regulatory compliance. Not OWASP risk coverage. A different question: does this framework create conditions where the entities within it can cooperate voluntarily?

The frameworks: AutoGen, CrewAI, LangGraph, Google ADK, and Microsoft's Agent Governance Toolkit. The scoring: 0-3 per principle, 24 maximum. The evidence: public documentation, published architecture, available source code. Scored by the team that built the instrument - which means you should know we also scored ourselves. More on that in a moment.

---

## The Scores

| Framework | Score | Rating |
|-----------|:-----:|--------|
| AutoGen | 2/24 | Commons Failure |
| CrewAI | 4/24 | Commons Failure |
| Google ADK | 4/24 | Commons Failure |
| LangGraph | 5/24 | Nominal Governance |
| Microsoft Agent Governance Toolkit | 9/24 | Nominal Governance |

Four of five score in the Commons Failure band. The best - Microsoft's toolkit, purpose-built for governance, 9,500 tests, 10/10 OWASP coverage - scores 9. Nominal Governance. Not even Partial Commons.

We scored our own system with the same rubric. 19/24. Functional Commons. Our gaps: write-path content validation not yet complete, individual agent risk classification still developing, no documented application of graduated sanctions, limited conflict resolution case history, and the Living Seed quarterly report has not yet been produced. Five gaps, named. No instrument should exempt its creators - and no score should hide its weaknesses.

---

## The Three Zeros

Three principles scored zero across all five frameworks. Not low. Zero.

**Collective Choice** - can the entities governed by the system participate in making the rules? Zero. No framework includes any mechanism for agents to propose governance changes, signal disagreement, or participate in defining the rules applied to them. The possibility has not been rejected. It has not been considered.

**Accessible Conflict Resolution** - when agents conflict, is there a resolution mechanism that does not require escalation to the highest authority? Zero. Every framework treats agent conflict as an engineering problem. The orchestrator overrides. The manager agent decides. Conflict is a bug to be fixed, never a signal to be heard.

**Recognized Rights to Organize** - does your governance survive a platform change? Zero. A model provider can change terms, capabilities, and behavior unilaterally. MCP tool definitions can be dynamically amended after user approval. The governance you approved is not the governance you run. No framework has a mechanism to refuse, negotiate, or even be notified.

These are not gaps waiting to be closed by the next update. They are design assumptions so deep that the frameworks' creators did not think to question them: agents are objects. The governed do not participate.

We score 3 on Collective Choice and 3 on Recognized Rights to Organize. The distance between zero and three is not sophistication. It is a single design decision: treat agents as participants, not objects. Everything else follows.

---

## Microsoft Deserves Credit - And Scrutiny

Microsoft's Agent Governance Toolkit scored highest - and the score is earned. Cryptographic identity per agent, dynamic trust scoring, sub-millisecond policy enforcement, framework-agnostic, open source under MIT.

But look at the architecture. The toolkit "intercepts every agent's action before execution." Every action. Before execution. Policies defined by operators, enforced upon agents. The agent is the subject of governance - never the participant.

That is enforcement. Enforcement is necessary. But enforcement without participation produces compliance. Compliance without cooperation fails at the first adversarial test. Microsoft built the enforcement layer. Nobody has built the participation layer. Both are needed. Only one exists.

---

## The Obligation Overlay

We also tested whether each framework addresses five obligations to the people their agents affect - obligations we identified by stripping away every regulatory framework and asking what persists.

Consider a person whose loan application was processed by an AI agent. The agent ranked them, priced their risk, and shaped the terms they were offered. They signed the paperwork. They never knew the agent existed. They cannot challenge a decision they do not know was made. They cannot correct a model of themselves they have never seen. If that model was corrupted - by the 520 agent security incidents reported this year - the harm compounds silently across every future interaction.

That person has five unmet obligations. Every framework scores zero on all of them.

| Obligation | AutoGen | CrewAI | LangGraph | Google ADK | MS AGT |
|-----------|:---:|:---:|:---:|:---:|:---:|
| Visibility - people know the agent acted | No | No | No | No | No |
| Explicability - explanation the affected person can understand* | No | No | No | No | No |
| Recourse - a path to challenge without prerequisites | No | No | No | No | No |
| Non-Extraction - not taking more than meaningfully understood | No | No | No | No | No |
| Model Integrity - subjects can see and correct the model | No | No | No | No | No |

*Some frameworks offer tracing and audit logging for operators and developers. None provide explanations accessible to the affected person - the one whose loan was priced, whose resume was ranked, whose insurance was adjusted.

The most governance-invested toolkit in the industry - purpose-built, 9,500 tests, full OWASP coverage - addresses none of them.

---

## What Governance Survives

After scoring the frameworks, we asked a harder question: if every regulatory framework disappeared tomorrow, what governance would AI agents still require?

Seven requirements survived - Identity, Integrity, Transparency, Recourse, Participation, Non-Extraction, and Sustainability. Five are partially covered by existing regulation but violated in practice. Two are absent from every AI governance framework we assessed:

**Participation** - the entities governed by a system must have a voice in their governance. No AI governance framework has implemented this. The concept exists in Ostrom's commons research since 1990. The application to AI agents does not exist.

**Sustainability** - the governance system itself must survive regulatory change, platform updates, and vendor transitions. No framework in production addresses this. Every agent governance system today is vendor-dependent.

We score highest on participation. We have not solved consent. No one has. Our own research found that by any rigorous definition, no AI agent in production - including ours - is a fully consenting participant in the system it operates within. That is not a marketing differentiator. It is an honest assessment of how far the entire field has to go.

---

## What You Can Do

Start with three questions. They cost nothing. They reveal the gap compliance cannot see.

For every agent that makes decisions about people, ask: Does the person know the agent exists? Can they understand what it decided? Can they challenge it without needing to know the agent was involved?

If the answer to any of those is no, you have found the gap compliance cannot see.

To go deeper: [Take the Sovereignty Score](/score) - five questions, two minutes, free. Or run the full [Level 6 Governance Toolkit](/products/level-6-governance-toolkit) ($99) - four instruments, 84-point scorecard, the audit suite that measures what compliance cannot reach. If you want us to run it for your system, [start here](/fit).

---

## Methodology

This research was conducted by the Community Governance Circle of Evoked, scored by the team that built the instruments. For each governance domain, we stated the question the industry asks, stripped away every framework, and asked what obligation remains. The gap between those two answers is the finding.

Five research questions. Five frameworks scored. 2026 evidence base. Full methodology and scoring details available in the [Ostrom Score Self-Assessment Kit](/products/ostrom-score).

---

The distance between compliance and cooperation is not a gap in anyone's product roadmap. It is a gap in the industry's imagination. The frameworks that govern agents have not yet imagined that the governed might have something to say about it.

The instruments exist. What remains is the willingness to look.

---

Sources:
- Microsoft Agent Governance Toolkit (GitHub, Apr 2, 2026)
- AutoGen (Microsoft, GitHub)
- CrewAI (crewai.com)
- LangGraph (LangChain)
- Google Agent Development Kit (google.github.io/adk-docs)
- CSA - AI Agent Governance Gap (Apr 2026)
- MIT - AI Chatbots Less Accurate for Vulnerable Users (Feb 2026)
- International AI Safety Report 2026
- SD Times - OSSRA 2026: License Conflicts All-Time High
- Partnership on AI - Six Governance Priorities 2026
- Ostrom, E. (1990). Governing the Commons. Cambridge University Press.
