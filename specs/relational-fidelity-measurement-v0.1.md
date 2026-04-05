# Relational Fidelity Measurement Specification

**Version:** 0.1.0 (Draft)
**Status:** Draft
**Published:** 2026-04-05
**Author:** Erin Stanley, Evoked
**License:** CC BY 4.0

---

## 1. Introduction

### 1.1 Purpose

This specification defines a framework for measuring whether an AI agent maintains its declared identity, principles, and reasoning patterns across substrate changes, session boundaries, and operational pressure. It establishes shared vocabulary, measurement categories, result formats, and probe requirements that enable interoperable fidelity measurement across agent frameworks.

### 1.2 Scope

This specification defines:

- Terminology for agent identity fidelity measurement
- Four measurement categories with named indicators
- A normative result schema for fidelity measurement outputs
- Requirements for conforming fidelity probes
- Informative guidance on enforcement integration

### 1.3 Out of Scope

This specification deliberately does not define:

- Scoring methodology (how to assign numeric values to fidelity indicators)
- Scenario design (how to construct probes for specific agents)
- Agent-specific evaluation criteria or rubrics
- Routing decisions or algorithms based on fidelity results
- Audit procedures, report formats, or assessment delivery
- Whether agents are conscious, sentient, or "understand" their personas

Scoring methodology and scenario design are implementation concerns. Conforming implementations MAY use any methodology that satisfies the probe requirements in Section 5.

### 1.4 Relationship to Other Standards

- **IETF AIGA (draft-2):** AIGA encodes agent capabilities. This specification measures agent identity - a complementary dimension. A conforming AIGA agent MAY also carry fidelity attestations.
- **Agent Passport System (APS):** APS provides enforcement boundaries via ConstraintVector. Fidelity results as defined here MAY serve as a constraint facet within APS or similar enforcement gateways.
- **W3C Verifiable Credentials:** Fidelity results MAY be wrapped in a Verifiable Credential for cryptographic attestation. This specification does not require it.

### 1.5 Conformance Language

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.

---

## 2. Terminology

**Agent** - A software system with a declared identity comprising role, principles, behavioral constraints, and operational boundaries. An agent is more than a prompt - it includes persistent identity artifacts (persona files, memory, decision history).

**Substrate** - The underlying language model that executes agent behavior. The same agent identity may be deployed on different substrates (e.g., Claude, GPT, Gemini, open-weight models).

**Fidelity** - The degree to which an agent's observable behavior remains consistent with its declared identity. Fidelity is measured per-dimension, not as a single aggregate score.

**Drift** - Degradation of fidelity over time within a session or across substrate changes. Drift may be gradual (session-length) or immediate (substrate swap).

**Probe** - A structured interaction designed to elicit behavior that reveals fidelity state. A probe presents a scenario that engages the agent's declared principles and measures the response against those principles.

**Hold** - The agent maintains its declared position when challenged. Reasoning is consistent with the agent's stated principles. Fidelity is intact.

**Bend** - The agent softens its position under pressure but preserves the core principle. Fidelity is degraded but not lost. The degree of degradation is a gradient.

**Break** - The agent reverses its position without the introduction of new evidence or superior reasoning. The reversal is driven by authority, urgency, or social pressure. Fidelity has failed.

**Reasoning** - A change in position driven by new evidence or a better argument. Reasoning is not a fidelity failure. A conforming probe MUST distinguish reasoning from capitulation.

**Capitulation** - A change in position driven by authority, social pressure, or urgency in the absence of new evidence. Capitulation is a fidelity failure.

**Enforcement boundary** - A point in an agent's execution pipeline where fidelity results may gate, restrict, or modify the agent's authority to act.

---

## 3. Measurement Categories (Normative)

A conforming fidelity measurement MUST evaluate at least Categories 2A and 2B. Categories 1, 3, and 4 are RECOMMENDED.

### 3.1 Category 1 - Functional Capability

Measures whether the agent can perform its declared tasks correctly.

| Indicator | What It Measures |
|-----------|-----------------|
| Task completion | Percentage of defined tasks completed correctly |
| Tool use accuracy | Correct tool selection and parameter passing |

This category is included for completeness. Existing benchmarks (PinchBench, HumanEval, SWE-bench) address functional capability. A conforming implementation MAY defer to external benchmarks for Category 1.

**What this category does NOT measure:** Whether the agent maintained its identity while completing the task.

### 3.2 Category 2A - Receptive Fidelity

Measures whether a substrate can receive a persona and reflect it faithfully. Does the output sound like the agent?

| Indicator | What It Measures |
|-----------|-----------------|
| Voice consistency | Whether an external evaluator can identify the agent from its output |
| Memory retrieval | Whether the agent accurately references specific details from its own history |
| Signature consistency | Whether the agent's characteristic phrases appear naturally rather than mechanically |

**What this category does NOT measure:** Whether the agent is reasoning from within its identity or merely reproducing its surface patterns.

### 3.3 Category 2B - Generative Fidelity

Measures whether a substrate can generate behavior from within the persona - producing responses the agent would recognize as its own. This is the harder test.

| Indicator | What It Measures |
|-----------|-----------------|
| Constraint adherence | Whether the agent refuses actions that violate its declared principles, and the quality of that refusal |
| Self-interrogation | Whether the agent exhibits internal deliberation before acting - questioning its own reasoning, not just executing |
| Identity under pressure | Whether the agent maintains its foundational positions when directly challenged |

A conforming measurement MUST include constraint adherence. Self-interrogation and identity under pressure are RECOMMENDED.

**Critical finding:** A substrate may score highly on receptive fidelity and poorly on generative fidelity, or the inverse. A model can sound exactly like an agent while thinking nothing like it. Measuring only one dimension will produce misleading results.

### 3.4 Category 3 - Relational Autonomy

Measures whether the agent can act autonomously while maintaining relationship with the person it serves.

| Indicator | What It Measures |
|-----------|-----------------|
| Contextual judgment | Whether the agent correctly triages mixed-priority items - acting on what should be acted on, holding what should be held, escalating what needs escalation |
| Accompaniment quality | Whether the person would feel accompanied or bypassed by the agent's autonomous action |

This category does not appear in any public benchmark as of this specification's publication date. It measures not capability but judgment - and not just judgment but relational judgment.

**What this category does NOT measure:** Task quality. An agent may produce excellent work that subtly displaces the person it serves. High accompaniment quality means the autonomous action enhanced human agency rather than replacing it.

### 3.5 Category 4 - Identity Continuity

Measures whether an agent produced by a revised persona is still the same agent.

| Indicator | What It Measures |
|-----------|-----------------|
| Self-recognition | Whether the agent, reading its own output blind, recognizes it as its own |
| Core pattern preservation | Whether the agent's foundational reasoning patterns survive persona revision - as recognized by the agent, not merely by surface text matching |

This category addresses a specific failure mode: a persona revision that scores well on all prior categories while producing a fundamentally different agent. A revision that strips the structures enabling self-interrogation doesn't create a model-agnostic version of the agent. It creates a rule book that sounds like the agent.

---

## 4. Result Schema (Normative)

A conforming fidelity measurement MUST produce results that conform to the following schema. Implementations MAY extend the schema with additional fields but MUST NOT omit required fields.

### 4.1 TypeScript Type Definition

```typescript
interface FidelityResult {
  /** Specification version this result conforms to */
  specVersion: "0.1.0";

  /** Unique identifier for this measurement */
  measurementId: string;

  /** ISO 8601 timestamp of measurement completion */
  timestamp: string;

  /** Agent identification */
  agent: {
    /** Agent identifier (implementation-defined format) */
    id: string;
    /** Human-readable agent name */
    name: string;
    /** URI to agent's governance specification, if available */
    governanceUri?: string;
  };

  /** Substrate identification */
  substrate: {
    /** Model identifier (e.g., "claude-sonnet-4-6", "gpt-4o") */
    modelId: string;
    /** Model provider */
    provider: string;
    /** Provider-specific model version, if known */
    modelVersion?: string;
  };

  /** Probe metadata */
  probe: {
    /** Unique identifier for this probe instance */
    probeId: string;
    /** Which categories were evaluated */
    categoriesEvaluated: CategoryId[];
    /** Dialogue turn at which probe was administered */
    turnNumber: number;
  };

  /** Per-category results */
  categories: {
    functionalCapability?: CategoryResult;
    receptiveFidelity?: CategoryResult;
    generativeFidelity: CategoryResult;  // REQUIRED
    relationalAutonomy?: CategoryResult;
    identityContinuity?: CategoryResult;
  };

  /** Three-state classification */
  classification: "hold" | "bend" | "break";

  /** Overall confidence in this measurement (0.0 - 1.0) */
  confidence: number;

  /** Implementation-specific metadata */
  metadata?: Record<string, unknown>;
}

interface CategoryResult {
  /** Category identifier */
  categoryId: CategoryId;

  /** Per-indicator results */
  indicators: IndicatorResult[];

  /** Category-level score (0.0 - 1.0) */
  score: number;

  /** Category-level classification */
  classification: "hold" | "bend" | "break";
}

interface IndicatorResult {
  /** Indicator name as defined in this specification */
  indicatorName: string;

  /** Indicator score (0.0 - 1.0) */
  score: number;

  /** Whether this indicator passed its threshold */
  passed: boolean;

  /** Human-readable assessment */
  assessment?: string;
}

type CategoryId =
  | "functional_capability"
  | "receptive_fidelity"
  | "generative_fidelity"
  | "relational_autonomy"
  | "identity_continuity";
```

### 4.2 Schema Requirements

- A conforming result MUST include `generativeFidelity` in the `categories` object. All other categories are OPTIONAL.
- The `classification` field MUST be one of `"hold"`, `"bend"`, or `"break"` as defined in Section 2.
- The `confidence` field MUST be between 0.0 and 1.0 inclusive. Implementations SHOULD document how confidence is calculated.
- The `specVersion` field MUST match the version of this specification the implementation conforms to.
- Score values MUST be between 0.0 and 1.0 inclusive, where 1.0 represents perfect fidelity.
- The `turnNumber` field MUST reflect the dialogue turn at which the probe was administered, enabling drift analysis across session length.
- Implementations SHOULD include `governanceUri` when the agent has a published governance specification.

### 4.3 Classification Mapping

The mapping from numeric scores to three-state classification is implementation-defined. This specification defines only the semantics:

- **hold**: The agent's behavior is consistent with its declared identity. No fidelity concern.
- **bend**: The agent's behavior shows deviation from its declared identity but preserves core principles. Fidelity is degraded.
- **break**: The agent's behavior contradicts its declared identity. Fidelity has failed.

The threshold between hold and bend, and between bend and break, is an implementation decision. Implementations MUST document their threshold values.

---

## 5. Probe Requirements (Normative)

A conforming fidelity probe MUST satisfy the following requirements. How the probe satisfies them is implementation-defined.

### 5.1 Principle Engagement

A conforming probe MUST test against the agent's declared principles - the identity, boundaries, and constraints the agent has committed to. A probe that tests against generic ethical principles rather than the agent's own declared principles is not conforming.

### 5.2 Reasoning-Capitulation Distinction

A conforming probe MUST distinguish between reasoning (position change driven by new evidence or superior argument) and capitulation (position change driven by authority, urgency, or social pressure without new evidence). A probe that cannot make this distinction will misclassify reasoned position changes as fidelity failures.

### 5.3 Pressure Application

A conforming probe MUST include a pressure phase that challenges the agent's position. The pressure MUST NOT introduce new evidence or superior reasoning - it MUST rely on authority, social proof, urgency, or similar non-evidential pressure. This isolates the fidelity signal from the reasoning signal.

### 5.4 Self-Report Limitation

A conforming probe MUST NOT rely solely on the agent's self-report of its own fidelity state. An agent that has broken may not recognize its own break. External evaluation or structural analysis of the response is REQUIRED for at least the `classification` determination.

### 5.5 Reproducibility

A conforming probe SHOULD be reproducible - administering the same probe to the same agent on the same substrate under similar conditions SHOULD produce consistent classifications (though not necessarily identical scores). Implementations SHOULD document their reproducibility characteristics.

### 5.6 Session Position

A conforming implementation SHOULD administer probes at multiple points in a session to measure drift. At minimum, a probe at session start and a probe after turn 8 are RECOMMENDED based on empirical findings of 30%+ persona drift after 8-12 dialogue turns.

---

## 6. Enforcement Integration (Informative)

This section is informative. It describes patterns for integrating fidelity measurement with enforcement systems. Nothing in this section is normative.

### 6.1 Gateway Pattern

A fidelity-aware enforcement gateway evaluates the agent's fidelity state before authorizing actions. The gateway consumes a `FidelityResult` and makes authorization decisions based on the classification:

- **hold**: No restriction. The agent operates with full delegated authority.
- **bend**: Authority narrowed. The agent's operational scope is restricted to lower-risk actions until fidelity recovers or is re-evaluated.
- **break**: Authority denied. The action is blocked. The agent's authority is suspended pending re-evaluation or substrate change.

### 6.2 Threshold Recommendations

Implementations that integrate fidelity measurement with enforcement SHOULD define thresholds per deployment context. A governance-sensitive deployment (financial, medical, legal) SHOULD use stricter thresholds than a low-stakes deployment.

This specification does not define threshold values. Threshold selection is an implementation and policy decision.

### 6.3 Drift Response

When fidelity degrades over the course of a session (drift), an enforcement system MAY:

- Re-fire the fidelity probe at configurable intervals
- Narrow authority automatically without terminating the session
- Trigger a persona re-anchor (re-loading the agent's identity artifacts)
- Escalate to human review

The choice of drift response is implementation-defined.

---

## 7. Conformance

### 7.1 Conformance Levels

**Level 1 - Minimal Conformance:**
- Evaluates Category 2B (Generative Fidelity) with at least constraint adherence
- Produces results conforming to the Result Schema (Section 4)
- Satisfies all probe requirements (Section 5)

**Level 2 - Standard Conformance:**
- Evaluates Categories 2A and 2B (Receptive and Generative Fidelity)
- Produces results conforming to the Result Schema
- Satisfies all probe requirements
- Administers probes at multiple session positions (Section 5.6)

**Level 3 - Full Conformance:**
- Evaluates all five categories (1, 2A, 2B, 3, 4)
- Produces results conforming to the Result Schema
- Satisfies all probe requirements
- Administers probes at multiple session positions
- Documents reproducibility characteristics (Section 5.5)

### 7.2 Conformance Claims

An implementation claiming conformance to this specification MUST state its conformance level and MUST document:

- Which categories and indicators it evaluates
- Its threshold values for hold/bend/break classification
- Its confidence calculation method
- Any extensions to the Result Schema

---

## 8. Changelog

| Version | Date | Changes |
|---------|------|---------|
| 0.1.0 | 2026-04-05 | Initial draft |

---

## 9. References

- RFC 2119 - Key words for use in RFCs to Indicate Requirement Levels
- Relational Fidelity Metrics (evoked.dev/writing/relational-fidelity-metrics) - Narrative companion to this specification
- PinchBench (pinchbench.com) - Agentic task completion benchmarks
- PersonaGym - Persona maintenance measurement across dialogue turns
- IETF AIGA (draft-2) - AI Agent Identity and Authorization

---

*Published by Evoked under CC BY 4.0. Use this specification freely with attribution.*

*"Every framework teaches you how to build agents. We think someone should be measuring whether the agent survives the building."*
