# Security Code Review — Intake Questionnaire

**Purpose:** Gather information before the engagement begins. Send this after signed SOW + payment.

---

## Instructions

Please complete this questionnaire before our kickoff. The more detail you provide, the more targeted our review can be.

If you don't know an answer, write "Unknown" — that's useful information too.

---

## Section 1: Product Overview

**1.1 Product Name:**

**1.2 Product Type:**
- [ ] Web application
- [ ] Mobile app (iOS)
- [ ] Mobile app (Android)
- [ ] API / Backend service
- [ ] Desktop application
- [ ] Other: ___________

**1.3 Brief Description:**
*What does your product do? (2-3 sentences)*

**1.4 Data Sensitivity:**
*What's the most sensitive data you handle?*
- [ ] Payment/financial data
- [ ] Health/medical data
- [ ] Personal identity documents
- [ ] Authentication credentials
- [ ] Business confidential data
- [ ] General user data (email, name)
- [ ] Publicly available data only

---

## Section 2: Technology Stack

**2.1 Backend:**
- [ ] Node.js
- [ ] Python (Django/Flask/FastAPI)
- [ ] Ruby on Rails
- [ ] Go
- [ ] Java/Kotlin
- [ ] .NET / C#
- [ ] PHP
- [ ] Rust
- [ ] Other: ___________

**2.2 Frontend:**
- [ ] React
- [ ] Vue
- [ ] Angular
- [ ] Svelte
- [ ] Next.js / Nuxt / SvelteKit
- [ ] Mobile native (Swift/Kotlin)
- [ ] React Native / Flutter
- [ ] Other: ___________

**2.3 Database:**
- [ ] PostgreSQL
- [ ] MySQL
- [ ] MongoDB
- [ ] Redis
- [ ] DynamoDB
- [ ] Supabase
- [ ] Firebase
- [ ] Other: ___________

**2.4 Hosting/Infrastructure:**
- [ ] AWS
- [ ] Google Cloud
- [ ] Azure
- [ ] Vercel
- [ ] Heroku
- [ ] DigitalOcean
- [ ] Self-hosted
- [ ] Other: ___________

**2.5 Approximate codebase size:**
- [ ] Small (< 10,000 lines)
- [ ] Medium (10,000 - 50,000 lines)
- [ ] Large (50,000 - 200,000 lines)
- [ ] Very large (> 200,000 lines)

---

## Section 3: Authentication

**3.1 How do users authenticate?**
- [ ] Email + password
- [ ] Username + password
- [ ] OAuth / Social login (Google, Apple, etc.)
- [ ] SSO (SAML, OIDC)
- [ ] Magic link (passwordless)
- [ ] Passkeys / WebAuthn
- [ ] API keys
- [ ] Other: ___________

**3.2 Authentication library/service:**
- [ ] Custom built
- [ ] Auth0
- [ ] Firebase Auth
- [ ] Supabase Auth
- [ ] Clerk
- [ ] NextAuth.js
- [ ] Passport.js
- [ ] Other: ___________

**3.3 Password hashing (if applicable):**
- [ ] bcrypt
- [ ] argon2
- [ ] scrypt
- [ ] PBKDF2
- [ ] SHA256 / SHA512
- [ ] MD5 (please say no)
- [ ] Unknown
- [ ] N/A (no passwords)

**3.4 Is multi-factor authentication available?**
- [ ] Yes — methods: ___________
- [ ] No
- [ ] Planned

**3.5 Is there account lockout after failed attempts?**
- [ ] Yes — after ___ attempts
- [ ] No
- [ ] Unknown

---

## Section 4: Session Management

**4.1 How are sessions managed?**
- [ ] Server-side sessions (database/Redis)
- [ ] JWT tokens
- [ ] Cookies only
- [ ] Other: ___________
- [ ] Unknown

**4.2 If using JWTs:**

| Setting | Value |
|---------|-------|
| Algorithm | |
| Access token lifetime | |
| Refresh token lifetime | |
| Where stored (client) | |

**4.3 Session timeout:**
- [ ] Idle timeout: ___ minutes
- [ ] Absolute timeout: ___ hours
- [ ] No timeout
- [ ] Unknown

**4.4 Does logout invalidate sessions server-side?**
- [ ] Yes
- [ ] No (client-side only)
- [ ] Unknown

---

## Section 5: Authorization

**5.1 What authorization model do you use?**
- [ ] Role-based (RBAC)
- [ ] Attribute-based (ABAC)
- [ ] Permission-based
- [ ] Simple (admin/user)
- [ ] None / Public access
- [ ] Unknown

**5.2 What roles/permissions exist?**
*List the main roles:*

**5.3 Are there admin functions?**
- [ ] Yes — describe: ___________
- [ ] No

**5.4 How is authorization enforced?**
- [ ] Middleware on every request
- [ ] Per-route/endpoint checks
- [ ] Database-level (RLS)
- [ ] Mixed approach
- [ ] Unknown

---

## Section 6: API Security

**6.1 What type of API?**
- [ ] REST
- [ ] GraphQL
- [ ] gRPC
- [ ] WebSocket
- [ ] Other: ___________

**6.2 Is there API documentation?**
- [ ] Yes — URL: ___________
- [ ] OpenAPI/Swagger spec
- [ ] GraphQL schema
- [ ] No documentation

**6.3 Is rate limiting in place?**
- [ ] Yes — describe: ___________
- [ ] No
- [ ] Unknown

**6.4 Are there public (unauthenticated) endpoints?**
- [ ] Yes — list main ones: ___________
- [ ] No, all require auth

**6.5 Is CORS configured?**
- [ ] Yes — allowed origins: ___________
- [ ] Allows all origins (*)
- [ ] No CORS headers
- [ ] Unknown

---

## Section 7: Data Handling

**7.1 Is sensitive data encrypted at rest?**
- [ ] Yes — all data
- [ ] Yes — specific fields (list): ___________
- [ ] No
- [ ] Unknown

**7.2 Encryption method (if applicable):**
- [ ] AES-256-GCM
- [ ] AES-256-CBC
- [ ] Database-level encryption
- [ ] Other: ___________
- [ ] Unknown

**7.3 How are encryption keys managed?**
- [ ] Environment variables
- [ ] AWS KMS / GCP KMS / Azure Key Vault
- [ ] HashiCorp Vault
- [ ] Hardcoded (please say no)
- [ ] Other: ___________
- [ ] Unknown

**7.4 Is TLS enforced?**
- [ ] Yes, HTTPS everywhere
- [ ] Partial
- [ ] No
- [ ] Unknown

**7.5 Is HSTS enabled?**
- [ ] Yes
- [ ] No
- [ ] Unknown

---

## Section 8: Input Handling

**8.1 How is user input validated?**
- [ ] Server-side validation
- [ ] Client-side only
- [ ] Both client and server
- [ ] Minimal validation
- [ ] Unknown

**8.2 How are database queries constructed?**
- [ ] ORM with parameterized queries
- [ ] Parameterized/prepared statements
- [ ] Query builder
- [ ] String concatenation (please say no)
- [ ] Unknown

**8.3 Do you accept file uploads?**
- [ ] Yes — types: ___________
- [ ] No

**8.4 If yes, how are uploads validated?**
- [ ] File type check (extension)
- [ ] MIME type validation
- [ ] Content inspection
- [ ] Size limits
- [ ] Stored separately from app
- [ ] Unknown

---

## Section 9: Error Handling & Logging

**9.1 Are detailed errors shown to users?**
- [ ] Yes, full stack traces
- [ ] Only in development
- [ ] Generic errors only
- [ ] Unknown

**9.2 What logging is in place?**
- [ ] Application logs
- [ ] Access logs
- [ ] Security event logs
- [ ] Error tracking (Sentry, etc.)
- [ ] Minimal logging

**9.3 Do logs contain sensitive data?**
- [ ] No, sanitized
- [ ] Possibly
- [ ] Yes
- [ ] Unknown

---

## Section 10: Dependencies & Build

**10.1 Package manager:**
- [ ] npm / yarn / pnpm
- [ ] pip / poetry
- [ ] bundler
- [ ] go mod
- [ ] cargo
- [ ] Other: ___________

**10.2 When were dependencies last updated?**
- [ ] Within last month
- [ ] Within last 3 months
- [ ] Within last year
- [ ] More than a year
- [ ] Unknown

**10.3 Do you run security scans on dependencies?**
- [ ] Yes — tool: ___________
- [ ] Occasionally
- [ ] No

**10.4 Is there a CI/CD pipeline?**
- [ ] Yes — platform: ___________
- [ ] No

---

## Section 11: Previous Security Work

**11.1 Have you had a security audit before?**
- [ ] Yes — when: ___________
- [ ] No

**11.2 Have you had a penetration test?**
- [ ] Yes — when: ___________
- [ ] No

**11.3 Have you experienced any security incidents?**
- [ ] Yes — describe (if comfortable): ___________
- [ ] No
- [ ] Prefer not to say

**11.4 Do you have a bug bounty program?**
- [ ] Yes
- [ ] No

---

## Section 12: Compliance Context

**12.1 Are you subject to compliance requirements?**
- [ ] SOC 2
- [ ] PCI DSS
- [ ] HIPAA
- [ ] ISO 27001
- [ ] FedRAMP
- [ ] None
- [ ] Other: ___________

**12.2 Do customers require security questionnaires?**
- [ ] Yes, frequently
- [ ] Occasionally
- [ ] No

---

## Section 13: Technical Access

**13.1 How will you provide codebase access?**
- [ ] GitHub (add collaborator: ___________)
- [ ] GitLab
- [ ] Bitbucket
- [ ] ZIP file upload
- [ ] Other: ___________

**13.2 Can you provide staging environment access?**
- [ ] Yes
- [ ] No

**13.3 Can you provide a list of environment variables?**
(Names only, not values)
- [ ] Yes
- [ ] No

---

## Section 14: Focus Areas

**14.1 Any specific concerns you want us to prioritize?**

**14.2 Any areas you want us to skip?**
*For example: "Third-party integrations are out of scope"*

**14.3 What's driving this review?**
- [ ] Pre-launch security check
- [ ] Customer/investor requirement
- [ ] Compliance preparation
- [ ] Post-incident review
- [ ] Routine security hygiene
- [ ] Other: ___________

---

## Section 15: Additional Information

*Anything else we should know?*

---

**Completed by:**

**Date:**

---

*Please return this questionnaire to [consulting email] along with codebase access. Use a secure method for any credentials — never send passwords or secrets in email body.*
