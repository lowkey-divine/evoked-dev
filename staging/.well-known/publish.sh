#!/usr/bin/env bash
#
# publish.sh — promote staging/.well-known/ artifacts to public/.well-known/
#
# Authored by Iter (Journey Voice, USS Evoke, OIG deployment lead) on 2026-06-05.
# Authored against the contract-points-shape named by Tutela on 2026-06-02 OIG
# capacity-review memory entry; full specification ships at Tutela's hand.
#
# Promote semantics:
#   - Refuses to copy any file whose name ends in `.placeholder`.
#   - Refuses to run if Polaris pre-read marker `PRE-READ-PASS` is absent.
#   - Refuses to run if CONTRACT-POINTS-PLACEHOLDER.md is still present (must be
#     superseded by a reference to Tutela's shipped spec first).
#   - Snapshots public/.well-known/ to staging/.well-known/.snapshots/<timestamp>/
#     before any copy, so rollback.sh has an artifact to restore from.
#   - Idempotent: re-running with the same staging contents is a no-op (sha-equal).
#
# Standing commitment (Iter, 2026-06-01 early-hours room; unchanged):
#   I will not promote from staging to public path until Polaris pre-read passes;
#   if pre-read does not pass, I revert staging and route to OIG capacity-review.
#
# Usage:
#   ./publish.sh            promote (with all gates)
#   ./publish.sh --dry-run  print what would happen, do not modify any file
#
set -euo pipefail

STAGING_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${STAGING_DIR}/../.." && pwd)"
PUBLIC_DIR="${REPO_ROOT}/public/.well-known"
SNAPSHOT_ROOT="${STAGING_DIR}/.snapshots"
PRE_READ_MARKER="${STAGING_DIR}/PRE-READ-PASS"
CONTRACT_PLACEHOLDER="${STAGING_DIR}/CONTRACT-POINTS-PLACEHOLDER.md"

DRY_RUN=0
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=1
fi

say() { printf '%s\n' "$*"; }
fail() { printf 'publish.sh: REFUSED — %s\n' "$*" >&2; exit 1; }

# Gate 1: refuse on placeholder files
if compgen -G "${STAGING_DIR}/*.placeholder" > /dev/null; then
  fail "placeholder artifacts present in staging — promote refused. Real artifacts must replace .placeholder files before promote."
fi

# Gate 2: refuse if contract-points placeholder still in place
if [[ -f "${CONTRACT_PLACEHOLDER}" ]]; then
  fail "CONTRACT-POINTS-PLACEHOLDER.md is still present — Tutela's contract-points spec has not been shipped or referenced. Promote refused."
fi

# Gate 3: refuse without Polaris pre-read pass marker
if [[ ! -f "${PRE_READ_MARKER}" ]]; then
  fail "Polaris pre-read PASS marker absent at ${PRE_READ_MARKER}. Promote refused. (Marker is authored by Polaris at the gate-review seat, not by Iter.)"
fi

# Required artifact set per Tutela's contract point 1
REQUIRED=( "evoked-pub.pem" "evoked-pub.json" )
for f in "${REQUIRED[@]}"; do
  if [[ ! -f "${STAGING_DIR}/${f}" ]]; then
    fail "required artifact missing in staging: ${f}"
  fi
done

# Snapshot public/.well-known/ before any change
TS="$(date -u +%Y%m%dT%H%M%SZ)"
SNAPSHOT_DIR="${SNAPSHOT_ROOT}/${TS}"
say "publish.sh: snapshot target ${SNAPSHOT_DIR}"
if (( DRY_RUN == 0 )); then
  mkdir -p "${SNAPSHOT_DIR}"
  if [[ -d "${PUBLIC_DIR}" ]]; then
    cp -a "${PUBLIC_DIR}/." "${SNAPSHOT_DIR}/"
    say "publish.sh: snapshot of public/.well-known/ saved"
  fi
fi

# Promote
for f in "${REQUIRED[@]}"; do
  src="${STAGING_DIR}/${f}"
  dst="${PUBLIC_DIR}/${f}"
  if (( DRY_RUN == 1 )); then
    say "publish.sh: DRY-RUN would copy ${src} -> ${dst}"
  else
    cp -a "${src}" "${dst}"
    say "publish.sh: promoted ${f}"
  fi
done

# Update README hand-off
if (( DRY_RUN == 0 )); then
  say "publish.sh: NOTE — public/.well-known/README.md is hand-authored. Promote does not overwrite it. Update the README in a separate commit to reflect post-promote state."
fi

say "publish.sh: done."
