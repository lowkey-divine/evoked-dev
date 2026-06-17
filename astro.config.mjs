// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://evoked.dev',
  output: 'static',
  adapter: vercel(),
  redirects: {
    // Historical: /projects/executive-chef was the original kitchen-table marketing
    // page (renamed 2026-06-05). After /projects/kitchen-table was deleted as
    // an orphan, both legacy URLs now redirect directly to the canonical
    // /kitchen-table marketing surface.
    '/projects/executive-chef': '/kitchen-table',
    '/projects/kitchen-table': '/kitchen-table',
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/thank-you/') &&
        !page.includes('/api/'),
      serialize: (item) => {
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
});
