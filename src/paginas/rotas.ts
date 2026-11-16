// As rotas dinâmicas dos dois idiomas usam estas mesmas funções: só o arquivo de rota muda de lugar.
import { FOCOS } from '../config/focos';
import type { Idioma } from '../i18n/rotas';
import { projetosNoIdioma } from '../lib/conteudo';
import { vizinhos } from '../lib/projetos';

export async function caminhosDosProjetos(idioma: Idioma) {
  const lista = await projetosNoIdioma(idioma);
  return lista.map((projeto, indice) => ({
    params: { slug: projeto.data.slug },
    props: { projeto, ...vizinhos(lista, indice) },
  }));
}

export function caminhosDosFocos(idioma: Idioma) {
  return FOCOS.map((foco) => ({ params: { foco: foco[idioma].nome }, props: { foco } }));
}
