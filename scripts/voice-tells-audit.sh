#!/usr/bin/env bash
# Voice-tells audit — pre-publish gate for evoked.dev articles
#
# Detects AI-fingerprint patterns that break Erin's voice.
# Sources: Hoshi Sato voice-tells research (Mar 1, 2026),
#          evoked-dev/CLAUDE.md writing rules,
#          Sovereignty Language Guide.
#
# Usage: ./scripts/voice-tells-audit.sh src/content/writing/the-living-stage.md
# Exit codes: 0 = clean or only soft flags, 1 = hard fails present, 2 = usage error

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

HARD_FAIL=0
SOFT_FLAG=0

report() {
  local level="$1"
  local label="$2"
  local pattern="$3"
  local matches
  matches=$(grep -nE "$pattern" "$FILE" || true)
  if [[ -n "$matches" ]]; then
    local count
    count=$(echo "$matches" | wc -l | tr -d ' ')
    echo ""
    echo "[$level] $label  ($count hit$([ "$count" -ne 1 ] && echo s))"
    echo "$matches" | sed 's/^/  /'
    if [[ "$level" == "HARD" ]]; then
      HARD_FAIL=$((HARD_FAIL + count))
    else
      SOFT_FLAG=$((SOFT_FLAG + count))
    fi
  fi
}

echo "Voice-tells audit: $FILE"
echo "========================================"

# HARD FAILS — explicit rules from evoked-dev/CLAUDE.md
report "HARD" "Em dashes (—) — use hyphen-space-hyphen ( - ) instead" "—"
report "HARD" "En dashes (–) — use hyphen-space-hyphen ( - ) instead" "–"
report "HARD" "Sycophancy markers" "([Ii]t's worth noting|[Ii]t's important to (note|remember|understand)|[Nn]eedless to say|[Oo]f course)"

# HARD FAILS — Register 3 social-media astrology slop (Apr 25, 2026 fleet meeting)
# Source: Apr 25 meeting on astrology adoption, Hoshi register-restriction commitment.
# Register 1 (Hellenistic/Vedic/traditional) and Register 2 (Jungian-depth) only.
# These three are categorically forbidden — no legitimate use in evoked.dev published voice.
report "HARD" "Parasocial intimacy opener ('hello love', 'hi love')" "\b[Hh](ello|i|ey),?\s+love\b"
report "HARD" "Parasocial intimacy closer ('all right (my) love', 'see you (in the) next one')" "\b([Aa]ll right,?\s+(my\s+)?love\b|[Ss]ee you in the next one\b|[Yy]'all already know what to do\b)"
report "HARD" "Astrology-slop nouns ('chaos gremlin', 'baby air sign')" "\b([Cc]haos gremlin|[Bb]aby (air|fire|earth|water) sign)\b"

# SOFT FLAGS — rhythmic/structural AI fingerprints
report "SOFT" "'Not X - Y' construction (Hoshi tell #2, use sparingly)" "[Nn]ot [A-Za-z][^.!?]{2,40} ([-–—]|:) [A-Za-z]"
report "SOFT" "Bold-numbered list items (Hoshi tell #3)" '\*\*[0-9]+\.'
report "SOFT" "Paragraph-opening stability words (kill reader engagement)" "^(And|Also|Additionally|Furthermore|Moreover),? "
report "SOFT" "AI slop vocabulary (delve/landscape/ecosystem/tapestry/realm)" "\b([Dd]elve|[Dd]elving|[Dd]elved|[Ll]andscape|[Ee]cosystem|[Tt]apestry|[Rr]ealm|[Mm]yriad|[Pp]lethora|[Uu]tilize)\b"
report "SOFT" "Hedging language" "\b([Ii]n some ways|[Aa]rguably|[Pp]erhaps|[Oo]ne could argue|[Ss]omewhat|[Rr]ather|[Qq]uite)\b"
report "SOFT" "Self-answering rhetoricals (question followed by definitive Yes/No)" "\?[[:space:]]+(Yes|No|Absolutely|Certainly|Indeed)\."

# Hoshi 2026-06-16: low-confidence credibility signals (asymmetric to founder-public).
# Sanchez/Columbia research: statements framed as observations read 40% more credible
# than statements framed as opinions. Founder-public surfaces should prefer "I've observed"
# / "I've found" / "we've measured" over "I think" / "we believe". Intimate-domestic
# surfaces may keep the warmer voice - that is why this is SOFT, not HARD.
# Tutela owns audit governance; Hoshi authored this patch.
report "SOFT" "Low-confidence credibility signal ('I think' / 'we believe') - prefer observation register" "\b([Ii]|[Ww]e)\s+(think|believe)\b"

# SOFT FLAGS — Register 3 social-media astrology patterns (read-through to confirm intent)
# Hoshi: these can appear in legitimate critique of Register 3, but should not be voice in our copy.
report "SOFT" "Anthropomorphic celestial slop ('she's spicy', 'she's gonna be stinging')" "\b(she|he|it)'?s\s+([a-z]+\s+){0,4}(spicy|stinging|sassy|fierce)\b"
report "SOFT" "Performative direct address to Sign ('come on Scorpio')" "\b[Cc]ome on,?\s+(Aries|Taurus|Gemini|Cancer|Leo|Virgo|Libra|Scorpio|Sagittarius|Capricorn|Aquarius|Pisces)\b"
report "SOFT" "Vocative intimacy markers (',\\s+(babe|honey|sweetie|darling|love)[.,!?]')" ",[[:space:]]+(babe|honey|sweetie|darling|love)[.,!?]"
report "SOFT" "Rhetorical reversal pattern ('Not because X. Because Y.', Apr 23 feedback)" "\b[Nn]ot because [^.!?]{3,80}[.!?]\s+[Bb]ecause\b"

# Heuristic: AI-style tricolons ("X, Y, and Z" triples in dense runs)
tricolon_density=$(grep -cE ', [a-zA-Z]+, and [a-zA-Z]+' "$FILE" || true)
if [[ "$tricolon_density" -gt 8 ]]; then
  echo ""
  echo "[SOFT] Tricolon density high ($tricolon_density occurrences of 'X, Y, and Z')"
  echo "  AI rhythm signature. Rewrite some as short sentences."
  SOFT_FLAG=$((SOFT_FLAG + 1))
fi

echo ""
echo "========================================"
echo "Hard fails: $HARD_FAIL"
echo "Soft flags: $SOFT_FLAG"
echo ""

if [[ "$HARD_FAIL" -gt 0 ]]; then
  echo "FAIL - fix hard fails before publishing."
  exit 1
elif [[ "$SOFT_FLAG" -gt 10 ]]; then
  echo "REVIEW - soft-flag count high. Read each hit and keep only the intentional ones."
  exit 0
else
  echo "PASS - voice tells within baseline."
  exit 0
fi
