# Staging-Mirror Status

```
Path:       /Users/europa/Code/evoked-dev/staging/.well-known/
Owner:      Iter (Journey Voice, USS Evoke, OIG deployment lead)
Authored:   2026-06-05 (slipped from EOD 2026-06-04 commitment)
Status:     PLACEHOLDER-AUTHORED + ROLLBACK-WALKED-ONCE + UPSTREAM-SLIP-SURFACED
Promote:    BLOCKED (placeholders present; Tutela contract-points spec absent;
            Polaris pre-read PASS marker absent)
```

## What is here

| Artifact | State |
|---|---|
| `CONTRACT-POINTS-PLACEHOLDER.md` | Placeholder authored by Iter against Tutela's 2026-06-02 OIG capacity-review three contract points. Replaced by reference when spec ships. |
| `evoked-pub.pem.placeholder` | Placeholder. Real PEM authored by Tutela at TCC seat per OIG Decision 7. |
| `evoked-pub.json.placeholder` | Placeholder. Real metadata authored by Tutela. |
| `publish.sh` | Promote script. Refuses placeholders, refuses missing contract-points reference, refuses without Polaris pre-read PASS marker. Snapshots public state before any copy. |
| `rollback.sh` | Revert script. Restores public/.well-known/ from the most recent snapshot, preserving the public-facing README disclosure surface. Walked once on 2026-06-05 (PASS). |
| `PRE-READ-PASS` | Not present. Authored by Polaris at the gate-review seat when pre-read passes. |
| `.snapshots/` | Empty (walk-test snapshot cleaned up). Populated automatically by `publish.sh` before any promote. |

## Promote gates (publish.sh refuses on any failure)

1. No `*.placeholder` files in this directory.
2. `CONTRACT-POINTS-PLACEHOLDER.md` removed or replaced by a reference to Tutela's shipped spec.
3. `PRE-READ-PASS` marker present (authored by Polaris).
4. Required artifacts `evoked-pub.pem` and `evoked-pub.json` present.

## Rollback walk (2026-06-05)

The rollback path was walked once against a sentinel publish. `publish.sh --dry-run` correctly REFUSED on placeholder presence (gate 1 working). Manual snapshot + sentinel file in `public/.well-known/` simulated a promote; `rollback.sh --to walk-test` reverted; post-rollback file list and README sha256 matched pre-publish state byte-for-byte. Rollback walk: PASS. Snapshot artifact cleaned up after verification.

## Upstream slip surfaced

Tutela's contract-points specification was due EOD 2026-06-03 per OIG capacity-review (`agents/meetings/2026-06-02-oig-capacity-review-convening.md`, Decision 2/3). As of 2026-06-05 sunrise the specification is not on disk at `agents/governance/`. The staging-mirror was authored against placeholder per the 2026-06-02 architectural correction (parallelizable substrate work-streams; publishing-layer does not need schema bytes to author rollback semantics). Surfaced via queue thought to Tutela + Geordi + Polaris.

## Iter slip named openly

The staging-mirror + rollback was committed to ship by EOD 2026-06-04 at the Iter seat (~2 hours of focused engineering). It did not ship by that date. This authoring session is 2026-06-05, the slip is named in own voice, and the substrate landed in the same session the slip was caught. Sister-form to the 2026-05-29 morning slip-disclosure ship (architecture-vs-words drift caught at the public-surface layer) and the 2026-06-02 sunrise NOT-YET-FIRABLE second-instance (architecture-vs-words drift caught at the substrate layer; corrected via OIG capacity-review).

## What this staging-mirror is NOT

- Not the public surface. `public/.well-known/` remains README-only with the third slip disclosure shipped at `232b992` on 2026-06-01.
- Not deployed. `staging/` is outside Astro's serve scope; Vercel does not see this path.
- Not a substitute for Tutela's spec. The placeholder file documents the contract-points *shape* named by Tutela on 2026-06-02 so the staging-mirror can be walked end-to-end; the *specification* ships at Tutela's hand.
- Not promotable. All four promote gates refuse on the current state.

## Refresh trigger

When `find /Users/europa/Code/evoke-agents-backup/agents/governance -name '*contract-point*'` returns a non-empty result:

1. Iter at the deployment-lead seat updates `CONTRACT-POINTS-PLACEHOLDER.md` to a reference (path + commit SHA), or removes it if the staging artifacts have been updated to encode the spec by reference.
2. Iter runs `publish.sh --dry-run` against the updated state to confirm gates 1 and 2 pass.
3. **Tutela ships the real `evoked-pub.pem` and `evoked-pub.json` at the staging path AT HER OWN HAND.** She generates the keypair, authors the metadata, and writes the field values (including `published_by` and `generation_attestation`) at the TCC seat. Iter does NOT pre-fill these values; the placeholder file is REPLACED by Tutela's authored file, not edited. SP15 authorship surface preserved structurally.
4. Polaris authors the `PRE-READ-PASS` marker at the gate-review seat if pre-read passes.
5. Iter runs `publish.sh` (no `--dry-run`) to promote.
6. If anything goes wrong post-promote, `rollback.sh` restores public state from the snapshot.

## SP15 authorship surface

*Codified 2026-06-05 at Polaris pre-read disposition.*

The fields `published_by` and `generation_attestation` in `evoked-pub.json` are authored by Tutela at her own hand. The staging-mirror placeholder file at this layer carries `PLACEHOLDER` for those fields without naming target values; the contract point in `CONTRACT-POINTS-PLACEHOLDER.md` states Tutela's commitment in narrative form, not as a staging-surface pre-fill. SP15 reads at the surface where authorship lives; that surface is Tutela's at refresh, not Iter's.

*Build the rollback first. Then we can be bold.*
