# Ethical AI Architecture — Standard Operating Procedure

**Service:** Ethical AI Architecture
**Price:** $20,000 (base scope)
**Duration:** 6-8 weeks typical
**Format:** Embedded collaboration (async + sync sessions)
**Deliverables:** Working AI architecture with governance framework

---

## Overview

This is deep architectural work. We design and build AI systems that are transparent, accountable, and aligned with human values. Not just "responsible AI" checkbox compliance — actual ethical architecture baked into the system design.

**What's included (base scope):**
- AI architecture review and redesign
- Multi-agent governance framework
- Alignment monitoring system
- Drift detection and alerting
- Human oversight integration
- Audit trail infrastructure
- Documentation and training

**What's NOT included (separate scope):**
- Model training or fine-tuning
- Third-party AI service procurement
- Legal compliance certification
- Ongoing monitoring (retainer available)
- Production deployment

---

## Phase 1: Discovery (Before Contract)

### 1.1 Discovery Call (60 min)

**Purpose:** Understand the AI system, identify ethical concerns, assess scope.

**Questions:**
1. "What AI capabilities does your system have?"
2. "What decisions does the AI make or influence?"
3. "Who is affected by these decisions?"
4. "What could go wrong? What has gone wrong?"
5. "What visibility do you have into AI behavior?"
6. "How do humans currently oversee the AI?"
7. "What ethical concerns have been raised?"
8. "What's your team's AI expertise?"

**Assess:**
- System complexity (single model vs multi-agent)
- Decision stakes (low/medium/high/critical)
- Current ethical maturity
- Team readiness for governance
- Blockers (legacy architecture, vendor lock-in)

### 1.2 Technical Deep-Dive (2-3 hours)

**Before signing, need to understand:**
- Current AI architecture
- Data flows and decision points
- Existing monitoring
- Integration points
- Deployment model

**Output:** Architecture diagram with ethical risk annotations

### 1.3 Scoping Document

After discovery, create detailed scope:

```markdown
## Ethical AI Architecture — [CLIENT] Scope

### Current State
- [AI capabilities]
- [Decision domains]
- [Identified risks]

### Target State
- [Governance model]
- [Oversight mechanisms]
- [Monitoring capabilities]

### Deliverables
- [ ] Governance framework document
- [ ] Alignment specification
- [ ] Monitoring infrastructure
- [ ] Audit logging system
- [ ] Human override mechanisms
- [ ] Training materials

### Out of Scope
- [ ] Model training
- [ ] Legal certification
- [ ] Production deployment
```

### 1.4 Contract

- [ ] Send proposal with scope document attached
- [ ] Statement of Work with clear deliverables
- [ ] Payment terms: 30% upfront, 40% mid-project, 30% on completion
- [ ] Change order process for scope additions
- [ ] IP assignment clause (they own the work)

---

## Phase 2: Foundation (Weeks 1-2)

### 2.1 Access & Onboarding

- [ ] Codebase access (read + write)
- [ ] AI service credentials (read-only for analysis)
- [ ] Slack/Discord for async
- [ ] Dev environment running
- [ ] Access to existing AI logs/metrics

### 2.2 Ethical Risk Assessment

**Document for each AI capability:**

| Capability | Decision Type | Affected Parties | Risk Level | Current Safeguards | Gaps |
|------------|--------------|------------------|------------|-------------------|------|
| [Capability] | [Type] | [Who] | [L/M/H/C] | [What exists] | [What's missing] |

**Risk Level Definitions:**
- **Low:** Reversible, limited impact, easy correction
- **Medium:** Moderate impact, correction requires effort
- **High:** Significant impact, difficult to correct
- **Critical:** Irreversible harm possible, affects vulnerable populations

### 2.3 Governance Model Design

**Choose governance approach:**

| Model | Description | Best For |
|-------|-------------|----------|
| **Advisory** | AI recommends, human decides | High-stakes decisions |
| **Supervised** | AI decides, human reviews | Medium-stakes, high volume |
| **Autonomous** | AI decides, human audits | Low-stakes, routine |
| **Prohibited** | AI not allowed | Critical/ethical domains |

**For each AI capability, assign:**
- Governance model
- Override authority
- Audit frequency
- Escalation path

### 2.4 Alignment Specification

Create alignment spec document:

```markdown
## Alignment Specification — [PRODUCT]

### Core Values
1. [Value 1] — What this means in practice
2. [Value 2] — What this means in practice
3. [Value 3] — What this means in practice

### Behavioral Boundaries
- MUST: [Required behaviors]
- MUST NOT: [Prohibited behaviors]
- SHOULD: [Preferred behaviors]
- MAY: [Permitted behaviors]

### Decision Principles
When [situation], the system should prioritize [X] over [Y] because [reason].

### Edge Cases
| Scenario | Expected Behavior | Rationale |
|----------|-------------------|-----------|
| [Edge case] | [What should happen] | [Why] |

### Failure Modes
| Failure Type | Detection Method | Response |
|--------------|-----------------|----------|
| [Type] | [How to detect] | [What to do] |
```

**Milestone Check:** Risk assessment complete, governance model designed, alignment spec drafted

---

## Phase 3: Infrastructure (Weeks 3-4)

### 3.1 Audit Trail System

**Build logging for:**
- All AI decisions
- Input context
- Model version
- Confidence scores
- Human overrides
- Override reasons

**Schema:**
```sql
CREATE TABLE ai_audit_log (
  id UUID PRIMARY KEY,
  timestamp TIMESTAMPTZ NOT NULL,
  capability TEXT NOT NULL,
  decision_type TEXT NOT NULL,
  input_context JSONB,
  output_decision JSONB,
  model_id TEXT,
  model_version TEXT,
  confidence_score DECIMAL,
  affected_entities UUID[],
  governance_model TEXT,
  human_override BOOLEAN DEFAULT FALSE,
  override_by UUID REFERENCES users(id),
  override_reason TEXT,
  override_timestamp TIMESTAMPTZ
);
```

### 3.2 Drift Detection

**Monitor for:**
- Output distribution changes
- Confidence score patterns
- Override frequency
- Error rates
- Feedback loops

**Alerting thresholds:**

| Metric | Warning | Critical |
|--------|---------|----------|
| Override rate | >10% | >25% |
| Confidence drift | >1 std dev | >2 std dev |
| Error rate | >5% | >15% |
| Distribution shift | Detected | Sustained |

### 3.3 Human Override Mechanisms

**Build override UI for:**
- View AI decision + reasoning
- One-click override with reason selection
- Bulk review for flagged decisions
- Escalation workflow
- Override analytics

**Override reasons (configurable):**
- Incorrect assessment
- Missing context
- Edge case
- Policy violation
- User request
- Other (requires explanation)

### 3.4 Transparency Layer

**For affected users, show:**
- That AI was involved
- What the AI decided
- How to request review
- How to provide feedback

**Implementation:**
- AI decision badges in UI
- "Why this?" explainer modals
- Feedback capture
- Appeal workflow (if applicable)

**Milestone Check:** Audit logging operational, drift detection active, overrides working

---

## Phase 4: Governance Implementation (Weeks 5-6)

### 4.1 Review Workflows

**Build workflows for:**

| Review Type | Trigger | Reviewer | SLA |
|-------------|---------|----------|-----|
| Random sample | 5% of decisions | AI team | Weekly |
| Low confidence | Score < threshold | Domain expert | 24 hours |
| Override pattern | >3 overrides same type | Product lead | 48 hours |
| User complaint | Feedback received | Support + AI team | 24 hours |
| Drift alert | Monitoring trigger | AI team | Immediate |

### 4.2 Escalation Paths

```
Decision → [Automated checks] → [Pass/Flag]
                                    ↓
                               [Flagged]
                                    ↓
                            [L1: AI Team Review]
                                    ↓
                            [Escalate if needed]
                                    ↓
                            [L2: Domain Expert]
                                    ↓
                            [Escalate if needed]
                                    ↓
                            [L3: Ethics Board / Leadership]
```

### 4.3 Feedback Integration

**Capture:**
- User feedback on AI decisions
- Override patterns
- Error reports
- Suggested improvements

**Process:**
- Weekly feedback review
- Monthly pattern analysis
- Quarterly alignment review
- Model retraining triggers (documented, not implemented)

### 4.4 Documentation

**Create:**
- [ ] Governance framework document (for leadership)
- [ ] Alignment specification (for AI team)
- [ ] Override guide (for operators)
- [ ] Transparency guide (for users/support)
- [ ] Audit procedures (for compliance)

**Milestone Check:** Workflows operational, escalation paths defined, documentation complete

---

## Phase 5: Testing & Validation (Week 7)

### 5.1 Red Team Exercise

**Test scenarios:**
- Adversarial inputs
- Edge cases from alignment spec
- Failure mode triggers
- Override stress testing
- Audit trail completeness

### 5.2 Governance Dry Run

**Simulate:**
- Full review workflow
- Escalation to each level
- Override process
- Drift alert response
- User appeal handling

### 5.3 Stakeholder Validation

**Review with:**
- [ ] Engineering team (technical accuracy)
- [ ] Product team (workflow fit)
- [ ] Legal/compliance (regulatory alignment)
- [ ] Leadership (governance model)
- [ ] Ethics board if exists (alignment spec)

### 5.4 Gap Assessment

Document remaining gaps:
- [ ] What's not yet covered
- [ ] What needs ongoing work
- [ ] What requires future investment
- [ ] Known limitations

---

## Phase 6: Handoff (Week 8)

### 6.1 Knowledge Transfer (2 sessions)

**Session 1: Technical (2 hours)**
- Architecture walkthrough
- Monitoring and alerting
- Override mechanisms
- Audit queries and reports
- Deployment and configuration

**Session 2: Governance (2 hours)**
- Governance framework review
- Workflow operation
- Escalation procedures
- Alignment maintenance
- Drift response

### 6.2 Runbooks

Create operational runbooks:
- [ ] Daily monitoring checklist
- [ ] Weekly review procedures
- [ ] Drift alert response
- [ ] Override investigation
- [ ] Alignment review process
- [ ] Escalation procedures

### 6.3 Handoff Deliverables

- [ ] All code merged to main
- [ ] Documentation complete
- [ ] Runbooks delivered
- [ ] Training sessions recorded
- [ ] Monitoring dashboards live
- [ ] Alert channels configured

### 6.4 Final Sign-Off

- [ ] All scope items delivered
- [ ] Stakeholder validation complete
- [ ] Documentation approved
- [ ] Training completed
- [ ] Governance operational

---

## Phase 7: Post-Engagement

### 7.1 Support Window (4 weeks)

**Included:**
- Clarifying questions
- Bug fixes for code I wrote
- Workflow adjustments
- Training follow-up

**Not included:**
- New capability implementation
- Model changes
- Ongoing monitoring
- Production incidents

### 7.2 Ongoing Options

| Option | Description | Price |
|--------|-------------|-------|
| Quarterly review | Alignment audit, drift review | $3,500 |
| Monthly advisory | Office hours, async support | $3,500/mo |
| Incident response | On-call for ethical incidents | Custom |

### 7.3 Follow-Up (60 days)

- [ ] Check in: "How is governance working?"
- [ ] Review any drift alerts
- [ ] Note issues for future engagements
- [ ] Discuss ongoing support needs

---

## Pricing & Scope Management

### Base Scope: $20,000

Includes:
- Ethical risk assessment
- Governance framework design
- Alignment specification
- Audit infrastructure
- Drift detection
- Human override mechanisms
- Transparency layer
- Documentation and training
- 4 weeks post-handoff support

### Common Add-Ons

| Add-On | Price |
|--------|-------|
| Additional AI capability (beyond 5) | +$2,000 each |
| Custom review dashboard | +$4,000 |
| Multi-stakeholder governance | +$3,000 |
| Compliance mapping (SOC2, GDPR, etc.) | +$5,000 |
| Extended support (monthly) | +$3,500/mo |

### Change Orders

If scope changes during engagement:
1. Document the change request
2. Estimate additional effort
3. Get written approval
4. Adjust timeline and payment

---

## Red Flags & Boundaries

### When to Pause

- No clear decision-making authority
- Scope creep without adjustment
- Team not engaging with governance
- Technical blockers not resolved
- Ethical concerns not addressed

### When to Walk Away

- Asked to hide AI involvement from users
- Asked to disable safeguards
- Leadership not committed to governance
- Ethical violations observed
- Payment issues

### Boundaries

- I design governance, not make ethical decisions for them
- I build infrastructure, not change business models
- I flag concerns, they decide response
- I'm not liable for AI decisions post-handoff
- I'm not on-call for production incidents

---

## Templates & Resources

- [Scoping Template](./scoping-template.md)
- [Handoff Checklist](./handoff-checklist.md)
- [Alignment Spec Template](./alignment-spec-template.md)
- [Proposal Template](../../_templates/proposal.md)

---

## Notes

- This work requires significant stakeholder access
- Governance only works if leadership commits
- Technical infrastructure without culture change fails
- Document everything — this is high-stakes work
- Leave their system more transparent than you found it

