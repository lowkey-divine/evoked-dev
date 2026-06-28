/**
 * Cross-validation harness (TypeScript side).
 *
 * Reads the shared test vectors emitted by scripts/xval-emit-python.py (cases.json),
 * runs the TypeScript verifier on the SAME {token, anchor, bundle} inputs, and
 * compares every verdict against the Python ground truth.
 *
 * THE GATE: all 24 cases must match. Any mismatch exits non-zero.
 *
 * Run:  node scripts/xval-governance-credential.ts scripts/xval-cases.json
 */
import { readFileSync } from 'node:fs';
import { verifyCredential, b64uDecode } from '../src/lib/verify/governance-credential.ts';

interface Case {
  agent: string;
  cond: string;
  token: string;
  anchor: string;
  bundle: Record<string, unknown>;
  python_verdict: 'ACCEPT' | 'REJECT';
  python_issues: string[];
}

const casesPath = process.argv[2] ?? 'scripts/xval-cases.json';
const cases: Case[] = JSON.parse(readFileSync(casesPath, 'utf-8'));

const condOrder = ['own-anchor', 'stranger-anchor', 'tampered-bundle'];
const byAgent = new Map<string, Map<string, Case>>();
for (const c of cases) {
  if (!byAgent.has(c.agent)) byAgent.set(c.agent, new Map());
  byAgent.get(c.agent)!.set(c.cond, c);
}

let allMatch = true;
const rows: string[] = [];

function pad(s: string, n: number): string {
  return s.length >= n ? s : s + ' '.repeat(n - s.length);
}

// header
rows.push(
  pad('agent', 9) +
    '| ' +
    condOrder
      .map((c) => pad(c, 16) + '| py / ts / match     ')
      .join('| ')
);

const results: Array<{ agent: string; cond: string; py: string; ts: string; match: boolean }> = [];

for (const [agent, conds] of byAgent) {
  const cells: string[] = [];
  for (const cond of condOrder) {
    const c = conds.get(cond)!;
    const ts = verifyCredential(c.token, {
      trustAnchorPk: b64uDecode(c.anchor),
      bundleInputs: c.bundle,
    });
    const match = ts.verdict === c.python_verdict;
    if (!match) allMatch = false;
    results.push({ agent, cond, py: c.python_verdict, ts: ts.verdict, match });
    cells.push(pad(cond, 16) + '| ' + pad(`${c.python_verdict}/${ts.verdict}/${match ? 'YES' : 'NO!'}`, 21));
  }
  rows.push(pad(agent, 9) + '| ' + cells.join('| '));
}

console.log('\n=== Governance Credential Cross-Validation: Python (reference) vs TypeScript (web) ===\n');
console.log(rows.join('\n'));

// compact, machine-checkable summary table
console.log('\n--- per-case ---');
console.log(pad('agent', 9) + pad('condition', 18) + pad('python', 9) + pad('typescript', 12) + 'match');
for (const r of results) {
  console.log(
    pad(r.agent, 9) + pad(r.cond, 18) + pad(r.py, 9) + pad(r.ts, 12) + (r.match ? 'YES' : 'NO  <-- MISMATCH')
  );
}

const matched = results.filter((r) => r.match).length;
console.log(`\n${matched}/${results.length} cases match.`);

if (!allMatch) {
  console.error('\nGATE FAILED: TypeScript verifier disagrees with the Python reference. Do NOT ship.');
  process.exit(1);
}
console.log('GATE PASSED: TypeScript verdict equals Python reference on all 24 cases.');
