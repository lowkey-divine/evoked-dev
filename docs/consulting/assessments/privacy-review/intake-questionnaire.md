# Privacy Architecture Review — Intake Questionnaire

**Purpose:** Gather information before the engagement begins. Send this after signed SOW + payment.

---

## Instructions

Please complete this questionnaire before our kickoff. The more detail you provide, the more targeted our review can be.

If you don't know an answer, write "Unknown" — that's useful information too.

---

## Section 1: Product Overview

**1.1 Product Name:**

**1.2 Product Type:**
- [ ] Mobile app (iOS)
- [ ] Mobile app (Android)
- [ ] Web application
- [ ] Desktop application
- [ ] API/Backend service
- [ ] Other: ___________

**1.3 Brief Description:**
*What does your product do? (2-3 sentences)*

**1.4 Target Users:**
*Who uses your product? (Consumers, businesses, specific demographics)*

**1.5 Approximate Monthly Active Users:**
- [ ] Pre-launch
- [ ] Under 1,000
- [ ] 1,000 - 10,000
- [ ] 10,000 - 100,000
- [ ] Over 100,000

---

## Section 2: Regulatory Context

**2.1 What regulations might apply to your product?**
- [ ] GDPR (EU users)
- [ ] CCPA/CPRA (California users)
- [ ] COPPA (Children under 13)
- [ ] HIPAA (Health data)
- [ ] FERPA (Education data)
- [ ] GLBA (Financial data)
- [ ] SOC 2 (required by customers)
- [ ] None / Unknown
- [ ] Other: ___________

**2.2 Where are your users located?**
- [ ] United States only
- [ ] North America
- [ ] Europe
- [ ] Global
- [ ] Other: ___________

**2.3 Do you have existing compliance certifications?**
- [ ] SOC 2 Type I/II
- [ ] ISO 27001
- [ ] HIPAA BAA
- [ ] PCI DSS
- [ ] None
- [ ] Other: ___________

---

## Section 3: Data Collection

**3.1 What personal information do you collect?**

| Data Type | Collected | Required | Purpose |
|-----------|-----------|----------|---------|
| Full name | [ ] | [ ] | |
| Email address | [ ] | [ ] | |
| Phone number | [ ] | [ ] | |
| Physical address | [ ] | [ ] | |
| Date of birth | [ ] | [ ] | |
| Payment information | [ ] | [ ] | |
| Government ID | [ ] | [ ] | |
| Social media profiles | [ ] | [ ] | |
| Profile photo | [ ] | [ ] | |
| Other: | [ ] | [ ] | |

**3.2 What behavioral/usage data do you collect?**

| Data Type | Collected | Purpose |
|-----------|-----------|---------|
| Page views / screen views | [ ] | |
| Click/tap events | [ ] | |
| Session duration | [ ] | |
| Feature usage | [ ] | |
| Search queries | [ ] | |
| Content created by users | [ ] | |
| User preferences/settings | [ ] | |
| Error logs with user context | [ ] | |
| Other: | [ ] | |

**3.3 What technical/device data do you collect?**

| Data Type | Collected | Purpose |
|-----------|-----------|---------|
| IP address | [ ] | |
| Device type/model | [ ] | |
| Operating system | [ ] | |
| Browser type | [ ] | |
| Device ID / IDFA / GAID | [ ] | |
| Location (GPS) | [ ] | |
| Location (IP-based) | [ ] | |
| Cookies | [ ] | |
| Local storage | [ ] | |
| Other: | [ ] | |

**3.4 Do you collect any sensitive data categories?**
- [ ] Health/medical information
- [ ] Financial information (beyond payment)
- [ ] Biometric data
- [ ] Genetic data
- [ ] Racial/ethnic origin
- [ ] Religious/philosophical beliefs
- [ ] Political opinions
- [ ] Sexual orientation
- [ ] Trade union membership
- [ ] Criminal history
- [ ] None of the above

---

## Section 4: Data Storage

**4.1 Where is user data stored?**

| Location | Provider | Data Types Stored |
|----------|----------|-------------------|
| Primary database | | |
| Cache/Redis | | |
| File storage | | |
| Search index | | |
| Log aggregation | | |
| Analytics | | |
| Other: | | |

**4.2 Cloud provider(s):**
- [ ] AWS
- [ ] Google Cloud
- [ ] Azure
- [ ] Vercel
- [ ] Heroku
- [ ] DigitalOcean
- [ ] Self-hosted
- [ ] Other: ___________

**4.3 Data residency:**
- [ ] US only
- [ ] EU only
- [ ] Multiple regions
- [ ] Unknown

**4.4 Is data encrypted at rest?**
- [ ] Yes, all data
- [ ] Yes, sensitive fields only
- [ ] No
- [ ] Unknown

**4.5 If encrypted, what method?**
- [ ] Database-level encryption
- [ ] Field-level encryption
- [ ] Full disk encryption
- [ ] Other: ___________
- [ ] Unknown

---

## Section 5: Third-Party Services

**5.1 List all third-party services that receive user data:**

| Service | Category | Data Shared | DPA in Place? |
|---------|----------|-------------|---------------|
| | Analytics | | [ ] Yes [ ] No [ ] Unknown |
| | Error tracking | | [ ] Yes [ ] No [ ] Unknown |
| | Email/marketing | | [ ] Yes [ ] No [ ] Unknown |
| | Payment | | [ ] Yes [ ] No [ ] Unknown |
| | Authentication | | [ ] Yes [ ] No [ ] Unknown |
| | Push notifications | | [ ] Yes [ ] No [ ] Unknown |
| | Customer support | | [ ] Yes [ ] No [ ] Unknown |
| | CDN | | [ ] Yes [ ] No [ ] Unknown |
| | Other: | | [ ] Yes [ ] No [ ] Unknown |

*(DPA = Data Processing Agreement)*

**5.2 Do any third parties use your data for their own purposes?**
- [ ] Yes — describe: ___________
- [ ] No
- [ ] Unknown

**5.3 Do you share or sell user data to third parties for advertising?**
- [ ] Yes
- [ ] No
- [ ] Unsure

---

## Section 6: Data Retention

**6.1 Do you have a defined data retention policy?**
- [ ] Yes, documented
- [ ] Yes, informal
- [ ] No

**6.2 How long do you retain user data after account deletion?**
- [ ] Immediately deleted
- [ ] 30 days
- [ ] 90 days
- [ ] 1 year
- [ ] Indefinitely
- [ ] Other: ___________
- [ ] Unknown

**6.3 How long do you retain data for inactive accounts?**
- [ ] No automatic deletion
- [ ] 1 year
- [ ] 2 years
- [ ] Other: ___________
- [ ] Unknown

**6.4 Are backups covered by deletion requests?**
- [ ] Yes, backups are purged
- [ ] No, backups retained separately
- [ ] Unknown

---

## Section 7: User Rights

**7.1 Can users access/view their data?**
- [ ] Yes, in-app
- [ ] Yes, upon request
- [ ] No
- [ ] Planned

**7.2 Can users export their data?**
- [ ] Yes, self-service
- [ ] Yes, upon request
- [ ] No
- [ ] Planned

**7.3 Can users delete their account and data?**
- [ ] Yes, self-service
- [ ] Yes, upon request
- [ ] No
- [ ] Planned

**7.4 Can users correct/update their data?**
- [ ] Yes
- [ ] Partially
- [ ] No

**7.5 Can users opt out of marketing?**
- [ ] Yes
- [ ] No marketing sent
- [ ] No opt-out available

---

## Section 8: Privacy Policy

**8.1 Do you have a published privacy policy?**
- [ ] Yes — URL: ___________
- [ ] Draft in progress
- [ ] No

**8.2 When was it last updated?**

**8.3 Does your privacy policy cover:**

| Topic | Yes | No | Unsure |
|-------|-----|-----|--------|
| What data is collected | [ ] | [ ] | [ ] |
| How data is used | [ ] | [ ] | [ ] |
| Third-party sharing | [ ] | [ ] | [ ] |
| Data retention periods | [ ] | [ ] | [ ] |
| User rights (access, deletion) | [ ] | [ ] | [ ] |
| Cookie usage | [ ] | [ ] | [ ] |
| Contact for privacy inquiries | [ ] | [ ] | [ ] |
| GDPR-specific disclosures | [ ] | [ ] | [ ] |
| CCPA-specific disclosures | [ ] | [ ] | [ ] |

---

## Section 9: Security Context

**9.1 Is data encrypted in transit?**
- [ ] Yes, TLS everywhere
- [ ] Partially
- [ ] No
- [ ] Unknown

**9.2 How is authentication handled?**
- [ ] Username/password
- [ ] OAuth/social login
- [ ] Passwordless (magic link, passkey)
- [ ] SSO
- [ ] Other: ___________

**9.3 Do you have audit logging?**
- [ ] Yes, comprehensive
- [ ] Partial
- [ ] No

**9.4 Have you had any data breaches or privacy incidents?**
- [ ] Yes — describe (if comfortable): ___________
- [ ] No
- [ ] Prefer not to say

---

## Section 10: Technical Access

**10.1 How will you provide codebase access?**
- [ ] GitHub/GitLab repository (read-only)
- [ ] Bitbucket
- [ ] ZIP file
- [ ] Other: ___________

**10.2 Can you provide a staging/test environment?**
- [ ] Yes
- [ ] No

**10.3 Do you have existing documentation?**
- [ ] Architecture diagrams
- [ ] Data flow diagrams
- [ ] API documentation
- [ ] Database schema/ERD
- [ ] None of the above

---

## Section 11: Context & Goals

**11.1 What's driving this review?**
- [ ] Pre-launch check
- [ ] Investor/customer due diligence
- [ ] Regulatory requirement
- [ ] Privacy incident response
- [ ] Entering new market (EU, etc.)
- [ ] Internal initiative
- [ ] Other: ___________

**11.2 What are your top privacy concerns?**

**11.3 Any specific areas you want us to focus on?**

---

## Section 12: Additional Information

*Anything else we should know?*

---

**Completed by:**

**Date:**

---

*Please return this questionnaire to [consulting email] along with codebase access credentials (use a secure method for credentials — never send passwords in email body).*
