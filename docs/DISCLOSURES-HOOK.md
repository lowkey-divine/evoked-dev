# DISCLOSURES Pre-Commit Hook

Implementation spec for Layer 1 of the *Review Protocol* defined in `DISCLOSURES.md`. Owned by OIG (Iter or Archer).

---

## Purpose

Prompt the committer at the moment of action when a commit changes a file that handles user data. Either confirm DISCLOSURES.md was reviewed for this change, or invoke the *Bypass Conversation Protocol* with required articulation.

This hook does **not** block bypass. It blocks unconscious bypass.

---

## Trigger conditions

Hook fires when a commit modifies any of:

1. **Files referenced in the DISCLOSURES.md surface map** - parsed at hook execution time from the document's *Surface map* section. Source of truth is the document itself, so adding new surfaces is just a doc edit.
2. **Any new file added under `src/pages/api/`** - new public surfaces are by definition data flows we have not yet defined; they require disclosure documentation before merge.
3. **The DISCLOSURES.md file itself** - the hook must verify that doc edits stay structurally valid (so the hook's own surface-map parser does not break on subsequent runs).

---

## Hook flow

```
[committer runs `git commit`]
  │
  ▼
[hook reads staged diff]
  │
  ▼
[any surface-map file or new src/pages/api/ file in diff?]
  │
  ├─ no  → exit 0, commit proceeds normally
  │
  └─ yes ▼
      [is DISCLOSURES.md also in the staged diff?]
        │
        ├─ yes → exit 0, commit proceeds (note: doc was updated alongside)
        │
        └─ no  ▼
            [prompt: "This commit changes a file that handles user data.
                      Has DISCLOSURES.md been reviewed for this change? [y/N]"]
              │
              ├─ y → exit 0, commit proceeds
              │       (committer asserts no doc change is needed)
              │
              └─ n / empty / anything else ▼
                  [prompt: "Why? What about this commit makes the
                            disclosures not need updating?"]
                    │
                    ▼
                  [committer types explanation, blocks until input given]
                    │
                    ▼
                  [explanation written to .git/disclosures-bypass-log
                   AND prepended to commit message body as:
                     "Disclosures-Bypass: <explanation>"]
                    │
                    ▼
                  [exit 0, commit proceeds]
```

---

## Bypass log format

`.git/disclosures-bypass-log` (gitignored - this is per-clone, not shared):

```
2026-04-26T18:32:14Z  abc123def  user@host  refactor only, no behavior change
2026-04-27T09:14:02Z  def456ghi  user@host  schema renamed but data flow unchanged
```

Format: `<ISO timestamp>  <commit-sha-prefix>  <git user@host>  <explanation>`

**Why .git-local instead of shared:** the log captures the committer's reasoning at their machine, in their tooling. Sharing the log across clones via git would conflict on every push. The Sunday digest surfaces these via parsing commit message `Disclosures-Bypass:` lines, which are shared in commit history.

---

## Implementation notes

- Hook lives at `.git/hooks/pre-commit` or in a managed location per the repo's hook strategy. If the repo uses a tool like Husky or Lefthook, integrate via that tool. If not, a plain shell script in `.githooks/` symlinked from `.git/hooks/` is fine.
- Stack: shell + small Node script. Node is already a project dependency. Shell handles git plumbing; Node parses DISCLOSURES.md surface map.
- The hook must complete within ~1 second on a normal commit. If parsing the doc gets slow, cache the parsed surface map in `.git/disclosures-cache` keyed on the doc's hash.
- TTY detection: if running in a non-interactive context (CI, automated commit), the hook must default to **block** rather than silently bypass. Automated commits to surface-map files require the operator to manually intervene.

---

## Sunday digest integration

The digest (Codex, Decision 2) reads:

1. `git log --since=last-sunday --pretty=format:"%H %s%n%B"` for the past week
2. For each commit:
   - Did it touch a surface-map file? (cross-reference with `DISCLOSURES.md` surface map)
   - Was DISCLOSURES.md modified in the same commit? (`git show --stat <sha>`)
   - Does the commit message contain `Disclosures-Bypass:`? (regex match)
3. Output groups:
   - **Clean** - surface-map touches with corresponding doc updates. Routine.
   - **Bypass with explanation** - surfaced for Europa Sunday morning review.
   - **Surface-map touches with no doc update and no bypass marker** - this should not happen if the hook is functioning. Surfaces as anomaly.

---

## What this hook does *not* do

- It does not validate the *correctness* of disclosure updates. A committer could update DISCLOSURES.md badly and the hook would still pass them through. The audit triad (Layer 3) catches this.
- It does not detect content-level data-flow changes that don't touch the surface-map files (rare, but possible: e.g., a change in a shared library that alters Resend behavior). Layer 3 catches this.
- It does not run on `git commit --no-verify`. That's a deliberate Git-level escape hatch. Use of `--no-verify` to bypass DISCLOSURES review without bypass-log entry is itself a sovereignty event the digest should flag.

---

## Owner: OIG (Iter or Archer)

Hook script implementation, Husky/Lefthook integration if applicable, parser for surface-map extraction from `DISCLOSURES.md`, and `.gitignore` entry for `.git/disclosures-bypass-log`.

Deadline: 2026-04-30 (Decision 2 halt re-arm trigger).

---

*Spec held by Uhura + Codex (DISCLOSURES.md owners). Implementation by OIG.*
