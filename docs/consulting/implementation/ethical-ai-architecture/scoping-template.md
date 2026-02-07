# Ethical AI Architecture — Scoping Template

**Client:** [CLIENT NAME]
**Product:** [PRODUCT NAME]
**Date:** [DATE]
**Prepared by:** Erin Stanley, evoked.dev

---

## Project Overview

**Objective:** Design and implement ethical AI architecture with governance framework for [PRODUCT NAME].

**Timeline:** [X] weeks
**Start Date:** [DATE]
**Target Completion:** [DATE]

---

## Current AI Landscape

### AI Capabilities

| Capability | Description | Decision Type | Affected Parties |
|------------|-------------|---------------|------------------|
| [Name] | [What it does] | [Recommendation/Decision/Automation] | [Who is affected] |
| | | | |
| | | | |
| | | | |
| | | | |

### Current State Assessment

| Area | Current State | Gap |
|------|---------------|-----|
| Transparency | [What exists] | [What's missing] |
| Oversight | [What exists] | [What's missing] |
| Audit trail | [What exists] | [What's missing] |
| Drift detection | [What exists] | [What's missing] |
| Override mechanisms | [What exists] | [What's missing] |
| Documentation | [What exists] | [What's missing] |

### Risk Assessment Summary

| Capability | Risk Level | Primary Concern |
|------------|------------|-----------------|
| [Name] | [Low/Medium/High/Critical] | [Main ethical risk] |
| | | |
| | | |

---

## Scope Definition

### Included in Base Scope

| Component | Description | Status |
|-----------|-------------|--------|
| **Risk Assessment** | | |
| Capability inventory | Document all AI decision points | [ ] |
| Risk classification | Assign risk levels per capability | [ ] |
| Affected party mapping | Identify who is impacted | [ ] |
| **Governance Framework** | | |
| Governance model design | Advisory/Supervised/Autonomous per capability | [ ] |
| Escalation paths | Define who reviews what | [ ] |
| Review workflows | Implement review processes | [ ] |
| **Alignment Specification** | | |
| Core values definition | What the AI should optimize for | [ ] |
| Behavioral boundaries | MUST/MUST NOT/SHOULD/MAY | [ ] |
| Edge case documentation | How to handle edge cases | [ ] |
| **Infrastructure** | | |
| Audit trail system | Log all AI decisions | [ ] |
| Drift detection | Monitor for distribution changes | [ ] |
| Alerting | Notify on anomalies | [ ] |
| **Human Oversight** | | |
| Override UI | Enable human intervention | [ ] |
| Review dashboard | Surface decisions for review | [ ] |
| Feedback capture | Collect human corrections | [ ] |
| **Transparency** | | |
| AI involvement indicators | Show users when AI is involved | [ ] |
| Explanation capability | "Why this decision?" | [ ] |
| Appeal mechanism | How to contest decisions | [ ] |
| **Documentation** | | |
| Governance framework doc | For leadership | [ ] |
| Alignment specification | For AI team | [ ] |
| Operator guides | For daily operations | [ ] |
| Training materials | For stakeholders | [ ] |

### Explicitly NOT Included

| Item | Reason | Available As |
|------|--------|--------------:|
| Model training/fine-tuning | Different expertise | Referral available |
| Legal compliance certification | Requires legal counsel | Compliance mapping add-on |
| Production deployment | Their team's responsibility | Deployment support add-on |
| Ongoing monitoring | Post-engagement | Retainer available |
| Third-party AI vendor selection | Procurement decision | Advisory available |
| Ethics board facilitation | Ongoing governance | Quarterly review add-on |

---

## Technical Context

### Stack

| Layer | Technology |
|-------|------------|
| AI Services | [e.g., OpenAI API, Anthropic, Custom models] |
| Backend | [e.g., Python, Node.js] |
| Database | [e.g., PostgreSQL, MongoDB] |
| Monitoring | [e.g., Datadog, Prometheus] |
| Logging | [e.g., ELK stack, CloudWatch] |
| Frontend | [e.g., React, Vue] |

### AI Integration Points

| Service | Integration Type | Current Visibility |
|---------|-----------------|-------------------|
| [Service] | [API/SDK/Embedded] | [Full/Partial/None] |
| | | |

### Existing Governance

| Area | What Exists |
|------|-------------|
| Logging | [Describe] |
| Monitoring | [Describe] |
| Overrides | [Describe] |
| Review process | [Describe] |
| Documentation | [Describe] |

---

## Milestone Schedule

### Week 1-2: Foundation

**Deliverables:**
- [ ] Complete risk assessment for all capabilities
- [ ] Governance model design document
- [ ] Alignment specification draft
- [ ] Stakeholder review of governance model

**Milestone Check:** Risk assessment complete, governance model approved

### Week 3-4: Infrastructure

**Deliverables:**
- [ ] Audit trail schema and implementation
- [ ] Drift detection system
- [ ] Alerting configuration
- [ ] Override mechanism backend

**Milestone Check:** Audit logging operational, drift detection active

### Week 5-6: Governance & Oversight

**Deliverables:**
- [ ] Review workflows implemented
- [ ] Override UI complete
- [ ] Escalation paths configured
- [ ] Transparency layer deployed

**Milestone Check:** Full governance workflow operational

### Week 7: Testing & Validation

**Deliverables:**
- [ ] Red team exercise complete
- [ ] Governance dry run
- [ ] Stakeholder validation
- [ ] Gap assessment document

**Milestone Check:** All stakeholders approve, gaps documented

### Week 8: Handoff

**Deliverables:**
- [ ] Technical training session
- [ ] Governance training session
- [ ] All documentation complete
- [ ] Runbooks delivered
- [ ] Final sign-off

**Milestone Check:** Production-ready, team trained

---

## Working Arrangement

### Communication

| Channel | Purpose | Frequency |
|---------|---------|-----------|
| Slack/Discord | Async updates, questions | Daily |
| Video call | Sync, demos, decisions | 2x weekly |
| GitHub | Code review, PRs | Per PR |
| Email | Formal communication, stakeholders | As needed |

### Meetings

| Meeting | Duration | Frequency | Attendees |
|---------|----------|-----------|-----------|
| Kickoff | 90 min | Once | All stakeholders |
| Engineering sync | 45 min | 2x weekly | Lead engineer, AI team |
| Stakeholder update | 30 min | Weekly | Product, legal, leadership |
| Training (tech) | 120 min | Once | Engineering team |
| Training (governance) | 120 min | Once | All operators |
| Handoff | 60 min | Once | All stakeholders |

### Code Process

1. I create feature branch
2. I submit PR with description
3. Their team reviews
4. Address feedback
5. They merge (or I merge with approval)

---

## Access Required

- [ ] GitHub/GitLab repository (write access)
- [ ] AI service dashboard (read access for logs/metrics)
- [ ] Monitoring/logging systems (read access)
- [ ] Slack/Discord workspace
- [ ] Local development setup docs
- [ ] Staging environment access
- [ ] Database access (staging)
- [ ] CI/CD visibility

---

## Stakeholder Involvement

| Role | Involvement | Time Commitment |
|------|-------------|-----------------|
| Engineering lead | Primary contact, code review | 4-6 hrs/week |
| AI/ML engineer | Technical decisions, integration | 2-4 hrs/week |
| Product manager | Alignment spec, prioritization | 2 hrs/week |
| Legal/Compliance | Governance review, requirements | 2 hrs (review sessions) |
| Leadership | Governance approval | 1 hr (approval sessions) |
| Ethics board (if exists) | Alignment review | 2 hrs (review session) |

---

## Assumptions

1. Stakeholders are available for review sessions
2. AI service logs are accessible for analysis
3. Team has authority to implement governance changes
4. No major architecture changes required to add logging
5. Leadership is committed to governance model
6. Legal has reviewed AI use for regulatory requirements

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Stakeholder alignment | Medium | High | Early governance model review |
| Technical complexity | Medium | Medium | Discovery phase, adjust scope |
| Scope creep | Medium | High | Change order process |
| Team capacity | Medium | Medium | Async-first, clear responsibilities |
| Regulatory uncertainty | Low | High | Compliance mapping as add-on |
| AI vendor limitations | Medium | Medium | Work within constraints, document gaps |

---

## Investment

### Base Scope

**Total:** $20,000

**Payment Terms:**
- 30% ($6,000) upon signing
- 40% ($8,000) at mid-project milestone
- 30% ($6,000) upon completion

### Selected Add-Ons

| Add-On | Price |
|--------|-------|
| [None / List selected] | |
| | |
| **Add-On Total** | $0 |

### Grand Total

**$20,000** + add-ons

---

## Signatures

**Client:**

Name: _______________________________
Title: _______________________________
Date: _______________________________

**Consultant:**

Name: Erin Stanley
Date: _______________________________

---

*This scoping document, together with the Statement of Work, defines the engagement.*
