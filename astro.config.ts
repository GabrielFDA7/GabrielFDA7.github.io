import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import rehypeMermaid from 'rehype-mermaid';

export default defineConfig({
  site: 'https://gabrielfda7.github.io',
  output: 'static',
  integrations: [react()],
  markdown: {
    // Sem realce de código: os estudos de caso quase não têm código, e assim o
    // HTML não ganha cores fixas que ignorariam o tema.
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypeMermaid,
        {
          // O SVG entra direto no HTML: o visitante não baixa script nenhum, e o CSS
          // do site consegue pintar o diagrama com as cores do tema ativo.
          strategy: 'inline-svg',
          // O diagrama é desenhado em um navegador durante o build. Na máquina local
          // usa o Edge já instalado; no CI, o Chromium instalado pelo Playwright.
          launchOptions: process.env.CI ? {} : { channel: 'msedge' },
          mermaidConfig: {
            theme: 'base',
            fontFamily: 'Arial, Helvetica, sans-serif',
            // Nós estreitos e próximos: o diagrama precisa continuar legível em 360 px.
            flowchart: { curve: 'basis', wrappingWidth: 130, nodeSpacing: 22, rankSpacing: 32 },
          },
        },
      ],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
