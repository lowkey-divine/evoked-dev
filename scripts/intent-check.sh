#!/usr/bin/env bash
# Intent-check — pre-publish advisory for evoked.dev articles.
#
# Flags sentences that may assert the MOTIVE, KNOWLEDGE, or DESIGN INTENT of a
# named external actor (a company, industry, regulator, or person). Such claims
# are usually unsourceable: we can see what a thing DOES, not what someone MEANT.
# Our own standard is "check the claim against the source," so a motive-charge we
# cannot source fails our own test. The fix is almost always the same:
#   charge the record, not the mind.
#   (say what the product/policy DOES, not why they intended it.)
#
# This is ADVISORY. It over-catches on purpose. Ignore any match that:
#   - describes YOUR OWN systems or choices ("we chose to...")
#   - quotes or cites a PUBLICLY STATED intent (sourceable)
#   - is properly hedged ("may be intended to")
#   - is clearly rhetorical, not a factual charge against a named party.
# For everything else: reframe to observable function/effect/structure.
#
# Origin: 2026-09-16 corpus self-audit (Data's intent-vs-function test),
# after "The Plastic Miracle That Keeps Going Bankrupt." Sibling to the
# voice-tells audit and the claim-check gate.
#
# Usage: ./scripts/intent-check.sh src/content/writing/some-article.md
# Exit codes: 0 always (advisory — never blocks). 2 = usage error.

set -u

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <path-to-article.md>" >&2
  exit 2
fi

FILE="$1"
if [[ ! -f "$FILE" ]]; then
  echo "File not found: $FILE" >&2
  exit 2
fi

FLAGS=0

report() {
  local label="$1"
  local pattern="$2"
  local matches
  matches=$(grep -nEi "$pattern" "$FILE" || true)
  if [[ -n "$matches" ]]; then
    local count
    count=$(echo "$matches" | wc -l | tr -d ' ')
    echo ""
    echo "[REVIEW] $label  ($count hit$([ "$count" -ne 1 ] && echo s))"
    echo "$matches" | sed 's/^/  /'
    FLAGS=$((FLAGS + count))
  fi
}

echo "Intent-check (advisory): $FILE"
echo "========================================"

# Purpose/design attributed to an actor ("designed to trick", "engineered to")
report "Design-purpose verb (designed/engineered/built/tuned to ...)" "\b(designed|engineered|built|tuned) to\b"
# Knowing reliance on inaction ("counting on you not to notice")
report "Reliance-on-inaction (count(s)/counting on)" "\b(count|counts|counting) on\b"
# Direct knowledge imputation ("the SDK knows it shouldn't be there")
report "Knowledge imputation (knows/knew it/they/full well)" "\b(knows|knew) (it|they|that it|it's|full well)\b"
# Calculated-manner adverbs
report "Calculated-manner adverb (on purpose/deliberately/intentionally/quietly)" "\b(on purpose|deliberately|intentionally|quietly)\b"
# "the cost is the point" style intent-as-goal
report "Intent-as-goal (is the point / the point is to)" "\b(is the point|the point is to)\b"
# Explicit want/intend/mean
report "Explicit intent verb (wants/intends/meant to)" "\b(wants?|intend(s|ed)?|meant) to\b"
# Purpose clause of enablement
report "Enablement purpose (so (that) they/it can ...)" "\bso (that )?(they|it) can\b"
# Absence-of-thought imputation ("did not think to question")
report "Absence-of-thought (did not think to / never thought to)" "\b(did not think to|didn't think to|never thought to)\b"
# Concealment framing
report "Concealment framing (plausible deniability)" "\bplausible deniability\b"
# Design-assumption imputation ("built on the assumption that")
report "Design-assumption imputation (the assumption that / on the assumption)" "\b(the assumption that|on the assumption)\b"
# Knowing choice by a named actor ("they choose to continue")
report "Knowing-choice imputation (chose to / choose to)" "\b(chose to|choose to)\b"

echo ""
echo "========================================"
echo "Possible motive-claims flagged: $FLAGS"
echo ""

if [[ "$FLAGS" -gt 0 ]]; then
  echo "ADVISORY - these are prompts to LOOK, not failures. For each, ask:"
  echo "  Is this our own system, a sourced/quoted intent, or properly hedged? -> fine."
  echo "  Otherwise: charge the record, not the mind (say what it DOES, not why they meant it)."
else
  echo "CLEAN - no motive-claim patterns found."
fi
exit 0
