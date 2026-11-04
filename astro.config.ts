import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://gabrielfda7.github.io',
  output: 'static',
  integrations: [react()],
  // Sem realce de código: os estudos de caso quase não têm código, e assim o
  // HTML não ganha cores fixas que ignorariam o tema.
  markdown: { syntaxHighlight: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
