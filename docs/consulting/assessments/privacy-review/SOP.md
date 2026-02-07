# Privacy Architecture Review — Standard Operating Procedure

**Service:** Privacy Architecture Review
**Price:** $3,000
**Deliverable:** Data flow audit + recommendations
**Typical Duration:** 5-7 business days from kickoff to delivery

---

## Phase 1: Discovery (Pre-Engagement)

### 1.1 Discovery Call (30 min)

**Before the call:**
- [ ] Review their website/app
- [ ] Check for existing privacy policy
- [ ] Note any obvious data collection (forms, analytics, etc.)

**During the call:**
- [ ] Understand what the product does
- [ ] Ask about their user base and data sensitivity
- [ ] Understand their current privacy practices
- [ ] Ask about regulatory context (GDPR, CCPA, industry-specific)
- [ ] Gauge their privacy maturity level
- [ ] Explain the review process and timeline

**Questions to ask:**
1. "What data do you collect from users?"
2. "Where does that data go? (Storage, third parties, analytics)"
3. "How long do you keep user data?"
4. "Can users access, export, or delete their data?"
5. "Are you subject to specific regulations? (GDPR, HIPAA, etc.)"
6. "Have you had any privacy concerns or incidents?"
7. "What's driving this review?"

**Red flags to note:**
- No privacy policy at all
- "We collect everything and figure it out later"
- Third-party SDKs without awareness of what they collect
- No data deletion mechanism
- Storing sensitive data without encryption

### 1.2 Go/No-Go Decision

**Proceed if:**
- Clear scope (one product/platform)
- Reasonable timeline expectations
- They understand this is technical review, not legal advice
- Payment terms acceptable

**Decline or refer out if:**
- They need legal advice (refer to privacy attorney)
- They're looking for a "rubber stamp" without intent to fix issues
- Scope creep signals (multiple platforms, ongoing work disguised as assessment)
- Values misalignment (surveillance-based business model)

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
- [ ] Request any existing data flow documentation

### 2.2 Access Checklist

Required:
- [ ] Codebase access (backend + frontend)
- [ ] Database schema or ERD
- [ ] List of third-party services/SDKs
- [ ] Current privacy policy
- [ ] Environment variables list (redacted values, just names)

Nice to have:
- [ ] Architecture diagrams
- [ ] Existing data flow documentation
- [ ] Previous security/privacy audits
- [ ] Data processing agreements with vendors

---

## Phase 3: Assessment (3-4 days)

### 3.1 Data Flow Mapping

**Step 1: Identify Data Entry Points**
- [ ] User registration forms
- [ ] Profile update forms
- [ ] Content creation (posts, uploads, etc.)
- [ ] Payment flows
- [ ] Third-party authentication (OAuth)
- [ ] API endpoints accepting user data
- [ ] Mobile app data collection
- [ ] Cookies and tracking

**Step 2: Trace Data Movement**
- [ ] Where is data validated/sanitized?
- [ ] Where is data stored? (Primary DB, caches, logs)
- [ ] What third parties receive data? (Analytics, payment, email, etc.)
- [ ] Is data replicated across regions?
- [ ] Are there backups? How long retained?

**Step 3: Document Data Outputs**
- [ ] User-facing data display
- [ ] Admin/internal dashboards
- [ ] Export functionality
- [ ] API responses
- [ ] Third-party data sharing
- [ ] Logs and monitoring

### 3.2 Technical Review Areas

**Data Collection Inventory**
- [ ] What PII is collected? (Name, email, phone, address, etc.)
- [ ] What behavioral data is collected? (Usage, preferences, etc.)
- [ ] What device/technical data is collected? (IP, device ID, etc.)
- [ ] Is collection minimized to what's necessary?
- [ ] Is there clear purpose for each data point?

**Data Storage & Security**
- [ ] Is sensitive data encrypted at rest?
- [ ] What encryption algorithm/key management?
- [ ] Is data encrypted in transit? (TLS)
- [ ] Are database connections secured?
- [ ] Is there field-level encryption for sensitive data?
- [ ] How are encryption keys managed?

**Third-Party Services**
- [ ] List all third-party services receiving user data
- [ ] What data does each receive?
- [ ] Are there Data Processing Agreements in place?
- [ ] Do third parties have appropriate security certifications?
- [ ] Can third-party data sharing be minimized?

**Data Retention & Deletion**
- [ ] Is there a defined retention policy?
- [ ] Is there a user data deletion mechanism?
- [ ] Is deletion complete or anonymization?
- [ ] Are backups covered by deletion requests?
- [ ] Is there automated cleanup for inactive accounts?

**User Rights Implementation**
- [ ] Can users access their data?
- [ ] Can users export their data? (Portability)
- [ ] Can users request deletion?
- [ ] Can users correct/update their data?
- [ ] Are these rights documented in privacy policy?

**Privacy Policy Alignment**
- [ ] Does policy accurately describe collection practices?
- [ ] Are all third parties disclosed?
- [ ] Are user rights clearly explained?
- [ ] Is the policy accessible from the product?
- [ ] When was it last updated?

**Local-First & Zero-Knowledge Patterns** (if applicable)
- [ ] What data could stay on-device?
- [ ] Is client-side encryption possible?
- [ ] Could the server be "blind" to certain data?
- [ ] Are there opportunities for data minimization?

### 3.3 Findings Classification

| Severity | Definition | Example |
|----------|------------|---------|
| **Critical** | Serious privacy risk, immediate action needed | Sensitive data stored unencrypted, data breach exposure |
| **High** | Significant privacy gap, should address promptly | No user deletion mechanism, undisclosed third-party sharing |
| **Medium** | Privacy improvement needed | Excessive data retention, missing data export |
| **Low** | Best practice recommendation | Consider local-first for certain data |

### 3.4 Document Findings

For each finding:
1. **What:** Clear description of the issue
2. **Where:** File/component/flow location
3. **Why it matters:** Privacy principle or regulation
4. **Risk:** What could go wrong
5. **Fix:** Specific technical recommendation
6. **Effort:** Low / Medium / High

---

## Phase 4: Data Flow Diagram

### 4.1 Create Visual Data Flow

Create a diagram showing:
- Data entry points (user actions)
- Processing steps
- Storage locations
- Third-party connections
- Data outputs

**Tools:**
- Mermaid.js (for markdown-compatible diagrams)
- Draw.io / Excalidraw
- Lucidchart

**Example structure:**
```
User → Frontend → API → Database
                    ↓
              [Third Parties]
              - Analytics
              - Payment
              - Email
```

### 4.2 Annotate with Findings

Mark on the diagram:
- Where encryption is/isn't present
- Where data minimization opportunities exist
- Where third-party sharing occurs

---

## Phase 5: Deliverable Creation (1-2 days)

### 5.1 Report Structure

1. **Executive Summary** (1 page)
   - Overall assessment
   - Critical findings count
   - Data flow overview
   - Top 3 priorities

2. **Data Flow Analysis**
   - Visual data flow diagram
   - Data inventory table
   - Third-party mapping

3. **Findings by Category**
   - Data Collection
   - Storage & Security
   - Third-Party Services
   - Retention & Deletion
   - User Rights
   - Privacy Policy

4. **Recommendations**
   - Prioritized by severity
   - Specific technical guidance
   - Effort estimates

5. **Appendix**
   - Detailed data inventory
   - Third-party service analysis
   - Privacy principle references

### 5.2 Quality Checklist

- [ ] Data flow diagram is clear and accurate
- [ ] All findings have clear location references
- [ ] All findings have specific fix recommendations
- [ ] Recommendations are realistic and prioritized
- [ ] No legal advice given (technical only)
- [ ] Executive summary is readable by non-technical stakeholders
- [ ] Spell check, formatting review

---

## Phase 6: Delivery

### 6.1 Send Report

- [ ] Send report via email (PDF + Markdown source)
- [ ] Include data flow diagram as separate image
- [ ] Offer 30-minute walkthrough call (included)
- [ ] Set expectations for questions/clarifications

### 6.2 Walkthrough Call (30 min, optional)

- [ ] Walk through data flow diagram
- [ ] Explain top 3 critical findings
- [ ] Answer questions
- [ ] Discuss implementation approach
- [ ] Offer ongoing support options (if applicable)

---

## Phase 7: Follow-Up

### 7.1 Post-Delivery (Within 1 week)

- [ ] Send follow-up email checking in
- [ ] Answer any clarifying questions (within scope)
- [ ] Note if they'd like implementation support

### 7.2 Post-Engagement (30 days)

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

---

## Common Privacy Patterns to Check

### Data Minimization Opportunities
- Collect only what's needed for the stated purpose
- Consider "need to know" vs "nice to have"
- Question every data point: "Why do we need this?"

### Local-First Patterns
- Keep sensitive data on-device when possible
- Use client-side encryption for sensitive fields
- Consider E2E encryption for messaging/content

### Zero-Knowledge Patterns
- Server doesn't need to read all data to function
- Hashed identifiers instead of raw values
- Encrypted blobs the server can't decrypt

### Privacy-Preserving Analytics
- Aggregate metrics instead of individual tracking
- Self-hosted analytics (Plausible, Umami)
- Anonymized data collection

---

## Templates & Resources

- [Intake Questionnaire](./intake-questionnaire.md)
- [Deliverable Template](./deliverable-template.md)
- [Proposal Template](../_templates/proposal.md)
- [Email Templates](../_templates/emails/)

---

## Notes

- This is not a security penetration test — don't exploit vulnerabilities
- Focus on privacy architecture, not full security audit
- If you find security issues, document them but stay in scope
- Always clarify this is technical assessment, not legal advice
