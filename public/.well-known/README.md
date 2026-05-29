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

Our original target was 2026-05-27. We did not ship by that date. The verification API schedule has been paused for a focused capacity review on 2026-05-29; updated milestones publish at <https://evoked.dev/patents> on 2026-05-30, and this README will reflect them. We name the slip rather than hide it - if the architecture and the words must agree, that includes when the words slipped behind.
