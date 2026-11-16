import { idiomaDe, type Idioma } from './rotas';
import { TEXTOS, type Textos } from './textos';

export * from './rotas';
export { TEXTOS, type Textos };

/** O idioma e os textos da página, a partir do endereço dela. Uso: `const { idioma, t } = idiomaDaPagina(Astro.url)`. */
export function idiomaDaPagina(url: URL): { idioma: Idioma; t: Textos } {
  const idioma = idiomaDe(url.pathname);
  return { idioma, t: TEXTOS[idioma] };
}
