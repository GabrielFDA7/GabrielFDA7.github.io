import { describe, expect, it } from 'vitest';
import { publicados, vizinhos } from '../src/lib/projetos';

const projeto = (id: string, order: number, draft = false) => ({ id, data: { order, draft } });

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
