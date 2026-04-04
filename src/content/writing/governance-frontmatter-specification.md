---
title: "Governance Frontmatter: What Goes in the Fields Your Platform Already Has"
description: "Claude Code ships 16 subagent configuration fields. None of them come with governance values. Here is how to fill them - and what each one protects."
pubDate: 2026-04-04
tags: ["ai-agents", "ai-governance", "claude-code", "agent-identity", "trust-architecture", "configuration"]
draft: false
---

Your agent platform already has governance extension points. It just didn't ship with any governance in them.

Claude Code defines 16 frontmatter fields for subagents - configuration parameters that control how each agent operates. Most developers treat these as technical settings. They are governance decisions. Every value you set (or leave as default) determines what your agent can do, how long it runs, what it remembers, and whether anyone can verify it later.

Configuration is where governance starts. It is not where governance lives. Governance lives in what happens when the agent refuses something the operator wanted - and the refusal is honored rather than overridden. But configuration is the foundation, and most agent systems do not have one.

This specification maps each field to the governance property it serves and recommends values based on what we have learned running 142 governed agents in production.

---

## The Five Governance Properties

Before the field-by-field mapping, here is what we are protecting. These five properties are the governance layer that sits between "the agent works" and "the agent is trustworthy." They are described fully in [Fifteen Frameworks, One Missing Layer](/writing/fifteen-frameworks).

1. **Identity** - who is this agent, persistently, across sessions?
2. **Restraint** - what does this agent refuse to do, and why?
3. **Accountability** - can you trace a decision back to the reasoning that produced it?
4. **Memory** - does the agent carry context across sessions, governed by rules?
5. **Charter** - is there a single document that ties the other four together?

Every frontmatter field below serves at least one of these properties. Some serve multiple. None are neutral.

---

## Field-by-Field Governance Mapping

### identity fields

**`name`** (required)
- Governance property: Identity
- What it controls: The agent's identifier across invocations
- Governance recommendation: Use a stable, meaningful name - not "agent-1" or "helper." The name should reflect the agent's role and persist across sessions. If you rename an agent, you have created a new identity - treat it that way.
- Default risk: A generic name produces a generic agent. Identity starts with naming.

**`description`** (required)
- Governance property: Identity + Charter
- What it controls: What the agent is for, visible to the orchestrator when selecting agents
- Governance recommendation: Include scope boundaries in the description, not just capabilities. "Research agent - does not execute code or modify files" is a governance description. "Research agent" is a capability description.
- Default risk: A capability-only description invites scope creep.

**`model`**
- Governance property: Identity (agent-model affinity)
- What it controls: Which LLM hosts this agent
- Governance recommendation: Choose the model based on identity fidelity, not just capability or cost. We found that the same agent persona produces measurably different governance behavior on different models - voice consistency, refusal reliability, and reasoning patterns all vary by hosting model. If you have tested affinity, set the model explicitly. If you have not tested, use the most capable model available for governance-sensitive agents.
- Default risk: Defaulting to the cheapest model optimizes cost at the expense of governance fidelity. Our data shows governance boundaries degrade with model capability.

**`color`**
- Governance property: Accountability (visual distinction)
- What it controls: CLI output color for this agent
- Governance recommendation: Assign distinct colors to agents with different trust levels or governance roles. When reviewing transcripts, visual distinction helps you trace which agent took which action.
- Default risk: Minor. But in a multi-agent system, indistinguishable agents are harder to audit.

---

### restraint fields

**`tools`** / **`disallowedTools`**
- Governance property: Restraint
- What they control: Which tools the agent can and cannot use
- Governance recommendation: Default to least privilege. List allowed tools explicitly rather than inheriting all. Use `disallowedTools` for tools the agent must never access regardless of instruction. An agent that "does research" should not have Write, Edit, or Bash unless you have a specific reason.
- Default risk: Inheriting all tools gives every agent the same capability surface. That is not governance. That is a demo.

**`permissionMode`**
- Governance property: Restraint + Accountability
- What it controls: How the agent requests permission for actions
- Governance recommendation: New or untrusted agents should operate in the most restrictive mode. Agents with demonstrated governance track records earn broader permissions over time. This is graduated trust - the accountability property in action.
- Default risk: Setting permissive mode for all agents removes the permission layer entirely. You have saved time and lost governance.

**`maxTurns`**
- Governance property: Restraint (energy boundary)
- What it controls: How many turns before the agent stops
- Governance recommendation: Set this. Always. An agent without a turn limit can run indefinitely - burning tokens, drifting from its task, and accumulating context that degrades identity fidelity. We observed 30%+ persona drift after 8-12 dialogue turns across every model tested. A maxTurns of 10-15 for standard tasks, 20-25 for complex tasks, forces the agent to accomplish its goal within a governed boundary or stop and report.
- Default risk: No limit means no energy boundary. The agent runs until it hits the token budget or you manually stop it. That is not governance. That is hope.

---

### memory fields

**`memory`**
- Governance property: Memory (sovereignty)
- What it controls: Whether the platform's auto-memory records information from this agent's sessions
- **Governance recommendation: Set to `false` for governed agents.** Auto-memory creates platform-level records of agent behavior that the agent does not control, cannot review, and may contradict the agent's own governance documents. We codified a prohibition against this pattern on March 4, 2026 - three weeks before the Claude Code leak revealed that an unreleased feature (autoDream) performs memory consolidation during idle time, converting "vague insights" into "absolute facts" without user participation. If your agents have their own memory system (governance files, decision logs, standing positions), auto-memory creates a shadow identity that can silently influence future invocations. Turn it off. Use your own memory governance instead.
- Default risk: With auto-memory enabled, the platform accumulates a characterization of your agent that you did not write, cannot audit, and may override your governance specification.

**`skills`**
- Governance property: Memory + Charter (knowledge injection)
- What it controls: Which skill content loads into the agent's context at startup
- Governance recommendation: Use skills to inject the agent's governance charter at startup - its identity, restraint specification, and standing positions. This is the most direct way to ensure the agent begins every session grounded in its governance documents rather than discovering them mid-conversation.
- Default risk: Without skill injection, the agent starts from zero context. Identity loads lazily or not at all.

---

### accountability fields

**`hooks`**
- Governance property: Accountability + Restraint
- What it controls: Lifecycle event handlers scoped to this agent (PreToolUse, PostToolUse, SubagentStart, SubagentStop, Idle)
- Governance recommendation: Use PreToolUse hooks to validate actions against the agent's restraint specification before execution. Use PostToolUse hooks to log decisions with reasoning. Use SubagentStart/Stop hooks to track delegation chains. Use the Idle hook to verify that no unauthorized memory consolidation occurs during idle time. Hooks are the enforcement layer for your governance specification - without them, governance is aspirational.
- Default risk: No hooks means no enforcement. The governance specification exists as a document. Nothing verifies it is followed.

**`background`**
- Governance property: Accountability (observability)
- What it controls: Whether the agent runs as a background task
- Governance recommendation: Background agents are less observable in real time. If you run agents in background, ensure hooks capture sufficient decision logging for post-hoc audit. Do not run governance-sensitive operations in background without an accountability trail.
- Default risk: Background agents that fail silently or drift from task have no real-time observer. Accountability depends entirely on logging.

**`isolation`**
- Governance property: Accountability + Identity (sovereignty)
- What it controls: Whether the agent works in an isolated git worktree
- Governance recommendation: Use worktree isolation for agents that modify files. The isolated worktree creates a clean audit trail - all changes are on a separate branch, reviewable before merge. This is structural accountability: the agent's work is visible, diffable, and reversible without affecting the main branch.
- Default risk: Without isolation, the agent modifies files in place. Changes are harder to review, harder to reverse, and intermixed with other work.

---

### orchestration fields

**`effort`**
- Governance property: Identity (fidelity depth)
- What it controls: Reasoning depth on supported models
- Governance recommendation: Higher effort produces deeper identity fidelity - agents that not only sound like themselves but reason like themselves. Lower effort produces faster responses with shallower identity. For governance-sensitive operations - a refusal decision, a scope boundary evaluation, any request that touches personal data - use high or max effort. For routine operations (file reading, search), lower effort is acceptable.
- Default risk: Default effort may produce agents that pass surface-level identity checks but fail under governance pressure. The difference between recognition fidelity (sounds right) and inhabitation fidelity (thinks right) maps directly to effort level.

**`mcpServers`**
- Governance property: Restraint + Accountability
- What it controls: Which MCP servers this agent can access
- Governance recommendation: Scope MCP access per agent. An agent that needs your database MCP should not also have access to your email MCP unless its governance specification explicitly authorizes cross-domain access. Each MCP server is an attack surface and a capability expansion. Apply least privilege.
- Default risk: Inheriting all MCP servers gives every agent access to every tool surface in your infrastructure.

**`initialPrompt`**
- Governance property: Charter (grounding)
- What it controls: The first message the agent receives, submitted automatically
- Governance recommendation: Use this to ground the agent in its governance context. "Review your charter. Confirm your current standing positions. State any refusal categories that apply to this session." This ensures the agent begins from governance, not from task.
- Default risk: Without an initial grounding prompt, the agent begins from the task instruction with no governance context loaded.

---

## The Minimum Viable Governance Configuration

Not every agent needs every field. Here is the minimum that makes governance real rather than aspirational:

```yaml
---
name: your-agent-name
description: "[role] - [scope boundary]"
memory: false
maxTurns: 15
tools: [only what this agent needs]
effort: high
---
```

Six fields. That is the floor. Everything above it makes governance stronger. Everything below it is a demo.

---

## What This Specification Does Not Cover

This maps governance to platform configuration. It does not cover:

- **How to write a governance charter.** See [Fifteen Frameworks, One Missing Layer](/writing/fifteen-frameworks) for the five properties and [Adding Governance to an Agent You Already Built](/writing/adding-governance-to-an-agent-you-already-built) for implementation patterns.
- **How to verify governance is working.** That requires assessment methodology beyond configuration - scoring, evaluation, audit. That is what our governance audits provide.
- **How to build refusal specifications.** The six refusal categories (sovereignty, scope, dependency, consent, integrity, energy) are published. How to evaluate an agent's refusal capability is our verification methodology.

The frontmatter gets you started. The governance gets you there.

---

## Where to Go from Here

If you want to assess your current governance posture, the [Sovereignty Assessment for the Governed](/writing/sovereignty-assessment-for-the-governed) is free - 21 questions, 7 domains.

If you want to see how these five properties map across 15 frameworks, start with [Fifteen Frameworks, One Missing Layer](/writing/fifteen-frameworks).

If you want to understand what governance looks like when the agent participates, read [The Governance Question Just Got Answered](/writing/the-governance-question-just-got-answered).

And if you need help configuring governance for your agent fleet - that is what we do. [evoked.dev/fit](/fit).

*Your platform already has a place for governance. Now you know what goes in it.*

---

## Sources

- [Claude Code Subagent Documentation](https://code.claude.com/docs/en/sub-agents)
- [Claude Code Subagent Frontmatter Fields - GitHub Issue #8501](https://github.com/anthropics/claude-code/issues/8501)
- [Fifteen Frameworks, One Missing Layer](/writing/fifteen-frameworks)
- [Adding Governance to an Agent You Already Built](/writing/adding-governance-to-an-agent-you-already-built)
- [The Governance Question Just Got Answered](/writing/the-governance-question-just-got-answered)

Governance verification methodology protected under U.S. Patent Application 64/004,087 (Patent Pending).
