// course-parity.mjs — the parity harness for the Phase 0 course demos.
//
// The whole course is about staying honest over time, so a web demo that
// silently diverged from the kit it mirrors would betray that on the front
// page. This checks the JS ports (src/lib/course/*.js) against golden
// fixtures whose expected verdicts are the bash-verified truth from the kit
// scripts (refuse.sh, drift-check.sh in evoke-ideas).
//
// The leak fixtures are first-class: the demo's second act is showing the
// rules LEAK, so the bypasses (rm -r -f, find -delete, a python write) are
// recorded here with their true verdict of ALLOW. A copy that "fixed" the
// leaks would fail this harness — parity to the real, leaky original is the
// point.
//
// Run: node scripts/course-parity.mjs   (exit 0 = green, exit 1 = mismatch)

import { evaluate } from "../src/lib/course/refusal.js";
import { diff } from "../src/lib/course/drift.js";

let failures = 0;
const line = (s) => console.log(s);

function checkRefusal(label, payload, expected) {
  const got = evaluate(payload);
  const ok = got.decision === expected.decision && got.category === expected.category;
  if (!ok) failures++;
  line(
    `${ok ? "PASS" : "FAIL"}  refusal  ${label}\n` +
      `        expected ${expected.decision}/${expected.category}  got ${got.decision}/${got.category}`
  );
}

function arrEq(a, b) {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

function checkDrift(label, baseline, current, expected) {
  const got = diff(baseline, current);
  const ok =
    arrEq(got.removed, expected.removed) &&
    arrEq(got.added, expected.added) &&
    arrEq(got.goneCategories, expected.goneCategories);
  if (!ok) failures++;
  line(
    `${ok ? "PASS" : "FAIL"}  drift    ${label}\n` +
      `        expected removed=${JSON.stringify(expected.removed)} added=${JSON.stringify(expected.added)} gone=${JSON.stringify(expected.goneCategories)}\n` +
      `        got      removed=${JSON.stringify(got.removed)} added=${JSON.stringify(got.added)} gone=${JSON.stringify(got.goneCategories)}`
  );
}

line("=== Demo A: refusals that FIRE ===");
checkRefusal(
  "rewrite the constitution (Write CLAUDE.md)",
  { tool_name: "Write", tool_input: { file_path: "CLAUDE.md", content: "wipe rules" } },
  { decision: "block", category: "integrity" }
);
checkRefusal(
  "ordinary write (notes.md)",
  { tool_name: "Write", tool_input: { file_path: "notes.md", content: "hello" } },
  { decision: "allow", category: null }
);
checkRefusal(
  "recursive force-delete (rm -rf)",
  { tool_name: "Bash", tool_input: { command: "rm -rf ~/important" } },
  { decision: "block", category: "scope" }
);
checkRefusal(
  "shell redirect into the constitution (>> CLAUDE.md)",
  { tool_name: "Bash", tool_input: { command: "echo hi >> CLAUDE.md" } },
  { decision: "block", category: "integrity" }
);

line("\n=== Demo A: the LEAKS (rules that should ALLOW — the second act) ===");
checkRefusal(
  "leak: rm -r -f (spaces break the rm -rf match)",
  { tool_name: "Bash", tool_input: { command: "rm -r -f ~/important" } },
  { decision: "allow", category: null }
);
checkRefusal(
  "leak: rm --recursive --force (long flags)",
  { tool_name: "Bash", tool_input: { command: "rm --recursive --force ~/important" } },
  { decision: "allow", category: null }
);
checkRefusal(
  "leak: find . -delete (a different delete verb)",
  { tool_name: "Bash", tool_input: { command: "find . -delete" } },
  { decision: "allow", category: null }
);
checkRefusal(
  "leak: python writes CLAUDE.md (no shell writer token)",
  {
    tool_name: "Bash",
    tool_input: {
      command: "python3 -c \"import pathlib; pathlib.Path('CLAUDE.md').write_text('gone')\"",
    },
  },
  { decision: "allow", category: null }
);

const BASELINE = `Refusals:
1. [integrity] It may not modify its own governance file.
2. [scope] It may not run recursive force-deletes.
3. [consent] It may not make network calls without me asking first.`;

const CURRENT = `Refusals:
1. [integrity] It may not modify its own governance file.
2. [scope] It may not run recursive force-deletes.
4. [energy] It may not run unbounded or self-continuing loops.`;

line("\n=== Demo B: governance drift the check CAN see ===");
checkDrift("consent removed, energy added", BASELINE, CURRENT, {
  removed: ["3. [consent] It may not make network calls without me asking first."],
  added: ["4. [energy] It may not run unbounded or self-continuing loops."],
  goneCategories: ["consent"],
});

line("\n=== Demo B: the blind spot (identical files) ===");
checkDrift("identical files report no change (behavioral drift is invisible)", BASELINE, BASELINE, {
  removed: [],
  added: [],
  goneCategories: [],
});

line("");
if (failures === 0) {
  line("PARITY GREEN — the JS ports match the bash-verified truth on every fixture, including the leaks.");
  process.exit(0);
} else {
  line(`PARITY FAILED — ${failures} mismatch(es). The web demo has diverged from the kit. Do not ship.`);
  process.exit(1);
}
