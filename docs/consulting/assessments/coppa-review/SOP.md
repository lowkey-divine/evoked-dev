# COPPA Technical Review — Standard Operating Procedure

**Service:** COPPA Technical Review
**Price:** $3,500
**Deliverable:** Architecture assessment + implementation roadmap
**Typical Duration:** 5-7 business days from kickoff to delivery

---

## Phase 1: Discovery (Pre-Engagement)

### 1.1 Discovery Call (30 min)

**Before the call:**
- [ ] Review their website/app store listing
- [ ] Check if they have a privacy policy (note gaps)
- [ ] Review intake questionnaire responses (if submitted)

**During the call:**
- [ ] Understand their product (what it does, who uses it)
- [ ] Clarify target audience (children, families, mixed)
- [ ] Ask about current data collection practices
- [ ] Understand their technical stack
- [ ] Gauge urgency (launching soon? investor pressure? incident?)
- [ ] Explain the review process and timeline

**Questions to ask:**
1. "Who are your users? What age ranges?"
2. "What data do you collect from users?"
3. "Do you have separate flows for children vs. adults?"
4. "What's your current approach to parental consent?"
5. "Are you subject to any other regulations (GDPR, state laws)?"
6. "What's driving the timing of this review?"

**Red flags to note:**
- No age gate at all
- Collecting data before age verification
- Third-party SDKs without review
- "We assume all users are adults"

### 1.2 Go/No-Go Decision

**Proceed if:**
- Clear scope (one product/platform)
- Reasonable timeline expectations
- They understand this is technical review, not legal advice
- Payment terms acceptable

**Decline or refer out if:**
- They need legal advice (refer to COPPA attorney)
- Product is clearly non-compliant with no intent to fix
- Scope creep signals (multiple platforms, ongoing work disguised as assessment)
- Values misalignment (extractive design, dark patterns)

### 1.3 Send Proposal

- [ ] Send proposal within 24 hours of discovery call
- [ ] Include scope, timeline, deliverables, price
- [ ] Attach Statement of Work for signature
- [ ] Set 7-day expiration on proposal

---

## Phase 2: Kickoff

### 2.1 Upon Signed SOW + Payment

- [ ] Send kickoff email with intake questionnaire link
- [ ] Request codebase access (read-only GitHub/GitLab, or ZIP)
- [ ] Request access to staging environment (if applicable)
- [ ] Schedule kickoff call if needed (usually not necessary)

### 2.2 Access Checklist

Required:
- [ ] Codebase access (backend + frontend)
- [ ] Database schema or ERD
- [ ] List of third-party services/SDKs
- [ ] Current privacy policy
- [ ] Any existing compliance documentation

Nice to have:
- [ ] Architecture diagrams
- [ ] Data flow documentation
- [ ] Previous security/privacy audits

---

## Phase 3: Assessment (3-4 days)

### 3.1 Technical Review Areas

**Age Verification & Gating**
- [ ] Is there an age gate? Where in the flow?
- [ ] What happens if user indicates <13?
- [ ] Can age gate be bypassed? (back button, direct URL)
- [ ] Is age stored? How?

**Data Collection Inventory**
- [ ] What PII is collected? (name, email, photos, location, etc.)
- [ ] What behavioral data is collected? (usage, preferences)
- [ ] What device data is collected? (device ID, IP, etc.)
- [ ] When is data collected? (before/after age verification)
- [ ] Is collection minimized to what's necessary?

**Parental Consent (VPC)**
- [ ] Is verifiable parental consent implemented?
- [ ] What method is used? (email plus, signed form, payment, ID, etc.)
- [ ] Is consent obtained BEFORE data collection?
- [ ] Can parents review/delete child data?
- [ ] Is there a consent revocation flow?

**Third-Party Services**
- [ ] What SDKs are included? (analytics, ads, social, etc.)
- [ ] Are any collecting data from children?
- [ ] Are there COPPA-compliant alternatives?
- [ ] Is there a third-party disclosure in privacy policy?

**Data Storage & Retention**
- [ ] Where is child data stored?
- [ ] Is it encrypted at rest?
- [ ] Is it segregated from adult data?
- [ ] What's the retention policy?
- [ ] Is there a deletion mechanism?

**Privacy Policy Review**
- [ ] Does it disclose data collection practices?
- [ ] Does it explain parental rights?
- [ ] Is it readable by parents? (not just legalese)
- [ ] Is it linked before any data collection?

### 3.2 Findings Classification

| Severity | Definition | Example |
|----------|------------|---------|
| **Critical** | Direct COPPA violation, immediate risk | Collecting data from children without parental consent |
| **High** | Likely violation, needs prompt attention | Age gate can be bypassed via direct URL |
| **Medium** | Gap in compliance, should address | No consent revocation flow |
| **Low** | Best practice recommendation | Consider local-first data storage |

### 3.3 Document Findings

For each finding:
1. **What:** Clear description of the issue
2. **Where:** File/component/flow location
3. **Why it matters:** COPPA requirement or principle
4. **Fix:** Specific technical recommendation
5. **Effort:** Low / Medium / High

---

## Phase 4: Deliverable Creation (1-2 days)

### 4.1 Report Structure

1. **Executive Summary** (1 page)
   - Overall assessment
   - Critical findings count
   - Top 3 priorities

2. **Findings by Category**
   - Age Verification
   - Data Collection
   - Parental Consent
   - Third-Party Services
   - Data Storage
   - Privacy Policy

3. **Implementation Roadmap**
   - Phase 1: Critical fixes (Week 1-2)
   - Phase 2: High priority (Week 3-4)
   - Phase 3: Medium/Low (Ongoing)

4. **Appendix**
   - COPPA requirements reference
   - Technical specifications for fixes
   - Resources for further reading

### 4.2 Quality Checklist

- [ ] All findings have clear location references
- [ ] All findings have specific fix recommendations
- [ ] Roadmap is realistic and prioritized
- [ ] No legal advice given (technical only)
- [ ] Executive summary is readable by non-technical stakeholders
- [ ] Spell check, formatting review

---

## Phase 5: Delivery

### 5.1 Send Report

- [ ] Send report via email (PDF + Markdown source)
- [ ] Offer 30-minute walkthrough call (included)
- [ ] Set expectations for questions/clarifications

### 5.2 Walkthrough Call (30 min, optional)

- [ ] Walk through executive summary
- [ ] Explain top 3 critical findings
- [ ] Answer questions
- [ ] Discuss implementation approach
- [ ] Offer ongoing support options (if applicable)

---

## Phase 6: Follow-Up

### 6.1 Post-Delivery (Within 1 week)

- [ ] Send follow-up email checking in
- [ ] Answer any clarifying questions (within scope)
- [ ] Note if they'd like implementation support

### 6.2 Post-Engagement (30 days)

- [ ] Send brief check-in: "How's implementation going?"
- [ ] Offer to review fixes if desired (separate scope)
- [ ] Request testimonial if appropriate

---

## Guarantee Clause

> If an assessment doesn't surface at least 3 actionable findings, you pay nothing.

**Application:**
- Guarantee applies to findings of Medium severity or higher
- If fewer than 3 findings, offer full refund
- Document findings clearly so there's no ambiguity

**In practice:** This almost never triggers. Products seeking COPPA review nearly always have gaps.

---

## Templates & Resources

- [Intake Questionnaire](./intake-questionnaire.md)
- [Deliverable Template](./deliverable-template.md)
- [Proposal Template](../_templates/proposal.md)
- [Email Templates](../_templates/emails/)

---

## Notes

- Always use screen shares for sensitive material (don't email credentials)
- If you find something truly egregious (intentional harm to children), you can decline to continue
- Keep a log of time spent for future pricing calibration
- This is technical review, not penetration testing — don't exploit vulnerabilities
