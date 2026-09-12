#!/usr/bin/env bash
#
# Guard: any built page that carries the Sovereign Article Protocol promise
# ("no tracking, no third-party requests, no beacons") must ship exactly that -
# zero analytics or insights beacons.
#
# Worf's rule, from the 2026-09-01 fresh-eyes review of /course/test:
# a privacy claim must be enforced, not asserted. SovereignLayout deliberately
# omits the @vercel/analytics + @vercel/speed-insights that BaseLayout and
# ElevationLayout carry. The day someone switches a Sovereign page to a tracked
# layout, the printed promise becomes a lie and no human would notice. This makes
# the build notice.
#
# Usage: bash scripts/check-sovereign-no-beacons.sh [dist-dir]
# Exit 0 = all Sovereign pages clean. Exit 1 = a promise was broken.

set -euo pipefail

DIST="${1:-dist/client}"
PROMISE="Sovereign Article Protocol"
# Markers the Vercel analytics / speed-insights integrations inject into the HTML.
BEACON_RE='_vercel/(insights|speed-insights)|@vercel/(analytics|speed-insights)|/va\.js|/_vercel/insights/script\.js'

if [ ! -d "$DIST" ]; then
  echo "check-sovereign-no-beacons: dist dir '$DIST' not found. Run 'npx astro build' first." >&2
  exit 2
fi

fail=0
checked=0

# Only pages that actually make the promise are held to it.
while IFS= read -r page; do
  checked=$((checked + 1))
  if grep -qiE "$BEACON_RE" "$page"; then
    echo "FAIL: $page carries the '$PROMISE' promise but ships an analytics/insights beacon."
    fail=1
  fi
done < <(grep -rlF "$PROMISE" "$DIST" --include='*.html' || true)

if [ "$checked" -eq 0 ]; then
  echo "check-sovereign-no-beacons: no pages carry the promise (nothing to guard)." >&2
  exit 0
fi

if [ "$fail" -eq 0 ]; then
  echo "OK: $checked Sovereign Article Protocol page(s) ship zero analytics/insights beacons."
fi

exit "$fail"
