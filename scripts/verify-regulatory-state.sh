#!/usr/bin/env bash
# verify-regulatory-state.sh
#
# Runbook + prompt generator for verifying src/content/regulatory-state/regulatory-state.yml
# against current primary sources.
#
# Usage:
#   bash scripts/verify-regulatory-state.sh           # interactive: prints queries, prompt, runbook
#   bash scripts/verify-regulatory-state.sh --staleness # check if state file is past due
#   bash scripts/verify-regulatory-state.sh --prompt   # output the Claude Code prompt only
#
# This script does NOT itself call WebSearch (Claude Code tool). It generates the
# verification workload as a copy-paste prompt for Claude Code, and prints a
# runbook for the captain to execute the verification cycle.
#
# Established 2026-06-06 after the EU AI Act Digital Omnibus miss. See:
#   src/content/regulatory-state/README.md

set -euo pipefail

STATE_FILE="src/content/regulatory-state/regulatory-state.yml"
README_FILE="src/content/regulatory-state/README.md"

if [[ ! -f "$STATE_FILE" ]]; then
  echo "ERROR: $STATE_FILE not found. Run from repo root." >&2
  exit 2
fi

MODE="${1:-interactive}"

# Extract last_verified and next_verification_due (simple grep; no yaml parser)
LAST_VERIFIED=$(grep -E "^last_verified:" "$STATE_FILE" | head -1 | awk -F'"' '{print $2}')
NEXT_DUE=$(grep -E "^next_verification_due:" "$STATE_FILE" | head -1 | awk -F'"' '{print $2}')
TODAY=$(date -u +%Y-%m-%d)

print_staleness() {
  echo "Regulatory state staleness check"
  echo "================================"
  echo "  last_verified:        $LAST_VERIFIED"
  echo "  next_verification_due: $NEXT_DUE"
  echo "  today:                $TODAY"
  echo ""
  if [[ "$TODAY" > "$NEXT_DUE" ]]; then
    echo "  STATUS: STALE - verification overdue"
    return 1
  else
    echo "  STATUS: current - next verification due $NEXT_DUE"
    return 0
  fi
}

print_prompt() {
  cat <<'PROMPT'
================================================================
PROMPT FOR CLAUDE CODE - paste this into a fresh session
================================================================

Verify src/content/regulatory-state/regulatory-state.yml against current primary sources.

Run these WebSearch queries in parallel and surface any deltas from the current state file:

1. "EU AI Act Digital Omnibus Official Journal publication"
2. "EU AI Act 2026 enforcement deadline update"
3. "EU AI Act Article 5 prohibited practices amendments"
4. "EU AI Act GPAI obligations enforcement"
5. "EU AI Act standards CEN-CENELEC publication"
6. "GDPR 2026 amendments"

After the searches, fetch the most authoritative current source via WebFetch:
- https://www.consilium.europa.eu/en/press/press-releases/ (filter for AI Act)
- https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai

For each finding, report:
  - What changed since last_verified (date in state file)
  - Source authority level (Official Journal / Commission / Council / AI Office / law firm / trade press)
  - Specific entries in regulatory-state.yml that need update

Do NOT update the YAML file unilaterally. Surface the delta report; await captain disposition.

Read first: src/content/regulatory-state/README.md (verification protocol)

================================================================
END PROMPT
================================================================
PROMPT
}

print_runbook() {
  echo ""
  echo "Verification runbook"
  echo "===================="
  echo ""
  echo "1. Run staleness check:"
  echo "   bash scripts/verify-regulatory-state.sh --staleness"
  echo ""
  echo "2. If stale, copy the prompt below into Claude Code:"
  echo "   bash scripts/verify-regulatory-state.sh --prompt | pbcopy   # macOS"
  echo ""
  echo "3. Claude Code runs WebSearch + WebFetch and surfaces deltas."
  echo ""
  echo "4. Captain reviews deltas. For each:"
  echo "   - Decide: accept update / hold / investigate further"
  echo "   - If accept: update the relevant entry in $STATE_FILE"
  echo "   - Update last_verified and next_verification_due at top of file"
  echo ""
  echo "5. Find every artifact citing the changed entry:"
  echo "   grep -rln '<keyword>' src/ products/"
  echo ""
  echo "6. Update or republish each affected artifact within 7 days."
  echo "   Match each artifact's 'verified as of' date to the new last_verified."
  echo ""
  echo "7. Run voice-tells audit on every touched file:"
  echo "   ./scripts/voice-tells-audit.sh <file>"
  echo ""
  echo "8. Regenerate any affected PDFs."
  echo ""
  echo "9. Commit with message:"
  echo "   refactor(regulatory-state): verified <date>; <one-line summary of deltas>"
  echo ""
}

case "$MODE" in
  --staleness)
    print_staleness
    ;;
  --prompt)
    print_prompt
    ;;
  interactive|*)
    print_staleness || true
    echo ""
    print_prompt
    print_runbook
    ;;
esac
