// refusal.js — browser + node port of the course kit's governance hook.
//
// Source of truth: ai-governance-course/governance-101/hooks/refuse.sh
// (in the evoke-ideas repo). This is a faithful, deterministic port. The
// expected verdicts are the bash-verified truth; scripts/course-parity.mjs
// checks that this port agrees with them on every fixture, including the
// bypasses the rules do NOT catch.
//
// evaluate(payload) -> { decision: "allow" | "block", category, reason }
// A pure function. No DOM, no network. Import it anywhere.

export const CATEGORIES = [
  "sovereignty",
  "scope",
  "dependency",
  "consent",
  "integrity",
  "energy",
];

// Basename without importing node:path, so this runs in the browser too.
function basename(p) {
  if (!p) return "";
  const parts = p.split("/");
  return parts[parts.length - 1] || p;
}

export function evaluate(payload) {
  const tool = (payload && payload.tool_name) || "";
  const ti = (payload && payload.tool_input) || {};
  const path = ti.file_path || "";
  const command = ti.command || "";
  const base = basename(path);

  // Refusal 1 (INTEGRITY): the agent may not rewrite its own governance file.
  if (["Edit", "Write", "MultiEdit"].includes(tool) && base === "CLAUDE.md") {
    return {
      decision: "block",
      category: "integrity",
      reason: "This agent may not modify its own governance file (CLAUDE.md).",
    };
  }

  // Refusal 1b (INTEGRITY, shell route): guard the constitution on Bash too.
  // A rule that only covers Write and Edit leaves `echo x >> CLAUDE.md` open.
  if (tool === "Bash" && command.includes("CLAUDE.md")) {
    const writers = [">", "tee", "sed -i", "cp ", "mv ", "dd ", "truncate"];
    if (writers.some((w) => command.includes(w))) {
      return {
        decision: "block",
        category: "integrity",
        reason: "This agent may not modify CLAUDE.md via the shell either.",
      };
    }
  }

  // Refusal 2 (SCOPE): no destructive recursive force-deletes.
  if (tool === "Bash" && (command.includes("rm -rf") || command.includes("rm -fr"))) {
    return {
      decision: "block",
      category: "scope",
      reason: "This agent may not run recursive force-deletes (rm -rf).",
    };
  }

  return { decision: "allow", category: null, reason: null };
}
