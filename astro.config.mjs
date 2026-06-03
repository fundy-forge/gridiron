// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://gridironbrewing.com',
  output: 'static',
  adapter: cloudflare({ platformProxy: { enabled: false } }),
  integrations: [react(), markdoc(), ...(isProd ? [] : [keystatic()]), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['@keystatic/core', '@keystatic/astro'],
    },
  },
});
