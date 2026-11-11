import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const posts = defineCollection({
  loader: glob({ pattern: import.meta.env.DEV ? '**/index.{md,mdx}' : ['**/index.{md,mdx}', '!writing-lab/**'], base: './content/posts', generateId: ({ entry }) => entry.replace(/\/index\.(md|mdx)$/, '') }),
  schema: ({ image }) => z.object({
    title: z.string().min(1),
    description: z.string().default(''),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(true),
    featured: z.boolean().default(false),
    hero: image().optional(),
    heroAlt: z.string().optional(),
  }),
});
export const collections = { posts };
