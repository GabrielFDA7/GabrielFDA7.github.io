// Regras sobre a lista de projetos. Sem `astro:content` aqui: funções puras são testáveis fora do Astro.

interface Publicavel {
  data: { draft: boolean; order: number };
}

/**
 * Tira os rascunhos e ordena pelo campo `order`. Toda página parte desta lista.
 * No `npm run dev` os rascunhos aparecem, para revisar como ficam antes de publicar.
 */
export function publicados<T extends Publicavel>(
  lista: readonly T[],
  { comRascunhos = import.meta.env.MODE === 'development' } = {},
): T[] {
  return lista.filter((item) => comRascunhos || !item.data.draft).toSorted((a, b) => a.data.order - b.data.order);
}

interface Selecionavel {
  data: { featured: boolean; tags: readonly string[] };
}

/**
 * Lista de um link de foco: os projetos com as tags do foco vêm primeiro, mesmo fora dos destaques
 * da home, seguidos dos demais destaques. Dentro de cada grupo, a ordem do site é mantida.
 */
export function selecionarParaFoco<T extends Selecionavel>(lista: readonly T[], tags: readonly string[]): T[] {
  const combina = (item: T) => item.data.tags.some((tag) => tags.includes(tag));
  return [...lista.filter(combina), ...lista.filter((item) => item.data.featured && !combina(item))];
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
