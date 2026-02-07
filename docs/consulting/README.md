# Consulting Operations Playbook

**Version:** 1.0
**Last Updated:** February 2026

---

## Overview

This directory contains Standard Operating Procedures (SOPs), templates, and resources for evoked.dev consulting engagements.

---

## Directory Structure

```
docs/consulting/
├── README.md                    # This file
├── _templates/                  # Shared templates
│   ├── proposal.md              # Proposal template
│   ├── statement-of-work.md     # SOW template
│   └── emails/                  # Email templates
│       ├── kickoff.md
│       ├── progress-update.md
│       ├── completion.md
│       └── follow-up-30-day.md
├── assessments/                 # Assessment services
│   ├── coppa-review/            # COPPA Technical Review ($3,500)
│   │   ├── SOP.md               # Standard Operating Procedure
│   │   ├── intake-questionnaire.md
│   │   └── deliverable-template.md
│   ├── privacy-review/          # Privacy Architecture Review ($3,000)
│   └── security-review/         # Security Code Review ($3,500)
├── workshops/                   # Workshop services
├── implementation/              # Implementation services
└── retainer/                    # Retainer services
```

---

## Services

### Assessments

| Service | Price | SOP Status |
|---------|-------|------------|
| COPPA Technical Review | $3,500 | Complete |
| Privacy Architecture Review | $3,000 | Complete |
| Security Code Review | $3,500 | Complete |

### Workshops

| Service | Price | SOP Status |
|---------|-------|------------|
| Sovereignty-Honoring Design | $4,000 | Pending |
| Child Safety Implementation | $4,500 | Pending |

### Implementation

| Service | Price | SOP Status |
|---------|-------|------------|
| Child Safety Build Support | $12,000 | Pending |
| Ethical AI Architecture | $20,000 | Pending |

### Retainer

| Service | Price | SOP Status |
|---------|-------|------------|
| Advisory | $3,500/mo | Pending |

---

## Process Overview

Every engagement follows this general flow:

```
Discovery Call → Proposal → SOW Signed → Payment → Kickoff → Work → Delivery → Follow-up
     ↓               ↓           ↓          ↓         ↓        ↓        ↓          ↓
   30 min        Within 24h   E-sign    Stripe    Email    Per SOP   Report    30 days
```

### 1. Discovery Call

- Free 30-minute call via Cal.com
- Understand their product and needs
- Assess fit and scope
- Explain process and timeline

### 2. Proposal

- Send within 24 hours of discovery call
- Include scope, timeline, deliverables, price
- Attach Statement of Work
- 7-day expiration

### 3. Kickoff

- Send kickoff email with intake questionnaire
- Request codebase access
- Begin work once access is confirmed

### 4. Work

- Follow service-specific SOP
- Send progress update if engagement > 5 days
- Document findings as you go

### 5. Delivery

- Send report (PDF + Markdown)
- Offer walkthrough call (included)
- Confirm guarantee is satisfied

### 6. Follow-up

- 30-day check-in email
- Offer implementation support if needed
- Request testimonial if appropriate

---

## Templates Usage

### Proposal

1. Copy `_templates/proposal.md`
2. Fill in client name, product, service details
3. Customize "Understanding Your Needs" section
4. Attach Statement of Work
5. Send via email

### Statement of Work

1. Copy `_templates/statement-of-work.md`
2. Fill in all bracketed fields
3. Send with proposal for signature
4. Use e-signature (DocuSign, HelloSign, or embedded)

### Emails

1. Copy appropriate template from `_templates/emails/`
2. Fill in bracketed fields
3. Personalize as needed
4. Send from your consulting email

---

## The Guarantee

> If an assessment doesn't surface at least 3 actionable findings, you pay nothing.

**Application:**
- Applies to assessment services only
- Findings must be Medium severity or higher
- "Actionable" means specific issue + recommendation
- If fewer than 3, offer full refund

**In practice:** This rarely triggers. Products seeking review almost always have gaps.

---

## Pricing Philosophy

- Assessments: Fixed price, defined deliverable
- Workshops: Fixed price, half-day session
- Implementation: Fixed price for defined scope
- Retainer: Monthly, hours-based

**No hourly billing for assessments.** Clients know what they're paying upfront.

---

## Tools

- **Scheduling:** Cal.com (evoked/discovery-call)
- **Proposals:** Markdown → PDF
- **Contracts:** E-signature via [TBD - DocuSign, HelloSign, or similar]
- **Invoicing:** Stripe
- **Code access:** GitHub/GitLab read-only
- **Delivery:** Email (PDF + MD attached)

---

## Expanding This Playbook

To add a new service:

1. Create directory under appropriate category
2. Create `SOP.md` following the COPPA Review format
3. Create service-specific templates as needed
4. Update this README

---

## Questions

For questions about these processes, contact [internal contact or note that this is self-reference].

---

*"We evoke — we never extract."*
