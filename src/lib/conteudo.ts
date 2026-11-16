// Projetos e experiência no idioma da página. Toda página lê o conteúdo por aqui, nunca direto da coleção.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Idioma } from '../i18n/rotas';
import { publicados } from './projetos';

export type Projeto = CollectionEntry<'projetos'> & {
  /** O Markdown que a página renderiza: o original ou a tradução. */
  entrada: CollectionEntry<'projetos'> | CollectionEntry<'projetosEn'>;
  /** O slug nos dois idiomas, para o seletor de idioma levar à mesma página. */
  slugs: { pt: string; en?: string | undefined };
};

export type Experiencia = CollectionEntry<'experiencia'> & {
  entrada: CollectionEntry<'experiencia'> | CollectionEntry<'experienciaEn'>;
};

/**
 * Os projetos publicados, na ordem do site. Em inglês, cada um recebe por cima os textos da tradução;
 * um projeto ainda sem tradução fica fora da versão em inglês, em vez de aparecer em português.
 */
export async function projetosNoIdioma(idioma: Idioma): Promise<Projeto[]> {
  const originais = publicados(await getCollection('projetos'));
  const traducoes = new Map((await getCollection('projetosEn')).map((item) => [item.id, item]));
  return originais.flatMap((original): Projeto[] => {
    const traducao = traducoes.get(original.id);
    const slugs = { pt: original.data.slug, en: traducao?.data.slug };
    if (idioma === 'pt') return [{ ...original, entrada: original, slugs }];
    if (!traducao) return [];
    const { stack = original.data.stack, ...textos } = traducao.data;
    return [{ ...original, data: { ...original.data, ...textos, stack }, entrada: traducao, slugs }];
  });
}

export async function experienciaNoIdioma(idioma: Idioma): Promise<Experiencia[]> {
  const originais = (await getCollection('experiencia')).toSorted((a, b) => a.data.order - b.data.order);
  const traducoes = new Map((await getCollection('experienciaEn')).map((item) => [item.id, item]));
  return originais.flatMap((original): Experiencia[] => {
    if (idioma === 'pt') return [{ ...original, entrada: original }];
    const traducao = traducoes.get(original.id);
    return traducao ? [{ ...original, data: { ...original.data, ...traducao.data }, entrada: traducao }] : [];
  });
}
