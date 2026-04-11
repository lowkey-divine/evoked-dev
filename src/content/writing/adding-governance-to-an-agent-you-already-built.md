---
title: "Adding Governance to an Agent You Already Built"
description: "Your framework already has the parts. You just haven't assembled them as governance. Practical patterns for CrewAI, Pydantic AI, and LangGraph."
pubDate: 2026-03-19
tags: ["ai-agents", "ai-governance", "agent-framework", "guardrails", "crewai", "pydantic-ai", "langgraph", "trust-architecture"]
draft: false
---

Your agent passes every guardrail and still does something it shouldn't. Not because the content was harmful - because nobody defined whether it had the authority to act in the first place. Multi-turn attacks succeed over 60% of the time against guardrail-only architectures. HiddenLayer bypassed OpenAI's safety filters with what they described as straightforward techniques. Guardrails catch bad content. They don't answer a different question entirely: should this agent be acting at all?

I wrote about this gap across [fifteen major frameworks](/writing/fifteen-frameworks). This article is what comes after - practical patterns you can add to an agent you already built.

---

## Five Properties Your Agent Needs

Based on what I've built and what I've seen break, governance comes down to five properties your agent either has or doesn't.

**Identity** is the narrowest: who is this agent? Its name, role, scope, and authority level. Not a system prompt that changes every deploy - a stable declaration of what the agent is and where its authority ends. Identity is a field.

**Restraint** means specifying what the agent will not do in a format the system can enforce. Which tools it cannot call, which actions require approval, which domains are out of scope. I wrote about the design side of this in [What Should Your Agent Refuse?](/writing/what-should-your-agent-refuse)

If your agent made a bad decision last Tuesday, could you find it? That's **accountability** - a record of what was decided, what policy it was evaluated against, and whether the agent was authorized to act. Tracing tells you what happened. Accountability tells you whether it should have.

**Memory** is persistent context that carries across sessions. What the agent has decided before, what positions it holds. Without it, every session starts from zero and drift becomes invisible because there's no baseline to drift from.

A **charter** ties the other four together into a single governance document. It includes the agent's identity, its restraint specification, its accountability requirements, and its memory policy - version-controlled, diffable, auditable. When the agent's behavior changes, you can diff it against the charter and ask whether that's drift or growth. A prompt can't answer that question. A charter can.

---

## What Already Exists

Production tools exist for agent safety - NVIDIA's NeMo Guardrails handles content filtering and jailbreak prevention. Guardrails AI validates structured outputs. Microsoft's Agent Governance Toolkit enforces policy at sub-millisecond latency across all ten OWASP agentic risk categories. Use them. But they share an assumption: governance is applied from the outside. The patterns below start from a different question - how does the agent know what it's authorized to do?

---

## Identity Charter in CrewAI

Every CrewAI agent already has three fields: `role`, `goal`, and `backstory`. Most developers treat these as prompt engineering - a way to get better outputs. They're the beginning of a governance document.

What's missing is boundaries and principles. Boundaries are hard constraints the agent holds regardless of instruction. Principles are what it optimizes for when the rules run out.

Your charter as a document might look like this:

```yaml
# Charter document - not CrewAI config directly
researcher:
  identity:
    role: Senior Data Researcher
    goal: Find and verify information about {topic}
    backstory: Experienced researcher with attention to accuracy
  boundaries:
    - Will not access internal databases without explicit authorization
    - Will not generate synthetic data and present it as research
    - Will not continue research beyond 20 iterations without review
  principles:
    - Accuracy over speed
    - Source attribution is non-negotiable
    - Uncertainty must be stated, not hidden
```

CrewAI doesn't parse `boundaries` and `principles` as native agent config. Today, these map to `system_template` - the charter document above becomes the source of truth, and the system template renders the relevant fields into the agent's operating instructions at runtime. The boundaries and principles live in the charter file; what CrewAI receives is the rendered template.

CrewAI's callback system (`task_callback`, `step_callback`) turns this into an accountability layer. A step callback that logs each iteration against the charter's boundaries creates a decision record. Not just what the agent did - whether it stayed within what it declared.

Role + goal + backstory gets you a character. Add boundaries and principles and you get a governed agent.

---

## Restraint and Accountability in Pydantic AI

Pydantic AI has a governance primitive that most developers walk past: `RunContext` with typed dependencies.

You define a governance object - a dataclass carrying the agent's identity, permissions, restraint spec, and audit log. Pass it as a dependency. Pydantic AI's type system threads it through every instruction, every tool call, and every output validator.

```python
@dataclass
class GovernanceDeps:
    agent_id: str
    auth_level: str
    allowed_tools: list[str]
    restraints: dict
    audit_log: list
```

This single object does three things at once.

`FilteredToolset` lets you write a filter function that checks the governance context before making any tool available. You implement `should_include_tool`, which receives the `RunContext` and the `ToolDefinition` - your function checks `ctx.deps.allowed_tools` and returns whether the agent can see that tool for this run. The agent doesn't see tools it isn't authorized to use - not filtered after invocation, but invisible before it.

`WrapperToolset` wraps every tool call with logging - you override `call_tool` to write the call, arguments, user context, and result to `ctx.deps.audit_log` before and after execution. Every tool invocation becomes an auditable decision.

Dynamic instructions via `@agent.instructions` read the charter from `ctx.deps` and render the agent's identity and restraints as part of every run. The charter isn't a static prompt. It's loaded from the governance object each time.

The `GovernanceDeps` type is checked at development time. If a tool tries to access a field that doesn't exist on the deps object, the code won't compile. Governance gets enforced by the type system, which is more reliable than documentation or good intentions.

`UsageLimits` adds resource restraints - caps on requests, tokens, and tool calls that can be computed dynamically per user, per session. A governance-aware budget rather than a global rate limit.

---

## Memory and Drift Detection in LangGraph

If you're building with LangGraph, you're probably already writing governance infrastructure. You're just not calling it that.

**Memory through persistence.** LangGraph's checkpointer - SQLite locally, PostgreSQL in production - snapshots state at every super-step. That gives you execution history, time-travel replay, and cross-session continuity. But the checkpointer stores whatever you put in state. If your state schema includes the agent's charter, its recent decisions, and its authorization context, the checkpointer becomes a governance memory. If your state only carries the conversation, it's just chat history. The infrastructure gives you memory. What you put in state determines whether that memory serves governance.

**Policy through conditional edges.** The routing functions that direct execution flow based on state are policy decisions. A function that evaluates state and decides whether execution continues, pauses for review, or stops is doing governance work.

```python
def governance_router(state):
    if state["risk_level"] == "high":
        return "escalate_to_human"
    if state["cost_estimate"] > state["budget"]:
        return "deny"
    if not state["agent_authorized"]:
        return "request_approval"
    return "execute"
```

Wire that into a conditional edge and the execution graph enforces the policy. The agent cannot bypass it.

LangGraph's `interrupt()` mechanism adds approval. When an agent hits a governance checkpoint, execution pauses, state persists to the checkpointer, and a human reviews before resuming with `Command(resume=decision)`.

**Drift detection** follows from the same architecture. Store the agent's charter in state. Add a periodic node that compares recent tool calls against charter boundaries. If the agent was authorized to research but has been calling write tools for ten iterations, the conditional edge routes to review. The graph catches the drift because the state carries the history.

The work is designing these routing functions and approval gates intentionally as governance rather than treating them as ad hoc safety checks. The infrastructure is already there.

---

## The Governance-Ready Checklist

Five questions. If you can answer all five about your agent, you have governance. If you can't, you know where to start.

1. **Can you describe what your agent is, beyond what it does?** If your agent's identity lives entirely in a system prompt, you have configuration. An identity declaration gives you something stable to hold the agent to.

2. **Can you list what your agent will not do, in a format your system enforces?** If it's only in the prompt, it's a suggestion. Restraint specifications are machine-readable and testable.

3. **Could you find a bad decision from last week?** Tracing shows you what happened. Decision logging shows you what was decided, against what policy, and whether the agent had authority.

4. **Does your agent carry context across sessions?** Without persistent memory, drift is invisible. There's no baseline to measure against.

5. **Is there a charter - a single document that defines your agent's identity, boundaries, and accountability requirements?** Not a prompt. A document - diffable, auditable, owned. When behavior shifts, you need something to diff it against.

---

None of these patterns require new libraries or rearchitecting your stack. They require looking at what your framework already gives you and deciding to treat it as governance. The parts are already in your hands.

---

*The builder who asks "what should my agent refuse?" has already started governing.*

---

**Sources**

- Cisco, Multi-Turn Attack Research (2025) - 60%+ success rate against guardrail-only architectures
- HiddenLayer, "Bypassing OpenAI Safety Filters" (October 2025)
- Microsoft Agent Governance Toolkit - github.com/microsoft/agent-governance-toolkit
- NVIDIA NeMo Guardrails - docs.nvidia.com/nemo/guardrails
- Guardrails AI - github.com/guardrails-ai/guardrails
- CrewAI Documentation - docs.crewai.com (agents, tasks, guardrails, memory, flows)
- Pydantic AI Documentation - ai.pydantic.dev (agents, tools, toolsets, dependencies)
- LangGraph Documentation - docs.langchain.com (interrupts, persistence, guardrails)
- OpenAI Agents SDK - openai.github.io/openai-agents-python/guardrails

---

**Related reading:**
- [Governance Frontmatter: What Goes in the Fields Your Platform Already Has](/writing/governance-frontmatter-specification/)
- [The Governance Question Just Got Answered](/writing/the-governance-question-just-got-answered/)
- [Who Governs the Agent?](/writing/who-governs-the-agent/)
