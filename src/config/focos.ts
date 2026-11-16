// Links de foco enviados em cada candidatura. Para criar um foco novo, basta acrescentar uma
// entrada aqui: as rotas /foco/<nome>/ e /en/focus/<name>/ nascem sozinhas, sem mexer em componente.
import type { Idioma } from '../i18n/rotas';
import type { Tag } from './tags';

export interface VersaoFoco {
  /** O nome no endereço: /foco/dados/ ou /en/focus/data/. */
  nome: string;
  /** Substitui a linha de posicionamento da abertura. */
  chamada: string;
  /** Arquivo em public/cv/, oferecido no botão de currículo. */
  curriculo: string;
}

export interface Foco extends Record<Idioma, VersaoFoco> {
  /** Projetos com uma destas tags vêm primeiro. */
  tags: readonly Tag[];
  /** Leva a seção "Como eu trabalho com IA" para logo depois da abertura. */
  iaPrimeiro?: boolean;
  /** Projeto que abre a página no lugar do NextUp: o nome do arquivo em src/content/projetos/, sem .md. */
  principal?: string;
}

export const FOCOS: readonly Foco[] = [
  {
    tags: ['dados', 'bi'],
    // Para vaga de dados, o pipeline de telemetria mostra mais que um recomendador de parque (Gabriel, 15/11/2026).
    principal: 'telemetria-de-frota',
    pt: {
      nome: 'dados',
      chamada: 'Transformo dados de máquinas, SAP e APIs em decisão',
      curriculo: '/cv/Gabriel-de-Angelis-curriculo-dados.pdf',
    },
    en: {
      nome: 'data',
      chamada: 'I turn machine, SAP and API data into decisions',
      curriculo: '/cv/Gabriel-de-Angelis-resume-data.pdf',
    },
  },
  {
    tags: ['ia'],
    iaPrimeiro: true,
    pt: {
      nome: 'ia',
      chamada: 'Construo software com IA no método, não só no discurso',
      curriculo: '/cv/Gabriel-de-Angelis-curriculo-ia.pdf',
    },
    en: {
      nome: 'ai',
      chamada: 'I build software with AI as a method, not a buzzword',
      curriculo: '/cv/Gabriel-de-Angelis-resume-ai.pdf',
    },
  },
  {
    tags: ['backend'],
    pt: {
      nome: 'backend',
      chamada: 'APIs em Python testadas e em produção',
      curriculo: '/cv/Gabriel-de-Angelis-curriculo-python.pdf',
    },
    en: {
      nome: 'backend',
      chamada: 'Tested Python APIs, running in production',
      curriculo: '/cv/Gabriel-de-Angelis-resume-python.pdf',
    },
  },
];
