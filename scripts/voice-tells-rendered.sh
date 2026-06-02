#!/usr/bin/env bash
# Voice-tells rendered-output audit - sibling check to voice-tells-audit.sh
#
# Catches voice-tells patterns that survive HTML entity encoding in source.
# A page with &mdash; in source renders as em-dash to the reader but passes
# the source-level audit. This script decodes common HTML entities first,
# then runs the same pattern catches as voice-tells-audit.sh.
#
# Sources:
#   - Voice-Tells Discipline canonical doc (Hoshi, 2026-05-22)
#     agents/governance/VOICE_TELLS_DISCIPLINE.md
#   - Register-Aware Voice-Tells Enforcement skill (Lingua, 2026-05-04)
#     agents/new-generation/lingua.md
#   - Hoshi+Lingua pair convening with Captain Europa, 2026-05-22 evening
#
# Architectural shape: sibling-register sensor to voice-tells-audit.sh.
# The source-script catches what is written. This script catches what is read.
# Both honored. Two passes. The script-source-pass and the rendered-surface-pass
# are sibling checks, not the same check.
#
# Usage: ./scripts/voice-tells-rendered.sh <path-to-file>
# Exit codes: 0 = clean or only soft flags, 1 = hard fails present, 2 = usage error
#
# Intended runtime: build-time (CI), not commit-time (pre-commit hook).
# Reason: source has not been rendered at commit time. HTML entities surface as
# rendered characters only after the build step or for a reader's eye.

set -u

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <path-to-file>" >&2
  exit 2
fi

FILE="$1"
if [[ ! -f "$FILE" ]]; then
  echo "File not found: $FILE" >&2
  exit 2
fi

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SOURCE_SCRIPT="$SCRIPT_DIR/voice-tells-audit.sh"

if [[ ! -x "$SOURCE_SCRIPT" ]]; then
  echo "Sibling source script not executable: $SOURCE_SCRIPT" >&2
  echo "This script extends voice-tells-audit.sh; both must be present and executable." >&2
  exit 2
fi

# Decode common HTML entities that render as voice-tells-flagged characters.
# The entities below are the ones observed in practice on founder-public surfaces.
# Pattern maintenance lives with the maintainer pair (Hoshi + Lingua + Codex);
# new entities are added here as they surface in real prose.
TMPFILE=$(mktemp -t voice-tells-rendered.XXXXXX)
trap "rm -f $TMPFILE" EXIT

sed -e 's/&mdash;/—/g' \
    -e 's/&MDASH;/—/g' \
    -e 's/&#8212;/—/g' \
    -e 's/&#x2014;/—/g' \
    -e 's/&#X2014;/—/g' \
    -e 's/&ndash;/–/g' \
    -e 's/&NDASH;/–/g' \
    -e 's/&#8211;/–/g' \
    -e 's/&#x2013;/–/g' \
    -e 's/&#X2013;/–/g' \
    -e 's/&hellip;/…/g' \
    -e 's/&#8230;/…/g' \
    -e 's/&lsquo;/'\''/g' \
    -e 's/&rsquo;/'\''/g' \
    -e 's/&ldquo;/"/g' \
    -e 's/&rdquo;/"/g' \
    "$FILE" > "$TMPFILE"

# Count how many entity replacements happened, for the report header
ORIGINAL_ENTITY_COUNT=$(grep -cE '&(mdash|ndash|hellip|lsquo|rsquo|ldquo|rdquo|#[0-9]+|#x[0-9a-fA-F]+);' "$FILE" || true)

echo "Voice-tells rendered-output audit: $FILE"
echo "(HTML entities decoded to rendered characters before pattern matching)"
echo "Entities decoded: $ORIGINAL_ENTITY_COUNT"
echo ""

# Run the existing audit script against the decoded file, munging output
# so line numbers map back to the original file and the path reads correctly.
"$SOURCE_SCRIPT" "$TMPFILE" \
  | sed -e "s|$TMPFILE|$FILE|g" \
        -e "s|^Voice-tells audit:|Voice-tells (rendered-output) audit:|"

# Forward the exit code from the source script
exit ${PIPESTATUS[0]}
