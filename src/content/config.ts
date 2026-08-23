import { defineCollection, z } from 'astro:content';

const writing = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
    sovereign: z.boolean().optional().default(false),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  }),
});

const course = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    teaches: z.string(),
    // Search/answer-shaped phrasing for the <title> tag and JSON-LD name.
    // The on-page H1 still uses `title` (e.g. "Module 1 - Enact"); `question`
    // is the standalone query a searcher would type. Falls back to title.
    question: z.string().optional(),
  }),
});

export const collections = { writing, course };
