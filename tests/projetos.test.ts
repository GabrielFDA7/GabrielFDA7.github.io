import { describe, expect, it } from 'vitest';
import { FOCOS } from '../src/config/focos';
import { TAGS } from '../src/config/tags';
import { publicados, selecionarParaFoco, vizinhos } from '../src/lib/projetos';

const projeto = (id: string, order: number, draft = false) => ({ id, data: { order, draft } });
const comTags = (id: string, tags: string[], featured = false) => ({ id, data: { tags, featured } });

describe('selecionarParaFoco', () => {
  const lista = [
    comTags('destaque-sem-tag', ['web'], true),
    comTags('com-tag-fora-dos-destaques', ['dados']),
    comTags('destaque-com-tag', ['bi'], true),
    comTags('sem-relacao', ['jogos']),
  ];
  const ids = (tags: string[]) => selecionarParaFoco(lista, tags).map((p) => p.id);

  it('põe primeiro os projetos com as tags do foco, mantendo a ordem do site', () => {
    expect(ids(['dados', 'bi']).slice(0, 2)).toEqual(['com-tag-fora-dos-destaques', 'destaque-com-tag']);
  });

  it('mantém os demais destaques depois deles', () => {
    expect(ids(['dados', 'bi'])[2]).toBe('destaque-sem-tag');
  });

  it('deixa de fora o que não combina nem é destaque', () => {
    expect(ids(['dados', 'bi'])).not.toContain('sem-relacao');
  });

  it('não repete um projeto que combina com mais de uma tag', () => {
    const repetido = selecionarParaFoco([comTags('a', ['dados', 'bi'], true)], ['dados', 'bi']);
    expect(repetido).toHaveLength(1);
  });
});

describe('FOCOS', () => {
  it.each(Object.entries(FOCOS))('%s tem chamada, tags válidas e currículo em /cv/', (_nome, foco) => {
    expect(foco.chamada.length).toBeGreaterThan(0);
    expect(foco.tags.length).toBeGreaterThan(0);
    expect(foco.tags.every((tag) => (TAGS as readonly string[]).includes(tag))).toBe(true);
    expect(foco.curriculo).toMatch(/^\/cv\/.+\.pdf$/);
  });
});

describe('publicados', () => {
  it('tira os rascunhos', () => {
    const lista = publicados([projeto('a', 1), projeto('rascunho', 2, true)]);
    expect(lista.map((p) => p.id)).toEqual(['a']);
  });

  it('mantém os rascunhos quando pedido, como no servidor de desenvolvimento', () => {
    const lista = publicados([projeto('a', 1), projeto('rascunho', 2, true)], { comRascunhos: true });
    expect(lista.map((p) => p.id)).toEqual(['a', 'rascunho']);
  });

  it('ordena pelo campo order sem alterar a lista original', () => {
    const original = [projeto('c', 3), projeto('a', 1), projeto('b', 2)];
    expect(publicados(original).map((p) => p.id)).toEqual(['a', 'b', 'c']);
    expect(original.map((p) => p.id)).toEqual(['c', 'a', 'b']);
  });
});

describe('vizinhos', () => {
  const lista = ['a', 'b', 'c'];

  it('devolve os dois lados no meio da lista', () => {
    expect(vizinhos(lista, 1)).toEqual({ anterior: 'a', proximo: 'c' });
  });

  it('deixa as pontas sem vizinho', () => {
    expect(vizinhos(lista, 0).anterior).toBeUndefined();
    expect(vizinhos(lista, 2).proximo).toBeUndefined();
  });
});
