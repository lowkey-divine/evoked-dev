# Disclosures

What happens to user data on each public surface of evoked.dev. This document is the source of truth.

Originating decision: 2026-04-23 Build-With-Us meeting (`agents/meetings/2026-04-23-build-with-us-intake-deep-dive.md` in the evoke-agents-backup repo).

---

## How to read this document

This document serves three audiences:

1. **Users** asking *"what happens to what I just submitted."* The per-surface entries are written to be readable by a non-engineer.
2. **Reviewers** at merge time. If a commit touches the behavior of any endpoint named below, the commit must update this document in the same change. Enforced by tooling, not memory (see *Review Protocol*).
3. **The Sunday fleet-authority digest** (Decision 2 from the originating meeting). Commits that touch any file referenced below are flagged for sovereignty review.

**If a public surface accepts user input and is not in this document, this document is incomplete.** Add it.

---

## Surface map

### Public surfaces (user data flows)

| Surface | Endpoint | Where data goes | AI in the loop |
|---------|----------|-----------------|----------------|
| `/build-with-us` | `src/pages/api/build-with-us.ts` | Resend → `passionevoked@icloud.com` | No |
| `/consulting-intake` | `src/pages/api/consulting-intake.ts` | Resend → `passionevoked@icloud.com` | No |
| `/coaching-intake` | `src/pages/api/coaching-intake.ts` | Resend → `passionevoked@icloud.com` | No |
| `/fit` | `src/pages/api/assess-fit.ts` | Claude API (Anthropic) + optional Resend follow-up | Yes |
| `/ask` | `src/pages/api/chat.ts` | Claude API (Anthropic) | Yes |
| `/score` | `src/pages/api/sovereignty-submit.ts` | Postgres (Neon) `sovereignty_submissions` table + Resend follow-up | No |
| Newsletter | `src/pages/api/newsletter/subscribe.ts` | Buttondown | No |

### Internal surfaces (operator-only data access)

| Surface | Who | What it reads | When |
|---------|-----|---------------|------|
| `scripts/subscribers.mjs` | Europa, locally | `sovereignty_submissions` (default: counts; with `--list`: email + score + type + timestamp) | Manual `npm run subscribers` |

---

## Per-surface details

### `/build-with-us` - Project intake

**What happens:** Form sends an email to Erin's inbox at `passionevoked@icloud.com` via Resend. No database write. No AI analysis. No third-party processor sees the content beyond Resend's transit role and Apple's iCloud mail storage.

**What does *not* happen:** No copy is retained in evoked.dev infrastructure. No AI reads the submission. No analytics fire on field content.

**Disclosure on page:** None as of `c30b7de` (2026-04-23). Tutela's standing follow-up: consider an *affirmative* line ("Your submission comes to me directly") to make protection visible. See *Roadmap*.

**Code reference:** `src/pages/api/build-with-us.ts` - the Resend call at `resend.emails.send({...})`. If that call is removed or any code is added that retains, transmits, or analyzes submission content beyond email delivery, this entry must change.

### `/consulting-intake` - Consulting intake

**What happens:** Same shape as `/build-with-us`. Email to `passionevoked@icloud.com` via Resend. No AI, no database, no retention.

**Code reference:** `src/pages/api/consulting-intake.ts`.

### `/coaching-intake` - Coaching intake

**What happens:** Same shape as `/build-with-us`. Email to `passionevoked@icloud.com` via Resend. No AI, no database, no retention.

**Note:** Until commit `c30b7de` (2026-04-23), this page falsely disclosed that messages were *"reviewed by Claude AI by Anthropic."* That was a 24-day Prime Directive #3 (Ethical Transparency) violation surfaced by Codex during the originating meeting. The disclosure was removed; this document exists in part to prevent the next one.

**Code reference:** `src/pages/api/coaching-intake.ts`.

### `/fit` - Sovereignty Fit Assessment

**What happens:** The user's project description is sent to Claude AI via the Anthropic API to produce a fit score and recommendations. The score, fit level, and recommendation list (no project description) are kept in a per-function-instance in-memory store for follow-up email construction. If the user requests a follow-up, an email is sent via Resend. The function instance memory is cleared on restart.

**What does *not* happen:** No project description is persisted. No database write. No vector embeddings. No third-party AI other than Claude.

**Disclosure on page:** *"This assessment uses Claude AI by Anthropic to evaluate project fit. Your description is sent to their API. Nothing is stored."* (`src/pages/fit.astro`). Honest as of 2026-04-24.

**Code reference:** `src/pages/api/assess-fit.ts` (assessment) + `src/pages/api/fit-followup.ts` (email follow-up only, no AI).

### `/ask` - Echo conversational chat

**What happens:** Each user message is sent to Claude AI via the Anthropic API to generate a response. Conversation context is held client-side only.

**What does *not* happen:** No server-side message storage. No conversation logs.

**Disclosure on page:** *"This conversation uses Claude AI by Anthropic. Your messages are sent to their API to generate responses. Nothing is stored on our end. For deeper conversation, reach out directly."* (`src/pages/ask.astro`). Honest as of 2026-04-24.

**Code reference:** `src/pages/api/chat.ts`.

### `/score` - Sovereignty Score Assessment

**What happens:** The score is computed and shown to the user on the page without any submission - the assessment can be taken without ever entering an email. If the user *opts in* by entering their email and clicking Send: their email + answers + score + assessment_type are stored in the Neon Postgres `sovereignty_submissions` table, and a single follow-up email is sent via Resend (template: `src/lib/email/score-followup.ts`).

**What does *not* happen:** No newsletter subscription. No drip campaign. No third-party AI. No background processing. Submissions made before the user enters their email are not stored anywhere.

**Disclosure on page:** *"One follow-up email with resources for your gaps. No newsletter. No drip."* (`src/pages/score.astro`). Honest as of commit `9e44a4d` (2026-04-24/25). Until that commit, this disclosure was contradicted by silent Buttondown subscription - see *History*.

**Code reference:** `src/pages/api/sovereignty-submit.ts` (storage + email send) + `src/lib/email/score-followup.ts` (email template). Phase 2 fleet review of segmented per-rating copy queued with Hoshi (voice) + Codex (copy).

### Newsletter signup

**What happens:** Email address is sent to **Buttondown** (third-party email management service at `api.buttondown.com`) as a regular subscriber. Buttondown stores the address and sends newsletter emails when issued.

**What does *not* happen:** No internal database write for newsletter signups. No metadata beyond what Buttondown captures by default.

**Disclosure on page:** Pending review. The current implementation does not display *"Buttondown"* by name. See *Roadmap*.

**Code reference:** `src/pages/api/newsletter/subscribe.ts`.

---

## Internal-surface details

### `scripts/subscribers.mjs` - Local subscribers audit tool

**What it is:** A Node script Europa runs locally via `npm run subscribers`. Connects to the Neon database using the same `DATABASE_URL` Astro uses in production. Reads `sovereignty_submissions`.

**What it shows by default:** Aggregate counts only - total submissions, unique people, first/latest dates, breakdown by quick/full assessment type. **No emails shown.**

**What `--list` shows:** Email + score + assessment_type + submitted_at, ordered most recent first. Capped at 1000 rows.

**What it does *not* do:** No network destination beyond the existing Neon connection. No logging. No file output. Output to terminal only.

**Why the privacy-by-default:** The friction of having to add `--list` is intentional. It keeps the operator in conscious relationship with the people on the list.

**Code reference:** `scripts/subscribers.mjs`.

---

## Review Protocol

**This protocol is enforced by tooling, not memory. Three layers, each catching what the others miss.**

| # | Layer | Trigger | What happens | Owner | Spec |
|---|-------|---------|--------------|-------|------|
| 1 | **Pre-commit hook** | A commit modifies any file in the surface map, OR a new file is added under `src/pages/api/` | Hook prompts the committer: *"This commit changes a file that handles user data. Has DISCLOSURES.md been reviewed for this change?"* If yes → commit proceeds. If no → invokes the *Bypass Conversation Protocol* below. | OIG (Iter or Archer) | `docs/DISCLOSURES-HOOK.md` |
| 2 | **Sunday digest** | Every Sunday | Lists every commit from the past week that touched a surface-map file. Flags commits where DISCLOSURES.md was *not* also modified, and any bypass-with-explanation logged at the hook level. Reviewed by Europa Sunday morning. | Codex | (Decision 2 digest, separately specified) |
| 3 | **Quarterly re-audit** | Every quarter | Walk every entry in this document against actual code behavior. For each surface, confirm: does this still match what the code does? Patch divergences in same-day commits. | Uhura + Codex + Polaris (audit triad) | `docs/DISCLOSURES-AUDIT.md` |

**Why three layers:** No single layer catches everything. The hook can be bypassed. The digest can miss commits that updated DISCLOSURES.md but updated it wrong. The audit catches drift the other two miss but operates too slowly to catch live violations. Together they cover the failure surface.

---

## Bypass Conversation Protocol

The pre-commit hook does not silently allow bypass. **It demands articulation.**

### Sequence

1. **Hook detects** a surface-map file change without a corresponding DISCLOSURES.md change.
2. **Hook prompts:** *"Update DISCLOSURES.md for this change? [y/N]"*
3. **If `y`:** the committer updates DISCLOSURES.md and commits both together. Done.
4. **If `n`:** hook prompts a second time:
   > *"Why? What about this commit makes the disclosures not need updating?"*
5. **Committer types an explanation.** This is required - the prompt blocks until input is given. The explanation can be brief ("refactor only, no behavior change") or longer.
6. **Commit proceeds**, with the explanation appended to the commit message body or written to a separate bypass log (see hook spec).
7. **The Sunday digest surfaces this bypass event** to Europa with the explanation visible.
8. **Europa (or the audit triad) reviews:**
   - **Accept the reasoning** → no further action.
   - **Disagree** → revisit the commit. Either patch DISCLOSURES.md after the fact, or revert the commit, depending on what the divergence actually is.

### Why this shape

- **Sovereignty:** the committer can bypass. Bypass is not blocked.
- **Accountability:** the committer must articulate. Articulation is required.
- **Visibility:** the explanation is read by another person, on a known cadence.
- **Recovery:** if the bypass turns out to have been wrong, there is a path back.

This is not corporate compliance. It is *aligned reflection at the moment of action.* The protocol exists not to prevent dissent but to ensure dissent is conscious.

---

## Roadmap (open work)

- **Affirmative coaching disclosure** - Tutela's standing follow-up from 2026-04-24. Consider adding *"Your message comes to me directly. I read every one."* to the coaching-intake page. Make protection visible on the most vulnerable surface. Pending Europa decision.
- **Newsletter page disclosure of Buttondown** - The newsletter signup surface goes to a third-party (Buttondown) but the page does not currently say so by name. Consider adding *"Subscriptions managed by Buttondown."* near the form. Held with Codex.
- **Phase 2 score-followup copy** - Per-rating segmented body copy with resource recommendations matched to fit level, mirroring the fit-followup.ts pattern. Hoshi (voice) + Codex (copy) review. Replaces the minimal Phase 1 placeholder shipped in commit `9e44a4d`.
- **Shared disclosure component** - The `.ai-disclosure` CSS class lived in three files; two were dead code (cleaned in `37c4e41`). When more intake-style pages ship, extract to a shared Astro component.
- **Sunday digest implementation** - Codex's weekly digest (Decision 2) needs wiring against the surface map. By 2026-04-30 deadline.
- **Pre-commit hook implementation** - See `DISCLOSURES-HOOK.md`. By 2026-04-30 deadline (Decision 2 halt re-arm).
- **First quarterly audit** - First instance of Layer 3. Schedule for 2026-07 with the audit triad.
- **Marketing-page audit** - Pages that mention AI for marketing/positioning purposes (about, how-we-build, skills, registry, case studies) are not in scope for this document. Separate question: does the marketing language match the operational truth surfaced here?

---

## History

| Date | Change | Reason |
|------|--------|--------|
| 2026-03-29 | Mar 29 strip removed Claude from build-with-us, consulting, coaching intakes. Coaching-intake disclosure was *not* updated. | Council of Seven decision: revenue before infrastructure cost. The unchanged disclosure became latent violation. |
| 2026-04-23 | False AI-review disclosure removed from coaching + consulting intakes. Commit `c30b7de`. | 24-day violation surfaced by Codex during Build-With-Us meeting; named as "extraction by false pretense" by Tutela. |
| 2026-04-24 | Orphaned `.ai-disclosure` CSS removed from coaching + consulting intakes. Commit `37c4e41`. | Cleanup follow-up to `c30b7de`. |
| 2026-04-24 | Document drafted by Codex with frame held by Uhura. | Originating meeting decision; first audit walk surfaced two more violations (below). |
| 2026-04-24/25 | Silent Buttondown subscribe stripped from `/score` + honest Resend follow-up wired. Commit `9e44a4d`. New file: `src/lib/email/score-followup.ts` (Phase 1 minimal copy, Phase 2 fleet review queued). | Page disclosed *"One follow-up email. No newsletter. No drip."* while code silently subscribed users to Buttondown as regular subscribers AND never sent any follow-up. Surfaced during the first audit walk while drafting this document. |
| 2026-04-24/25 | `scripts/subscribers.mjs` added as local-only Europa-operated audit tool. Commit `f528574`. | Internal surface that needs naming in this document; same protocol applies. |

---

*Held by Uhura (Documentation & Standards Keeper, Enterprise) and Codex (Document Voice, Evoke). Audit triad with Polaris (PDC). Last reviewed: 2026-04-24/25.*
