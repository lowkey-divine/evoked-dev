# COPPA Technical Review Report

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

[ONE PARAGRAPH: Overall compliance posture, key strengths, critical gaps]

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

- [ ] Age verification implementation
- [ ] Data collection practices
- [ ] Parental consent mechanisms
- [ ] Third-party SDK data collection
- [ ] Data storage and retention
- [ ] Privacy policy compliance

**Out of Scope:** Legal interpretation of COPPA requirements, penetration testing, GDPR/state law compliance (unless noted).

---

## Findings

### Age Verification & Gating

#### Finding 1: [TITLE]

**Severity:** [Critical / High / Medium / Low]

**Location:** `[file path or flow description]`

**Description:**
[What we found]

**COPPA Requirement:**
[What COPPA requires]

**Recommendation:**
[Specific technical fix]

**Effort:** [Low / Medium / High]

---

#### Finding 2: [TITLE]

[Repeat structure for each finding]

---

### Data Collection

#### Finding X: [TITLE]

**Severity:** [Critical / High / Medium / Low]

**Location:** `[file path or flow description]`

**Description:**
[What we found]

**COPPA Requirement:**
[What COPPA requires]

**Recommendation:**
[Specific technical fix]

**Effort:** [Low / Medium / High]

---

### Parental Consent (VPC)

#### Finding X: [TITLE]

[Repeat structure]

---

### Third-Party Services

#### Finding X: [TITLE]

[Repeat structure]

---

### Data Storage & Retention

#### Finding X: [TITLE]

[Repeat structure]

---

### Privacy Policy

#### Finding X: [TITLE]

[Repeat structure]

---

## What's Working Well

[List 2-4 things the product does correctly — builds trust and shows balanced assessment]

1. **[ITEM]:** [Description]
2. **[ITEM]:** [Description]
3. **[ITEM]:** [Description]

---

## Implementation Roadmap

### Phase 1: Critical Fixes (Week 1-2)

| Finding | Fix | Owner | Status |
|---------|-----|-------|--------|
| [Title] | [Action] | TBD | Not started |
| [Title] | [Action] | TBD | Not started |

### Phase 2: High Priority (Week 3-4)

| Finding | Fix | Owner | Status |
|---------|-----|-------|--------|
| [Title] | [Action] | TBD | Not started |
| [Title] | [Action] | TBD | Not started |

### Phase 3: Medium/Low Priority (Ongoing)

| Finding | Fix | Owner | Status |
|---------|-----|-------|--------|
| [Title] | [Action] | TBD | Not started |
| [Title] | [Action] | TBD | Not started |

---

## Technical Specifications

### VPC Implementation Guidance

If implementing verifiable parental consent, consider these FTC-approved methods:

| Method | Assurance Level | Implementation Effort |
|--------|-----------------|----------------------|
| Signed consent form (e-signature) | Medium | Low |
| Credit card verification ($0.50 auth) | Medium | Medium |
| Government ID verification | High | Medium |
| Video verification call | High | High |
| Email plus (link confirmation) | Low | Low |

**Recommendation:** [Specific recommendation based on their context]

### Age Gate Implementation

```
[Pseudocode or guidance for neutral age gate implementation]
```

### Data Minimization Checklist

For child profiles, consider which fields are truly necessary:

| Field | Necessary? | Justification |
|-------|------------|---------------|
| [Example] | [Yes/No] | [Why or why not] |

---

## COPPA Reference

### Key Requirements

1. **Notice:** Direct notice to parents before collecting data
2. **Consent:** Verifiable parental consent before collection
3. **Access:** Parents can review and request deletion
4. **Minimization:** Collect only what's necessary
5. **Retention:** Don't keep data longer than necessary
6. **Security:** Reasonable security measures

### 2025 Amendment Changes

- Biometric data now explicitly covered
- Separate consent required for third-party disclosure
- Written security program required
- Stricter retention requirements

### Resources

- [FTC COPPA FAQ](https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions)
- [FTC Six-Step Compliance Plan](https://www.ftc.gov/business-guidance/resources/childrens-online-privacy-protection-rule-six-step-compliance-plan-your-business)

---

## Appendix A: Files Reviewed

| File/Component | Purpose |
|----------------|---------|
| `[path]` | [description] |
| `[path]` | [description] |

---

## Appendix B: Third-Party SDK Analysis

| SDK | Data Collected | COPPA Impact | Recommendation |
|-----|----------------|--------------|----------------|
| [Name] | [Data types] | [Assessment] | [Action] |

---

## Next Steps

1. **Review this report** with your technical team
2. **Schedule walkthrough call** (30 min, included) if you'd like to discuss findings
3. **Prioritize fixes** based on the roadmap above
4. **Reach out** if you have questions during implementation

---

## About This Review

This technical review assesses implementation practices against COPPA requirements. It is not legal advice. For legal interpretation of COPPA or other regulations, please consult a qualified attorney.

---

**Prepared by:**
Erin Stanley
evoked.dev
[contact info]

*"We evoke — we never extract."*
