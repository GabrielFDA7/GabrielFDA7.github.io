// Fonte única das tags: o schema dos projetos e o filtro leem esta mesma lista.
export const TAGS = [
  'dados',
  'ia',
  'backend',
  'automacao',
  'bi',
  'web',
  'industrial',
  'geo',
  'design',
  'jogos',
  'negocio',
] as const;

export type Tag = (typeof TAGS)[number];
