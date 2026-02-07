# Child Safety Implementation Workshop — Agenda

**Duration:** 4 hours
**Format:** [Remote / In-person]
**Date:** [DATE]
**Facilitator:** Erin Stanley, evoked.dev

---

## Objective

By the end of this workshop, your team will:
- Understand COPPA technical requirements
- Have working code patterns for age verification and parental consent
- Know how to protect child data throughout your system
- Leave with templates ready to adapt to your codebase

---

## Prerequisites

**Participants should:**
- Have basic familiarity with your codebase
- Bring laptops with dev environment (for lab portion)
- Have access to the starter code repo (link sent before session)

---

## Agenda

### Opening: COPPA Context (20 min)
*9:00 - 9:20*

- Why COPPA matters (fines, enforcement)
- 2025 amendments: what changed
- Key requirements overview
- Common implementation failures

---

### Part 1: Age Verification (45 min)
*9:20 - 10:05*

**Concepts:**
- Neutral age gates (no nudging)
- Verification before any data collection
- Bypass prevention

**Live Demo:**
- Building a compliant age gate
- Backend middleware
- Session handling

**Code provided:**
- Age gate component (React/Vue)
- Age verification middleware
- Route protection patterns

---

### Part 2: Verifiable Parental Consent (60 min)
*10:05 - 11:05*

**Concepts:**
- VPC requirement explained
- Five FTC-approved methods
- Consent lifecycle (grant, verify, revoke)

**Live Demo 1: Signed Consent Form**
- Database schema
- E-signature capture
- E-SIGN Act compliance

**Live Demo 2: Credit Card Verification**
- Stripe integration
- $0.50 auth pattern
- Voiding after verification

**Code provided:**
- Consent database migrations
- ConsentService (full CRUD)
- Frontend consent flow
- Consent verification middleware

---

### Break (15 min)
*11:05 - 11:20*

---

### Part 3: Data Protection (45 min)
*11:20 - 12:05*

**Concepts:**
- Data minimization for children
- Field-level encryption
- Retention and deletion
- Route protection / IDOR prevention

**Live Demo: Deletion Flow**
- User-initiated deletion
- Grace period pattern
- True deletion (not anonymization)
- Cron job for scheduled deletion

**Live Demo: Consent Middleware**
- Checking consent on protected routes
- Handling consent expiration
- Parent access to child data

**Code provided:**
- Encryption utilities
- Deletion service
- Consent middleware
- Data export endpoint

---

### Part 4: Implementation Lab (45 min)
*12:05 - 12:50*

**Hands-on exercise:**

Choose one component to implement:
1. Age gate for your frontend
2. Consent database schema
3. Consent API endpoint
4. Route protection middleware

**Format:**
- 30 min coding
- 15 min share and discuss

**We'll circulate to help with:**
- Stack-specific questions
- Architecture decisions
- Edge cases

---

### Closing (10 min)
*12:50 - 1:00*

- COPPA checklist walkthrough
- Identify your gaps
- Action items
- 30-day support window
- Q&A

---

## Materials Provided

**During workshop:**
- Slide deck (screen share)
- Live code demos
- GitHub repo with starter templates
- COPPA checklist

**After workshop (within 48 hours):**
- Recording of session
- Slide deck (PDF)
- All code templates (repo access or ZIP):
  - Age gate component
  - Database migrations
  - Consent service
  - API endpoints
  - Middleware
  - Deletion flow
- Implementation guide
- COPPA compliance checklist

---

## Starter Code Repository

**Repo:** [GitHub link - sent before session]

**Structure:**
```
/templates
├── /age-gate
│   ├── react/
│   ├── vue/
│   └── vanilla/
├── /database
│   ├── postgres/
│   └── mongodb/
├── /backend
│   ├── node-express/
│   ├── node-fastify/
│   └── python-fastapi/
├── /consent-flow
│   ├── signed-form/
│   └── credit-card/
└── /middleware
    ├── consent-check/
    └── age-verification/
```

---

## Ground Rules

1. **Questions welcome** — interrupt anytime
2. **No judgment** — we're here to learn
3. **Stack-specific help** — ask about your setup
4. **Working code > perfect code** — get something running

---

## Contact

**Facilitator:** Erin Stanley
**Email:** [email]
**Day-of phone:** [phone]

---

*"We evoke — we never extract."*
