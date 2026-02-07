# Child Safety Implementation Workshop — Standard Operating Procedure

**Service:** Child Safety Implementation Workshop
**Price:** $4,500
**Format:** Half-day training (4 hours)
**Deliverables:** Live session + recording + code templates + implementation guide
**Participants:** Up to 10 (engineering-focused, additional at extra cost)
**Prerequisites:** Technical team, codebase access helpful for customization

---

## Overview

This workshop teaches engineering teams how to implement COPPA-compliant child safety systems. It's hands-on and technical — participants will walk away with working code patterns they can adapt to their stack.

**Focus areas:**
- Age verification and neutral age gates
- Verifiable Parental Consent (VPC) methods
- Data minimization for children
- Route protection and access control
- Privacy policy implementation

---

## Phase 1: Discovery & Customization (1-2 weeks before)

### 1.1 Discovery Call (30 min)

**Purpose:** Understand their stack, current state, and what they need to implement.

**Questions to ask:**
1. "What's your tech stack? (Backend, frontend, database)"
2. "What's your current age verification approach?"
3. "Do you have any parental consent system?"
4. "What data do you collect from children?"
5. "Who will attend? (Engineers, product, compliance?)"
6. "What's your timeline for compliance?"

**Customization notes:**
- Note their exact stack for code examples
- Note what they've already built
- Note gaps in their current system
- Note if they need all 5 VPC methods or subset

### 1.2 Send Pre-Workshop Questionnaire

- [ ] Send questionnaire 1 week before
- [ ] Request completion 3 days before
- [ ] Request codebase access for customization (optional)

### 1.3 Prepare Customized Materials

Based on questionnaire:
- [ ] Prepare code examples in their stack (Node/Python/etc.)
- [ ] Customize database schema to their ORM
- [ ] Prepare relevant API endpoint examples
- [ ] Review their current implementation if access provided

---

## Phase 2: Logistics Setup (1 week before)

### 2.1 Technical Setup

**For remote delivery:**
- [ ] Confirm video platform
- [ ] Set up code sharing (VS Code Live Share, or screen share)
- [ ] Prepare GitHub repo with starter templates
- [ ] Set up recording (local + cloud backup)

**For in-person:**
- [ ] Confirm venue, AV, and power outlets
- [ ] Prepare USB drives with code templates
- [ ] Ensure Wi-Fi can handle all participants

### 2.2 Pre-Session Materials

- [ ] Send calendar invite with agenda
- [ ] Share GitHub repo link (read access)
- [ ] Optional: pre-reading on COPPA basics

---

## Phase 3: Workshop Delivery (Half-day)

### 3.1 Session Structure

**Total time:** 4 hours with breaks

| Segment | Duration | Type |
|---------|----------|------|
| Opening & Context | 20 min | Lecture |
| Part 1: Age Verification | 45 min | Lecture + Code Demo |
| Part 2: Parental Consent (VPC) | 60 min | Lecture + Code Demo |
| Break | 15 min | — |
| Part 3: Data Protection | 45 min | Lecture + Code Demo |
| Part 4: Implementation Lab | 45 min | Hands-on Coding |
| Closing & Q&A | 10 min | Discussion |

### 3.2 Facilitation Notes

**Style:**
- More lecture/demo than the design workshop
- Live coding when possible
- Pause for questions frequently
- Have working code ready (don't debug live)

**Participants should have:**
- Laptops with dev environment (if doing lab)
- Access to starter code repo
- Notepad for architecture notes

### 3.3 During the Session

**Watch for:**
- Questions about their specific stack
- Gaps in COPPA understanding (redirect to basics)
- Over-engineering tendencies (keep it simple)
- "We'll figure it out later" (push for specifics)

---

## Phase 4: Post-Workshop (Within 1 week)

### 4.1 Deliver Materials

Within 48 hours:
- [ ] Send recording
- [ ] Send slide deck (PDF)
- [ ] Send code templates (GitHub repo or ZIP)
- [ ] Send implementation guide (PDF)
- [ ] Send COPPA checklist

### 4.2 Follow-Up

- [ ] 30-day availability for questions
- [ ] Offer implementation support if needed
- [ ] Check in at 30 days on progress

---

## Workshop Content

### Opening: COPPA Context (20 min)

**Why COPPA Matters**
- Legal requirements (fines up to $50K+ per violation)
- 2025 amendments (biometrics, separate consent, retention)
- April 2026 compliance deadline

**Key Requirements**
1. Age verification before data collection
2. Verifiable Parental Consent for under-13
3. Data minimization
4. Retention limits
5. Parent access rights

**Common Failures**
- Age gate that can be bypassed
- Collecting data before consent
- No deletion mechanism
- Third-party SDKs collecting data

### Part 1: Age Verification (45 min)

**Principles**
- Neutral age gates (no nudging toward adult)
- Verify before collecting ANY data
- Cannot be easily bypassed

**Implementation: Neutral Age Gate**

```typescript
// BAD: Defaults to adult year
<DatePicker defaultYear={1990} />

// GOOD: Neutral, recent years first
<DatePicker defaultYear={currentYear} />
```

**Demo:** Build a compliant age gate
- Date picker with neutral defaults
- Age calculation
- Routing based on age
- Preventing bypass (direct URL, back button)

**Code patterns:**
- Frontend age gate component
- Backend age verification middleware
- Session storage of age category

**Discussion:** Review their current age gate implementation

### Part 2: Verifiable Parental Consent (60 min)

**The VPC Requirement**
- Must obtain consent BEFORE collecting child data
- Must use FTC-approved verification method
- Multiple methods recommended

**Five FTC-Approved Methods**

| Method | Assurance | Implementation |
|--------|-----------|----------------|
| Signed consent form | Medium | E-signature, E-SIGN Act |
| Credit card | Medium | $0.50 auth via Stripe |
| Government ID | High | ID verification service |
| Phone verification | Medium | Automated call |
| Email plus | Low | Signed link (low-risk data only) |

**Demo:** Signed Consent Form (Most Common)

Database schema:
```sql
CREATE TABLE parental_consents (
  id UUID PRIMARY KEY,
  child_profile_id UUID REFERENCES profiles(id),
  parent_profile_id UUID REFERENCES profiles(id),
  consent_method VARCHAR(50),
  consent_given_at TIMESTAMPTZ,
  signature_text VARCHAR(255),
  ip_address INET,
  verification_data JSONB
);
```

API endpoints:
```
POST /api/consent/initiate
POST /api/consent/verify
GET  /api/consent/status/:profileId
POST /api/consent/revoke
```

Frontend flow:
1. Data disclosure screen
2. E-signature capture
3. Confirmation

**Demo:** Credit Card Verification

Stripe integration:
```typescript
const paymentIntent = await stripe.paymentIntents.create({
  amount: 50, // $0.50
  currency: 'usd',
  metadata: {
    purpose: 'coppa_vpc',
    childProfileId: profileId
  }
});
// Void immediately after successful auth
```

**Code patterns provided:**
- Database migration for consents table
- Consent service (initiate, verify, revoke)
- Frontend consent flow screens
- Route middleware to check consent

### BREAK (15 min)

### Part 3: Data Protection (45 min)

**Data Minimization**
- Collect only what's necessary
- Document justification for each field
- Review regularly

**Child Profile Audit**

| Field | Necessary? | Justification |
|-------|------------|---------------|
| Name | Yes | Display in app |
| DOB | Yes | Age-based features |
| Email | Maybe | Parent's email only |
| Location | No | Remove |
| Photo | Maybe | Requires consent |

**Demo:** Field-Level Encryption

```typescript
// Encrypt sensitive fields before storage
const encryptedAllergies = await encrypt(
  allergies,
  process.env.PII_ENCRYPTION_KEY
);

// Decrypt on read
const allergies = await decrypt(
  encryptedAllergies,
  process.env.PII_ENCRYPTION_KEY
);
```

**Data Retention**
- User-initiated deletion (true deletion, not anonymization)
- Automatic cleanup for inactive accounts
- Backup handling

**Demo:** Deletion Flow

```typescript
// Soft delete with grace period
await profile.update({
  deletion_requested_at: new Date(),
  deletion_scheduled_for: addDays(new Date(), 60)
});

// Cron job for actual deletion
const toDelete = await Profile.findAll({
  where: {
    deletion_scheduled_for: { [Op.lte]: new Date() }
  }
});
for (const profile of toDelete) {
  await profile.destroy(); // True delete
}
```

**Route Protection**
- Middleware to verify consent before child data access
- IDOR prevention

**Demo:** Consent Middleware

```typescript
const requireConsent = async (req, res, next) => {
  const profile = await Profile.findByPk(req.params.profileId);

  if (profile.isChild && !profile.hasVerifiedConsent) {
    return res.status(403).json({
      error: 'Parental consent required'
    });
  }

  next();
};
```

### Part 4: Implementation Lab (45 min)

**Hands-on exercise:**

Teams implement one component in their stack:
1. Age gate component
2. Consent database schema
3. Consent verification endpoint
4. Route protection middleware

**Structure:**
- 30 min coding
- 15 min show-and-tell

**Support:**
- Circulate to help teams
- Answer stack-specific questions
- Provide starter code as needed

### Closing (10 min)

**Checklist Review**
- Walk through COPPA implementation checklist
- Identify their gaps

**Next Steps**
- Action items from lab
- 30-day support window
- Implementation support offering

**Q&A**

---

## Materials Checklist

### Before Workshop
- [ ] Pre-workshop questionnaire
- [ ] Calendar invite with agenda
- [ ] GitHub repo access (starter templates)
- [ ] Pre-reading (COPPA basics)

### During Workshop
- [ ] Slide deck
- [ ] Code demos (working, tested)
- [ ] GitHub repo with templates
- [ ] COPPA checklist handout

### After Workshop
- [ ] Recording
- [ ] Slide deck (PDF)
- [ ] Code templates (repo or ZIP):
  - [ ] Age gate component
  - [ ] Database migrations
  - [ ] Consent service
  - [ ] Route middleware
  - [ ] Deletion flow
- [ ] Implementation guide
- [ ] COPPA checklist (printable)

---

## Code Templates to Provide

### 1. Age Gate Component
- React/Vue/vanilla versions
- Neutral date picker
- Age calculation
- Redirect logic

### 2. Database Schema
- Parental consents table
- Profile consent fields
- Activity tracking for retention

### 3. Backend Services
- ConsentService (initiate, verify, revoke)
- Consent middleware
- Deletion service

### 4. API Endpoints
- Consent flow endpoints
- Profile export endpoint
- Deletion request endpoint

### 5. Frontend Screens
- Consent explainer
- Method selection
- E-signature form
- Status display

---

## Pricing Notes

**Base price:** $4,500
- Up to 10 participants
- 4-hour session
- All code templates and recording
- 30-day follow-up support

**Additional options:**
- Additional participants: +$250/person
- Stack-specific customization: +$1,000
- In-person delivery: +travel expenses
- Full-day (with implementation time): +$2,500

---

## Templates & Resources

- [Pre-Workshop Questionnaire](./pre-workshop-questionnaire.md)
- [Agenda](./agenda.md)
- [Implementation Guide Template](./implementation-guide.md)
- [Code Templates](./code-templates/) *(to be created)*

---

## Notes

- This workshop is technical — participants should be engineers
- Having their codebase access allows much better customization
- The lab portion works best with 6-10 people
- If their stack is unusual, budget extra prep time
- Follow up on implementation — offer build support if they get stuck
