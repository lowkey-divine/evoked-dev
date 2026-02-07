# Child Safety Implementation Workshop — Materials Checklist

**Purpose:** Track all materials to prepare and deliver.

---

## Before Workshop

### To Prepare (1 week before)

**Slide Deck:**
- [ ] Customize with their product/company name
- [ ] Adjust examples for their stack
- [ ] Update with 2025 amendment details

**Code Templates:**
- [ ] Prepare templates in their stack:
  - [ ] Age gate component (React/Vue/etc.)
  - [ ] Database migrations (their ORM)
  - [ ] Backend service (their framework)
  - [ ] API endpoints
  - [ ] Middleware patterns
- [ ] Test all code locally
- [ ] Create GitHub repo with templates
- [ ] Write README for repo

**Customization (if codebase access provided):**
- [ ] Review their current age gate
- [ ] Review their auth/session system
- [ ] Note integration points for VPC
- [ ] Identify stack-specific patterns

### To Send Client

- [ ] Calendar invite with:
  - [ ] Agenda
  - [ ] Video link
  - [ ] Prerequisites (laptop, dev environment)
- [ ] GitHub repo access (read)
- [ ] Pre-workshop questionnaire
- [ ] Optional: COPPA basics pre-reading

---

## During Workshop

### Have Ready

- [ ] Slide deck
- [ ] Code demos (tested, working)
- [ ] GitHub repo with templates
- [ ] VS Code / editor ready for live coding
- [ ] Backup of all code (in case of repo issues)
- [ ] Recording running
- [ ] Timer for segments
- [ ] Participant list

### Demo Code Order

1. **Age Gate Demo**
   - [ ] Frontend component
   - [ ] Date picker with neutral defaults
   - [ ] Age calculation
   - [ ] Routing based on age

2. **VPC Demo: Signed Form**
   - [ ] Database schema
   - [ ] ConsentService
   - [ ] Frontend flow
   - [ ] E-signature capture

3. **VPC Demo: Credit Card**
   - [ ] Stripe setup
   - [ ] PaymentIntent creation
   - [ ] Verification callback
   - [ ] Void after auth

4. **Data Protection Demo**
   - [ ] Encryption utility
   - [ ] Deletion flow
   - [ ] Consent middleware

### Capture During Session

- [ ] Questions for follow-up
- [ ] Stack-specific issues noted
- [ ] Lab exercise outcomes
- [ ] Action items for team

---

## After Workshop

### To Create (within 48 hours)

**Recording:**
- [ ] Edit if needed (trim start/end)
- [ ] Upload to unlisted YouTube/Vimeo or secure share
- [ ] Create timestamps/chapters if possible

**Slide Deck:**
- [ ] Export to PDF
- [ ] Include code snippets in appendix if helpful

**Code Templates Package:**
- [ ] Ensure GitHub repo is clean and documented
- [ ] Or create ZIP with all templates
- [ ] Include README with setup instructions
- [ ] Include LICENSE (MIT recommended)

**Implementation Guide:**
- [ ] Step-by-step guide customized to their stack
- [ ] Database migration order
- [ ] Service implementation order
- [ ] Frontend integration guide
- [ ] Testing recommendations

**COPPA Checklist:**
- [ ] Printable PDF
- [ ] Their current status noted
- [ ] Action items from workshop

### To Send Client

**Email with:**
- [ ] Recording link
- [ ] Slide deck (PDF)
- [ ] Code templates (GitHub link or ZIP)
- [ ] Implementation guide (PDF)
- [ ] COPPA compliance checklist
- [ ] Action items from session
- [ ] 30-day support offer

---

## Deliverables Detail

### 1. Recording

**Format:** MP4 or unlisted video link
**Duration:** ~4 hours
**Include:** All demos, Q&A, lab discussion

### 2. Code Templates

**Provided as:** GitHub repo (preferred) or ZIP

**Contents by Stack:**

**Node.js (Express):**
```
/node-express
├── migrations/
│   └── 001_parental_consents.ts
├── services/
│   ├── ConsentService.ts
│   └── DeletionService.ts
├── middleware/
│   ├── ageVerification.ts
│   └── consentCheck.ts
├── routes/
│   └── consent.ts
└── README.md
```

**React Frontend:**
```
/react
├── components/
│   ├── AgeGate.tsx
│   ├── ConsentFlow/
│   │   ├── ConsentExplainer.tsx
│   │   ├── MethodSelection.tsx
│   │   └── SignedForm.tsx
├── hooks/
│   └── useConsent.ts
└── README.md
```

**Database (Postgres):**
```
/database
├── migrations/
│   ├── 001_parental_consents.sql
│   └── 002_consent_audit_log.sql
├── schema.sql
└── README.md
```

### 3. Implementation Guide

**Format:** PDF, 10-15 pages

**Contents:**
1. Overview & Prerequisites
2. Database Setup
   - Migration order
   - Schema explanation
   - Indexes for performance
3. Backend Implementation
   - ConsentService walkthrough
   - API endpoint setup
   - Middleware integration
4. Frontend Implementation
   - Age gate integration
   - Consent flow screens
   - State management
5. Testing
   - Unit test patterns
   - E2E test flows
   - Manual QA checklist
6. Deployment Considerations
   - Environment variables
   - Encryption key management
   - Monitoring recommendations
7. Maintenance
   - Consent expiration handling
   - Audit log review
   - Annual consent renewal

### 4. COPPA Compliance Checklist

**Format:** PDF, 2 pages (printable)

**Contents:**
- [ ] Age verification in place
- [ ] Neutral age gate (no nudging)
- [ ] VPC method implemented
- [ ] Consent obtained before data collection
- [ ] Parent can view child data
- [ ] Parent can delete child data
- [ ] Parent can revoke consent
- [ ] Data minimization reviewed
- [ ] Retention policy implemented
- [ ] Deletion mechanism working
- [ ] Privacy policy updated
- [ ] Third-party SDKs audited

---

## Code Quality Checklist

Before sharing code:

- [ ] All code is tested and working
- [ ] README files are clear
- [ ] Comments explain non-obvious logic
- [ ] No hardcoded secrets or API keys
- [ ] Environment variables documented
- [ ] TypeScript types included (if TS)
- [ ] Error handling is present
- [ ] Security best practices followed
- [ ] Licensed appropriately (MIT)

---

## Filing

After delivery, archive:
- [ ] All materials sent
- [ ] Questionnaire responses
- [ ] Session recording
- [ ] Code repo snapshot
- [ ] Follow-up correspondence

**Location:** [Your file organization system]
