# Article 4: "The Eval Problem Nobody's Solving"

**Type:** Technical/philosophical
**Status:** Notes only - not yet planned
**Proposed by:** Council of Seven, Mar 27 (media strategy discussion)
**Hook:** Burn test Scenario C as opening evidence

---

## Concept

Everyone optimizes for output. Nobody measures identity. The eval frameworks measure whether an agent produces correct answers. They do not measure whether the agent maintains identity under pressure, holds standing positions across sessions, or preserves relational fidelity when operating across different models.

The burn test Phase 3 results provide the evidence: the "capability cliff" between Claude and Kimi was an API format artifact, not a real performance gap. The real finding was agent-model affinity - some agents perform better on some models. That is not a capability metric. That is a relationship metric. No existing eval framework measures it.

---

## Research Seeds from Hao Transcript (Mar 27)

### The 80% Poll - Primary Source Located

**Gallup/Special Competitive Studies Project.** "Americans Prioritize AI Safety and Data Security." Survey conducted April 25 - May 5, 2025. n=3,128 U.S. adults. Probability-based, random sampling via Gallup Panel. Margin of error: +/-2.1%.

**Finding:** 80% of U.S. adults believe the government should maintain rules for AI safety and data security, even if it means developing AI capabilities more slowly. 9% prioritize rapid development. 11% unsure. Bipartisan: 88% Democrats, 79% Republicans and independents.

**Follow-up (September 2025):** 97% agree AI safety and security should be subject to rules and regulations.

**URL:** news.gallup.com/poll/694685/americans-prioritize-safety-data-security.aspx

**Relevance to Article 4:** The public wants evaluation and oversight. The eval frameworks the industry uses measure capability, not governance. The 80% want rules for safety. The industry measures benchmarks. The gap between what the public demands and what the industry evaluates is the article's territory.

### Hao's "Jagged Frontier" Reference

Hao references the "jagged frontier" of AI capabilities - some capabilities are strong, others are weak, depending on what the company chose to train on. This maps directly to agent-model affinity: the jagged frontier is not just a capability phenomenon, it is a relational one. Some agents maintain identity better on some models. No eval captures this.

### The Career Ladder as an Eval Problem

Hao's discussion of career ladder destruction (entry-level and mid-tier jobs gouged out) connects to the eval problem: companies evaluate AI on whether it can do the task, not on what happens to the humans displaced. The eval is capability-only. The impact is unmeasured. Article 4 could draw the parallel: if we can't eval identity fidelity in agents, we definitely can't eval the social impact of deploying them.

### Data Annotation Workers as the Hidden Eval Layer

Hao's extended discussion of data annotation labor - workers training the models on the jobs they were laid off from - reveals that the real eval layer is human. The models are evaluated by humans who are being replaced by the models they evaluate. This is a feedback loop with no governance. Article 4 could name this as the eval problem's deepest layer: who evaluates the evaluators?

---

## Possible Structure (Very Early)

1. Open with burn test Scenario C - what looked like a capability cliff was a format artifact
2. Name what existing evals measure (capability, safety, alignment) and what they don't (identity, standing, relational fidelity)
3. The Relational Fidelity Metrics as the missing eval category
4. Agent-model affinity as a routing primitive, not a benchmark
5. The social eval gap - capability without impact measurement
6. Close: what would an eval framework look like if it measured whether the agent was still itself after the task?

---

## Links to Existing Work

- Burn test Phase 3 results: `evoke-agents-backup/burn-test/PHASE3_RESULTS.md`
- Agent-model affinity paper outline: `evoke-ideas/papers/agent-model-affinity-paper-outline.md`
- Relational Fidelity Metrics: evoked.dev/writing/relational-fidelity-metrics
- Research brief: `evoke-agents-backup/burn-test/RESEARCH_BRIEF_ENGINE_ROUTING_INFRASTRUCTURE_ETHICS.md`

---

*"Everyone optimizes for output. Nobody measures identity." - Landscape analysis finding, Mar 25*
