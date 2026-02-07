# Child Safety Build Support — Standard Operating Procedure

**Service:** Child Safety Build Support
**Price:** $12,000 (base scope)
**Duration:** 3-4 weeks typical
**Format:** Embedded collaboration (async + sync sessions)
**Deliverables:** Working, tested code merged to their codebase

---

## Overview

This is hands-on implementation support. We build child safety systems *together* — age gates, parental consent flows, data protection, deletion mechanisms. I write code in their codebase, not just advise.

**What's included (base scope):**
- Neutral age verification system
- One VPC method (typically signed consent form)
- Route protection middleware
- Parent data access/deletion
- Privacy policy integration points

**What's NOT included (separate scope):**
- Multiple VPC methods
- Custom consent verification integrations
- Third-party service integrations
- Ongoing maintenance

---

## Phase 1: Scoping (Before Contract)

### 1.1 Discovery Call (45 min)

**Purpose:** Understand scope, assess fit, define deliverables.

**Questions:**
1. "What's your tech stack?" (Must be compatible)
2. "What child safety features do you need?"
3. "What's your timeline?"
4. "Who will I be working with?"
5. "How do you handle code review and deployment?"
6. "What does your testing setup look like?"

**Assess:**
- Is the stack something I can work in?
- Is the scope achievable in 3-4 weeks?
- Is the team ready to collaborate?
- Are there blockers (legacy code, no tests, etc.)?

### 1.2 Scoping Document

After discovery, create a scoping document:

```markdown
## Child Safety Build — [CLIENT] Scope

### Included
- [ ] Age gate (frontend + backend)
- [ ] VPC: Signed consent form
- [ ] Consent database schema
- [ ] Consent API endpoints
- [ ] Route protection middleware
- [ ] Parent view/delete child data
- [ ] Deletion flow (user-initiated)

### Not Included
- [ ] Additional VPC methods
- [ ] Credit card verification integration
- [ ] Third-party consent services
- [ ] Ongoing maintenance

### Technical Context
- Backend: [stack]
- Frontend: [stack]
- Database: [stack]
- Auth: [system]

### Timeline
- Week 1: Age gate + database schema
- Week 2: VPC flow (backend + frontend)
- Week 3: Route protection + data access
- Week 4: Testing + handoff

### Investment
$12,000 (base scope)
```

### 1.3 Contract

- [ ] Send proposal with scope document attached
- [ ] Statement of Work with clear deliverables
- [ ] Payment terms: 50% upfront, 50% on completion
- [ ] Change order process for scope additions

---

## Phase 2: Kickoff (Week 0)

### 2.1 Access Setup

- [ ] Add to GitHub/GitLab as collaborator
- [ ] Add to Slack/Discord for async communication
- [ ] Get local dev environment running
- [ ] Access to staging environment
- [ ] Understand CI/CD pipeline

### 2.2 Codebase Review

Spend 2-4 hours understanding:
- [ ] Project structure
- [ ] Auth/session system
- [ ] Database patterns (ORM, migrations)
- [ ] API patterns (routing, middleware)
- [ ] Frontend patterns (state, routing)
- [ ] Testing setup

### 2.3 Kickoff Call (60 min)

**Attendees:** Me + their lead engineer + product

**Agenda:**
- Introduce working style
- Walk through scope
- Agree on milestone schedule
- Set up communication rhythm
- Identify first tasks

**Establish:**
- Daily async check-in (Slack)
- 2x weekly sync calls (30 min)
- Code review process
- Who approves PRs

---

## Phase 3: Implementation (Weeks 1-3)

### 3.1 Working Rhythm

**Daily:**
- Post progress update in Slack (end of day)
- Note any blockers or questions
- Tag relevant people for decisions

**2x Weekly Sync (30 min):**
- Demo completed work
- Discuss upcoming work
- Resolve blockers
- Adjust timeline if needed

**As Needed:**
- Quick Slack huddles for questions
- Screen share for complex issues

### 3.2 Milestone Structure

**Week 1: Foundation**
- [ ] Database migrations for consent
- [ ] Age gate component (frontend)
- [ ] Age verification middleware (backend)
- [ ] Basic consent service structure

**Milestone check:** Age gate works end-to-end

**Week 2: VPC Flow**
- [ ] Consent explainer screen
- [ ] Signature capture component
- [ ] Consent API endpoints
- [ ] Consent status integration

**Milestone check:** Parent can grant consent

**Week 3: Protection & Access**
- [ ] Route protection middleware
- [ ] Parent data view screen
- [ ] Deletion request flow
- [ ] Consent revocation

**Milestone check:** Full flow works, parents can manage data

### 3.3 Code Standards

**Follow their patterns:**
- Match existing code style
- Use their linting/formatting
- Follow their naming conventions
- Match their test patterns

**Maintain quality:**
- Write tests for new code
- Document complex logic
- No hardcoded secrets
- Error handling throughout

**PR Process:**
- Small, focused PRs
- Clear descriptions
- Link to scope item
- Request review from their team

### 3.4 Communication Templates

**Daily Update:**
```
📍 Daily Update — [Date]

✅ Completed:
- [Task 1]
- [Task 2]

🔄 In Progress:
- [Task 3]

🚧 Blockers:
- [None / describe]

📅 Tomorrow:
- [Plan]
```

**PR Description:**
```
## What
[Brief description]

## Why
[Link to scope item]

## Testing
- [ ] Unit tests added
- [ ] Manual testing done
- [ ] Tested in staging

## Screenshots
[If UI changes]
```

---

## Phase 4: Testing & QA (Week 3-4)

### 4.1 Testing Checklist

**Age Verification:**
- [ ] Under-13 routes to consent flow
- [ ] 13+ proceeds normally
- [ ] Age gate cannot be bypassed (direct URL)
- [ ] Back button doesn't skip

**Parental Consent:**
- [ ] Parent can initiate consent
- [ ] Signature captures correctly
- [ ] Consent stored in database
- [ ] Child profile shows consent status
- [ ] Cannot access child data without consent

**Route Protection:**
- [ ] Protected routes check consent
- [ ] Unauthorized returns 403
- [ ] Parent can access child data
- [ ] Non-parent cannot access child data

**Data Management:**
- [ ] Parent can view child data
- [ ] Parent can request deletion
- [ ] Deletion has grace period
- [ ] Deletion is complete (not anonymization)
- [ ] Consent can be revoked

### 4.2 E2E Test Flows

Write or document E2E tests for:
1. New user → age gate → under 13 → consent flow → access granted
2. Parent → view child data → request deletion → confirm
3. Parent → revoke consent → child data access blocked

### 4.3 Security Review

Before handoff, verify:
- [ ] No sensitive data in logs
- [ ] Consent tokens are secure
- [ ] IDOR vulnerabilities checked
- [ ] Rate limiting on consent endpoints
- [ ] Input validation on all endpoints

---

## Phase 5: Handoff (Week 4)

### 5.1 Documentation

Create or update:
- [ ] README section on child safety features
- [ ] API documentation for consent endpoints
- [ ] Database schema documentation
- [ ] Configuration requirements (env vars)

### 5.2 Knowledge Transfer Call (60 min)

**Attendees:** Their engineering team

**Cover:**
- Architecture overview
- How each component works
- Configuration and deployment
- Common maintenance tasks
- How to add VPC methods later
- How to handle consent expiration

### 5.3 Handoff Checklist

- [ ] All code merged to main
- [ ] All tests passing
- [ ] Documentation complete
- [ ] Knowledge transfer done
- [ ] No outstanding questions
- [ ] Environment variables documented
- [ ] Monitoring/alerting recommendations

### 5.4 Final Deliverables

- [ ] Summary document: what was built, where it lives
- [ ] Architecture diagram
- [ ] Links to all PRs
- [ ] Testing documentation
- [ ] Maintenance guide

---

## Phase 6: Post-Engagement

### 6.1 Support Window (2 weeks)

After handoff, available for:
- Clarifying questions
- Bug fixes for code I wrote
- Guidance on deployment issues

**Not included:**
- New feature development
- Maintenance beyond 2 weeks
- Issues unrelated to delivered scope

### 6.2 Follow-Up (30 days)

- [ ] Check in: "How's it running in production?"
- [ ] Note any issues for future engagements
- [ ] Request testimonial if appropriate
- [ ] Offer ongoing advisory if interested

---

## Pricing & Scope Management

### Base Scope: $12,000

Includes:
- Age verification (neutral gate)
- One VPC method (signed consent)
- Route protection
- Parent data access/deletion
- 3-4 weeks implementation
- 2 weeks post-handoff support

### Common Add-Ons

| Add-On | Price |
|--------|-------|
| Additional VPC method | +$2,500 each |
| Credit card verification (Stripe) | +$3,000 |
| Government ID verification | +$4,000 |
| Data encryption layer | +$3,000 |
| Automated retention/deletion | +$2,000 |
| Extended support (monthly) | +$1,500/mo |

### Change Orders

If scope changes during engagement:
1. Document the change request
2. Estimate additional effort
3. Get written approval
4. Adjust timeline and payment

---

## Red Flags & Boundaries

### When to Pause

- No code review process (quality risk)
- Constantly changing requirements
- Can't get access or answers
- Team is unresponsive

### When to Walk Away

- Ethical concerns with the product
- Hostile work environment
- Scope creep without adjustment
- Payment issues

### Boundaries

- I write code, not make product decisions
- I follow their patterns, not impose mine
- I flag security issues, they decide priority
- I'm not on-call for production issues

---

## Templates & Resources

- [Scoping Template](./scoping-template.md)
- [Kickoff Agenda](./kickoff-agenda.md)
- [Handoff Checklist](./handoff-checklist.md)
- [Proposal Template](../../_templates/proposal.md)

---

## Notes

- This is high-touch work — budget accordingly
- Their team velocity affects timeline
- Build relationships, not just code
- Leave their codebase better than you found it
- Document everything for your protection
