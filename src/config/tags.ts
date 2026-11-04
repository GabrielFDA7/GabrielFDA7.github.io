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

// Só estas tags viram botão no filtro de /projetos. As demais servem de classificação.
export const FILTROS = [
  { tag: 'dados', rotulo: 'Dados' },
  { tag: 'ia', rotulo: 'IA' },
  { tag: 'backend', rotulo: 'Backend' },
  { tag: 'automacao', rotulo: 'Automação' },
  { tag: 'bi', rotulo: 'BI' },
  { tag: 'web', rotulo: 'Web' },
] as const satisfies readonly { tag: Tag; rotulo: string }[];
