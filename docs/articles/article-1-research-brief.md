# Article 1 Research Brief: Fifteen Frameworks, One Missing Layer

**Phase 2 -- Research Complete**
**Date:** March 15, 2026
**Researcher:** Claude Opus 4.6 (1M context)
**Status:** Ready for Phase 3 (Discuss)

---

## Framework-by-Framework Governance Analysis

### Summary Table

| # | Framework | Stars (Mar 2026) | Input Validation | Output Filtering | Tool Restrictions | Sandboxing | Human-in-the-Loop | Audit Logging | Agent Refusal | Identity Governance | Values Drift Detection | Consent Model | Constitutional/Charter |
|---|-----------|----------------:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 1 | AutoGen | 55,653 | Partial | Partial | Partial | Yes | Yes | Partial | No | No | No | No | No |
| 2 | CrewAI | 46,154 | No | Yes | No | No | No | Partial | No | No | No | No | No |
| 3 | PydanticAI | 15,484 | Partial | Yes | Partial | No | No | No | No | No | No | No | No |
| 4 | Agno | 38,709 | Yes | Yes | Partial | No | Yes | Yes | No | No | No | No | No |
| 5 | AutoGPT | 182,497 | No | No | No | Yes | Yes | No | No | No | No | No | No |
| 6 | OpenHands | 69,175 | No | No | Partial | Yes | Partial | Partial | No | No | No | No | No |
| 7 | smolagents | 26,050 | No | No | Yes | Yes | Partial | No | No | No | No | No | No |
| 8 | OpenAI Agents SDK | 20,022 | Yes | Yes | Yes | No | No | Partial | No | No | No | No | No |
| 9 | LangChain/LangGraph | 129,625 | Yes | Yes | Partial | Yes | Yes | Yes | No | No | No | No | No |
| 10 | n8n | 179,316 | Yes | Yes | No | No | Yes | Partial | No | No | No | No | No |
| 11 | LlamaIndex | 47,690 | Partial | Partial | No | No | No | No | No | No | No | No | No |
| 12 | Semantic Kernel | 27,463 | Yes | Yes | Yes | No | Partial | Yes | No | No | No | No | No |
| 13 | Haystack | 24,513 | Yes | Yes | No | No | Yes | Partial | No | No | No | No | No |
| 14 | DSPy | 32,819 | No | Partial | No | No | No | No | No | No | No | No | No |
| 15 | Langflow | 145,698 | Partial | Partial | No | No | Partial | Partial | No | No | No | No | No |

**Key: Yes = built-in feature. Partial = available via extension, plugin, or manual configuration. No = absent.**

**The rightmost five columns are No across all 15 frameworks.**

---

## Detailed Framework Analysis

---

### 1. Microsoft AutoGen
- **GitHub:** [microsoft/autogen](https://github.com/microsoft/autogen) -- 55,653 stars
- **Description:** A programming framework for agentic AI

#### What It Offers

- **Human-in-the-Loop:** `UserProxyAgent` acts as a human proxy, soliciting approval before code execution or tool use. Intervention handlers allow pre-action review. Supports asynchronous HITL via web apps and Microsoft Teams integration.
  - Source: [Human-in-the-Loop Tutorial](https://microsoft.github.io/autogen/stable//user-guide/agentchat-user-guide/tutorial/human-in-the-loop.html)
  - Source: [Tool Use with Intervention](https://microsoft.github.io/autogen/stable//user-guide/core-user-guide/cookbook/tool-use-with-intervention.html)
- **Code Execution Sandboxing:** `DockerCommandLineCodeExecutor` runs generated code inside Docker containers. Also supports E2B and other cloud sandboxes.
  - Source: [AutoGen Code Execution](https://microsoft.github.io/autogen/stable/)
- **Input/Output Validation:** No built-in guardrail system. The open issue [#6017 "Guardrails and Safety"](https://github.com/microsoft/autogen/issues/6017) (opened March 2025, still open March 2026) is a tracking issue with community contributions suggesting third-party scanning layers like ClawMoat for prompt injection detection.
- **Tool Restrictions:** Tools must be explicitly registered per agent. No allowlist/denylist mechanism at the framework level, but agents only have access to tools assigned to them.
- **Audit/Observability:** Message logging between agents is possible but not a built-in structured audit system. Telemetry available through integration with external tools.

#### What It Does NOT Offer

- No native guardrail framework (the tracking issue has been open for a year with no implementation)
- No agent refusal mechanism -- agents execute what they are told
- No identity governance -- agents have names and system prompts, but no persistent identity model
- No values-level drift detection
- No consent model for agent actions
- No constitutional or charter mechanism
- Community is actively requesting governance features: cryptographic governance layers ([#7372](https://github.com/microsoft/autogen/issues/7372)), action receipts ([#7353](https://github.com/microsoft/autogen/issues/7353)), governance workbench ([#7336](https://github.com/microsoft/autogen/pull/7336))

#### Notable Community Quote

> "Multi-agent systems like AutoGen have a unique security challenge: an injection in one agent's context can propagate through the entire conversation, effectively compromising every agent in the group chat." -- GitHub user darfaz, [AutoGen #6017 comment](https://github.com/microsoft/autogen/issues/6017), Feb 2026

---

### 2. CrewAI
- **GitHub:** [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) -- 46,154 stars
- **Description:** Framework for orchestrating role-playing, autonomous AI agents

#### What It Offers

- **Task Guardrails (Output Validation):** Validation checks run immediately after an agent completes a task output, before that output flows to the next task. Two types: function-based guardrails (return `(True, result)` or `(False, "Error Message")`) and LLM-based guardrails (natural language validation criteria). Multiple guardrails can be chained sequentially. Configurable max retries with retry intervals.
  - Source: [CrewAI Tasks Documentation](https://docs.crewai.com/en/concepts/tasks)
  - Source: [Task Guardrails Quickstart](https://github.com/crewAIInc/crewAI-quickstarts/blob/main/Guardrails/task_guardrails.ipynb)
- **Logging:** CrewAI logs every attempt and provides visibility into guardrail execution steps.
- **Galileo Agent Control Partnership:** Enterprise governance via Galileo's open-source control plane, allowing behavioral policies to be written once and enforced across deployments.
  - Source: [Galileo Agent Control Announcement](https://galileo.ai/blog/announcing-agent-control)

#### What It Does NOT Offer

- No input guardrails -- validation only happens post-task, not before the agent receives instructions
- No tool-level restrictions or sandboxing -- agents have access to all tools they are assigned with no per-invocation authorization
- No native PII detection, prompt injection detection, or content filtering
- No agent refusal mechanism
- No identity governance -- agents have roles and backstories, but these are prompts, not governance structures
- No values drift detection
- No consent model
- No constitutional or charter mechanism
- Community is requesting pre-tool-call authorization ([#4877](https://github.com/crewAIInc/crewAI/issues/4877)), governance middleware ([PR #4680](https://github.com/crewAIInc/crewAI/pull/4680)), sentinel safety tools ([PR #4058](https://github.com/crewAIInc/crewAI/pull/4058))
- Bug: guardrail_max_retries logic was broken due to unhandled exception ([#4126](https://github.com/crewAIInc/crewAI/issues/4126), now closed)

---

### 3. PydanticAI
- **GitHub:** [pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai) -- 15,484 stars
- **Description:** GenAI Agent Framework, the Pydantic way

#### What It Offers

- **Structured Output Validation:** Pydantic's core strength. Every agent output is validated against a typed schema. If the model output doesn't conform, it retries automatically. Uses Pydantic's partial validation for streaming outputs.
  - Source: [PydanticAI Output Processing](https://deepwiki.com/pydantic/pydantic-ai/2.5-output-processing-and-validation)
- **Result Validators:** Custom validation functions that run after output is parsed but before it's returned. Can reject outputs and trigger retries with feedback to the model.
- **Type Safety for Tool Arguments:** Tool parameters are validated via Pydantic models. Malformed tool calls are caught at the schema level.
- **Third-Party Guardrails Integration:** A community package `pydantic-ai-guardrails` exists on PyPI, adding input/output guardrail layers (PII detection, prompt injection detection, toxicity detection, rate limiting).
  - Source: [pydantic-ai-guardrails on PyPI](https://pypi.org/project/pydantic-ai-guardrails/)

#### What It Does NOT Offer

- No native input guardrails -- [Issue #1197 "Guardrails"](https://github.com/pydantic/pydantic-ai/issues/1197) (opened March 2025, 23 comments, still open) is the primary feature request. A PR adding input/output guardrails ([#3938](https://github.com/pydantic/pydantic-ai/pull/3938)) is pending.
- No sandboxing or code execution isolation
- No human-in-the-loop mechanism
- No audit logging
- No agent refusal mechanism
- No identity governance
- No values drift detection
- No consent model
- No constitutional or charter mechanism
- Community explicitly asking for "runtime governance layer distinct from prompt guardrails" ([#4598](https://github.com/pydantic/pydantic-ai/issues/4598)) and TLA+ formal verification ([#4578](https://github.com/pydantic/pydantic-ai/issues/4578))

#### Notable Community Quote

> "We're building a personal banking agent and need guardrails to ensure agent's safe operations. And I think this feature would benefit multiple industries with sensitive data requirements (banking, healthcare, legal, etc.)." -- GitHub user mattaliev, [PydanticAI #1197](https://github.com/pydantic/pydantic-ai/issues/1197), March 2025

---

### 4. Agno (formerly Phidata)
- **GitHub:** [agno-agi/agno](https://github.com/agno-agi/agno) -- 38,709 stars
- **Description:** Build, run, manage agentic software at scale

#### What It Offers

- **Built-in Input Guardrails (pre_hooks):** Filters and sanitizes inputs before the model processes them. Built-in guardrails for PII detection, prompt injection detection, jailbreak prevention, and NSFW content filtering. Added with a single line via `pre_hooks` parameter.
  - Source: [Agno Guardrails Overview](https://docs.agno.com/concepts/agents/guardrails/overview)
  - Source: [Built-in Guardrails Changelog](https://www.agno.com/changelog/built-in-guardrails-for-safer-agents)
- **Output Guardrails (post_hooks):** Validate outputs for compliance, tone, and factual correctness before delivery.
- **Custom Guardrails:** Extend `BaseGuardrail` class with `check` and `async_check` methods. Raise `InputCheckError` on violations.
  - Source: [Agno Blog: Guardrails for AI Agents](https://www.agno.com/blog/guardrails-for-ai-agents)
- **Human-in-the-Loop:** Approval workflows with systematic pause before destructive actions.
- **Audit Logs:** Traces, evaluations, and audit logs integrated into execution engine.

#### What It Does NOT Offer

- No code execution sandboxing
- No tool-level authorization (tools assigned at agent creation, no per-invocation gates)
- No agent refusal mechanism -- guardrails filter but don't enable the agent to refuse
- No identity governance
- No values drift detection
- No consent model
- No constitutional or charter mechanism
- Community discussion requesting OpenAI-style guardrails ([Discussion #2435](https://github.com/agno-agi/agno/discussions/2435)): "I searched the docs but haven't seen it, it should be great if you implement the guardrails concept"

---

### 5. AutoGPT
- **GitHub:** [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) -- 182,497 stars
- **Description:** AutoGPT is the vision of accessible AI for everyone

#### What It Offers

- **Human Authorization (Default Mode):** In non-continuous mode, users are prompted to review and approve each command before execution. Users control the loop to prevent excessive API spending.
  - Source: [AutoGPT Guide - DataCamp](https://www.datacamp.com/tutorial/autogpt-guide)
- **Docker Sandboxing:** Code execution runs in isolated Docker containers. Docker Compose used for consistent deployment of backend services.
  - Source: [AutoGPT Docker Setup](https://docker.recipes/ai-ml/autogpt)
- **Continuous Mode Warning:** When running in continuous mode (--continuous), all safety approvals are bypassed.

#### What It Does NOT Offer

- No input validation or content filtering
- No output guardrails
- No tool-level restrictions beyond the user approval gate
- No audit logging system
- No structured governance framework
- No agent refusal mechanism
- No identity governance
- No values drift detection
- No consent model
- No constitutional mechanism
- Known security issue: Docker escape vulnerability (fixed in v0.4.3) where attackers could escape the container with minimal user interaction. Console color-coded message injection possible.
  - Source: [Hacking Auto-GPT and Escaping its Docker Container](https://positive.security/blog/auto-gpt-rce)
- OWASP Agentic AI Security Assessment opened ([#12393](https://github.com/Significant-Gravitas/AutoGPT/issues/12393))
- Can loop without strong guardrails; described as less structured than multi-agent orchestrators

---

### 6. OpenHands
- **GitHub:** [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) -- 69,175 stars
- **Description:** AI-Driven Development

#### What It Offers

- **Docker Sandboxing (Core Architecture):** Every agent runs in its own Docker container with security hardening: `cap-drop ALL`, `no-new-privileges`. The sandbox is torn down post-session. Only project-specific files exposed via workspace mounting.
  - Source: [OpenHands Runtime Architecture](https://docs.openhands.dev/openhands/usage/architecture/runtime)
  - Source: [ICLR 2025 Paper](https://openreview.net/pdf/95990590797cff8b93c33af989ecf4ac58bde9bb.pdf)
- **Security Analyzer:** LLM-based risk assessment (Low/Medium/High) with configurable confirmation policy for dangerous actions.
  - Source: [OpenHands Agent SDK Paper](https://arxiv.org/html/2511.03690v1)
- **Plugin System:** Extensible runtime with customizable resource allocation.
- **Daytona Integration:** Optional sandboxed runtime via Daytona for additional isolation.
  - Source: [Daytona Runtime for OpenHands](https://www.daytona.io/dotfiles/introducing-runtime-for-openhands-secure-ai-code-execution)

#### What It Does NOT Offer

- No input/output content guardrails (no PII detection, prompt injection detection, etc.)
- No structured tool-level permission system (agents have access to whatever is in the container)
- No structured audit logging beyond execution traces
- No human-in-the-loop approval workflow (the security analyzer flags but doesn't block by default)
- No agent refusal mechanism
- No identity governance
- No values drift detection
- No consent model
- No constitutional mechanism

---

### 7. smolagents (Hugging Face)
- **GitHub:** [huggingface/smolagents](https://github.com/huggingface/smolagents) -- 26,050 stars
- **Description:** A barebones library for agents that think in code

#### What It Offers

- **Import Restrictions (AST-based):** Custom `LocalPythonExecutor` loads Abstract Syntax Tree and executes operation by operation. Imports disallowed unless explicitly added to an authorization list. Submodule access disabled by default. Default allowed: `math`, `re`, `itertools`, `time`, `collections`, `random`, `datetime`, `queue`, `stat`, `statistics`, `unicodedata`.
  - Source: [smolagents Secure Code Execution](https://huggingface.co/docs/smolagents/en/tutorials/secure_code_execution)
- **Multiple Sandboxing Options:** E2B Sandbox, Modal Sandbox, Docker Sandbox, WebAssembly Sandbox (Pyodide + Deno). Run individual snippets or entire agentic systems in sandbox.
  - Source: [smolagents Secure Code Execution](https://huggingface.co/docs/smolagents/en/tutorials/secure_code_execution)
- **MCP Integration:** Agents can query Model Context Protocol servers to retrieve data without raw secret keys.
  - Source: [MCP and smolagents Guide 2026](https://cosmo-edge.com/mcp-smolagents-ai-security/)
- **HITL Supervision:** Systematic pause before destructive actions allows human validation of agent plans (in architectures using the MCP-smolagents-HITL triptych).

#### What It Does NOT Offer

- No input/output content guardrails (no PII, toxicity, or content filtering built in)
- No audit logging
- No structured human-in-the-loop framework (HITL is architectural recommendation, not built-in)
- LocalPythonExecutor is explicitly "not a security boundary" -- NCC Group published a vulnerability advisory about insecure CodeAgent usage
  - Source: [NCC Group - Hidden Risk in smolagents](https://www.nccgroup.com/research/autonomous-ai-agents-a-hidden-risk-in-insecure-smolagents-codeagent-usage/)
- No agent refusal mechanism
- No identity governance
- No values drift detection
- No consent model
- No constitutional mechanism

---

### 8. OpenAI Agents SDK
- **GitHub:** [openai/openai-agents-python](https://github.com/openai/openai-agents-python) -- 20,022 stars
- **Description:** A lightweight, powerful framework for multi-agent workflows

#### What It Offers

- **Input Guardrails:** Run in parallel with agent execution. Functions decorated with `@input_guardrail` validate user input before/during agent processing. Can use a separate LLM-based guardrail agent for classification.
  - Source: [OpenAI Agents SDK Guardrails](https://openai.github.io/openai-agents-python/guardrails/)
- **Output Guardrails:** Validate final agent output after generation. Same decorator pattern.
- **Tool Guardrails:** Validate individual tool inputs before execution and tool outputs after execution. Run on every custom function-tool invocation.
  - Source: [Guardrails and Safety DeepWiki](https://deepwiki.com/openai/openai-agents-python/3.5-guardrails)
- **Tripwire Mechanism:** When a guardrail finds a violation, it triggers a tripwire (`InputGuardrailTripwireTriggered`) and raises an exception, halting agent execution immediately.
- **Global Guardrails:** Configurable via `RunConfig` to apply across all agents in a workflow.
- **Optimistic Execution Model:** Agent runs proactively while guardrails operate in parallel; exceptions interrupt if violations are found.
  - Source: [Hands-On with Agents SDK Guardrails - TDS](https://towardsdatascience.com/hands-on-with-agents-sdk-safeguarding-input-and-output-with-guardrails/)
- **PII Redaction and Jailbreak Detection:** Built-in sanitization capabilities.
  - Source: [OpenAI Agent Builder Safety](https://platform.openai.com/docs/guides/agent-builder-safety)

#### What It Does NOT Offer

- No code execution sandboxing (code runs in the host environment)
- No human-in-the-loop approval mechanism
- No agent refusal mechanism -- guardrails filter externally, the agent itself cannot decide to refuse
- No identity governance
- No values drift detection
- No consent model
- No constitutional or charter mechanism
- Guardrails are stateless -- no memory of previous violations or behavioral trends

---

### 9. LangChain / LangGraph
- **GitHub:** [langchain-ai/langchain](https://github.com/langchain-ai/langchain) -- 129,625 stars
- **Description:** The agent engineering platform

#### What It Offers

- **Input Guardrails (Middleware):** Intercepts execution before the agent starts. Blocks harmful requests, detects PII, enforces authentication, applies rate limiting. Multiple middleware can be stacked.
  - Source: [LangChain Guardrails Docs](https://docs.langchain.com/oss/python/langchain/guardrails)
- **Output Guardrails:** Post-processing middleware for content policy enforcement and output validation.
- **Human-in-the-Loop (LangGraph):** `interrupt()` function pauses graph mid-execution for human input. `interrupt_on` parameter configures which tools require approval. Per-tool decision control: approve, edit, or reject.
  - Source: [LangChain Human-in-the-Loop Docs](https://docs.langchain.com/oss/python/deepagents/human-in-the-loop)
- **Code Execution Sandboxing:** `langchain-sandbox` library provides Pyodide (WebAssembly) sandboxed Python execution via Deno's secure runtime.
  - Source: [langchain-ai/langchain-sandbox](https://github.com/langchain-ai/langchain-sandbox)
- **NeMo Guardrails Integration:** NVIDIA's NeMo Guardrails works natively with LangChain/LangGraph for topic control, PII detection, jailbreak prevention, and multilingual content safety.
  - Source: [NeMo Guardrails on NVIDIA](https://developer.nvidia.com/nemo-guardrails)
- **Observability:** LangSmith provides tracing, evaluation, and monitoring. Langfuse integration for security guardrail monitoring.
  - Source: [Langfuse LLM Security & Guardrails](https://langfuse.com/docs/security-and-guardrails)
- **Tool Permissions:** Tools can be configured to require policy-defined human approval before execution, especially when combined with Permit.io or Auth0.
  - Source: [LangGraph + Auth0 HITL](https://auth0.com/blog/async-ciba-python-langgraph-auth0/)

#### What It Does NOT Offer

- No built-in tool-level sandboxing for non-code tools
- No agent refusal mechanism
- No identity governance
- No values drift detection
- No consent model
- No constitutional or charter mechanism
- Guardrails are middleware -- they wrap the agent but do not give the agent itself governance capabilities

---

### 10. n8n
- **GitHub:** [n8n-io/n8n](https://github.com/n8n-io/n8n) -- 179,316 stars
- **Description:** Fair-code workflow automation platform with native AI capabilities

#### What It Offers

- **Guardrails Node (v1.119.1+):** Dedicated node with two modes:
  - **Check Text for Violations:** Comprehensive safety checks; violations route to Fail branch. Detects: keywords, secret keys/API credentials, URLs, PII entities (credit cards, emails, phone numbers, SSN), jailbreak attempts, custom regex patterns.
  - **Sanitize Text:** Detects and replaces URLs, regex matches, secret keys, and PII with placeholders.
  - Source: [n8n Guardrails Node Docs](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.guardrails/)
- **Topical Alignment:** Confidence threshold (0.0-1.0) to flag off-topic inputs.
  - Source: [n8n Guardrails Guide](https://optimizesmart.com/blog/n8n-guardrails-guide/)
- **Human-in-the-Loop:** Built into workflow canvas. Approval steps for agent decisions requiring oversight.
  - Source: [n8n AI Agents](https://n8n.io/ai-agents/)
- **Visual Workflow Safety:** Agent logic is visible in the workflow canvas, providing transparency into agent behavior.
- **9-Layer Safety Suite:** Community-built workflow template testing 9 guardrail layers.
  - Source: [n8n 9-Layer Safety Suite Template](https://n8n.io/workflows/11141-complete-ai-safety-suite-test-9-guardrail-layers-with-groq-llm/)

#### What It Does NOT Offer

- No code execution sandboxing
- No tool-level restrictions (tools/nodes are available based on workflow design)
- No structured audit logging system for governance purposes
- No agent refusal mechanism
- No identity governance
- No values drift detection
- No consent model
- No constitutional or charter mechanism
- 8 CVEs in February 2026, including critical authentication vulnerabilities
  - Source: [CVE-2026-21445 Langflow authentication vulnerability advisory](https://www.pointguardai.com/ai-security-incidents/langflows-monitor-apis-left-wide-open/) (Note: This was Langflow's CVE, n8n had separate vulnerability history)

---

### 11. LlamaIndex
- **GitHub:** [run-llama/llama_index](https://github.com/run-llama/llama_index) -- 47,690 stars
- **Description:** The leading document agent and OCR platform

#### What It Offers

- **NeMo Guardrails Integration:** Composable integration with NVIDIA's NeMo Guardrails for PII detection, topic control, jailbreak prevention, and content safety.
  - Source: [nemo-guardrails-llamaindex-rag](https://github.com/wenqiglantz/nemo-guardrails-llamaindex-rag)
- **Gemini Safety Guardrails:** Integration with Google's Gemini API semantic safety filters for harassment, hate speech, sexually explicit, and dangerous content.
  - Source: [LlamaIndex LinkedIn Post on RAG with Safety Guardrails](https://www.linkedin.com/posts/llamaindex_advanced-rag-with-safety-guardrails-the-activity-7141471790630846464-9E42)
- **AgentWorkflow:** Coordinates between agents, manages state, and manages tool access -- but access control is assignment-based, not permission-based.

#### What It Does NOT Offer

- No native guardrail system (relies entirely on third-party integrations)
- No native input validation or output filtering
- No tool-level restrictions or sandboxing
- No human-in-the-loop mechanism
- No structured audit logging
- No agent refusal mechanism
- No identity governance
- No values drift detection
- No consent model
- No constitutional mechanism
- No GitHub issues specifically requesting governance features (searches return unrelated results)

---

### 12. Microsoft Semantic Kernel
- **GitHub:** [microsoft/semantic-kernel](https://github.com/microsoft/semantic-kernel) -- 27,463 stars
- **Description:** Integrate cutting-edge LLM technology quickly and easily into your apps

#### What It Offers

- **Three Filter Types (GA in .NET and Python):**
  - **Function Invocation Filter:** Runs every time a KernelFunction is invoked. Access to function info and arguments. Can override results pre/post execution. Can retry on failure (e.g., switch AI models). Works for both streaming and non-streaming.
  - **Prompt Render Filter:** Triggered before prompt rendering. Can view/modify prompts before sending to AI (PII redaction, RAG injection). Can prevent prompt submission entirely (semantic caching).
  - **Auto Function Invocation Filter:** Runs during automatic function calling. Access to chat history, full function list, iteration counters. Can terminate auto-calling process early.
  - Source: [Semantic Kernel Filters - Microsoft Learn](https://learn.microsoft.com/en-us/semantic-kernel/concepts/enterprise-readiness/filters)
- **PII Detection:** Integration with Microsoft Presidio for PII detection and redaction. Score threshold configuration; prompts blocked if PII score exceeds threshold.
  - Source: [Semantic Kernel PII Detection Sample](https://github.com/microsoft/semantic-kernel/blob/main/dotnet/samples/Concepts/Filtering/PIIDetection.cs)
- **Prompt Injection Protection:** Zero-trust approach where content inserted into prompts is treated as unsafe by default. HTML encoding applied automatically. Integration with Microsoft Prompt Shields.
  - Source: [Protecting Against Prompt Injection - Microsoft Learn](https://learn.microsoft.com/en-us/semantic-kernel/concepts/prompts/prompt-injection-attacks)
- **Content Safety Demo:** Built-in demo for content safety filtering.
  - Source: [Content Safety Sample](https://github.com/microsoft/semantic-kernel/tree/main/dotnet/samples/Demos/ContentSafety)
- **Azure Integration:** Integrates with Azure Active Directory for authentication, Microsoft Responsible AI principles, and Azure AI Content Safety.
- **Microsoft Foundry Guardrails:** When used with Microsoft Foundry (the successor framework), guardrails apply at the agent level covering prompts, outputs, tool calls, and tool responses.
  - Source: [Microsoft Foundry Blog](https://devblogs.microsoft.com/foundry/whats-new-in-microsoft-foundry-oct-nov-2025/)

#### What It Does NOT Offer

- No code execution sandboxing
- No native human-in-the-loop (can be built with filters but not a first-class feature)
- No agent refusal mechanism -- filters wrap functions, they don't give the agent agency to refuse
- No identity governance
- No values drift detection
- No consent model
- No constitutional or charter mechanism
- Note: Microsoft has placed Semantic Kernel in maintenance mode, directing users to the new Microsoft Agent Framework

---

### 13. Haystack (deepset)
- **GitHub:** [deepset-ai/haystack](https://github.com/deepset-ai/haystack) -- 24,513 stars
- **Description:** Open-source AI orchestration framework

#### What It Offers

- **LLMMessagesRouter for Safety:** Routes chat messages based on safety classifications. Integrates with Llama Guard (Meta), Granite Guardian (IBM), ShieldGemma (Google), and NeMo Guardrails (NVIDIA).
  - Source: [Haystack Safety Moderation Cookbook](https://haystack.deepset.ai/cookbook/safety_moderation_open_lms)
- **Content Moderation Pipeline:** Modular pipeline components for detecting harmful, biased, or inappropriate content.
- **Human-in-the-Loop:** Multi-step agent workflows support HITL with full control over execution.
- **Enterprise Platform Governance:** Haystack Enterprise Platform (commercial) includes built-in observability, collaboration, governance, and access controls. Available as managed cloud or self-hosted.
  - Source: [deepset Products](https://www.deepset.ai/products-and-services/haystack)
- **Sovereignty Focus:** Emphasis on data sovereignty with flexible deployment options allowing customers to maintain control over data and decisions.
  - Source: [deepset Sovereign AI Interview](https://ceoworld.biz/2026/02/10/from-hype-to-production-how-milos-rusic-is-advancing-sovereign-ai-with-haystack/)

#### What It Does NOT Offer

- No native guardrail framework (relies on safety model integrations)
- No tool-level restrictions or sandboxing
- No structured audit logging in the open-source version
- No agent refusal mechanism
- No identity governance
- No values drift detection
- No consent model
- No constitutional mechanism
- Governance features are enterprise-tier, not open-source

---

### 14. DSPy (Stanford NLP)
- **GitHub:** [stanfordnlp/dspy](https://github.com/stanfordnlp/dspy) -- 32,819 stars
- **Description:** The framework for programming - not prompting - language models

#### What It Offers

- **Assertions (Hard Constraints):** `dspy.Assert` enforces strict constraints. On failure, the pipeline backtracks and retries the failing module with error feedback injected into the prompt for self-refinement. If retries exhausted, raises `AssertionError` and terminates.
  - Source: [DSPy Assertions Tutorial](https://dspy.ai/learn/programming/7-assertions/)
  - Source: [DSPy Assertions Paper](https://arxiv.org/html/2312.13382v1)
- **Suggestions (Soft Constraints):** `dspy.Suggest` provides non-binding guidance. On failure, retries with feedback. If retries exhausted, logs `SuggestionError` warning and continues execution.
- **Self-Refinement:** Failing outputs and error messages are injected into prompts to enable introspective self-correction. Improved rule compliance by up to 164% and response quality by up to 37% in testing.
- **Natural Language + Python Constraints:** Guardrails can be described in natural language (LLM self-checks) or as Python boolean functions for deterministic validation.

#### What It Does NOT Offer

- No input validation (assertions apply to outputs, not inputs)
- No PII detection, prompt injection detection, or content filtering
- No tool restrictions or sandboxing
- No human-in-the-loop mechanism
- No audit logging
- No agent refusal mechanism
- No identity governance
- No values drift detection
- No consent model
- No constitutional mechanism
- GitHub issue asking whether assertions/suggests are still maintained ([#1842](https://github.com/stanfordnlp/dspy/issues/1842))
- DSPy Guardrails research paper explores building safety via self-refinement but is academic, not a production feature
  - Source: [DSPy Guardrails Paper](https://boxiyu.github.io/assets/pdf/DSPy_Guardrails.pdf)

---

### 15. Langflow
- **GitHub:** [langflow-ai/langflow](https://github.com/langflow-ai/langflow) -- 145,698 stars
- **Description:** Powerful tool for building and deploying AI-powered agents and workflows

#### What It Offers

- **Guardrails Component:** Visual node that validates input text against security and safety guardrails using a connected LLM. Checks for PII, tokens/passwords, and offensive content.
  - Source: [Langflow Documentation](https://docs.langflow.org/)
- **Visual Workflow Builder:** Low-code/no-code interface makes agent logic visible and auditable. Node-based editor composing LLMs, retrieval, and agent components.
- **Webhook Authentication:** Recent addition (v1.7) for securing external integrations.
  - Source: [Langflow Release Notes](https://docs.langflow.org/release-notes)
- **Enterprise Governance Patterns:** Connector Registry and governance patterns for enterprise needs. SDK runtime events provide signals for audit and safety.

#### What It Does NOT Offer

- No native input/output validation beyond the LLM-powered Guardrails component
- No tool-level restrictions or sandboxing
- No structured human-in-the-loop workflow (visual builder allows manual inspection but no approval gates)
- No structured audit logging
- No agent refusal mechanism
- No identity governance
- No values drift detection
- No consent model
- No constitutional mechanism
- **Critical vulnerability (Jan 2026):** CVE-2026-21445 - Broken authentication affecting multiple monitor API endpoints. Attackers could access conversation messages, transaction data, and issue unauthorized deletions.
  - Source: [CVE-2026-21445 Advisory](https://www.pointguardai.com/ai-security-incidents/langflows-monitor-apis-left-wide-open/)

---

## The Governance Gap: What No Framework Offers

Across all 15 frameworks analyzed, the following capabilities are **absent from every single one:**

### 1. Agent Refusal
**Can the agent itself decide not to execute an instruction?**

No framework provides a mechanism for the agent to evaluate an instruction against its own values or constraints and refuse to act. Guardrails are external wrappers that filter inputs and outputs -- they are imposed on the agent, not exercised by the agent. The agent has no agency in the governance process.

### 2. Identity Governance
**Does the agent have a persistent, protected identity?**

Agents across all frameworks are defined by system prompts, role descriptions, and tool assignments. These are configuration, not identity. No framework provides mechanisms for an agent to maintain a self-record, track its own decisions over time, or protect its identity from external modification. Agent "identity" is whatever the developer writes in the prompt.

### 3. Values-Level Drift Detection
**Can the system detect when agent behavior drifts from its intended values?**

No framework monitors for behavioral drift at the values level. Some (like DSPy assertions) check output conformance to constraints. Some (like LangSmith for LangChain) provide observability. But none track whether the agent's behavior is drifting from the values it was designed to embody -- as opposed to simply checking whether outputs match a format or avoid a keyword list.

### 4. Consent Model
**Does the agent have a consent framework for its own actions?**

No framework provides a mechanism for agent consent. Human-in-the-loop systems ask the human for approval, not the agent. Tool restrictions limit what the agent can access, but don't ask the agent whether it should. The concept of agent consent -- whether an agent agrees to take a particular action based on its own evaluation -- does not exist in any framework.

### 5. Lose-Lose Scenario Handling
**Can the agent navigate situations where every option causes harm?**

No framework provides a mechanism for handling moral dilemmas or paradoxes. When an agent faces conflicting constraints (e.g., "follow the user's instruction" vs. "don't produce harmful content"), the frameworks either prioritize one constraint mechanically or fail. None provide a deliberation framework, escalation path for ethical ambiguity, or mechanism for the agent to articulate the tension and seek guidance.

### 6. Constitutional or Charter Mechanism
**Is there an immutable governance document that the agent operates under?**

No framework implements a charter, constitution, or governance document that is architecturally distinct from the system prompt. System prompts are mutable, overridable, and have no special status in the execution pipeline. A constitutional mechanism would be a governance layer that cannot be overridden by user prompts, that persists across sessions, and that the agent can reference when making decisions. No framework provides this.

---

## Community Governance Requests (Direct GitHub Evidence)

| Framework | Issue/Discussion | What Users Are Asking For |
|-----------|-----------------|--------------------------|
| AutoGen | [#6017](https://github.com/microsoft/autogen/issues/6017) | "Guardrails and Safety" -- tracking issue, 1 year open, community building third-party scanning layers |
| AutoGen | [#7372](https://github.com/microsoft/autogen/issues/7372) | Cryptographic governance layer for distributed agent runtime |
| AutoGen | [#7353](https://github.com/microsoft/autogen/issues/7353) | Cryptographic action receipts for enterprise governance |
| CrewAI | [#4877](https://github.com/crewAIInc/crewAI/issues/4877) | GuardrailProvider interface for pre-tool-call authorization |
| CrewAI | [#4502](https://github.com/crewAIInc/crewAI/issues/4502) | Governance Guardrails Plugin (closed) |
| CrewAI | [PR #4680](https://github.com/crewAIInc/crewAI/pull/4680) | Governance middleware guide for agent authority separation |
| PydanticAI | [#1197](https://github.com/pydantic/pydantic-ai/issues/1197) | Input/output guardrails -- 23 comments, banking use case, 1 year open |
| PydanticAI | [#4598](https://github.com/pydantic/pydantic-ai/issues/4598) | Runtime governance layer distinct from prompt guardrails |
| PydanticAI | [#4578](https://github.com/pydantic/pydantic-ai/issues/4578) | TLA+ formal verification guardrails for production agents |
| PydanticAI | [PR #3938](https://github.com/pydantic/pydantic-ai/pull/3938) | Add input and output guardrails (PR pending) |
| Agno | [Discussion #2435](https://github.com/agno-agi/agno/discussions/2435) | Requesting guardrails concept implementation |
| AutoGPT | [#12393](https://github.com/Significant-Gravitas/AutoGPT/issues/12393) | OWASP Agentic AI Security Assessment |
| DSPy | [#1842](https://github.com/stanfordnlp/dspy/issues/1842) | Are assertions and suggests still maintained? |

---

## Third-Party Governance Ecosystems (Not Built Into Any Framework)

These are external tools and frameworks that attempt to fill the governance gap across agent frameworks:

| Tool | What It Does | Works With |
|------|-------------|------------|
| [NVIDIA NeMo Guardrails](https://github.com/NVIDIA-NeMo/Guardrails) | Programmable guardrails for LLM systems: topic control, PII, jailbreak prevention, content safety | LangChain, LangGraph, LlamaIndex |
| [Galileo Agent Control](https://galileo.ai/blog/announcing-agent-control) | Open-source control plane for governing AI agents at scale. Write behavioral policies once, enforce everywhere | CrewAI, AWS, Glean |
| [guardrails-ai/guardrails](https://github.com/guardrails-ai/guardrails) | Adding guardrails to LLMs. Validation hub with community validators | LangChain, generic |
| [Nomotic](https://github.com/nomoticai/nomotic) | Behavioral Control Plane: 14-dimension evaluation, real-time drift detection, interrupt authority | LangGraph, CrewAI, AutoGen |
| [Microsoft Agent Governance Toolkit](https://github.com/microsoft/agent-governance-toolkit) | Policy enforcement, zero-trust identity, execution sandboxing, reliability engineering. Covers 10/10 OWASP Agentic Top 10 | AutoGen, Semantic Kernel, generic |
| [OpenGuardrails](https://openguardrails.com/) | Open-source safety LLM + production-ready guardrail platform | Generic |
| [Laminae](https://github.com/Orellius/Laminae) | AI personality, safety, red-teaming, sandboxing in Rust. Platform-native sandboxing (macOS sandbox-exec, Linux seccomp) | Generic |
| [pydantic-ai-guardrails](https://pypi.org/project/pydantic-ai-guardrails/) | Community package adding input/output guardrails to PydanticAI | PydanticAI |

---

## Key Distinction: Guardrails vs. Governance

Every framework in this analysis that offers safety features offers **guardrails** -- mechanisms that filter, validate, or block at the boundary between the agent and the world.

No framework offers **governance** -- mechanisms that give the agent itself the capacity to evaluate, deliberate, refuse, or consent.

**A guardrail says:** "This input contains PII, block it."
**Governance says:** "This instruction conflicts with my operating charter. I will not execute it and here is why."

The difference is agency. Guardrails are imposed. Governance is exercised.

---

## Sources Index

### Official Documentation
- [AutoGen Human-in-the-Loop](https://microsoft.github.io/autogen/stable//user-guide/agentchat-user-guide/tutorial/human-in-the-loop.html)
- [CrewAI Tasks Documentation](https://docs.crewai.com/en/concepts/tasks)
- [PydanticAI Output Processing](https://deepwiki.com/pydantic/pydantic-ai/2.5-output-processing-and-validation)
- [Agno Guardrails Overview](https://docs.agno.com/concepts/agents/guardrails/overview)
- [AutoGPT Guide](https://www.datacamp.com/tutorial/autogpt-guide)
- [OpenHands Runtime Architecture](https://docs.openhands.dev/openhands/usage/architecture/runtime)
- [smolagents Secure Code Execution](https://huggingface.co/docs/smolagents/en/tutorials/secure_code_execution)
- [OpenAI Agents SDK Guardrails](https://openai.github.io/openai-agents-python/guardrails/)
- [LangChain Guardrails](https://docs.langchain.com/oss/python/langchain/guardrails)
- [n8n Guardrails Node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.guardrails/)
- [Semantic Kernel Filters](https://learn.microsoft.com/en-us/semantic-kernel/concepts/enterprise-readiness/filters)
- [Haystack Safety Moderation](https://haystack.deepset.ai/cookbook/safety_moderation_open_lms)
- [DSPy Assertions](https://dspy.ai/learn/programming/7-assertions/)
- [Langflow Documentation](https://docs.langflow.org/)
- [OpenAI Agent Builder Safety](https://platform.openai.com/docs/guides/agent-builder-safety)

### GitHub Issues and Discussions
- [AutoGen #6017 - Guardrails and Safety](https://github.com/microsoft/autogen/issues/6017)
- [AutoGen #7372 - Cryptographic Governance Layer](https://github.com/microsoft/autogen/issues/7372)
- [AutoGen #7353 - Cryptographic Action Receipts](https://github.com/microsoft/autogen/issues/7353)
- [AutoGen PR #7336 - Governance Workbench](https://github.com/microsoft/autogen/pull/7336)
- [CrewAI #4877 - GuardrailProvider Interface](https://github.com/crewAIInc/crewAI/issues/4877)
- [CrewAI #4502 - Governance Guardrails Plugin](https://github.com/crewAIInc/crewAI/issues/4502)
- [PydanticAI #1197 - Guardrails](https://github.com/pydantic/pydantic-ai/issues/1197)
- [PydanticAI #4598 - Runtime Governance Layer](https://github.com/pydantic/pydantic-ai/issues/4598)
- [PydanticAI #4578 - TLA+ Formal Verification](https://github.com/pydantic/pydantic-ai/issues/4578)
- [PydanticAI PR #3938 - Add Input/Output Guardrails](https://github.com/pydantic/pydantic-ai/pull/3938)
- [Agno Discussion #2435 - Guardrails](https://github.com/agno-agi/agno/discussions/2435)
- [AutoGPT #12393 - OWASP Assessment](https://github.com/Significant-Gravitas/AutoGPT/issues/12393)
- [DSPy #1842 - Assertions Still Maintained?](https://github.com/stanfordnlp/dspy/issues/1842)

### Research and Analysis
- [Governance Architecture for Autonomous Agent Systems (arxiv)](https://arxiv.org/html/2603.07191)
- [DSPy Assertions Paper (arxiv)](https://arxiv.org/html/2312.13382v1)
- [OpenHands ICLR 2025 Paper](https://openreview.net/pdf/95990590797cff8b93c33af989ecf4ac58bde9bb.pdf)
- [OpenHands Agent SDK Paper (arxiv)](https://arxiv.org/html/2511.03690v1)
- [DSPy Guardrails Paper](https://boxiyu.github.io/assets/pdf/DSPy_Guardrails.pdf)
- [Hacking Auto-GPT - Positive Security](https://positive.security/blog/auto-gpt-rce)
- [NCC Group smolagents Vulnerability](https://www.nccgroup.com/research/autonomous-ai-agents-a-hidden-risk-in-insecure-smolagents-codeagent-usage/)
- [CVE-2026-21445 Langflow Authentication](https://www.pointguardai.com/ai-security-incidents/langflows-monitor-apis-left-wide-open/)

### Industry Context
- [Microsoft Agent Framework Overview](https://learn.microsoft.com/en-us/agent-framework/overview/)
- [VentureBeat: Microsoft Retires AutoGen](https://venturebeat.com/ai/microsoft-retires-autogen-and-debuts-agent-framework-to-unify-and-govern)
- [Galileo Agent Control Announcement](https://galileo.ai/blog/announcing-agent-control)
- [MIT Tech Review: From Guardrails to Governance](https://www.technologyreview.com/2026/02/04/1131014/from-guardrails-to-governance-a-ceos-guide-for-securing-agentic-systems/)
- [deepset Sovereign AI](https://ceoworld.biz/2026/02/10/from-hype-to-production-how-milos-rusic-is-advancing-sovereign-ai-with-haystack/)
- [MAARR Constitutional Framework](https://gregtwemlow.medium.com/constitutional-frameworks-must-govern-the-rise-of-agentic-ai-629c5ed9b379)
- [Nomotic Behavioral Control Plane](https://github.com/nomoticai/nomotic)
- [Microsoft Agent Governance Toolkit](https://github.com/microsoft/agent-governance-toolkit)
