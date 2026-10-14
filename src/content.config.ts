import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse } from 'yaml';
import { categories } from './data/portfolio';

const portfolio = defineCollection({
  // getCollection() returns entries sorted by id, so record each entry's position
  // in the file: the order in portfolio.yaml is the order on the page.
  loader: file('src/content/portfolio.yaml', {
    parser: (text) => (parse(text) as Record<string, unknown>[]).map((entry, order) => ({ ...entry, order })),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.enum(categories),
      image: image(),
      alt: z.string(),
      order: z.number(),
    }),
});

export const collections = { portfolio };
