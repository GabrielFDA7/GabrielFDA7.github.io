// Regras sobre a lista de projetos. Sem `astro:content` aqui: funções puras são testáveis fora do Astro.

interface Publicavel {
  data: { draft: boolean; order: number };
}

/** Tira os rascunhos e ordena pelo campo `order`. Toda página parte desta lista. */
export function publicados<T extends Publicavel>(lista: readonly T[]): T[] {
  return lista.filter((item) => !item.data.draft).toSorted((a, b) => a.data.order - b.data.order);
}

/** Projeto anterior e próximo na ordem do site. Não dá a volta: as pontas ficam sem vizinho. */
export function vizinhos<T>(lista: readonly T[], indice: number): { anterior?: T; proximo?: T } {
  return { anterior: lista[indice - 1], proximo: lista[indice + 1] };
}

export const ROTULO_STATUS = {
  'em-producao': 'Em produção',
  concluido: 'Concluído',
  'em-desenvolvimento': 'Em desenvolvimento',
} as const;

export const ROTULO_CONTEXTO = {
  pessoal: 'Pessoal',
  profissional: 'Profissional',
  academico: 'Acadêmico',
  freelance: 'Freelance',
} as const;
