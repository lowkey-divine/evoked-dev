#!/usr/bin/env node
// Apply newsletter schema migrations to Neon. Idempotent; safe to re-run.
//
// Usage:  npm run migrate:newsletter   (wraps: node --env-file=.env ...)
//
// This repo has no migration framework. The .sql files under scripts/schema/
// are the schema of record; each statement carries its own IF NOT EXISTS guard,
// so idempotency IS the safety net (no state-tracking table needed). Matches
// the repo's existing `node --env-file=.env scripts/*.mjs` convention.

import { neon } from '@neondatabase/serverless';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('DATABASE_URL is not set. Run via: npm run migrate:newsletter');
  process.exit(1);
}

const sql = neon(databaseUrl);
const schemaDir = join(dirname(fileURLToPath(import.meta.url)), 'schema');

// Split a .sql file into individual statements. Our schema files contain no
// semicolons inside string literals, so strip line comments then split on ';'.
function statements(sqlText) {
  const noComments = sqlText
    .split('\n')
    .map((line) => {
      const i = line.indexOf('--');
      return i >= 0 ? line.slice(0, i) : line;
    })
    .join('\n');
  return noComments
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

const files = (await readdir(schemaDir))
  .filter((f) => f.endsWith('.sql'))
  .sort();

if (files.length === 0) {
  console.error(`No .sql files found in ${schemaDir}`);
  process.exit(1);
}

for (const file of files) {
  const text = await readFile(join(schemaDir, file), 'utf8');
  const stmts = statements(text);
  console.log(`\n${file} - ${stmts.length} statement(s)`);
  for (const stmt of stmts) {
    const label = stmt.replace(/\s+/g, ' ').slice(0, 68);
    try {
      await sql.query(stmt);
      console.log(`  ok   ${label}...`);
    } catch (err) {
      console.error(`  FAIL ${label}...`);
      console.error(`       ${err.message}`);
      process.exit(1);
    }
  }
}

console.log('\nMigration complete. Verify with: psql "$DATABASE_URL" -c "\\d newsletter_subscribers"');
