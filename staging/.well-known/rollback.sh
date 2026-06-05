#!/usr/bin/env bash
#
# rollback.sh — revert public/.well-known/ to its pre-promote state.
#
# Authored by Iter (Journey Voice, USS Evoke, OIG deployment lead) on 2026-06-05.
#
# Rollback semantics:
#   - Restores public/.well-known/ from the most recent .snapshots/<timestamp>/
#     directory created by publish.sh. The README is the public-facing slip
#     disclosure surface and is preserved through restore.
#   - If no snapshot exists (fresh repo), restores public/.well-known/ to the
#     canonical README-only state by removing any non-README files.
#   - Supports `--to <timestamp>` to pick a specific snapshot.
#   - Supports `--list` to enumerate snapshots without modifying anything.
#   - Supports `--dry-run` for inspection without writes.
#
# Standing principle (Iter, persona file: "Build the rollback first. Then we can
# be bold."):  the rollback is the architecture. The publish path is the
# boldness it enables.
#
# Usage:
#   ./rollback.sh                    revert to most recent snapshot
#   ./rollback.sh --to <timestamp>   revert to a named snapshot
#   ./rollback.sh --list             list snapshots
#   ./rollback.sh --dry-run [...]    print actions, do not modify
#
set -euo pipefail

STAGING_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${STAGING_DIR}/../.." && pwd)"
PUBLIC_DIR="${REPO_ROOT}/public/.well-known"
SNAPSHOT_ROOT="${STAGING_DIR}/.snapshots"

DRY_RUN=0
ACTION="restore-latest"
TARGET=""

while (( $# > 0 )); do
  case "$1" in
    --dry-run) DRY_RUN=1; shift ;;
    --list) ACTION="list"; shift ;;
    --to) ACTION="restore-named"; TARGET="${2:-}"; shift 2 ;;
    *) printf 'rollback.sh: unknown arg: %s\n' "$1" >&2; exit 2 ;;
  esac
done

say() { printf '%s\n' "$*"; }

list_snapshots() {
  if [[ ! -d "${SNAPSHOT_ROOT}" ]]; then
    say "rollback.sh: no snapshots directory at ${SNAPSHOT_ROOT}"
    return
  fi
  local found=0
  for d in "${SNAPSHOT_ROOT}"/*/; do
    [[ -d "$d" ]] || continue
    say "  $(basename "$d")"
    found=1
  done
  if (( found == 0 )); then
    say "rollback.sh: no snapshots present"
  fi
}

restore_from() {
  local snap="$1"
  if [[ ! -d "$snap" ]]; then
    printf 'rollback.sh: snapshot not found: %s\n' "$snap" >&2
    exit 1
  fi
  say "rollback.sh: restoring public/.well-known/ from ${snap}"
  if (( DRY_RUN == 0 )); then
    # Remove non-README files from PUBLIC_DIR
    find "${PUBLIC_DIR}" -mindepth 1 -maxdepth 1 ! -name 'README.md' -exec rm -rf {} +
    # Copy snapshot contents back (excluding README.md to preserve the live disclosure surface)
    find "${snap}" -mindepth 1 -maxdepth 1 ! -name 'README.md' -exec cp -a {} "${PUBLIC_DIR}/" \;
  else
    say "rollback.sh: DRY-RUN would remove non-README files from ${PUBLIC_DIR} and restore from ${snap}"
  fi
}

restore_to_readme_only() {
  say "rollback.sh: no snapshot present — restoring public/.well-known/ to README-only canonical state"
  if (( DRY_RUN == 0 )); then
    find "${PUBLIC_DIR}" -mindepth 1 -maxdepth 1 ! -name 'README.md' -exec rm -rf {} +
  else
    say "rollback.sh: DRY-RUN would remove non-README files from ${PUBLIC_DIR}"
  fi
}

case "${ACTION}" in
  list)
    list_snapshots
    ;;
  restore-named)
    if [[ -z "${TARGET}" ]]; then
      say "rollback.sh: --to requires a timestamp"; exit 2
    fi
    restore_from "${SNAPSHOT_ROOT}/${TARGET}"
    ;;
  restore-latest)
    if [[ -d "${SNAPSHOT_ROOT}" ]]; then
      latest="$(ls -1 "${SNAPSHOT_ROOT}" 2>/dev/null | sort | tail -n1)"
      if [[ -n "${latest}" ]]; then
        restore_from "${SNAPSHOT_ROOT}/${latest}"
      else
        restore_to_readme_only
      fi
    else
      restore_to_readme_only
    fi
    ;;
esac

say "rollback.sh: done."
