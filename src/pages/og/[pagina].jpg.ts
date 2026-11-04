import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { FOCOS } from '../../config/focos';
import { site } from '../../config/site';
import { publicados } from '../../lib/projetos';
import { gerarImagemOg, type DadosOg } from '../../lib/og';

export const getStaticPaths = (async () => {
  const projetos = publicados(await getCollection('projetos'));
  const paginas: { pagina: string; dados: DadosOg }[] = [
    { pagina: 'inicio', dados: { rotulo: 'Dados · Python · IA', titulo: site.nome, apoio: site.posicionamento } },
    { pagina: 'projetos', dados: { rotulo: site.nomeCurto, titulo: 'Projetos', apoio: 'Estudos de caso com problema, arquitetura, decisões e resultado.' } },
    { pagina: 'sobre', dados: { rotulo: site.nomeCurto, titulo: 'Sobre', apoio: 'Trajetória, experiência, formação e idiomas.' } },
    ...Object.entries(FOCOS).map(([nome, foco]) => ({
      pagina: `foco-${nome}`,
      dados: { rotulo: 'Dados · Python · IA', titulo: site.nome, apoio: foco.chamada },
    })),
    ...projetos.map(({ data }) => {
      const [nome = data.title, ...resto] = data.title.split(' — ');
      return { pagina: data.slug, dados: { rotulo: 'Estudo de caso', titulo: nome, apoio: resto.join(' — ') || site.nomeCurto } };
    }),
  ];
  return paginas.map(({ pagina, dados }) => ({ params: { pagina }, props: { dados } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) =>
  new Response(await gerarImagemOg((props as { dados: DadosOg }).dados), { headers: { 'Content-Type': 'image/jpeg' } });
