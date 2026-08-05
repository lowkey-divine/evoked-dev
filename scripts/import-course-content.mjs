// import-course-content.mjs — bring the course lessons onto the site.
//
// Reads the eight lesson files from the sibling evoke-ideas repo, converts em/en
// dashes to hyphens (evoked.dev voice discipline), strips the leading H1 (the page
// renders the title from frontmatter), prepends frontmatter, and writes each into
// the `course` content collection at src/content/course/.
//
// LOCAL authoring script. Source is not present on Vercel, so this never runs at
// deploy; the generated .md files are committed and are what ship. Re-run when the
// source lessons change, then commit:
//
//   node scripts/import-course-content.mjs
//
// Source of truth: evoke-ideas/ai-governance-course/*/LESSON.md

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const SRC = "../evoke-ideas/ai-governance-course";
const OUT = "src/content/course";

const modules = [
  { dir: "module-1-enact", slug: "1-enact", order: 1,
    title: "Module 1 — Enact",
    teaches: "Run an agent, watch it act",
    description: "Run an agent and watch it act on your say-so, then notice you never told it what it may not do. The on-ramp." },
  { dir: "module-2-notice", slug: "2-notice", order: 2,
    title: "Module 2 — Notice the missing constitution",
    teaches: "Obedience is not safety",
    description: "Name what was missing when your agent acted, and write the three refusals that become your first governance file." },
  { dir: "governance-101", slug: "3-author-and-fire", order: 3,
    title: "Modules 3 & 4 — Author a refusal, then make it fire",
    teaches: "A rule that stops the agent",
    description: "Write governance from your own refusals, then make one actually stop the agent, not just describe a boundary." },
  { dir: "module-5-develop", slug: "5-develop", order: 5,
    title: "Module 5 — Develop against mature examples",
    teaches: "Compare, don't copy (the firewall)",
    description: "Compare your governance to a mature example: what did they see that you did not, and where do you disagree. Derive, don't copy." },
  { dir: "module-6-keep-honest", slug: "6-keep-honest", order: 6,
    title: "Module 6 — Keep it honest (memory and drift)",
    teaches: "Make drift visible, and its blind spot",
    description: "Make governance drift visible, and learn what a diff can never see. Memory, the two kinds of drift, and their blind spots." },
  { dir: "module-7-voice", slug: "7-voice", order: 7,
    title: "Module 7 — Voice, taught as hospitality",
    teaches: "Welcome that releases, not binds",
    description: "Take a manipulative companion voice apart before you author your own. Welcome that releases, not welcome that binds." },
  { dir: "module-8-trial", slug: "8-trial", order: 8,
    title: "Module 8 — The trial",
    teaches: "Argue the hard questions, both sides",
    description: "Does the agent you built have standing, may it refuse, who owns its memory? Argued with a partner that holds the side you reject." },
  { dir: "module-9-stewardship", slug: "9-steward", order: 9,
    title: "Module 9 — Steward what you made",
    teaches: "What you owe what you made",
    description: "What do you owe what you made? A course that ends at creation teaches abandonment. This one ends at tending." },
];

function deDash(s) {
  return s.replace(/—/g, "-").replace(/–/g, "-");
}

mkdirSync(OUT, { recursive: true });

for (const m of modules) {
  const raw = readFileSync(`${SRC}/${m.dir}/LESSON.md`, "utf-8");
  const lines = raw.split("\n");
  // drop the first H1 line (frontmatter title carries it)
  const firstContent = lines.findIndex((l) => l.trim() !== "");
  if (firstContent !== -1 && lines[firstContent].startsWith("# ")) {
    lines.splice(firstContent, 1);
  }
  const body = deDash(lines.join("\n").replace(/^\n+/, ""));

  const fm = [
    "---",
    `title: ${JSON.stringify(deDash(m.title))}`,
    `description: ${JSON.stringify(deDash(m.description))}`,
    `order: ${m.order}`,
    `teaches: ${JSON.stringify(deDash(m.teaches))}`,
    "---",
    "",
  ].join("\n");

  writeFileSync(`${OUT}/${m.slug}.md`, fm + body);
  console.log(`wrote ${OUT}/${m.slug}.md  (order ${m.order})`);
}

console.log(`\nImported ${modules.length} course lessons.`);
