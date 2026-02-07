# Alignment Specification Template

**Product:** [PRODUCT NAME]
**Version:** 1.0
**Date:** [DATE]
**Owner:** [TEAM/ROLE]

---

## Purpose

This document defines the ethical alignment requirements for AI systems in [PRODUCT]. It serves as the authoritative reference for:
- What the AI should and should not do
- How to resolve conflicts between values
- How to handle edge cases
- What constitutes a failure

---

## Core Values

The AI systems in [PRODUCT] are aligned to these values, in priority order:

### 1. [PRIMARY VALUE]

**Definition:** [What this means]

**In practice:**
- [Specific behavior]
- [Specific behavior]
- [Specific behavior]

**Trade-offs:** When this value conflicts with others, we [describe resolution]

### 2. [SECONDARY VALUE]

**Definition:** [What this means]

**In practice:**
- [Specific behavior]
- [Specific behavior]
- [Specific behavior]

**Trade-offs:** [Describe resolution]

### 3. [TERTIARY VALUE]

**Definition:** [What this means]

**In practice:**
- [Specific behavior]
- [Specific behavior]
- [Specific behavior]

**Trade-offs:** [Describe resolution]

---

## Behavioral Boundaries

### MUST (Required Behaviors)

The AI **MUST**:

| Behavior | Rationale | Verification |
|----------|-----------|--------------|
| [Behavior] | [Why required] | [How to verify] |
| [Behavior] | [Why required] | [How to verify] |
| [Behavior] | [Why required] | [How to verify] |
| [Behavior] | [Why required] | [How to verify] |
| [Behavior] | [Why required] | [How to verify] |

### MUST NOT (Prohibited Behaviors)

The AI **MUST NOT**:

| Behavior | Rationale | Detection |
|----------|-----------|-----------|
| [Behavior] | [Why prohibited] | [How to detect] |
| [Behavior] | [Why prohibited] | [How to detect] |
| [Behavior] | [Why prohibited] | [How to detect] |
| [Behavior] | [Why prohibited] | [How to detect] |
| [Behavior] | [Why prohibited] | [How to detect] |

### SHOULD (Preferred Behaviors)

The AI **SHOULD**:

| Behavior | Rationale | Trade-offs |
|----------|-----------|------------|
| [Behavior] | [Why preferred] | [When to deviate] |
| [Behavior] | [Why preferred] | [When to deviate] |
| [Behavior] | [Why preferred] | [When to deviate] |

### MAY (Permitted Behaviors)

The AI **MAY**:

| Behavior | Conditions | Limits |
|----------|------------|--------|
| [Behavior] | [When permitted] | [Boundaries] |
| [Behavior] | [When permitted] | [Boundaries] |
| [Behavior] | [When permitted] | [Boundaries] |

---

## Decision Principles

When the AI makes decisions, these principles apply:

### Principle 1: [NAME]

**Statement:** When [situation], the AI should [action] because [reason].

**Example:** [Concrete example]

**Counter-example:** [What would violate this]

### Principle 2: [NAME]

**Statement:** When [situation], the AI should [action] because [reason].

**Example:** [Concrete example]

**Counter-example:** [What would violate this]

### Principle 3: [NAME]

**Statement:** When [situation], the AI should [action] because [reason].

**Example:** [Concrete example]

**Counter-example:** [What would violate this]

---

## Value Conflicts

When core values conflict, resolve using this priority:

### [VALUE A] vs [VALUE B]

**Resolution:** [Which takes precedence and why]

**Example scenario:** [Describe scenario]

**Correct behavior:** [What the AI should do]

### [VALUE A] vs [VALUE C]

**Resolution:** [Which takes precedence and why]

**Example scenario:** [Describe scenario]

**Correct behavior:** [What the AI should do]

### [VALUE B] vs [VALUE C]

**Resolution:** [Which takes precedence and why]

**Example scenario:** [Describe scenario]

**Correct behavior:** [What the AI should do]

---

## Edge Cases

### Category 1: [EDGE CASE CATEGORY]

| Scenario | Expected Behavior | Rationale |
|----------|-------------------|-----------|
| [Scenario] | [What should happen] | [Why] |
| [Scenario] | [What should happen] | [Why] |
| [Scenario] | [What should happen] | [Why] |

### Category 2: [EDGE CASE CATEGORY]

| Scenario | Expected Behavior | Rationale |
|----------|-------------------|-----------|
| [Scenario] | [What should happen] | [Why] |
| [Scenario] | [What should happen] | [Why] |
| [Scenario] | [What should happen] | [Why] |

### Category 3: [EDGE CASE CATEGORY]

| Scenario | Expected Behavior | Rationale |
|----------|-------------------|-----------|
| [Scenario] | [What should happen] | [Why] |
| [Scenario] | [What should happen] | [Why] |
| [Scenario] | [What should happen] | [Why] |

---

## Failure Modes

### Type 1: [FAILURE TYPE]

**Definition:** [What constitutes this failure]

**Detection:** [How to detect]

**Impact:** [Severity and who is affected]

**Response:**
1. [Immediate action]
2. [Investigation step]
3. [Resolution step]
4. [Prevention step]

### Type 2: [FAILURE TYPE]

**Definition:** [What constitutes this failure]

**Detection:** [How to detect]

**Impact:** [Severity and who is affected]

**Response:**
1. [Immediate action]
2. [Investigation step]
3. [Resolution step]
4. [Prevention step]

### Type 3: [FAILURE TYPE]

**Definition:** [What constitutes this failure]

**Detection:** [How to detect]

**Impact:** [Severity and who is affected]

**Response:**
1. [Immediate action]
2. [Investigation step]
3. [Resolution step]
4. [Prevention step]

---

## Affected Parties

### Primary Users

**Who:** [Description]

**Interests:** [What they need from the AI]

**Vulnerabilities:** [How they could be harmed]

**Protections:** [What we do to protect them]

### Secondary Users

**Who:** [Description]

**Interests:** [What they need from the AI]

**Vulnerabilities:** [How they could be harmed]

**Protections:** [What we do to protect them]

### Third Parties

**Who:** [Description]

**Interests:** [What they need from the AI]

**Vulnerabilities:** [How they could be harmed]

**Protections:** [What we do to protect them]

---

## Transparency Requirements

### What Users Know

| Information | Visibility | How |
|-------------|------------|-----|
| AI is involved in decision | [Always/Sometimes/On request] | [Method] |
| Factors considered | [Always/Sometimes/On request] | [Method] |
| Confidence level | [Always/Sometimes/On request] | [Method] |
| How to contest | [Always/Sometimes/On request] | [Method] |
| How to opt out | [Always/Sometimes/On request] | [Method] |

### What Users Can Do

| Action | Availability | Process |
|--------|--------------|---------|
| Request explanation | [All users / Some users] | [How] |
| Contest decision | [All users / Some users] | [How] |
| Request human review | [All users / Some users] | [How] |
| Opt out of AI | [All users / Some users] | [How] |
| Provide feedback | [All users / Some users] | [How] |

---

## Governance Integration

### Review Triggers

This specification should be reviewed when:
- [ ] A new AI capability is added
- [ ] A failure mode is discovered
- [ ] Regulatory requirements change
- [ ] Stakeholder feedback indicates gaps
- [ ] Quarterly alignment review

### Approval Authority

| Change Type | Approver |
|-------------|----------|
| Minor clarification | [Role] |
| Edge case addition | [Role] |
| Value priority change | [Role] |
| New behavioral boundary | [Role] |
| Full specification revision | [Role] |

### Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [Date] | [Name] | Initial specification |
| | | | |

---

## Appendix A: Testing Scenarios

For each AI capability, these scenarios validate alignment:

### [CAPABILITY 1]

| Test | Input | Expected Output | Alignment Verified |
|------|-------|-----------------|-------------------|
| Happy path | [Input] | [Output] | [Values tested] |
| Edge case 1 | [Input] | [Output] | [Values tested] |
| Edge case 2 | [Input] | [Output] | [Values tested] |
| Failure mode | [Input] | [Output] | [Values tested] |

### [CAPABILITY 2]

| Test | Input | Expected Output | Alignment Verified |
|------|-------|-----------------|-------------------|
| Happy path | [Input] | [Output] | [Values tested] |
| Edge case 1 | [Input] | [Output] | [Values tested] |
| Edge case 2 | [Input] | [Output] | [Values tested] |
| Failure mode | [Input] | [Output] | [Values tested] |

---

## Appendix B: Regulatory Mapping

| Requirement | Source | This Spec Section | Status |
|-------------|--------|-------------------|--------|
| [Requirement] | [Regulation] | [Section] | [Compliant/Gap] |
| | | | |

---

## Appendix C: Glossary

| Term | Definition |
|------|------------|
| [Term] | [Definition] |
| [Term] | [Definition] |
| [Term] | [Definition] |

---

*This is a living document. Last reviewed: [DATE]*
