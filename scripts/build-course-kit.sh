#!/usr/bin/env bash
#
# build-course-kit.sh — regenerate the downloadable account-free course kit.
#
# The kit is the two account-free course modules (governance-101 and
# module-6-keep-honest) zipped so an adult can run `bash demo.sh` and
# `bash demo-drift.sh` locally, exactly as the source intends. It is served
# at /course/governance-kit.zip.
#
# This is a LOCAL authoring script. It reads the source from the sibling
# evoke-ideas repo (not present on Vercel), so it is never run at deploy —
# the committed zip is what ships. Re-run this whenever the source kit changes,
# then commit the updated zip:
#
#   npm run build:course-kit
#
# Source of truth: evoke-ideas/ai-governance-course/{governance-101,module-6-keep-honest}

set -euo pipefail

SRC="../evoke-ideas/ai-governance-course"
OUT="public/course/governance-kit.zip"

if [ ! -d "$SRC/governance-101" ]; then
  echo "Source kit not found at $SRC (need the sibling evoke-ideas repo). Nothing to do."
  exit 1
fi

mkdir -p "public/course"
rm -f "$OUT"

( cd "$SRC" && zip -r -X "$OLDPWD/$OUT" governance-101 module-6-keep-honest \
    -x '*/scratch/*' -x '*/.DS_Store' >/dev/null )

echo "Rebuilt $OUT"
unzip -l "$OUT" | tail -1
