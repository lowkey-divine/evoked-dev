# Child Safety Build — Scoping Template

**Client:** [CLIENT NAME]
**Product:** [PRODUCT NAME]
**Date:** [DATE]
**Prepared by:** Erin Stanley, evoked.dev

---

## Project Overview

**Objective:** Implement COPPA-compliant child safety systems for [PRODUCT NAME].

**Timeline:** [X] weeks
**Start Date:** [DATE]
**Target Completion:** [DATE]

---

## Scope Definition

### Included in Base Scope

| Component | Description | Status |
|-----------|-------------|--------|
| **Age Verification** | | |
| Neutral age gate component | Frontend date picker with neutral defaults | [ ] |
| Age verification middleware | Backend check before data collection | [ ] |
| Age category storage | Session/database tracking of age group | [ ] |
| **Parental Consent (VPC)** | | |
| Consent database schema | Tables for consent records | [ ] |
| Consent service | Initiate, verify, revoke consent | [ ] |
| Consent API endpoints | REST endpoints for consent flow | [ ] |
| Consent explainer screen | Data disclosure UI | [ ] |
| Signature capture | E-signature component | [ ] |
| Consent status display | Show consent state in UI | [ ] |
| **Route Protection** | | |
| Consent middleware | Check consent on protected routes | [ ] |
| IDOR prevention | Verify parent-child relationship | [ ] |
| **Parent Controls** | | |
| View child data | Parent can see what's collected | [ ] |
| Delete child data | Parent can request deletion | [ ] |
| Revoke consent | Parent can withdraw consent | [ ] |
| **Integration** | | |
| Privacy policy links | Link to policy before consent | [ ] |
| Email notifications | Notify parent of consent events | [ ] |

### Explicitly NOT Included

| Item | Reason | Available As |
|------|--------|--------------|
| Additional VPC methods | Beyond base scope | Add-on (+$2,500) |
| Credit card verification | Requires Stripe setup | Add-on (+$3,000) |
| Government ID verification | Requires third-party | Add-on (+$4,000) |
| Field-level encryption | Complex implementation | Add-on (+$3,000) |
| Automated account cleanup | Beyond base scope | Add-on (+$2,000) |
| Ongoing maintenance | Post-engagement | Retainer available |
| Third-party SDK audit | Separate assessment | COPPA Review |

---

## Technical Context

### Stack

| Layer | Technology |
|-------|------------|
| Backend | [e.g., Node.js + Express] |
| Frontend | [e.g., React + TypeScript] |
| Database | [e.g., PostgreSQL] |
| ORM | [e.g., Prisma] |
| Auth | [e.g., Custom JWT] |
| Hosting | [e.g., AWS] |

### Existing Patterns

| Area | Pattern |
|------|---------|
| API style | [REST / GraphQL] |
| State management | [Redux / Context / etc.] |
| Testing | [Jest / Vitest / etc.] |
| Code style | [ESLint config / Prettier] |
| PR process | [Describe] |

### Integration Points

| System | Integration Needed |
|--------|-------------------|
| Auth system | [How age/consent integrates] |
| User profiles | [Where consent status lives] |
| Existing routes | [What needs protection] |
| Email system | [For consent notifications] |

---

## Milestone Schedule

### Week 1: Foundation

**Deliverables:**
- [ ] Database migration for `parental_consents` table
- [ ] Age gate component (frontend)
- [ ] Age verification middleware (backend)
- [ ] Consent service skeleton

**Milestone Check:** Age gate works end-to-end

### Week 2: VPC Flow

**Deliverables:**
- [ ] Consent explainer screen
- [ ] Signature capture component
- [ ] Consent API endpoints (initiate, verify)
- [ ] Consent status in UI

**Milestone Check:** Parent can complete consent flow

### Week 3: Protection & Access

**Deliverables:**
- [ ] Route protection middleware
- [ ] Parent data view screen
- [ ] Deletion request flow
- [ ] Consent revocation endpoint

**Milestone Check:** Full protection in place, parents can manage data

### Week 4: Testing & Handoff

**Deliverables:**
- [ ] E2E test coverage
- [ ] Documentation
- [ ] Knowledge transfer session
- [ ] Final code review

**Milestone Check:** Production-ready, team trained

---

## Working Arrangement

### Communication

| Channel | Purpose | Frequency |
|---------|---------|-----------|
| Slack/Discord | Async updates, questions | Daily |
| Video call | Sync, demos, decisions | 2x weekly |
| GitHub | Code review, PRs | Per PR |
| Email | Formal communication | As needed |

### Meetings

| Meeting | Duration | Frequency | Attendees |
|---------|----------|-----------|-----------|
| Kickoff | 60 min | Once | Team leads |
| Check-in | 30 min | 2x weekly | Lead engineer |
| Milestone demo | 30 min | Weekly | Stakeholders |
| Handoff | 60 min | Once | Engineering team |

### Code Process

1. I create feature branch
2. I submit PR with description
3. Their team reviews
4. Address feedback
5. They merge (or I merge with approval)

---

## Access Required

- [ ] GitHub/GitLab repository (write access)
- [ ] Slack/Discord workspace
- [ ] Local development setup docs
- [ ] Staging environment access
- [ ] Database access (staging)
- [ ] CI/CD visibility

---

## Assumptions

1. Team is available for code review within 24 hours
2. Decisions can be made quickly (not blocked by committees)
3. Staging environment is functional
4. No major refactoring required for integration
5. Auth system supports the consent flow design

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Stack unfamiliarity | Low | Medium | Extra ramp-up time |
| Scope creep | Medium | High | Change order process |
| Team availability | Medium | Medium | Async-first approach |
| Legacy code complexity | Medium | High | Discovery phase, adjust scope |
| Deployment issues | Low | Medium | Staging testing, gradual rollout |

---

## Investment

### Base Scope

**Total:** $12,000

**Payment Terms:**
- 50% ($6,000) upon signing
- 50% ($6,000) upon completion

### Selected Add-Ons

| Add-On | Price |
|--------|-------|
| [None / List selected] | |
| | |
| **Add-On Total** | $0 |

### Grand Total

**$12,000** + add-ons

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
