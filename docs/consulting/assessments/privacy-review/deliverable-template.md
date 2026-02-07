# Privacy Architecture Review Report

**Client:** [CLIENT NAME]
**Product:** [PRODUCT NAME]
**Report Date:** [DATE]
**Prepared By:** Erin Stanley, evoked.dev

---

## Confidentiality Notice

This report is confidential and intended solely for [CLIENT NAME]. It contains technical findings and recommendations specific to your product. Do not distribute without permission.

---

## Executive Summary

### Overall Assessment

[ONE PARAGRAPH: Overall privacy posture, key strengths, critical gaps]

### Data Flow Overview

[2-3 SENTENCES: High-level description of how data flows through the system]

### Findings Summary

| Severity | Count |
|----------|-------|
| Critical | X |
| High | X |
| Medium | X |
| Low | X |
| **Total** | **X** |

### Top 3 Priorities

1. **[FINDING TITLE]** — [One sentence description]
2. **[FINDING TITLE]** — [One sentence description]
3. **[FINDING TITLE]** — [One sentence description]

---

## Scope

This review examined:

- [ ] Data collection practices
- [ ] Data storage and security
- [ ] Third-party data sharing
- [ ] Data retention and deletion
- [ ] User rights implementation
- [ ] Privacy policy alignment

**Regulatory Context:** [GDPR / CCPA / COPPA / None specified]

**Out of Scope:** Legal interpretation, penetration testing, compliance certification.

---

## Data Flow Analysis

### Data Flow Diagram

```
[INSERT MERMAID DIAGRAM OR REFERENCE ATTACHED IMAGE]

Example:
┌─────────┐     ┌─────────┐     ┌─────────┐
│  User   │────▶│ Frontend│────▶│   API   │
└─────────┘     └─────────┘     └────┬────┘
                                     │
                    ┌────────────────┼────────────────┐
                    ▼                ▼                ▼
              ┌──────────┐    ┌──────────┐    ┌──────────┐
              │ Database │    │ Analytics│    │  Email   │
              │ (Primary)│    │ (Third)  │    │ (Third)  │
              └──────────┘    └──────────┘    └──────────┘
```

*[Attach full diagram as separate file if complex]*

### Data Inventory

| Data Category | Data Points | Collection Method | Storage Location | Retention |
|---------------|-------------|-------------------|------------------|-----------|
| Account | Email, name, password hash | Registration form | Primary DB | Account lifetime |
| Profile | Avatar, preferences | Profile settings | Primary DB | Account lifetime |
| Usage | Page views, actions | Auto-collected | Analytics service | [X] days |
| Payment | Card (tokenized) | Checkout | Payment processor | Per processor policy |
| [Add more rows] | | | | |

### Third-Party Data Recipients

| Service | Category | Data Received | Purpose | DPA Status |
|---------|----------|---------------|---------|------------|
| [Service name] | Analytics | Page views, user ID | Usage metrics | [Yes/No/Unknown] |
| [Service name] | Email | Email address, name | Transactional email | [Yes/No/Unknown] |
| [Service name] | Payment | Card token | Payment processing | [Yes/No/Unknown] |
| [Add more rows] | | | | |

---

## Findings

### Data Collection

#### Finding 1: [TITLE]

**Severity:** [Critical / High / Medium / Low]

**Location:** `[file path or flow description]`

**Description:**
[What we found]

**Privacy Principle:**
[Data minimization / Purpose limitation / Transparency / etc.]

**Risk:**
[What could go wrong]

**Recommendation:**
[Specific technical fix]

**Effort:** [Low / Medium / High]

---

### Data Storage & Security

#### Finding X: [TITLE]

**Severity:** [Critical / High / Medium / Low]

**Location:** `[file path or flow description]`

**Description:**
[What we found]

**Privacy Principle:**
[Security / Encryption / Access control / etc.]

**Risk:**
[What could go wrong]

**Recommendation:**
[Specific technical fix]

**Effort:** [Low / Medium / High]

---

### Third-Party Services

#### Finding X: [TITLE]

[Repeat structure]

---

### Data Retention & Deletion

#### Finding X: [TITLE]

[Repeat structure]

---

### User Rights

#### Finding X: [TITLE]

[Repeat structure]

---

### Privacy Policy

#### Finding X: [TITLE]

[Repeat structure]

---

## What's Working Well

[List 2-4 things the product does correctly]

1. **[ITEM]:** [Description]
2. **[ITEM]:** [Description]
3. **[ITEM]:** [Description]

---

## Recommendations Summary

### Immediate Actions (Critical/High)

| # | Finding | Action | Effort |
|---|---------|--------|--------|
| 1 | [Title] | [Action] | [L/M/H] |
| 2 | [Title] | [Action] | [L/M/H] |

### Short-Term (Medium)

| # | Finding | Action | Effort |
|---|---------|--------|--------|
| 1 | [Title] | [Action] | [L/M/H] |
| 2 | [Title] | [Action] | [L/M/H] |

### Longer-Term (Low / Best Practice)

| # | Finding | Action | Effort |
|---|---------|--------|--------|
| 1 | [Title] | [Action] | [L/M/H] |
| 2 | [Title] | [Action] | [L/M/H] |

---

## Privacy Enhancement Opportunities

Beyond fixing gaps, consider these patterns for stronger privacy:

### Data Minimization

| Current | Recommendation |
|---------|----------------|
| [What you collect now] | [What you could collect instead] |

### Local-First Opportunities

| Data Type | Current | Opportunity |
|-----------|---------|-------------|
| [Type] | Stored server-side | Could remain on-device |

### Zero-Knowledge Patterns

| Feature | Current | Opportunity |
|---------|---------|-------------|
| [Feature] | Server reads plaintext | Client-side encryption possible |

---

## Regulatory Alignment

### GDPR (if applicable)

| Requirement | Status | Notes |
|-------------|--------|-------|
| Lawful basis documented | [✓/✗/Partial] | |
| Data minimization | [✓/✗/Partial] | |
| User rights (access, deletion, portability) | [✓/✗/Partial] | |
| Data protection impact assessment | [✓/✗/N/A] | |
| DPAs with processors | [✓/✗/Partial] | |

### CCPA (if applicable)

| Requirement | Status | Notes |
|-------------|--------|-------|
| Privacy policy disclosures | [✓/✗/Partial] | |
| Right to know | [✓/✗/Partial] | |
| Right to delete | [✓/✗/Partial] | |
| Right to opt-out of sale | [✓/✗/N/A] | |
| Non-discrimination | [✓/✗/Partial] | |

---

## Appendix A: Data Inventory Detail

| Field | Type | Source | Storage | Encrypted | Retention | User Visible | Exportable | Deletable |
|-------|------|--------|---------|-----------|-----------|--------------|------------|-----------|
| email | PII | Registration | DB | No | Account life | Yes | Yes | Yes |
| [Add more] | | | | | | | | |

---

## Appendix B: Third-Party Service Analysis

### [Service Name]

**Category:** Analytics / Email / Payment / etc.

**Data Received:**
- [Data point 1]
- [Data point 2]

**Their Privacy Policy:** [URL]

**Data Processing Agreement:** [Yes/No/Unknown]

**Retention:** [Their policy]

**Recommendation:** [Keep / Replace / Minimize data shared]

---

## Appendix C: Privacy Principles Reference

| Principle | Description |
|-----------|-------------|
| **Data Minimization** | Collect only what's necessary for the stated purpose |
| **Purpose Limitation** | Use data only for the purpose it was collected |
| **Storage Limitation** | Don't keep data longer than necessary |
| **Transparency** | Be clear about what you collect and why |
| **Security** | Protect data with appropriate technical measures |
| **Accountability** | Be able to demonstrate compliance |

---

## Next Steps

1. **Review this report** with your technical team
2. **Schedule walkthrough call** (30 min, included) if you'd like to discuss findings
3. **Prioritize fixes** based on severity and effort
4. **Reach out** if you have questions during implementation

---

## About This Review

This technical review assesses privacy architecture and implementation practices. It is not legal advice. For legal interpretation of GDPR, CCPA, or other regulations, please consult a qualified attorney.

---

**Prepared by:**
Erin Stanley
evoked.dev
[contact info]

*"We evoke — we never extract."*
