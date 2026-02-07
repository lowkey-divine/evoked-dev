# Security Code Review — Standard Operating Procedure

**Service:** Security Code Review
**Price:** $3,500
**Deliverable:** Auth, sessions, encryption audit + fixes list
**Typical Duration:** 5-7 business days from kickoff to delivery

---

## Phase 1: Discovery (Pre-Engagement)

### 1.1 Discovery Call (30 min)

**Before the call:**
- [ ] Review their website/app
- [ ] Check for obvious security signals (HTTPS, auth flows)
- [ ] Note technology stack if visible

**During the call:**
- [ ] Understand the product and its sensitivity
- [ ] Ask about their security concerns
- [ ] Understand their tech stack
- [ ] Ask about previous security work
- [ ] Explain the review process and timeline
- [ ] Clarify this is code review, not penetration testing

**Questions to ask:**
1. "What's your tech stack? (Frontend, backend, database)"
2. "How do users authenticate? (Password, OAuth, SSO)"
3. "What sensitive data do you handle? (Payments, health, PII)"
4. "Have you had any security incidents or concerns?"
5. "Have you done previous security audits?"
6. "Are you subject to compliance requirements? (SOC 2, PCI, etc.)"
7. "What's driving this review?"

**Red flags to note:**
- Rolling their own crypto
- Storing passwords in plaintext
- No HTTPS
- Hardcoded secrets in code
- No rate limiting
- "We haven't really thought about security"

### 1.2 Go/No-Go Decision

**Proceed if:**
- Clear scope (one application/codebase)
- Reasonable timeline expectations
- They understand this is code review, not pentest
- Payment terms acceptable

**Decline or refer out if:**
- They need penetration testing (refer to pentest firm)
- Active breach/incident (refer to incident response)
- Codebase is too large for fixed-price review
- Values misalignment (building harmful tools)

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
- [ ] Request environment variable names (not values)

### 2.2 Access Checklist

Required:
- [ ] Codebase access (backend required, frontend helpful)
- [ ] List of environment variables (names only)
- [ ] Authentication flow documentation (if exists)
- [ ] API documentation (if exists)

Nice to have:
- [ ] Architecture diagrams
- [ ] Previous security audits
- [ ] Threat model documentation
- [ ] Staging environment access

---

## Phase 3: Assessment (3-4 days)

### 3.1 Authentication Review

**Password Handling**
- [ ] Are passwords hashed? (bcrypt, argon2, scrypt)
- [ ] Is salt used? (Should be automatic with modern libraries)
- [ ] Is there a minimum password length/complexity?
- [ ] Are passwords checked against breach databases?
- [ ] Is there account lockout after failed attempts?

**OAuth/Social Login**
- [ ] Are OAuth tokens validated properly?
- [ ] Is state parameter used to prevent CSRF?
- [ ] Are tokens stored securely?
- [ ] Is token refresh implemented correctly?
- [ ] Are scopes minimized?

**Multi-Factor Authentication**
- [ ] Is MFA available?
- [ ] What methods? (TOTP, SMS, WebAuthn)
- [ ] Are backup codes provided?
- [ ] Can MFA be bypassed?

**Password Reset**
- [ ] Are reset tokens random and unpredictable?
- [ ] Do tokens expire? (Should be < 1 hour)
- [ ] Are tokens single-use?
- [ ] Is the old password invalidated on reset?
- [ ] Are email enumeration attacks prevented?

### 3.2 Session Management

**Session Tokens**
- [ ] Are session tokens cryptographically random?
- [ ] Are tokens of sufficient length? (>= 128 bits)
- [ ] Are tokens transmitted securely? (HTTPS only)
- [ ] Are cookies marked HttpOnly and Secure?
- [ ] Is SameSite attribute set?

**Session Lifecycle**
- [ ] Do sessions expire? (idle timeout, absolute timeout)
- [ ] Is logout implemented correctly? (server-side invalidation)
- [ ] Are sessions invalidated on password change?
- [ ] Is session fixation prevented?
- [ ] Are concurrent sessions limited?

**JWT Tokens** (if used)
- [ ] Is algorithm explicitly specified? (No "alg: none")
- [ ] Is secret key strong and properly managed?
- [ ] Are tokens short-lived? (Access < 15 min recommended)
- [ ] Is refresh token rotation implemented?
- [ ] Are tokens validated on every request?
- [ ] Is the payload not trusted without verification?

### 3.3 Authorization & Access Control

**Authorization Checks**
- [ ] Are authorization checks performed on every request?
- [ ] Are checks performed server-side (not just frontend)?
- [ ] Is there role-based or attribute-based access control?
- [ ] Are IDOR vulnerabilities prevented?
- [ ] Is horizontal privilege escalation prevented?
- [ ] Is vertical privilege escalation prevented?

**API Security**
- [ ] Are all endpoints authenticated (except public ones)?
- [ ] Are admin endpoints properly protected?
- [ ] Is rate limiting in place?
- [ ] Are API keys managed securely?
- [ ] Is CORS configured correctly?

### 3.4 Input Validation & Output Encoding

**Input Validation**
- [ ] Is all input validated server-side?
- [ ] Are parameterized queries used? (SQL injection prevention)
- [ ] Is input length limited?
- [ ] Are file uploads validated? (type, size, content)
- [ ] Is path traversal prevented?

**Output Encoding**
- [ ] Is output properly encoded for context? (HTML, JS, URL)
- [ ] Is XSS prevented?
- [ ] Are Content-Type headers set correctly?
- [ ] Is Content-Security-Policy implemented?

**Command Injection**
- [ ] Are system commands avoided when possible?
- [ ] If used, are inputs sanitized/escaped?
- [ ] Are shell metacharacters blocked?

### 3.5 Cryptography

**Data Encryption**
- [ ] Is sensitive data encrypted at rest?
- [ ] What algorithm is used? (AES-256-GCM recommended)
- [ ] How are encryption keys managed?
- [ ] Are keys rotated?
- [ ] Is key material stored separately from data?

**Transport Security**
- [ ] Is TLS enforced everywhere?
- [ ] Is HSTS enabled?
- [ ] Are TLS versions/ciphers appropriate?
- [ ] Are certificates valid and not expiring?

**Secrets Management**
- [ ] Are secrets stored in environment variables (not code)?
- [ ] Are secrets excluded from version control?
- [ ] Is there a secrets management system?
- [ ] Are secrets rotated regularly?

### 3.6 Error Handling & Logging

**Error Handling**
- [ ] Are detailed errors hidden from users?
- [ ] Do error messages avoid leaking sensitive info?
- [ ] Are exceptions handled gracefully?
- [ ] Does the system fail closed (secure defaults)?

**Security Logging**
- [ ] Are authentication events logged?
- [ ] Are authorization failures logged?
- [ ] Are logs protected from tampering?
- [ ] Do logs avoid sensitive data? (No passwords, tokens)
- [ ] Are logs monitored for anomalies?

### 3.7 Dependency Security

**Third-Party Libraries**
- [ ] Are dependencies up to date?
- [ ] Are there known vulnerabilities? (npm audit, snyk, etc.)
- [ ] Are dependencies from trusted sources?
- [ ] Is there a process for updating dependencies?

### 3.8 Infrastructure Security (if visible)

**Configuration**
- [ ] Are default credentials changed?
- [ ] Are unnecessary services disabled?
- [ ] Are debug modes disabled in production?
- [ ] Are security headers implemented?

**Rate Limiting & DoS Prevention**
- [ ] Is rate limiting implemented?
- [ ] Does rate limiting fail closed on errors?
- [ ] Are expensive operations protected?
- [ ] Is there protection against brute force?

### 3.9 Findings Classification

| Severity | Definition | Example |
|----------|------------|---------|
| **Critical** | Immediate exploitation risk, severe impact | SQL injection, auth bypass, RCE |
| **High** | Significant vulnerability, likely exploitable | Weak password hashing, session fixation |
| **Medium** | Security weakness, potential for exploitation | Missing rate limiting, verbose errors |
| **Low** | Best practice gap, defense in depth | Missing security headers, old dependencies |

### 3.10 Document Findings

For each finding:
1. **What:** Clear description of the vulnerability
2. **Where:** File/line number or component
3. **Risk:** What an attacker could do
4. **OWASP Category:** If applicable (A01-A10)
5. **Fix:** Specific code-level recommendation
6. **Effort:** Low / Medium / High

---

## Phase 4: Deliverable Creation (1-2 days)

### 4.1 Report Structure

1. **Executive Summary** (1 page)
   - Overall security posture
   - Critical/High findings count
   - Top 3 priorities

2. **Methodology**
   - What was reviewed
   - Tools used
   - Limitations

3. **Findings by Category**
   - Authentication
   - Session Management
   - Authorization
   - Input Validation
   - Cryptography
   - Error Handling
   - Dependencies
   - Infrastructure

4. **Fixes List**
   - Prioritized by severity
   - Specific code recommendations
   - Effort estimates

5. **Appendix**
   - OWASP reference
   - Tool output (if applicable)
   - Secure coding resources

### 4.2 Quality Checklist

- [ ] All findings have specific file/line references
- [ ] All findings have code-level fix recommendations
- [ ] Severity ratings are consistent
- [ ] No false positives included
- [ ] Executive summary is readable by non-technical stakeholders
- [ ] Fixes list is actionable
- [ ] Spell check, formatting review

---

## Phase 5: Delivery

### 5.1 Send Report

- [ ] Send report via email (PDF + Markdown source)
- [ ] Mark as confidential
- [ ] Offer 30-minute walkthrough call (included)
- [ ] Set expectations for questions/clarifications

### 5.2 Walkthrough Call (30 min, optional)

- [ ] Walk through executive summary
- [ ] Explain critical/high findings in detail
- [ ] Demonstrate fixes for top issues
- [ ] Answer questions
- [ ] Discuss implementation approach

---

## Phase 6: Follow-Up

### 6.1 Post-Delivery (Within 1 week)

- [ ] Send follow-up email checking in
- [ ] Answer any clarifying questions (within scope)
- [ ] Note if they'd like verification of fixes

### 6.2 Post-Engagement (30 days)

- [ ] Send brief check-in: "How's remediation going?"
- [ ] Offer to verify fixes if desired (separate scope)
- [ ] Request testimonial if appropriate

---

## Guarantee Clause

> If an assessment doesn't surface at least 3 actionable findings, you pay nothing.

**Application:**
- Guarantee applies to findings of Medium severity or higher
- If fewer than 3 findings, offer full refund
- Document findings clearly so there's no ambiguity

---

## Important Distinctions

### Code Review vs Penetration Test

| This Review | Pentest |
|-------------|---------|
| Reviews source code | Tests running application |
| Identifies vulnerabilities by reading | Exploits vulnerabilities |
| Finds logic flaws and bad patterns | Finds runtime issues |
| No active exploitation | Active exploitation |
| Broader coverage | Deeper on specific issues |

**If they need a pentest, refer to:**
- [List of trusted pentest firms you'd recommend]

### Scope Boundaries

- **In scope:** Application code, configuration, dependencies
- **Out of scope:** Infrastructure, network, physical security, social engineering
- **Not included:** Fixing issues, retesting after fixes

---

## Common Patterns to Check

### JWT Security Checklist
```
[ ] Algorithm explicitly set (RS256 or HS256, not "none")
[ ] Secret is strong (>= 256 bits for HS256)
[ ] Expiration is enforced (exp claim)
[ ] Issuer/audience validated (iss, aud claims)
[ ] Token not stored in localStorage (XSS risk)
[ ] Refresh token rotation implemented
```

### Password Hashing Checklist
```
[ ] Using bcrypt, argon2, or scrypt (not MD5, SHA1, SHA256)
[ ] Work factor appropriate (bcrypt rounds >= 10)
[ ] Not using custom hashing scheme
[ ] Salt is automatically generated (built into modern libs)
```

### Rate Limiting Checklist
```
[ ] Rate limiter on auth endpoints
[ ] Rate limiter on API endpoints
[ ] Fails closed on Redis/store errors
[ ] Keyed by appropriate identifier (IP, user, both)
[ ] Limits are reasonable (not too high)
```

---

## Templates & Resources

- [Intake Questionnaire](./intake-questionnaire.md)
- [Deliverable Template](./deliverable-template.md)
- [Proposal Template](../_templates/proposal.md)
- [Email Templates](../_templates/emails/)

---

## Notes

- This is code review, not exploitation — don't break things
- If you find something critical, notify client immediately (don't wait for report)
- Keep all findings confidential
- Document everything for defensibility
- If the codebase is too large, discuss scope limits before starting
