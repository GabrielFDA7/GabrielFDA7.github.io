// Conteúdo dos currículos em português, no mesmo layout dos em inglês (curriculos/en.mjs). Transcrição fiel
// dos PDFs corrigidos à mão até 18/11/2026. Para mudar uma linha: edite aqui e rode `npm run curriculos`.
// O repositório é público: nada de telefone nem de valor financeiro.

const contato = (remoto) => [
  [`Uberlândia, MG${remoto ? ' · remoto' : ''}`, 'gfaria.deangelis@gmail.com'],
  ['linkedin.com/in/gabriel-de-angelis', 'github.com/GabrielFDA7'],
];

const formacao = (complemento) => ({
  titulo: 'Formação',
  itens: [
    {
      titulo: 'Bacharelado em Sistemas de Informação',
      direita: 'conclusão dez/2027',
      linha: `Universidade Federal de Uberlândia (UFU) · 6º período${complemento}`,
    },
  ],
});

const EPTA = {
  titulo: 'EPTA — Equipe de Propulsão e Tecnologia Aeroespacial',
  direita: 'ago/2025 – atual',
  itens: ['Criei 8 dos 13 inimigos de um roguelike em Unity e programei em C# dois deles, os drops e o inventário.'],
};

const ANALISTA = { titulo: 'Analista de Leads (Assistente de Produto)', direita: 'mar/2026 – atual', empresa: ['Sotreq', 'revenda oficial Caterpillar no Brasil'] };
const ESTAGIO = { titulo: 'Estagiário de Automação e Dados', direita: 'fev/2025 – fev/2026', empresa: ['Sotreq'] };
const NEXTUP = { titulo: 'NextUp — recomendador de atrações em tempo real', direita: 'github.com/GabrielFDA7/nextup' };

export const CURRICULOS = [
  {
    arquivo: 'Gabriel-de-Angelis-curriculo-python.pdf',
    cargo: 'Desenvolvedor Python · Backend · APIs',
    contato: contato(false),
    secoes: [
      {
        titulo: 'Resumo',
        texto:
          'Desenvolvedor Python com quase 2 anos na Sotreq (revenda Caterpillar), construindo integrações com APIs, SAP e sistemas de telemetria. Autor do NextUp, API em FastAPI com PostgreSQL, testes automatizados, Docker e CI/CD em produção. Estudante de Sistemas de Informação (UFU), inglês C1.',
      },
      {
        titulo: 'Projeto em destaque',
        itens: [
          {
            ...NEXTUP,
            linha: 'Python · FastAPI · PostgreSQL · Docker · GitHub Actions · nextup-rcux.onrender.com',
            itens: [
              'API REST assíncrona (FastAPI, Pydantic) que cruza fila ao vivo e distância para indicar a próxima atração em parques temáticos.',
              'Integração com a API ThemeParks.wiki (httpx) com cache e coletor de histórico em PostgreSQL (SQLAlchemy, Alembic).',
              '946 testes automatizados (pytest, respx, Playwright) e lint com ruff, rodando no CI em Python 3.11–3.13.',
              'Imagem Docker sem root com healthcheck, publicada no Render com deploy contínuo a cada push.',
            ],
          },
        ],
      },
      {
        titulo: 'Experiência',
        itens: [
          {
            ...ANALISTA,
            itens: [
              'Desenvolvi integração Python com a API do SIS2 (Caterpillar) que levanta os part numbers de 81 máquinas.',
              'Construo o serviço de ingestão de dados de telemetria (VisionLink) de uma aplicação web para frota de cliente.',
              'Rotina diária SAP → Python → dashboard que dá a um cliente acompanhamento self-service de pedidos.',
              'Automações em Python e consultas SQL para a área comercial; tutor de estagiários e instrutor de workshops de Python.',
            ],
          },
          {
            ...ESTAGIO,
            itens: [
              'Automações em Python (Pandas, Selenium, openpyxl) e integração de dados do SAP para relatórios.',
              'Atuação em squad ágil (Kanban, sprints, retrospectivas) com áreas comerciais e operacionais.',
            ],
          },
        ],
      },
      {
        titulo: 'Outros projetos',
        itens: [
          { titulo: 'Quiz App colaborativo', direita: 'Projeto acadêmico · UFU', itens: ['Aplicativo mobile de quiz com Firebase, desenvolvido em equipe.'] },
          EPTA,
        ],
      },
      {
        titulo: 'Competências técnicas',
        tabela: [
          ['Linguagens', 'Python, SQL, JavaScript, C#'],
          ['Backend e APIs', 'FastAPI, Pydantic, APIs REST, httpx, programação assíncrona'],
          ['Bancos de dados', 'PostgreSQL, SQLite, SQLAlchemy, Alembic'],
          ['Qualidade', 'pytest, respx, Playwright, ruff'],
          ['DevOps', 'Docker, GitHub Actions (CI/CD), Render, Git, terminal Linux'],
          ['Dados e automação', 'Pandas, Selenium, SAP, Power Query'],
          ['Idiomas', 'Português (nativo) · Inglês C1 (FCE, Cambridge)'],
        ],
      },
      formacao(' · VIII Iniciação Científica da FAMAT'),
    ],
  },
  {
    arquivo: 'Gabriel-de-Angelis-curriculo-dados.pdf',
    cargo: 'Analista de Dados · Python · SQL · Automação',
    contato: contato(true),
    secoes: [
      {
        titulo: 'Resumo',
        texto:
          'Profissional de dados na Sotreq (revenda Caterpillar), com quase 2 anos construindo pipelines, automações e dashboards em Python e SQL sobre dados comerciais e industriais. Estudante de Sistemas de Informação (UFU), inglês C1.',
      },
      {
        titulo: 'Experiência',
        itens: [
          {
            ...ANALISTA,
            itens: [
              '<strong>Telemetria:</strong> pipeline Python com dados do VisionLink para painel de frota mista de cliente.',
              '<strong>SAP → Looker Studio:</strong> extração diária de pedidos tratada em Python, em dashboard self-service para cliente.',
              '<strong>API SIS2:</strong> automatizei o levantamento de part numbers de 81 máquinas, antes feito manualmente.',
              'Automações RPA e cruzamento de bases (Power Query, SQL) para priorizar propostas comerciais.',
              'Análises financeiras com SAP BW (DOL, Receita Líquida) e consolidação de pipeline.',
              'Tutor do squad de estagiários e instrutor de workshops internos de Python.',
            ],
          },
          {
            ...ESTAGIO,
            itens: [
              'Automações em Python (Pandas, Selenium, openpyxl) e VBA para rotinas e cruzamento de dados.',
              'Extração de dados do SAP para relatórios gerenciais, em squad ágil (Kanban/Scrum).',
            ],
          },
        ],
      },
      {
        titulo: 'Projetos',
        itens: [
          {
            titulo: 'Recomendador de atrações em parques temáticos',
            direita: '2026 · GitHub',
            itens: ['App que cruza tempo de fila ao vivo (API ThemeParks.wiki) e proximidade para indicar a próxima atração.'],
          },
          EPTA,
        ],
      },
      {
        titulo: 'Competências técnicas',
        tabela: [
          ['Dados e análise', 'Python (Pandas, NumPy, Matplotlib), SQL, Power Query, Excel avançado'],
          ['BI e visualização', 'Looker Studio, dashboards em Excel, apresentações executivas'],
          ['Integração e automação', 'APIs REST/JSON, pipelines ETL, RPA (Selenium, PyAutoGUI, openpyxl), VBA'],
          ['Sistemas e ferramentas', 'SAP (ERP e BW), VisionLink, Git/GitHub, VS Code, Firebase, C#/Unity'],
          ['Métodos', 'Kanban, Scrum'],
        ],
      },
      formacao(''),
      {
        titulo: 'Idiomas e certificados',
        tabela: [
          ['Idiomas', 'Português (nativo) · Inglês C1 — FCE, Cambridge University'],
          ['Certificados', 'VIII Iniciação Científica da FAMAT (UFU)'],
        ],
      },
    ],
  },
  {
    arquivo: 'Gabriel-de-Angelis-curriculo-ia.pdf',
    cargo: 'AI Engineer · Python · LLMs · Desenvolvimento assistido por IA',
    contato: contato(true),
    secoes: [
      {
        titulo: 'Resumo',
        texto:
          'Construo software com IA como parte do método: agentes de código, contexto versionado e skills próprias, com testes e CI para garantir que o resultado funciona em produção. Na Sotreq (revenda Caterpillar), levo dados de máquinas e do SAP para produtos que usam LLM. Estudante de Sistemas de Informação (UFU, conclusão dez/2027), inglês C1.',
      },
      {
        titulo: 'Projeto em destaque',
        itens: [
          {
            ...NEXTUP,
            linha: 'Python · FastAPI · PostgreSQL · Docker · Claude Code · nextup-rcux.onrender.com',
            itens: [
              'Produto em produção que cruza fila ao vivo e distância para indicar a próxima atração em parques temáticos.',
              '<strong>Construído com agentes de IA de forma auditável:</strong> contexto do projeto em CLAUDE.md, skills próprias para o agente (ex.: medir antes de implementar) e prompts em destaque publicados no repositório.',
              '<strong>Assistente com LLM (em desenvolvimento):</strong> perguntas em linguagem natural respondidas pelo modelo via <em>tool calling</em> sobre a API de recomendação do próprio app.',
              'Engenharia por trás: API REST assíncrona, histórico de filas em PostgreSQL, 946 testes, CI e deploy contínuo.',
            ],
          },
        ],
      },
      {
        titulo: 'Experiência',
        itens: [
          {
            ...ANALISTA,
            itens: [
              '<strong>Telemetria com IA:</strong> construo o pipeline de dados de uma aplicação que envia a telemetria da frota de um cliente ao Gemini, que devolve insights sobre consumo e ociosidade das máquinas.',
              'Integração Python com a API do SIS2 (Caterpillar) para levantar part numbers de 81 máquinas.',
              'Automações RPA em Python e rotina diária SAP → Python → dashboard para cliente.',
              'Instrutor de workshops internos de Python e tutor do squad de estagiários.',
            ],
          },
          {
            ...ESTAGIO,
            itens: ['Automações em Python (Pandas, Selenium, openpyxl) e VBA; integração de dados do SAP em squad ágil.'],
          },
        ],
      },
      { titulo: 'Outros projetos', itens: [EPTA] },
      {
        titulo: 'Competências técnicas',
        tabela: [
          ['IA e LLMs', 'Claude Code, GitHub Copilot, API Gemini, prompt engineering, agentes e skills, tool calling, Claude Design'],
          ['Linguagens', 'Python, SQL, JavaScript, C#'],
          ['Backend e dados', 'FastAPI, Pydantic, APIs REST, PostgreSQL, SQLAlchemy, Pandas'],
          ['Qualidade e DevOps', 'pytest, Playwright, ruff, Docker, GitHub Actions, Git, Linux'],
          ['Automação', 'RPA (Selenium, PyAutoGUI), SAP, Power Query'],
          ['Idiomas', 'Português (nativo) · Inglês C1 (FCE, Cambridge)'],
        ],
      },
      formacao(' · VIII Iniciação Científica da FAMAT'),
    ],
  },
];
