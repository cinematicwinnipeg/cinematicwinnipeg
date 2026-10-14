// @ts-check
import { defineConfig, sharpImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cinematicwinnipeg.ca',
  // Emit /services.html etc. so Netlify serves clean URLs (/services) without trailing-slash redirects.
  trailingSlash: 'never',
  build: { format: 'file' },
  image: {
    // Encoder defaults for every optimized photo (AVIF + WebP sources, JPEG fallback).
    service: sharpImageService({
      avif: { quality: 55 },
      webp: { quality: 76 },
      jpeg: { quality: 78, mozjpeg: true },
    }),
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/(thanks|404)$/.test(page),
    }),
  ],
});
