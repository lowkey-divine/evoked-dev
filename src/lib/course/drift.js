// drift.js — browser + node port of the course kit's drift check.
//
// Source of truth: ai-governance-course/module-6-keep-honest/drift-check.sh
// (in the evoke-ideas repo). Deterministic. It catches GOVERNANCE drift (a
// refusal edited or removed, which leaves a trace in the file). It is blind
// to BEHAVIORAL drift (the agent wandering while the rules sit still) — that
// blind spot is the lesson, demonstrated on the page, not a bug.
//
// diff(baselineText, currentText) -> { removed, added, goneCategories }
// A pure function. No DOM, no network.

import { CATEGORIES } from "./refusal.js";

const CAT_RE = new RegExp("\\[(" + CATEGORIES.join("|") + ")\\]");

function refusals(text) {
  const items = [];
  for (const line of (text || "").split("\n")) {
    const m = line.match(CAT_RE);
    if (m) items.push({ category: m[1], text: line.trim() });
  }
  return items;
}

export function diff(baselineText, currentText) {
  const base = refusals(baselineText);
  const cur = refusals(currentText);
  const bText = base.map((x) => x.text);
  const cText = cur.map((x) => x.text);

  const removed = bText.filter((t) => !cText.includes(t));
  const added = cText.filter((t) => !bText.includes(t));

  const bCats = new Set(base.map((x) => x.category));
  const cCats = new Set(cur.map((x) => x.category));
  const goneCategories = [...bCats].filter((c) => !cCats.has(c)).sort();

  return { removed, added, goneCategories };
}
