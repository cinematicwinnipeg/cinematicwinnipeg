/** Portfolio categories, in filter-chip order. Entries live in src/content/portfolio.yaml. */
export const categories = ['Galas', 'Corporate', 'Golf', 'Festivals', 'Aerial'] as const;

export type Category = (typeof categories)[number];
