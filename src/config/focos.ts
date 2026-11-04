// Links de foco enviados em cada candidatura. Para criar um foco novo, basta acrescentar uma
// entrada aqui: a rota /foco/<nome> nasce sozinha, sem mexer em componente.
import type { Tag } from './tags';

export interface Foco {
  /** Substitui a linha de posicionamento da abertura. */
  chamada: string;
  /** Projetos com uma destas tags vêm primeiro. */
  tags: readonly Tag[];
  /** Arquivo em public/cv/, oferecido no botão "Baixar currículo". */
  curriculo: string;
  /** Leva a seção "Como eu trabalho com IA" para logo depois da abertura. */
  iaPrimeiro?: boolean;
}

export const FOCOS: Record<string, Foco> = {
  dados: {
    chamada: 'Transformo dados de máquinas, SAP e APIs em decisão',
    tags: ['dados', 'bi'],
    curriculo: '/cv/curriculo-dados.pdf',
  },
  ia: {
    chamada: 'Construo software com IA no método, não só no discurso',
    tags: ['ia'],
    curriculo: '/cv/curriculo-ai-engineer.pdf',
    iaPrimeiro: true,
  },
  backend: {
    chamada: 'APIs em Python testadas e em produção',
    tags: ['backend'],
    curriculo: '/cv/curriculo-dev-python.pdf',
  },
};
