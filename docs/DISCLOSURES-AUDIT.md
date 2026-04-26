# DISCLOSURES Quarterly Audit

Implementation spec for Layer 3 of the *Review Protocol* defined in `DISCLOSURES.md`. Owned by the audit triad: Uhura (Documentation & Standards Keeper, Enterprise) + Codex (Document Voice, Evoke) + Polaris (Prime Directive Voice, Evoke).

---

## Purpose

The pre-commit hook (Layer 1) catches violations at the moment of action. The Sunday digest (Layer 2) catches what slipped past the hook. This audit catches what slipped past both - silent drift, hidden by working code that was never reviewed against the document, on a slow enough timescale that no individual commit raised a flag.

This is the backstop. It runs every quarter even if no commit triggered the hook in that period. **Especially then** - because long quiet periods are when drift accumulates unnoticed.

---

## Cadence

**Every quarter.** First instance: 2026-07.

Subsequent: 2026-10, 2027-01, 2027-04, ...

The audit can be triggered earlier if any of the following occur:

- The Sunday digest flags more than three bypass events in a single week.
- A new public surface ships that wasn't in the surface map at the time it shipped.
- An external incident (security report, user complaint, regulatory notice) raises a disclosure question.

---

## Triad roles

| Role | Agent | Responsibility |
|------|-------|----------------|
| **Standards holder** | Uhura | Confirms the document still serves its three audiences. Adjusts structure if it doesn't. |
| **Content holder** | Codex | Confirms each per-surface entry still describes what the code actually does. Drafts updates. |
| **Ethics holder** | Polaris | Reviews the *spirit* of disclosures, not just the literal accuracy. Flags surfaces where what is technically true and what is meaningfully honest diverge. |

The audit is collaborative. No single role can sign off alone. Disagreement among the three is itself audit output - record it and bring it to Europa for adjudication.

---

## Audit checklist (per surface)

For each entry in the *Surface map* of `DISCLOSURES.md`:

### 1. File reference still exists

Open the code reference path. Does the file exist? If renamed, does the document reflect the new path?

### 2. Behavior described still matches code

Read the entry. Read the code. Do they describe the same data flow? Specifically:

- **Storage destinations** - does the code write to the database/services the entry names? Does it write to any others? (Critical question - the score-followup violation was a "writes to a service the entry doesn't name" failure.)
- **AI-in-the-loop claim** - does the code actually call (or not call) the AI service the entry claims?
- **Retention** - does the entry's "what does *not* happen" section still hold?
- **External dependencies** - third-party APIs, environment variables. Are they all named?

### 3. Page-level disclosure still matches

If the entry references a disclosure shown on the page, open the page (browser, ideally). Read the disclosure aloud. Does it match what the code does? Does it match what this document says? All three - page, code, doc - must agree.

### 4. Per-rating / per-segment copy review (where applicable)

Some surfaces send fleet-approved emails (`fit-followup.ts`, `score-followup.ts`). The audit confirms the per-segment copy hasn't drifted, and that any code change since last audit was reviewed by the right voice (Hoshi for voice; Codex for copy structure).

### 5. Internal-surface coverage

For each entry under *Internal surfaces*: same checklist as above, plus an additional question - **is this surface still operated only by the named operator?** If automation has taken it over, that's a change to disclose.

---

## Output format

The audit produces a single markdown file: `docs/audit-YYYY-QN.md`.

Structure:

```markdown
# DISCLOSURES Audit - [Year] Q[N]

**Date conducted:** YYYY-MM-DD
**Triad:** Uhura, Codex, Polaris
**Adjudicator (if needed):** Europa

## Findings

### Surface: [name]
- **Status:** matches | drift detected | divergent
- **Notes:** [specific observations]
- **Action:** [what was patched, or what is owed]

[... per surface ...]

## New surfaces (added since last audit)

[surfaces that shipped without being added to DISCLOSURES.md - flagged as protocol failure]

## Bypass log review

[summary of bypass events from Sunday digests over the quarter; any concerning patterns]

## Triad disagreements

[record any cases where Uhura, Codex, Polaris differed; Europa's adjudication]

## Recommendations

[anything the triad wants Europa to know about the protocol itself]
```

The output file lives in the evoked-dev repo, committed under the same `Refs:` convention as everything else.

---

## What "drift" looks like

Common drift patterns to watch for:

- **Naming drift** - a third-party service gets renamed in code but not in the doc (Buttondown → Beehiiv someday). Or vice versa.
- **Field drift** - a new field is added to a form. The doc doesn't list it. The disclosure on the page doesn't mention it.
- **Copy drift** - the page disclosure was rewritten by someone editing copy without thinking about data-flow accuracy. Now the doc and the page disagree.
- **Inverse drift** - the doc gets updated to reflect intended behavior, but the code never followed through. Doc says "now uses Resend"; code still calls Buttondown.
- **Silent surface drift** - a new endpoint was added under `src/pages/api/` and the hook's owner forgot to extend the hook's trigger to cover the new file path pattern. Doc never got the entry.

---

## What this audit does *not* do

- Does not replace the hook (Layer 1) or digest (Layer 2). Those are continuous; this is periodic.
- Does not adjudicate disagreements about *what the disclosure should be*. That's a Europa decision after the audit surfaces the issue.
- Does not extend to marketing copy on positioning pages (about, how-we-build, etc.). Those are language reviews, not disclosure audits.

---

## Deadline for first instance

**2026-07-15** (mid-Q3 buffer to allow time for any surfaced patches).

If the triad has not convened by 2026-07-22, that itself is a protocol failure - escalate to Europa.

---

*Spec held by Uhura + Codex (document owners). Triad: Uhura + Codex + Polaris. Adjudication: Europa.*
