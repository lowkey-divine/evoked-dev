#!/usr/bin/env node
// newsletter-send.mjs
//
// Render a src/content/writing/*.md article and send it via Resend to ACTIVE
// Neon subscribers, from erin@evoked.dev. Owns the whole send; the list never
// leaves our side (per-recipient send, never a bulk BCC).
//
// THREE SAFETY GATES (Pons + Polaris):
//   (no flag)          DRY RUN. Render, write a local preview, print the
//                      recipient count. Sends NOTHING.
//   --test <address>   Send exactly ONE copy to a captain-controlled address.
//                      The address is upserted as an active subscriber (source
//                      'test') so its unsubscribe link is real and exercisable.
//   --send             LIVE send to ALL active subscribers. Requires the postal
//                      address to be set and an interactive typed confirmation.
//                      There is deliberately no --yes bypass.
//
// Optional:
//   --disclosure       Prepend the first-send disclosure banner (use for the
//                      first direct email to the migrated list).
//
// NO reader tracking, enforced in code (Polaris wall):
//   - links are absolutized to evoked.dev, never redirected (markdown-email.mjs)
//   - the rendered HTML is audited for pixels / remote images before any send
//   - Resend domain-level open+click tracking is FORCED OFF before every send;
//     if that call fails, the send aborts (fail closed)
//
// Usage:
//   npm run newsletter:send -- <path.md>                  # dry run
//   npm run newsletter:send -- <path.md> --test you@x.com # single test
//   npm run newsletter:send -- <path.md> --send           # live (confirms)
//   npm run newsletter:send -- <path.md> --send --disclosure

import { readFile, writeFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';
import {
  parseArticle,
  markdownToEmailHtml,
  markdownToPlainText,
  renderArticleEmail,
  renderArticleText,
  auditNoTracking,
  SITE_URL,
} from '../src/lib/newsletter/markdown-email.mjs';

// Sender - keep in sync with NEWSLETTER_FROM in src/lib/email/client.ts.
const NEWSLETTER_FROM = 'Erin Stanley <erin@evoked.dev>';
const SENDING_DOMAIN = 'evoked.dev';
const PACING_MS = 600; // stay comfortably under Resend's ~2 req/s default

function die(msg) {
  console.error(`\n  ${msg}\n`);
  process.exit(1);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function unsubUrl(token) {
  return `${SITE_URL}/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`;
}

// ---- args ----
const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const positional = args.filter((a) => !a.startsWith('--'));
const path = positional[0];
const testIdx = args.indexOf('--test');
const testAddress = testIdx >= 0 ? args[testIdx + 1] : null;
const isTest = flags.has('--test');
const isSend = flags.has('--send');
const includeDisclosure = flags.has('--disclosure');

if (!path) {
  die('Usage: npm run newsletter:send -- <path-to-md> [--test <addr> | --send] [--disclosure]');
}
if (isTest && (!testAddress || testAddress.startsWith('--'))) {
  die('--test requires an address, e.g. --test you@example.com');
}
if (isTest && isSend) {
  die('Choose one: --test <addr> OR --send. Not both.');
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) die('DATABASE_URL is not set. Run via: npm run newsletter:send -- ...');
const sql = neon(databaseUrl);
const postalAddress = process.env.NEWSLETTER_POSTAL_ADDRESS || '';

// ---- render (all modes render + audit first) ----
const raw = await readFile(path, 'utf8');
const { data, content } = parseArticle(raw);

if (data.draft === true) {
  die(`Refusing to send: ${path} has draft: true in frontmatter.`);
}
if (!data.title) {
  die(`Refusing to send: ${path} has no title in frontmatter.`);
}

const contentHtml = markdownToEmailHtml(content);
const contentText = markdownToPlainText(content);

// Build both the HTML and plain-text parts for one recipient's token. Sending
// multipart (html + text) helps deliverability and gives text-only clients and
// screen readers clean content instead of a stripped guess.
function buildMessageFor(token) {
  const url = unsubUrl(token);
  const html = renderArticleEmail({
    title: data.title,
    subtitle: data.description,
    contentHtml,
    unsubscribeUrl: url,
    postalAddress,
    includeDisclosure,
  });
  auditNoTracking(html); // throws on any tracking artifact -> aborts the send
  const text = renderArticleText({
    title: data.title,
    subtitle: data.description,
    bodyText: contentText,
    unsubscribeUrl: url,
    postalAddress,
    includeDisclosure,
  });
  return { html, text };
}

const subject = data.title;

// ---- DRY RUN (default) ----
if (!isTest && !isSend) {
  const { html: preview, text: previewText } = buildMessageFor('SAMPLE-TOKEN-dry-run-only');
  const previewPath = '.newsletter-preview.html';
  const previewTextPath = '.newsletter-preview.txt';
  await writeFile(previewPath, preview, 'utf8');
  await writeFile(previewTextPath, previewText, 'utf8');

  const [{ count }] = await sql`
    SELECT count(*)::int AS count FROM newsletter_subscribers WHERE status = 'active'
  `;

  console.log('\n  DRY RUN - nothing sent.');
  console.log(`  Article:        ${data.title}`);
  console.log(`  Subject:        ${subject}`);
  console.log(`  Disclosure:     ${includeDisclosure ? 'yes (first-send banner)' : 'no'}`);
  console.log(`  Postal address: ${postalAddress ? 'set' : 'NOT SET (blocks --send)'}`);
  console.log(`  Active subscribers: ${count}`);
  console.log(`  Preview written to: ${previewPath} and ${previewTextPath}`);
  console.log('\n  Next: --test <addr> for a single test send, then --send for the live list.\n');
  process.exit(0);
}

// ---- shared pre-send: Resend client + force tracking OFF (fail closed) ----
const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) die('RESEND_API_KEY is not set.');
const resend = new Resend(apiKey);

// Resend's HTTP client can return transient {error} responses (or throw) on a
// flaky network. Retry a Resend call a few times; throw only if all attempts
// fail, so the caller still fails closed on a genuine, persistent error.
async function resendRetry(fn, label, attempts = 4) {
  let last;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fn();
      if (!res || !res.error) return res;
      last = res.error;
    } catch (e) {
      last = e instanceof Error ? e.message : String(e);
    }
    if (i < attempts - 1) await sleep(1200);
  }
  throw new Error(`${label} failed after ${attempts} attempts: ${typeof last === 'string' ? last : JSON.stringify(last)}`);
}

// Force open + click tracking OFF on the sending domain before every send, and
// fail closed if we cannot. Resend has no per-send tracking flag - tracking is a
// domain-level setting - so re-asserting it here is how we guarantee a future
// dashboard change can never silently turn it back on (Polaris's wall).
async function enforceNoTracking() {
  const res = await resendRetry(() => resend.domains.list(), 'domains.list');
  const domains = res.data?.data ?? res.data ?? [];
  const domain = Array.isArray(domains) ? domains.find((d) => d.name === SENDING_DOMAIN) : null;
  if (!domain) {
    die(`Resend domain "${SENDING_DOMAIN}" is not present in this account. Add and verify it before sending.`);
  }
  if (domain.status && domain.status !== 'verified') {
    die(`Resend domain "${SENDING_DOMAIN}" is not verified (status: ${domain.status}). Verify it before sending.`);
  }
  await resendRetry(
    () => resend.domains.update({ id: domain.id, openTracking: false, clickTracking: false }),
    'domains.update',
  );
  console.log(`  Tracking forced OFF for ${SENDING_DOMAIN} (open + click).`);
}

async function sendOne(toEmail, token) {
  const { html, text } = buildMessageFor(token);
  const url = unsubUrl(token);
  return resendRetry(
    () =>
      resend.emails.send({
        from: NEWSLETTER_FROM,
        to: toEmail,
        subject,
        html,
        text,
        headers: {
          // RFC 8058 one-click. Lets a mail client's native Unsubscribe button POST
          // straight to our endpoint - the prefetch-safe path.
          'List-Unsubscribe': `<${url}>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
      }),
    `send:${toEmail}`,
  );
}

// ---- TEST SEND (--test <addr>) ----
if (isTest) {
  await enforceNoTracking();

  // Upsert the test address as an active subscriber so its unsubscribe link is
  // real and end-to-end exercisable. base64url 256-bit token mirrors
  // src/lib/newsletter/unsubscribe-token.ts.
  const freshToken = randomBytes(32).toString('base64url');
  const [row] = await sql`
    INSERT INTO newsletter_subscribers (email, status, source, unsubscribe_token)
    VALUES (${testAddress.toLowerCase().trim()}, 'active', 'test', ${freshToken})
    ON CONFLICT (email) DO UPDATE SET
      status = 'active',
      unsubscribed_at = NULL,
      unsubscribe_token = COALESCE(newsletter_subscribers.unsubscribe_token, EXCLUDED.unsubscribe_token),
      updated_at = now()
    RETURNING unsubscribe_token
  `;

  const result = await sendOne(testAddress, row.unsubscribe_token);
  if (result.error) die(`Test send failed: ${JSON.stringify(result.error)}`);

  console.log(`\n  TEST SENT to ${testAddress}  (id: ${result.data?.id})`);
  console.log('  Check: rendering, the unsubscribe link (click it - it should flip this');
  console.log('  row to unsubscribed), and deliverability. Then run --send for the live list.\n');
  process.exit(0);
}

// ---- LIVE SEND (--send) ----
if (!postalAddress) {
  die('NEWSLETTER_POSTAL_ADDRESS is not set. A physical mailing address is required (CAN-SPAM) before a live send. Set it in .env and re-run.');
}

await enforceNoTracking();

const recipients = await sql`
  SELECT email, unsubscribe_token
  FROM newsletter_subscribers
  WHERE status = 'active' AND unsubscribe_token IS NOT NULL
  ORDER BY subscribed_at
`;

if (recipients.length === 0) die('No active subscribers with a valid token. Nothing to send.');

console.log(`\n  LIVE SEND`);
console.log(`  Article:  ${data.title}`);
console.log(`  From:     ${NEWSLETTER_FROM}`);
console.log(`  Recipients (active): ${recipients.length}`);
console.log(`  Disclosure banner:   ${includeDisclosure ? 'yes' : 'no'}`);

const rl = createInterface({ input, output });
const answer = await rl.question(`\n  Type the recipient count (${recipients.length}) to confirm the live send: `);
rl.close();
if (answer.trim() !== String(recipients.length)) {
  die('Confirmation did not match. Aborted. Nothing sent.');
}

console.log('\n  Sending...');
let sent = 0;
const failures = [];
for (const r of recipients) {
  try {
    const result = await sendOne(r.email, r.unsubscribe_token);
    if (result.error) {
      failures.push({ email: r.email, error: JSON.stringify(result.error) });
    } else {
      sent++;
    }
  } catch (err) {
    failures.push({ email: r.email, error: err instanceof Error ? err.message : String(err) });
  }
  await sleep(PACING_MS);
}

console.log(`\n  Done. Sent ${sent}/${recipients.length}.`);
if (failures.length) {
  console.log(`  ${failures.length} failure(s):`);
  for (const f of failures) console.log(`    ${f.email}: ${f.error}`);
}
console.log('');
