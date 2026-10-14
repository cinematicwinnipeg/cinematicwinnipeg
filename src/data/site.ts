export const site = {
  name: 'Cinematic Winnipeg',
  url: 'https://cinematicwinnipeg.ca',
  domain: 'cinematicwinnipeg.ca',
  email: 'cinematicwinnipeg@gmail.com',
  instagram: {
    handle: '@cinematicwinnipeg',
    url: 'https://instagram.com/cinematicwinnipeg',
  },
  tagline: 'Photography · Film · Aerial — Winnipeg, Manitoba',
  /** Show the curated Instagram grid on the home page. */
  showInstagram: true,
} as const;

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
] as const;
