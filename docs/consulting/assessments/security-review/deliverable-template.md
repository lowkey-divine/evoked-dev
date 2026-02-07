# Security Code Review Report

**Client:** [CLIENT NAME]
**Product:** [PRODUCT NAME]
**Report Date:** [DATE]
**Prepared By:** Erin Stanley, evoked.dev

---

## Confidentiality Notice

This report contains sensitive security findings and is intended solely for [CLIENT NAME]. Do not distribute without permission. Unauthorized disclosure could put your systems at risk.

---

## Executive Summary

### Overall Security Posture

[ONE PARAGRAPH: Overall assessment, maturity level, key concerns]

**Rating:** [Strong / Adequate / Needs Improvement / Critical Gaps]

### Findings Summary

| Severity | Count |
|----------|-------|
| Critical | X |
| High | X |
| Medium | X |
| Low | X |
| **Total** | **X** |

### Top 3 Priorities

1. **[FINDING TITLE]** — [One sentence, severity]
2. **[FINDING TITLE]** — [One sentence, severity]
3. **[FINDING TITLE]** — [One sentence, severity]

---

## Scope & Methodology

### What Was Reviewed

- [ ] Backend code: `[language/framework]`
- [ ] Frontend code: `[framework]`
- [ ] Database schema and queries
- [ ] Authentication flows
- [ ] API endpoints
- [ ] Dependencies and configuration

### What Was NOT Reviewed

- Infrastructure/network security
- Penetration testing (no active exploitation)
- Third-party services' internal security
- Mobile app binary analysis

### Methodology

This review examined source code for:
- Authentication and session management flaws
- Authorization bypass vulnerabilities
- Input validation and injection risks
- Cryptographic weaknesses
- Information disclosure
- Dependency vulnerabilities
- Security misconfiguration

---

## Findings

### Authentication

#### Finding 1: [TITLE]

**Severity:** [Critical / High / Medium / Low]

**Location:** `[file:line]`

**OWASP Category:** [A01-A10 if applicable]

**Description:**
[What we found — be specific]

**Risk:**
[What an attacker could do]

**Evidence:**
```[language]
// Code snippet showing the issue
```

**Recommendation:**
[Specific fix with code example if helpful]

```[language]
// Fixed code
```

**Effort:** [Low / Medium / High]

---

#### Finding 2: [TITLE]

[Repeat structure]

---

### Session Management

#### Finding X: [TITLE]

[Repeat structure]

---

### Authorization

#### Finding X: [TITLE]

[Repeat structure]

---

### Input Validation

#### Finding X: [TITLE]

[Repeat structure]

---

### Cryptography

#### Finding X: [TITLE]

[Repeat structure]

---

### Error Handling & Information Disclosure

#### Finding X: [TITLE]

[Repeat structure]

---

### Dependencies

#### Finding X: [TITLE]

[Repeat structure]

---

### Configuration

#### Finding X: [TITLE]

[Repeat structure]

---

## What's Working Well

[List 2-4 security practices done correctly]

1. **[ITEM]:** [Description]
2. **[ITEM]:** [Description]
3. **[ITEM]:** [Description]

---

## Fixes List

### Critical — Fix Immediately

| # | Finding | File | Fix | Effort |
|---|---------|------|-----|--------|
| 1 | [Title] | `[file]` | [Action] | [L/M/H] |
| 2 | [Title] | `[file]` | [Action] | [L/M/H] |

### High — Fix This Week

| # | Finding | File | Fix | Effort |
|---|---------|------|-----|--------|
| 1 | [Title] | `[file]` | [Action] | [L/M/H] |
| 2 | [Title] | `[file]` | [Action] | [L/M/H] |

### Medium — Fix This Month

| # | Finding | File | Fix | Effort |
|---|---------|------|-----|--------|
| 1 | [Title] | `[file]` | [Action] | [L/M/H] |
| 2 | [Title] | `[file]` | [Action] | [L/M/H] |

### Low — Address When Possible

| # | Finding | File | Fix | Effort |
|---|---------|------|-----|--------|
| 1 | [Title] | `[file]` | [Action] | [L/M/H] |
| 2 | [Title] | `[file]` | [Action] | [L/M/H] |

---

## Security Hardening Recommendations

Beyond fixing vulnerabilities, consider these improvements:

### Quick Wins (Low Effort, High Value)

| Recommendation | Effort | Impact |
|----------------|--------|--------|
| [Item] | Low | High |
| [Item] | Low | Medium |

### Defense in Depth

| Recommendation | Effort | Impact |
|----------------|--------|--------|
| [Item] | Medium | High |
| [Item] | Medium | Medium |

### Future Considerations

| Recommendation | Effort | Impact |
|----------------|--------|--------|
| [Item] | High | High |
| [Item] | Medium | Medium |

---

## Dependency Vulnerabilities

### Critical/High Severity

| Package | Current | Vulnerability | Fix Version |
|---------|---------|---------------|-------------|
| [name] | [ver] | [CVE/description] | [ver] |

### Medium/Low Severity

| Package | Current | Vulnerability | Fix Version |
|---------|---------|---------------|-------------|
| [name] | [ver] | [CVE/description] | [ver] |

**Recommendation:** Run `[npm audit fix / pip-audit / etc.]` and update to patched versions.

---

## Security Headers Checklist

| Header | Status | Recommendation |
|--------|--------|----------------|
| Strict-Transport-Security | [✓/✗] | [Action if needed] |
| Content-Security-Policy | [✓/✗] | [Action if needed] |
| X-Content-Type-Options | [✓/✗] | [Action if needed] |
| X-Frame-Options | [✓/✗] | [Action if needed] |
| X-XSS-Protection | [✓/✗] | [Action if needed] |
| Referrer-Policy | [✓/✗] | [Action if needed] |
| Permissions-Policy | [✓/✗] | [Action if needed] |

---

## Appendix A: OWASP Top 10 Mapping

| OWASP Category | Findings |
|----------------|----------|
| A01: Broken Access Control | [List findings] |
| A02: Cryptographic Failures | [List findings] |
| A03: Injection | [List findings] |
| A04: Insecure Design | [List findings] |
| A05: Security Misconfiguration | [List findings] |
| A06: Vulnerable Components | [List findings] |
| A07: Auth Failures | [List findings] |
| A08: Software/Data Integrity | [List findings] |
| A09: Logging Failures | [List findings] |
| A10: SSRF | [List findings] |

---

## Appendix B: Files Reviewed

| File | Purpose | Findings |
|------|---------|----------|
| `[path]` | [description] | [X] |
| `[path]` | [description] | [X] |

---

## Appendix C: Secure Coding Resources

### Authentication
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)

### Session Management
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [OWASP JWT Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)

### Input Validation
- [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [OWASP SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)

### General
- [OWASP Top 10](https://owasp.org/Top10/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)

---

## Next Steps

1. **Review this report** with your development team
2. **Prioritize fixes** — start with Critical, then High
3. **Schedule walkthrough call** (30 min, included) to discuss findings
4. **Implement fixes** using the recommendations provided
5. **Consider re-verification** after fixes are complete (separate engagement)

---

## About This Review

This code review identifies security vulnerabilities through source code analysis. It is not a penetration test and does not involve active exploitation. Some vulnerabilities may only be discoverable through runtime testing.

For comprehensive security assessment, consider pairing code review with penetration testing from a qualified firm.

---

**Prepared by:**
Erin Stanley
evoked.dev
[contact info]

*"We evoke — we never extract."*
