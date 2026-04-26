#!/usr/bin/env node
// Local-only sovereignty score submissions inspector.
// Privacy-by-default: counts and stats free, emails behind --list flag.
// Reads from Neon Postgres via DATABASE_URL.

import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL is not set. Run via: npm run subscribers');
  process.exit(1);
}

const sql = neon(databaseUrl);
const args = process.argv.slice(2);
const showList = args.includes('--list') || args.includes('--emails');
const recentOnly = args.includes('--recent');

const [counts] = await sql`
  SELECT
    COUNT(*)::int AS total,
    COUNT(DISTINCT email)::int AS people,
    MIN(submitted_at) AS first,
    MAX(submitted_at) AS latest
  FROM sovereignty_submissions
`;

const byType = await sql`
  SELECT type, COUNT(*)::int AS count, COUNT(DISTINCT email)::int AS people
  FROM sovereignty_submissions
  GROUP BY type ORDER BY type
`;

console.log('Sovereignty Score Submissions');
console.log('─'.repeat(40));
console.log(`Total submissions: ${counts.total}`);
console.log(`Unique people:     ${counts.people}`);
if (counts.total > 0) {
  console.log(`First:             ${new Date(counts.first).toISOString().slice(0, 16).replace('T', ' ')}`);
  console.log(`Latest:            ${new Date(counts.latest).toISOString().slice(0, 16).replace('T', ' ')}`);
  console.log('');
  console.log('By assessment type:');
  for (const row of byType) {
    console.log(`  ${row.type.padEnd(6)} ${row.count} submissions  (${row.people} unique)`);
  }
}

if (showList && counts.total > 0) {
  console.log('');
  console.log('Submissions:');
  console.log('─'.repeat(60));
  const limit = recentOnly ? 20 : 1000;
  const rows = await sql`
    SELECT email, score, type, submitted_at
    FROM sovereignty_submissions
    ORDER BY submitted_at DESC
    LIMIT ${limit}
  `;
  for (const row of rows) {
    const date = new Date(row.submitted_at).toISOString().slice(0, 10);
    console.log(`  ${date}  ${row.type.padEnd(5)}  ${String(row.score).padStart(3)}  ${row.email}`);
  }
  if (recentOnly && counts.total > 20) {
    console.log(`\n(Showing 20 most recent. Use --list without --recent for all.)`);
  }
}
