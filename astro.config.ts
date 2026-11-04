import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://gabrielfda7.github.io',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
