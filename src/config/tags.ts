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
  { tag: 'dados', rotulo: 'Dados', rotuloEn: 'Data' },
  { tag: 'ia', rotulo: 'IA', rotuloEn: 'AI' },
  { tag: 'backend', rotulo: 'Backend', rotuloEn: 'Backend' },
  { tag: 'automacao', rotulo: 'Automação', rotuloEn: 'Automation' },
  { tag: 'bi', rotulo: 'BI', rotuloEn: 'BI' },
  { tag: 'web', rotulo: 'Web', rotuloEn: 'Web' },
] as const satisfies readonly { tag: Tag; rotulo: string; rotuloEn: string }[];
