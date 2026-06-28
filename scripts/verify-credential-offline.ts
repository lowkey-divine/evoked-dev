#!/usr/bin/env node
/**
 * Offline Evoked governance-credential verifier.
 *
 * Verification must never depend only on our server. This is a tiny, self-contained
 * command-line verifier that runs entirely on your machine - no network, no trust in
 * Evoked. It uses the SAME verification logic as the web endpoint
 * (src/lib/verify/governance-credential.ts), which is cross-validated against the
 * Python reference verifier (24/24).
 *
 * Requires only Node (v23+, which runs TypeScript natively) and its built-in crypto.
 *
 * Usage:
 *   node scripts/verify-credential-offline.ts <credential.jwt> --anchor <anchor.b64> --bundle <bundle.json>
 *
 * A sample credential ships at public/verify-sample/ . To verify it:
 *   node scripts/verify-credential-offline.ts public/verify-sample/credential.jwt \
 *       --anchor public/verify-sample/anchor.b64 --bundle public/verify-sample/bundle.json
 *
 * Exit code: 0 = ACCEPT, 1 = REJECT, 2 = usage error.
 */
import { readFileSync } from 'node:fs';
import { verifyCredential, b64uDecode } from '../src/lib/verify/governance-credential.ts';

function arg(flag: string): string | undefined {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

const credPath = process.argv[2];
const anchorPath = arg('--anchor');
const bundlePath = arg('--bundle');

if (!credPath || credPath.startsWith('--') || !anchorPath || !bundlePath) {
  console.error(
    'usage: node scripts/verify-credential-offline.ts <credential.jwt> --anchor <anchor.b64> --bundle <bundle.json>'
  );
  process.exit(2);
}

const token = readFileSync(credPath, 'utf-8').trim();
const anchor = readFileSync(anchorPath, 'utf-8').trim();
const bundle = JSON.parse(readFileSync(bundlePath, 'utf-8'));

const result = verifyCredential(token, {
  trustAnchorPk: b64uDecode(anchor),
  bundleInputs: bundle,
});

console.log(`verdict : ${result.verdict}`);
console.log(`subject : ${result.subject}   issuer : ${result.issuer}`);
console.log(`issues  : ${result.issues.length ? JSON.stringify(result.issues, null, 2) : 'none'}`);
if (result.verdict === 'ACCEPT') {
  console.log('  conscience: may refuse operator on the served principal\'s behalf.');
  console.log('  standing  : agent (signed assent) + served principal (relation, no identity) + operator.');
}
console.log('\n(reference implementation, production hardening pending)');

process.exit(result.verdict === 'ACCEPT' ? 0 : 1);
