// Todo texto de interface, nos dois idiomas. O conteúdo dos projetos e da experiência fica no Markdown;
// aqui ficam rótulos, botões, títulos de seção e as frases fixas das páginas.
// O tipo do inglês é o do português: uma chave esquecida em um dos dois idiomas não compila.
import type { Idioma } from './rotas';

const NEXTUP = 'https://github.com/GabrielFDA7/nextup';

const pt = {
  rotuloAbertura: 'Dados · Python · IA',
  posicionamento: 'Construo produtos com dados, Python e IA',
  apoio:
    'Trabalho com Python, dados e automação na Sotreq, revenda oficial Caterpillar no Brasil. Estudo Sistemas de Informação na UFU.',
  descricao:
    'Portfólio de Gabriel Faria de Angelis: produtos com dados, Python e IA, com testes, CI e deploy em produção.',
  curriculoPadrao: '/cv/Gabriel-de-Angelis-curriculo-python.pdf',
  cargoAtual: 'Analista de Leads (Assistente de Produto)',
  conhecimentos: ['Python', 'Engenharia de dados', 'Automação', 'Inteligência artificial'],

  menu: { principal: 'Principal', projetos: 'Projetos', sobre: 'Sobre', inicio: 'página inicial' },
  idioma: { sigla: 'PT', nome: 'Português', trocar: 'Ler em português', grupo: 'Idioma' },
  tema: { escuro: 'Usar tema escuro', claro: 'Usar tema claro' },
  pular: 'Pular para o conteúdo',
  fotoDe: 'Foto de',
  email: 'E-mail',

  abertura: { verProjetos: 'Ver projetos', curriculo: 'Baixar currículo' },
  inicio: {
    emDestaque: 'Em destaque',
    outrosProjetos: 'Outros projetos',
    verTodos: 'Ver todos os projetos',
    projetoPrincipal: 'Projeto principal',
  },
  projeto: {
    verEstudo: 'Ver estudo de caso',
    demo: 'Abrir demo',
    codigo: 'Código',
    rascunho: 'Rascunho',
    status: { 'em-producao': 'Em produção', concluido: 'Concluído', 'em-desenvolvimento': 'Em desenvolvimento' },
    contexto: { pessoal: 'Pessoal', profissional: 'Profissional', academico: 'Acadêmico', freelance: 'Freelance' },
  },
  metodo: {
    rotulo: 'Método',
    titulo: 'Como eu trabalho com IA',
    descricao:
      'O NextUp foi construído com Claude Code. O processo é tão público quanto o código, e cada passo aponta para o arquivo real no repositório.',
    ferramentas: 'Ferramentas de IA que eu uso',
    praticas: [
      {
        titulo: 'Contexto versionado',
        texto: 'O agente começa cada sessão lendo a arquitetura, as convenções e as decisões em um arquivo que evolui com o código.',
        links: [{ rotulo: 'CLAUDE.md', href: `${NEXTUP}/blob/main/CLAUDE.md` }],
      },
      {
        titulo: 'Skills próprias',
        texto: 'Fluxos repetidos viram instrução executável: uma exige medição antes de escolher um algoritmo ou limiar, e outra fecha a sessão com o registro feito.',
        links: [
          { rotulo: 'medir-antes-de-implementar', href: `${NEXTUP}/blob/main/.claude/skills/medir-antes-de-implementar/SKILL.md` },
          { rotulo: 'fechar-sessao', href: `${NEXTUP}/blob/main/.claude/skills/fechar-sessao/SKILL.md` },
        ],
      },
      {
        titulo: 'Prompts em destaque',
        texto: 'Seis prompts escolhidos mostram como conduzi o projeto: o enquadramento do problema, as decisões de produto e os bugs que achei usando o app.',
        links: [{ rotulo: 'docs/PROMPTS.md', href: `${NEXTUP}/blob/main/docs/PROMPTS.md` }],
      },
      {
        titulo: 'Testes e CI como rede de segurança',
        texto: 'O código do agente passa pelo mesmo crivo que o meu: 946 testes e CI em Python 3.11, 3.12 e 3.13.',
        links: [{ rotulo: 'ci.yml', href: `${NEXTUP}/blob/main/.github/workflows/ci.yml` }],
      },
    ],
  },
  experiencia: { rotulo: 'Trajetória', titulo: 'Experiência', completa: 'Trajetória completa' },
  contato: { rotulo: 'Contato', titulo: 'Vamos conversar', texto: 'O caminho mais rápido é o e-mail.' },

  projetos: {
    titulo: 'Projetos',
    descricaoMeta: 'Todos os projetos de Gabriel Faria de Angelis, com filtro por dados, IA, backend, automação, BI e web.',
    descricao: 'Cada um conta o problema, o que foi meu e as decisões que tomei no caminho.',
    apoioOg: 'O problema, o que foi meu e as decisões de cada projeto.',
  },
  estudo: {
    rotuloOg: 'Estudo de caso',
    todos: 'Todos os projetos',
    emResumo: 'Em resumo',
    problema: 'O problema',
    feito: 'O que eu fiz',
    resultado: 'Resultado',
    sobreProjeto: 'Sobre o projeto',
    equipe: 'Equipe',
    periodo: 'Período',
    status: 'Status',
    tecnologias: 'Tecnologias',
    avisoPadrao: 'Projeto corporativo: dados e nomes de clientes omitidos.',
    nestaPagina: 'Nesta página',
    outros: 'Outros projetos',
    anterior: 'Projeto anterior',
    proximo: 'Próximo projeto',
  },
  sobre: {
    titulo: 'Sobre',
    descricao: 'Trajetória, experiência, formação e idiomas de Gabriel Faria de Angelis.',
    apoioOg: 'Trajetória, experiência, formação e idiomas.',
    // HTML confiável, escrito aqui mesmo: só o link para o NextUp.
    paragrafos: [
      'Entrei na Sotreq, revenda oficial Caterpillar no Brasil, em fevereiro de 2025, como estagiário de Automação e Dados. Em março de 2026 passei a Analista de Leads, e hoje construo pipelines, integrações e automações sobre dados de máquinas e do SAP.',
      'Fora do trabalho, construí o <a href="/projetos/nextup/">NextUp</a>, uma API em Python em produção, com testes, CI e deploy contínuo.',
      'Estudo Sistemas de Informação na UFU, com conclusão em dezembro de 2027.',
    ],
    tecnologiasRotulo: 'O que uso',
    tecnologias: 'Tecnologias',
    escolherArea: 'Escolher área de tecnologia',
    alemRotulo: 'Fora do dia a dia',
    alem: 'Além do código',
    alemItens: [
      'Presidente da CIPA na Sotreq Uberlândia.',
      'Maratona de programação: algoritmos e estruturas de dados (grafos, programação dinâmica, teoria dos números e algoritmos gulosos), em C e C++20.',
      'Freelance: identidades visuais para 4 pequenos negócios, com os kits gerados por código (Python e Pillow).',
    ],
    formacaoEIdiomas: 'Formação e idiomas',
    formacao: 'Formação',
    curso: 'Bacharelado em Sistemas de Informação',
    faculdade: 'Universidade Federal de Uberlândia · 6º período · conclusão em dez/2027',
    pesquisa: 'VIII Iniciação Científica da FAMAT/UFU',
    idiomas: 'Idiomas',
    ingles: 'Inglês',
  },
  erro: {
    titulo: 'Página não encontrada',
    descricao: 'Esta página não existe. Veja os links para continuar navegando.',
    texto: 'O endereço pode estar errado, ou a página mudou de lugar. Daqui você consegue seguir:',
    inicio: 'Página inicial',
  },
};

export type Textos = typeof pt;

const en: Textos = {
  rotuloAbertura: 'Data · Python · AI',
  posicionamento: 'I build products with data, Python and AI',
  apoio:
    'I work with Python, data and automation at Sotreq, the official Caterpillar dealer in Brazil. I study Information Systems at the Federal University of Uberlândia (UFU).',
  descricao:
    'Portfolio of Gabriel Faria de Angelis: products built with data, Python and AI, with tests, CI and production deployment.',
  curriculoPadrao: '/cv/Gabriel-de-Angelis-resume-python.pdf',
  cargoAtual: 'Leads Analyst (Product Assistant)',
  conhecimentos: ['Python', 'Data engineering', 'Automation', 'Artificial intelligence'],

  menu: { principal: 'Main', projetos: 'Projects', sobre: 'About', inicio: 'home page' },
  idioma: { sigla: 'EN', nome: 'English', trocar: 'Read in English', grupo: 'Language' },
  tema: { escuro: 'Switch to dark theme', claro: 'Switch to light theme' },
  pular: 'Skip to content',
  fotoDe: 'Photo of',
  email: 'Email',

  abertura: { verProjetos: 'See projects', curriculo: 'Download résumé' },
  inicio: {
    emDestaque: 'Featured',
    outrosProjetos: 'More projects',
    verTodos: 'See all projects',
    projetoPrincipal: 'Main project',
  },
  projeto: {
    verEstudo: 'Read the case study',
    demo: 'Open demo',
    codigo: 'Code',
    rascunho: 'Draft',
    status: { 'em-producao': 'In production', concluido: 'Completed', 'em-desenvolvimento': 'In development' },
    contexto: { pessoal: 'Personal', profissional: 'Professional', academico: 'Academic', freelance: 'Freelance' },
  },
  metodo: {
    rotulo: 'Method',
    titulo: 'How I work with AI',
    descricao:
      'NextUp was built with Claude Code. The process is as public as the code, and each step links to the real file in the repository.',
    ferramentas: 'AI tools I use',
    praticas: [
      {
        titulo: 'Versioned context',
        texto: 'The agent starts every session by reading the architecture, conventions and decisions in a file that evolves with the code.',
        links: pt.metodo.praticas[0]!.links,
      },
      {
        titulo: 'Custom skills',
        texto: 'Repeated workflows become executable instructions: one requires measuring before choosing an algorithm or threshold, and another closes each session with the record written.',
        links: pt.metodo.praticas[1]!.links,
      },
      {
        titulo: 'Selected prompts',
        texto: 'Six hand-picked prompts show how I led the project: framing the problem, product decisions and the bugs I found by using the app.',
        links: pt.metodo.praticas[2]!.links,
      },
      {
        titulo: 'Tests and CI as a safety net',
        texto: "The agent's code goes through the same checks as mine: 946 tests and CI on Python 3.11, 3.12 and 3.13.",
        links: pt.metodo.praticas[3]!.links,
      },
    ],
  },
  experiencia: { rotulo: 'Career', titulo: 'Experience', completa: 'Full background' },
  contato: { rotulo: 'Contact', titulo: "Let's talk", texto: 'Email is the fastest way to reach me.' },

  projetos: {
    titulo: 'Projects',
    descricaoMeta: 'All projects by Gabriel Faria de Angelis, filterable by data, AI, backend, automation, BI and web.',
    descricao: 'Each one covers the problem, what my part was and the decisions I made along the way.',
    apoioOg: 'The problem, my part and the decisions behind each project.',
  },
  estudo: {
    rotuloOg: 'Case study',
    todos: 'All projects',
    emResumo: 'In short',
    problema: 'The problem',
    feito: 'What I did',
    resultado: 'Result',
    sobreProjeto: 'About the project',
    equipe: 'Team',
    periodo: 'Period',
    status: 'Status',
    tecnologias: 'Technologies',
    avisoPadrao: 'Corporate project: client data and names omitted.',
    nestaPagina: 'On this page',
    outros: 'More projects',
    anterior: 'Previous project',
    proximo: 'Next project',
  },
  sobre: {
    titulo: 'About',
    descricao: 'Background, experience, education and languages of Gabriel Faria de Angelis.',
    apoioOg: 'Background, experience, education and languages.',
    paragrafos: [
      'I joined Sotreq, the official Caterpillar dealer in Brazil, in February 2025 as an Automation and Data intern. In March 2026 I became a Leads Analyst, and today I build pipelines, integrations and automations on machine and SAP data.',
      'Outside work, I built <a href="/en/projects/nextup/">NextUp</a>, a Python API in production, with tests, CI and continuous deployment.',
      'I study Information Systems at the Federal University of Uberlândia (UFU), graduating in December 2027.',
    ],
    tecnologiasRotulo: 'What I use',
    tecnologias: 'Technologies',
    escolherArea: 'Choose a technology area',
    alemRotulo: 'Outside the day job',
    alem: 'Beyond code',
    alemItens: [
      'President of the internal accident prevention committee (CIPA) at Sotreq Uberlândia.',
      'Competitive programming: algorithms and data structures (graphs, dynamic programming, number theory and greedy algorithms), in C and C++20.',
      'Freelance: visual identities for 4 small businesses, with the brand kits generated by code (Python and Pillow).',
    ],
    formacaoEIdiomas: 'Education and languages',
    formacao: 'Education',
    curso: "Bachelor's in Information Systems",
    faculdade: 'Federal University of Uberlândia · 6th semester · graduating Dec 2027',
    pesquisa: 'Undergraduate research: VIII Iniciação Científica, FAMAT/UFU',
    idiomas: 'Languages',
    ingles: 'English',
  },
  erro: {
    titulo: 'Page not found',
    descricao: 'This page does not exist. Use the links to keep browsing.',
    texto: 'The address may be wrong, or the page has moved. You can continue from here:',
    inicio: 'Home page',
  },
};

export const TEXTOS: Record<Idioma, Textos> = { pt, en };
