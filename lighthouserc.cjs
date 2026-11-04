// Lighthouse no celular, que é o padrão da ferramenta. Abaixo de 95 em qualquer categoria, o CI reprova.
const PAGINAS = ['/', '/projetos/', '/projetos/nextup/', '/sobre/'];

module.exports = {
  ci: {
    collect: {
      startServerCommand: 'node scripts/servir-dist.mjs 4399',
      startServerReadyPattern: 'pronto',
      url: PAGINAS.map((pagina) => `http://localhost:4399${pagina}`),
      numberOfRuns: 3,
      settings: { chromeFlags: '--no-sandbox --headless=new' },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
      },
    },
    upload: { target: 'filesystem', outputDir: '.lighthouseci' },
  },
};
