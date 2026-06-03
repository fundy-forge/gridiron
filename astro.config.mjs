// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://gridironbrewing.com',
  output: 'static',
  adapter: cloudflare(),
  integrations: [sitemap(), keystatic()],
  vite: {
    plugins: [tailwindcss()]
  },
});
