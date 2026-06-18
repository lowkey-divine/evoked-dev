#!/usr/bin/env node

/**
 * sync-article-to-beehiiv.mjs
 *
 * Called by .github/workflows/sync-articles-to-beehiiv.yml when a new
 * markdown file is ADDED under src/content/writing/ on main. Parses the
 * article, converts markdown to HTML, and posts it to beehiiv's V2 API
 * as a DRAFT.
 *
 * The captain reviews the draft in beehiiv before sending. No auto-send.
 *
 * Usage:
 *   node scripts/sync-article-to-beehiiv.mjs <path-to-markdown-file>
 *
 * Env vars (required):
 *   BEEHIIV_API_KEY        - V2 API key from beehiiv settings
 *   BEEHIIV_PUBLICATION_ID - publication ID (pub_xxx)
 *   SITE_URL               - optional, defaults to https://evoked.dev
 */

import { readFile } from 'node:fs/promises';
import { basename, extname } from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const SITE_URL = process.env.SITE_URL || 'https://evoked.dev';
const API_KEY = process.env.BEEHIIV_API_KEY;
const PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

if (!API_KEY || !PUBLICATION_ID) {
  console.error('Missing required env vars: BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID');
  process.exit(1);
}

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node scripts/sync-article-to-beehiiv.mjs <path>');
  process.exit(1);
}

async function main() {
  // Parse markdown + frontmatter
  const raw = await readFile(filePath, 'utf8');
  const { data, content } = matter(raw);

  if (data.draft === true) {
    console.log(`Skipping ${filePath}: draft=true in frontmatter`);
    return;
  }

  const slug = basename(filePath, extname(filePath));
  const canonicalUrl = `${SITE_URL}/writing/${slug}`;

  // Convert markdown to HTML
  const bodyHtml = marked.parse(content, { gfm: true });

  // Append canonical-link footer pointing back to evoked.dev
  const footerHtml = `
<hr />
<p style="font-size: 0.9rem; color: #5B4F3F;">
  Originally published at
  <a href="${canonicalUrl}">${canonicalUrl}</a>.
  If you'd like to follow along, you can manage your subscription at the bottom of any article.
</p>`.trim();

  const finalHtml = `${bodyHtml}\n${footerHtml}`;

  // Post to beehiiv V2 Posts API as a draft
  // Note: beehiiv V2 Posts API shape - if the captain's plan or API version
  // returns a different schema, the error JSON below will tell us what to adjust.
  const payload = {
    title: data.title,
    subtitle: data.description,
    body_content: finalHtml,
    status: 'draft',
    audience: 'free',
    platform: 'both', // email + web
    custom_fields: [],
  };

  console.log(`Posting "${data.title}" to beehiiv as draft...`);

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/posts`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );

  const respText = await res.text();
  let respJson;
  try {
    respJson = JSON.parse(respText);
  } catch {
    respJson = { raw: respText };
  }

  if (!res.ok) {
    console.error(`beehiiv API ${res.status}:`, JSON.stringify(respJson, null, 2));
    process.exit(1);
  }

  console.log(`✓ Created beehiiv draft for "${data.title}"`);
  console.log(`  Slug: ${slug}`);
  console.log(`  Canonical: ${canonicalUrl}`);
  console.log(`  beehiiv response:`, JSON.stringify(respJson, null, 2));
}

main().catch((err) => {
  console.error('sync-article-to-beehiiv failed:', err);
  process.exit(1);
});
