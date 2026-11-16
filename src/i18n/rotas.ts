// Os dois idiomas do site. O português fica na raiz, como sempre esteve; o inglês, em /en/.
// Sem `astro:*` aqui: funções puras, testáveis fora do Astro e usáveis na ilha React.

export const IDIOMAS = ['pt', 'en'] as const;
export type Idioma = (typeof IDIOMAS)[number];

/** O idioma de uma página sai do endereço dela: tudo em /en/ é inglês. */
export function idiomaDe(caminho: string): Idioma {
  return caminho === '/en' || caminho.startsWith('/en/') ? 'en' : 'pt';
}

export const outroIdioma = (idioma: Idioma): Idioma => (idioma === 'pt' ? 'en' : 'pt');

const PAGINAS = {
  inicio: { pt: '/', en: '/en/' },
  projetos: { pt: '/projetos/', en: '/en/projects/' },
  sobre: { pt: '/sobre/', en: '/en/about/' },
} as const;

export type Pagina = keyof typeof PAGINAS;

export const rota = (idioma: Idioma, pagina: Pagina): string => PAGINAS[pagina][idioma];

/** Estudo de caso. Cada idioma tem o próprio slug: "telemetria-de-frota" e "fleet-telemetry". */
export const rotaProjeto = (idioma: Idioma, slug: string): string => `${rota(idioma, 'projetos')}${slug}/`;

/** Link de foco. O nome muda com o idioma: /foco/dados/ e /en/focus/data/. */
export const rotaFoco = (idioma: Idioma, nome: string): string =>
  idioma === 'en' ? `/en/focus/${nome}/` : `/foco/${nome}/`;

/** Atributos de idioma de cada versão: `lang` no HTML, `hreflang` nos links e `og:locale`. */
export const LOCALE = {
  pt: { lang: 'pt-BR', og: 'pt_BR' },
  en: { lang: 'en', og: 'en_US' },
} as const satisfies Record<Idioma, { lang: string; og: string }>;
