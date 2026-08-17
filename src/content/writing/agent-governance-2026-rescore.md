---
title: "A Year of Governance Toolkits Shipped. I Re-Scored. The Number Did Not Move."
description: "In 2026 the agent-governance field shipped real toolkits - Microsoft's Agent Governance Toolkit, CrewAI Enterprise, LangGraph with LangSmith. I re-scored four frameworks against Ostrom's eight principles for governing a commons. Enforcement improved everywhere. Participation still scores zero everywhere. The ceiling held at 9 of 24."
pubDate: 2026-08-10
updatedDate: 2026-08-10
tags: ["ai-agents", "ai-governance", "ostrom-score", "microsoft-agent-framework", "agent-governance-toolkit", "crewai", "langgraph", "google-adk", "sovereignty-score"]
draft: false
faq:
  - q: "Did agent governance improve in 2026?"
    a: "Enforcement did. In 2026 Microsoft open-sourced the Agent Governance Toolkit (covering 10 of 10 OWASP agentic risks), CrewAI added enterprise observability, and LangGraph paired with LangSmith for node-by-node audit traces. But on a commons-governance rubric - Ostrom's eight design principles - the total did not move. The best framework still scores 9 of 24, and the three participation principles still score zero across every framework."
  - q: "What is the best-scoring agent framework on Ostrom governance in 2026?"
    a: "The Microsoft Agent Framework with its Governance Toolkit, at 9 of 24. CrewAI and Google ADK score 4, LangGraph scores 5. Every one of the four meets zero of the five obligations an agent owes the people it acts upon."
  - q: "Does Microsoft's policy conflict resolution engine satisfy Ostrom's accessible-conflict-resolution principle?"
    a: "No. Microsoft's engine resolves conflicts between policies the operator wrote, using precedence rules the operator set. Ostrom's principle is about the parties to a dispute having a low-cost way to raise and settle it. The agent and the person the agent acts upon have no standing in the engine, so the principle still scores zero. It resolves conflicts of policy, not conflicts of parties."
---

*This is a re-score. In the spring I scored five agent frameworks against Elinor Ostrom's eight principles for governing a commons and published the math. In 2026 the field shipped governance toolkits, so I ran it again - same rubric, current docs, checked against a live search on the day it ran, pre-registered and put through an independent second review before I wrote this. The original reference is [Governance Field 2026](/writing/governance-field-2026/). Sources are at the end.*

## What I did

Back in the spring I scored five agent frameworks against Ostrom's eight principles for governing a commons. The best score was 9 out of 24. Three of the eight principles scored zero across every framework. I published the math so anyone could check it.

Then the field shipped. Microsoft open-sourced an Agent Governance Toolkit in April that covers all ten of the OWASP agentic risks. CrewAI added enterprise observability. LangGraph paired with LangSmith to give auditors a node-by-node trace. If you read the release notes, 2026 looks like the year agent governance grew up.

So I re-scored. Same rubric, current docs, checked against a live search on the day I ran it. I expected the top number to climb.

It did not. The ceiling is still 9 out of 24.

Here is why that is the real story, and not the anticlimax it sounds like.

## First, the list changed

AutoGen is gone. Not deprecated - merged. In October 2025 Microsoft folded AutoGen and Semantic Kernel into a single successor, the Microsoft Agent Framework, and put both originals into maintenance mode. The framework went 1.0 in April 2026. Scoring AutoGen today would mean scoring a thing that no longer ships on its own.

So the study is four frameworks now, not five: CrewAI, Google ADK, LangGraph, and the Microsoft Agent Framework with its Governance Toolkit. I want to be straight about one effect of that. Dropping AutoGen also drops the old low score of 2. The published range tightens from 2-through-9 to 4-through-9. That is not the field getting better at the bottom. It is the weakest entry getting absorbed into a better-funded one. The floor rose because a framework died, not because anyone fixed it.

## The re-scored table

| Framework | Ostrom score | Five Obligations |
|---|:--:|:--:|
| CrewAI | 4 / 24 | 0 / 5 |
| Google ADK | 4 / 24 | 0 / 5 |
| LangGraph | 5 / 24 | 0 / 5 |
| Microsoft Agent Framework + Governance Toolkit | 9 / 24 | 0 / 5 |

The Microsoft row is not the same object I scored in the spring. It is the merged framework plus the new toolkit - a fresh score of a new thing that happens to tie the old top. Even so, it lands at 9.

Every framework still scores zero on three principles: collective choice, accessible conflict resolution, and the right to organize. Every framework still meets zero of the five obligations an agent owes the person it acts upon.

## Why a year of investment moved the total by zero

Two reasons, and both matter.

The first is that the toolkits poured their effort into cells that were already near the top. Ostrom's principle on monitoring was already maxed at 3 in the spring, because Microsoft had cryptographic identity and verifiable audit from the start. You cannot score a 4 out of 3. When the 2026 additions arrived - the audit spans, the OpenTelemetry hooks, the delegation chains that narrow scope - they made an already-strong cell stronger without changing its number. The investment landed exactly where there was no room left.

The second reason is the one the toolkits are counting on you not to notice. The three principles that scored zero are the participation principles - whether the agent or the person it acts upon has any say in the rules. Not one 2026 release touched them. And they were never going to, because every one of those releases is built on the same assumption: the agent is a thing to be controlled, and the person is a thing to be decided about. Better control does not become participation no matter how much of it you ship.

So the total held at 9. Enforcement improved across the board. Participation is still zero everywhere.

## The word that will trip you up

Microsoft's toolkit ships something called a policy conflict resolution engine. It has strategies with names like deny-overrides and most-specific-wins, and it writes an auditable trace of how it resolved the clash. If you are skimming, you will see "conflict resolution" and assume the sixth Ostrom principle - accessible conflict resolution - just got satisfied.

It did not, and the distinction is the whole point.

Ostrom's principle is about the parties to a dispute having a low-cost way to raise and settle it. Microsoft's engine resolves conflicts between policies that the operator wrote, using precedence rules the operator set. The agent has no standing in it. The person the agent acted upon has no standing in it. Nobody who is governed can raise a conflict - the engine only decides which of the operator's own rules wins. That is a good feature. It is not the principle. It resolves conflicts of policy, not conflicts of parties, and the parties are exactly who the principle is about.

The same trick hides inside "human-in-the-loop." A human approving the agent's action is oversight. It is a person deciding on the subject, not with them. Oversight is worth having. It is still not participation, and calling it participation is how a zero gets dressed up as a win.

I will name the one cell I had to argue hardest. Microsoft's sanctions ladder - downgrade the agent's trust, block the action, kill the session - is a genuinely graduated response, and graduated sanctions are what the fifth principle rewards. I still scored it a 2, not a 3. Ostrom wrote the principle in two halves: the sanctions escalate with the seriousness of the breach, and the people bound by them have a say in how they are administered. Microsoft nailed the first half and left the second half empty. The kill switch belongs to the operator alone. One half present, one half absent. That is a 2, and I would defend it to the team that built the toolkit.

## What this means if you are the one building

If you shipped an agent this year and added a governance toolkit to it, you did real work. The audit trail is real. The policy engine is real. The kill switch is real. I am not here to tell you it was theater.

I am here to tell you what it did not buy. It did not give the person your agent acts upon a way to know it happened, understand it, or challenge it. It did not give your agent a way to refuse an instruction and have that refusal read as a signal instead of a fault. It moved you up the enforcement axis and left you at zero on the participation axis, and the second one is the one that separates a governed system from a controlled one.

The frameworks are not going to close that gap for you, because they were designed on the assumption it does not need closing. That part is yours.

## The rung

If you want to see where your own system sits - not on the whole rubric, but on the questions that matter first - the five-question version is free and takes about two minutes.

**[Run the Sovereignty Score](/score/)**

It will not flatter you. The industry baseline is 0 to 3 out of 15. That is the honest starting line, and knowing where you stand on it is the first thing worth doing tonight.

## Sources

- Microsoft. "Agent Framework Overview." Microsoft Learn (2026). The AutoGen and Semantic Kernel convergence, maintenance-mode announcement (October 2025), and 1.0 general availability (April 3, 2026). [learn.microsoft.com/en-us/agent-framework/overview](https://learn.microsoft.com/en-us/agent-framework/overview/)
- Microsoft. "Agent Governance Toolkit." GitHub (2026). Open-sourced April 2026; policy enforcement, zero-trust identity, execution sandboxing; covers 10/10 of the OWASP Agentic Top 10. Also documents the policy conflict-resolution strategies (deny-overrides, allow-overrides, priority-first-match, most-specific-wins), the three-tier global/tenant/agent scope model, and the auditable resolution trace. [github.com/microsoft/agent-governance-toolkit](https://github.com/microsoft/agent-governance-toolkit)
- "An Implementation of the Microsoft Agent Governance Toolkit." MarkTechPost (May 31, 2026). The graduated response ladder: trust downgrade, block, human approval, session kill. [marktechpost.com](https://www.marktechpost.com/2026/05/31/an-implementation-of-the-microsoft-agent-governance-toolkit-for-safe-ai-agent-tool-use-with-policies-approvals-audit-logs-and-risk-controls/)
- "Best AI Agent SDKs Compared (2026)." Requesty (2026). CrewAI Enterprise observability and audit logging; LangGraph interrupt() human-in-the-loop and LangSmith node-by-node audit trace. [requesty.ai](https://www.requesty.ai/blog/best-ai-agent-sdks-compared-2026-langchain-crewai-openai-anthropic-google)
- Google. "Plugins - Agent Development Kit." ADK docs (2026). Native callback and plugin governance hooks. Integration direction is Microsoft-into-ADK: Microsoft's toolkit ships an adapter that hooks into ADK's plugin system; the ADK docs do not defer governance to Microsoft. [adk.dev/plugins](https://adk.dev/plugins/)
- Evoked. "Governance Field 2026: What Exists, What Doesn't, What Scores Zero." The original five-framework Ostrom-8 and Five Obligations scores and rubric definitions this piece re-scores against. [/writing/governance-field-2026](/writing/governance-field-2026/)
- Ostrom, E. (1990). *Governing the Commons.* Cambridge University Press. Principle 5 ("graduated sanctions... assessed by other appropriators, by officials accountable to these appropriators, or both") is the two-half test the sanctions argument rests on. [Live summary](https://patternsofcommoning.org/uncategorized/eight-design-principles-for-successful-commons/)
