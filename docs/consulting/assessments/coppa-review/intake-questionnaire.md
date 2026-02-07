# COPPA Technical Review — Intake Questionnaire

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
- [ ] Other: ___________

**1.3 Brief Description:**
*What does your product do? (2-3 sentences)*

**1.4 Target Audience:**
- [ ] Children only (under 13)
- [ ] Families (parents + children)
- [ ] General audience (may include children)
- [ ] Adults only (but children may access)

**1.5 Approximate Monthly Active Users:**
- [ ] Pre-launch
- [ ] Under 1,000
- [ ] 1,000 - 10,000
- [ ] 10,000 - 100,000
- [ ] Over 100,000

---

## Section 2: User Registration & Age Verification

**2.1 Do users create accounts?**
- [ ] Yes
- [ ] No (anonymous usage)
- [ ] Optional

**2.2 How do you currently verify user age?**
- [ ] Date of birth entry
- [ ] Age dropdown
- [ ] Birth year only
- [ ] Age confirmation checkbox ("I am 13 or older")
- [ ] No age verification
- [ ] Other: ___________

**2.3 Where in the user flow does age verification occur?**
- [ ] Before any data collection
- [ ] During registration
- [ ] After registration
- [ ] Not applicable

**2.4 What happens when a user indicates they are under 13?**

---

## Section 3: Data Collection

**3.1 What personal information do you collect from users?**

*Check all that apply:*

| Data Type | Collected | From Children? |
|-----------|-----------|----------------|
| Name | [ ] | [ ] |
| Email address | [ ] | [ ] |
| Phone number | [ ] | [ ] |
| Physical address | [ ] | [ ] |
| Date of birth | [ ] | [ ] |
| Username/screen name | [ ] | [ ] |
| Profile photo | [ ] | [ ] |
| Location (GPS) | [ ] | [ ] |
| Photos/videos from device | [ ] | [ ] |
| Audio/voice recordings | [ ] | [ ] |

**3.2 What device identifiers do you collect?**

| Identifier | Collected |
|------------|-----------|
| Device ID | [ ] |
| Advertising ID (IDFA/GAID) | [ ] |
| IP address | [ ] |
| Push notification token | [ ] |
| Other: ___________ | [ ] |

**3.3 Do you use any biometric features?**
- [ ] Face ID / Touch ID for login
- [ ] Facial recognition (filters, effects)
- [ ] Voice recognition
- [ ] None

**3.4 What behavioral data do you collect?**
- [ ] Usage analytics (screens viewed, time in app)
- [ ] In-app purchases
- [ ] Content created by users
- [ ] User preferences/settings
- [ ] Other: ___________

---

## Section 4: Parental Consent

**4.1 Do you have a parental consent mechanism?**
- [ ] Yes — describe below
- [ ] No
- [ ] Planned but not implemented

**4.2 If yes, what method(s) do you use?**
- [ ] Email verification
- [ ] Signed consent form
- [ ] Credit card verification
- [ ] Government ID check
- [ ] Phone verification
- [ ] Other: ___________

**4.3 Is parental consent obtained BEFORE any data collection from children?**
- [ ] Yes
- [ ] No
- [ ] Unsure

**4.4 Can parents:**

| Capability | Yes | No | Unsure |
|------------|-----|-----|--------|
| Review their child's data | [ ] | [ ] | [ ] |
| Request deletion | [ ] | [ ] | [ ] |
| Revoke consent | [ ] | [ ] | [ ] |
| Export data | [ ] | [ ] | [ ] |

---

## Section 5: Third-Party Services

**5.1 What third-party services/SDKs do you use?**

*List all that apply:*

| Service | Purpose |
|---------|---------|
| Analytics (e.g., Google Analytics, Mixpanel) | |
| Crash reporting (e.g., Sentry, Crashlytics) | |
| Advertising (e.g., AdMob, Facebook Ads) | |
| Push notifications (e.g., Firebase, OneSignal) | |
| Authentication (e.g., Auth0, Firebase Auth) | |
| Payment processing (e.g., Stripe) | |
| Social login (e.g., Sign in with Apple/Google) | |
| Other: | |

**5.2 Have you reviewed what data each SDK collects by default?**
- [ ] Yes, for all SDKs
- [ ] Partially
- [ ] No

**5.3 Do any of these SDKs perform behavioral advertising?**
- [ ] Yes
- [ ] No
- [ ] Unknown

---

## Section 6: Data Storage & Security

**6.1 Where is user data stored?**
- [ ] Cloud provider: ___________
- [ ] On-device only
- [ ] Both cloud and device

**6.2 Is personal data encrypted at rest?**
- [ ] Yes
- [ ] Partially
- [ ] No
- [ ] Unknown

**6.3 Is child data segregated from adult data?**
- [ ] Yes
- [ ] No
- [ ] Not applicable

**6.4 What is your data retention policy for children's data?**

---

## Section 7: Privacy Policy

**7.1 Do you have a published privacy policy?**
- [ ] Yes — URL: ___________
- [ ] Draft in progress
- [ ] No

**7.2 Does your privacy policy specifically address:**

| Topic | Yes | No |
|-------|-----|-----|
| Data collected from children | [ ] | [ ] |
| Parental consent process | [ ] | [ ] |
| Parental rights (review, delete) | [ ] | [ ] |
| Third-party data sharing | [ ] | [ ] |
| Contact for privacy inquiries | [ ] | [ ] |

**7.3 Is the privacy policy linked before any data collection?**
- [ ] Yes
- [ ] No
- [ ] Unsure

---

## Section 8: Technical Access

**8.1 How will you provide codebase access?**
- [ ] GitHub/GitLab repository (read-only)
- [ ] Bitbucket
- [ ] ZIP file
- [ ] Other: ___________

**8.2 Can you provide access to a staging/test environment?**
- [ ] Yes
- [ ] No

**8.3 Do you have architecture or data flow documentation?**
- [ ] Yes
- [ ] Partial
- [ ] No

---

## Section 9: Context & Urgency

**9.1 What's driving this review?**
- [ ] Pre-launch compliance check
- [ ] Investor due diligence
- [ ] App store requirement
- [ ] User/parent complaint
- [ ] Regulatory inquiry
- [ ] Internal initiative
- [ ] Other: ___________

**9.2 Target completion date (if any):**

**9.3 Any specific concerns you want us to focus on?**

---

## Section 10: Additional Information

*Anything else we should know?*

---

**Completed by:**

**Date:**

---

*Please return this questionnaire to [consulting email] along with codebase access credentials (use a secure method for credentials — never send passwords in email body).*
