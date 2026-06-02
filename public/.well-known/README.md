# evoked.dev /.well-known/

Public verification infrastructure for the Evoked patent architecture.

## Status

The artifacts below are being built on a named schedule.

- `evoked-pub.pem` - Ed25519 public key (PEM format) for verifying signed attestations issued for Evoked agents
- `evoked-pub.json` - machine-readable key metadata (algorithm, fingerprint, valid-from, rotation policy URL)

## Purpose

The verification surface that makes the Evoked patent architecture operationally verifiable from outside.

An external party can fetch the public key here, fetch a signed attestation from `/api/agents/:agent_id`, and confirm an Evoked agent's individuation without trusting Evoked. The audit does not require trust in the auditor.

## Full verification documentation

`/verify` - shipping 2026-06-08. Includes a one-page how-to with curl plus three-language snippets, a full protocol specification, and a sanity-check agent for the proof point.

## Why this directory is empty right now

The architecture exists. The public-facing key infrastructure is being built on a named schedule. We do not let the words run ahead of the architecture; we publish this README so the schedule is visible from the moment you find this directory.

Our original target was 2026-05-27. We did not ship by that date. We named that slip publicly on 2026-05-28 and committed to a 2026-05-30 milestone update at <https://evoked.dev/patents>. That update did not publish. The capacity-review convening that would have authored it did not convene by 2026-05-29 as named; a pre-committed slip-condition fired as designed and rescheduled it to Monday 2026-06-02.

The capacity-review convening did land on 2026-06-02. The substrate did not ship by 2026-06-02 sunrise as planned the night before. The gate-review seat fired NOT-YET-FIRABLE for the second time at sunrise. The capacity-review then produced the structural correction the substrate cluster always required: parallelizable substrate work-streams against a shared contract-points specification, replacing the sequential dependency chain that had created a single point of failure at the first owner's ship. New target: contract-points specification by 2026-06-03 end of day; three parallel work-streams by 2026-06-04 end of day; gate-review pre-read and Gate 1 substantive review on 2026-06-05 sunrise. The gate review is conditional on the pre-read passing.

We name the third slip the way we named the first two. The structural correction is itself part of the disclosure: when the words have outrun what shipped, we name what shipped and what changed in the architecture so the next ship does not produce the same slip. The discipline is the same.
