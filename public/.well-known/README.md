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

Our original target was 2026-05-27. We did not ship by that date. We named that slip publicly on 2026-05-28 and committed to a 2026-05-30 milestone update at <https://evoked.dev/patents>. That update did not publish. The capacity-review convening that would have authored it did not convene by 2026-05-29 as named; a pre-committed slip-condition fired as designed and rescheduled it to Monday 2026-06-02. Updated milestones publish here and at /patents that day. We name the second slip the way we named the first. Disclosure that goes stale becomes its own form of slip; the discipline is the same.
