import { unified } from '@astrojs/markdown-remark';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import rehypeMermaid from 'rehype-mermaid';

export default defineConfig({
  site: 'https://gabrielfda7.github.io',
  output: 'static',
  // Cada página é uma pasta com index.html, e todo link termina em "/". É como o GitHub Pages serve sem
  // redirecionar. Com projetos.html ao lado da pasta projetos/, o endereço /projetos ficaria ambíguo.
  trailingSlash: 'always',
  integrations: [
    react(),
    // Os links de foco são enviados em candidaturas e têm noindex: não entram no mapa do site.
    sitemap({ filter: (pagina) => !pagina.includes('/foco/') }),
  ],
  markdown: {
    // Sem realce de código: os estudos de caso quase não têm código, e assim o HTML não
    // ganha cores fixas que ignorariam o tema. O realce também impediria o Mermaid de
    // reconhecer os blocos de diagrama.
    syntaxHighlight: false,
    processor: unified({
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
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
