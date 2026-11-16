import type { APIRoute, GetStaticPaths } from 'astro';
import { FOCOS } from '../../config/focos';
import { site } from '../../config/site';
import { IDIOMAS, TEXTOS, type Idioma } from '../../i18n';
import { projetosNoIdioma } from '../../lib/conteudo';
import { gerarImagemOg, type DadosOg } from '../../lib/og';

// Uma imagem por página e por idioma. As do inglês levam o prefixo "en-", e o nome de projeto é sempre
// o slug em português, para o BaseLayout achar a imagem sabendo só o idioma.
async function paginasDoIdioma(idioma: Idioma): Promise<{ pagina: string; dados: DadosOg }[]> {
  const t = TEXTOS[idioma];
  const projetos = await projetosNoIdioma(idioma);
  const paginas = [
    { pagina: 'inicio', dados: { rotulo: t.rotuloAbertura, titulo: site.nome, apoio: t.posicionamento } },
    { pagina: 'projetos', dados: { rotulo: site.nomeCurto, titulo: t.projetos.titulo, apoio: t.projetos.apoioOg } },
    { pagina: 'sobre', dados: { rotulo: site.nomeCurto, titulo: t.sobre.titulo, apoio: t.sobre.apoioOg } },
    ...FOCOS.map((foco) => ({
      pagina: `foco-${foco.pt.nome}`,
      dados: { rotulo: t.rotuloAbertura, titulo: site.nome, apoio: foco[idioma].chamada },
    })),
    ...projetos.map(({ data, slugs }) => {
      const [nome = data.title, ...resto] = data.title.split(' — ');
      return { pagina: slugs.pt, dados: { rotulo: t.estudo.rotuloOg, titulo: nome, apoio: resto.join(' — ') || site.nomeCurto } };
    }),
  ];
  const prefixo = idioma === 'en' ? 'en-' : '';
  return paginas.map(({ pagina, dados }) => ({ pagina: prefixo + pagina, dados }));
}

export const getStaticPaths = (async () => {
  const paginas = (await Promise.all(IDIOMAS.map(paginasDoIdioma))).flat();
  return paginas.map(({ pagina, dados }) => ({ params: { pagina }, props: { dados } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) =>
  new Response(await gerarImagemOg((props as { dados: DadosOg }).dados), { headers: { 'Content-Type': 'image/jpeg' } });
