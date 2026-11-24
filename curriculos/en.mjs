// Conteúdo dos currículos em inglês. Tradução fiel dos três PDFs em português de public/cv/, com o mesmo
// layout. Para mudar uma linha: edite aqui e rode `npm run curriculos`.
// O repositório é público: nada de telefone nem de valor financeiro.

const contato = (remoto) => [
  [`Uberlândia, Brazil${remoto ? ' · remote' : ''}`, 'gfaria.deangelis@gmail.com'],
  ['linkedin.com/in/gabriel-de-angelis', 'github.com/GabrielFDA7'],
];

const formacao = (complemento) => ({
  titulo: 'Education',
  itens: [
    {
      titulo: "Bachelor's in Information Systems",
      direita: 'graduating Dec 2027',
      linha: `Federal University of Uberlândia (UFU) · 6th semester${complemento}`,
    },
  ],
});

const EPTA = {
  titulo: 'EPTA — Propulsion and Aerospace Technology Team',
  direita: 'Aug 2025 – present',
  itens: ['Created 8 of the 13 enemies of a Unity roguelike; coded two of them, the drops and the inventory in C#.'],
};

const ANALISTA = { titulo: 'Leads Analyst (Product Assistant)', direita: 'Mar 2026 – present', empresa: ['Sotreq', 'official Caterpillar dealer in Brazil'] };
const ESTAGIO = { titulo: 'Automation and Data Intern', direita: 'Feb 2025 – Feb 2026', empresa: ['Sotreq'] };
const NEXTUP = { titulo: 'NextUp — real-time theme park ride recommender', direita: 'github.com/GabrielFDA7/nextup' };

export const CURRICULOS = [
  {
    arquivo: 'Gabriel-de-Angelis-resume-python.pdf',
    cargo: 'Python Developer · Backend · APIs',
    contato: contato(false),
    secoes: [
      {
        titulo: 'Summary',
        texto:
          'Python developer with almost 2 years at Sotreq (Caterpillar dealer), building integrations with APIs, SAP and telemetry systems. Author of NextUp, a FastAPI API with PostgreSQL, automated tests, Docker and CI/CD in production. Information Systems student (UFU), English C1.',
      },
      {
        titulo: 'Featured project',
        itens: [
          {
            ...NEXTUP,
            linha: 'Python · FastAPI · PostgreSQL · Docker · GitHub Actions · nextup-rcux.onrender.com',
            itens: [
              'Asynchronous REST API (FastAPI, Pydantic) that combines live wait times and distance to recommend the next ride in theme parks.',
              'Integration with the ThemeParks.wiki API (httpx) with caching and a history collector in PostgreSQL (SQLAlchemy, Alembic).',
              '946 automated tests (pytest, respx, Playwright) and ruff linting, running in CI on Python 3.11–3.13.',
              'Non-root Docker image with a healthcheck, deployed on Render with continuous deployment on every push.',
            ],
          },
        ],
      },
      {
        titulo: 'Experience',
        itens: [
          {
            ...ANALISTA,
            itens: [
              'Built a Python integration with the SIS2 API (Caterpillar) that collects the part numbers of 81 machines.',
              "I build the telemetry data ingestion service (VisionLink) for a web application for a client's fleet.",
              'Daily SAP → Python → dashboard routine that gives a client self-service order tracking.',
              'Python automations and SQL queries for the sales team; intern mentor and Python workshop instructor.',
            ],
          },
          {
            ...ESTAGIO,
            itens: [
              'Python automations (Pandas, Selenium, openpyxl) and SAP data integration for reports.',
              'Agile squad work (Kanban, sprints, retrospectives) with sales and operations teams.',
            ],
          },
        ],
      },
      {
        titulo: 'Other projects',
        itens: [
          { titulo: 'Collaborative quiz app', direita: 'Academic project · UFU', itens: ['Mobile quiz app with Firebase, built as a team.'] },
          EPTA,
        ],
      },
      {
        titulo: 'Technical skills',
        tabela: [
          ['Programming', 'Python, SQL, JavaScript, C#'],
          ['Backend and APIs', 'FastAPI, Pydantic, REST APIs, httpx, asynchronous programming'],
          ['Databases', 'PostgreSQL, SQLite, SQLAlchemy, Alembic'],
          ['Quality', 'pytest, respx, Playwright, ruff'],
          ['DevOps', 'Docker, GitHub Actions (CI/CD), Render, Git, Linux terminal'],
          ['Data and automation', 'Pandas, Selenium, SAP, Power Query'],
          ['Languages', 'Portuguese (native) · English C1 (FCE, Cambridge)'],
        ],
      },
      formacao(' · Undergraduate research (VIII Iniciação Científica, FAMAT)'),
    ],
  },
  {
    arquivo: 'Gabriel-de-Angelis-resume-data.pdf',
    cargo: 'Data Analyst · Python · SQL · Automation',
    contato: contato(true),
    secoes: [
      {
        titulo: 'Summary',
        texto:
          'Data professional at Sotreq (Caterpillar dealer), with almost 2 years building pipelines, automations and dashboards in Python and SQL on commercial and industrial data. Information Systems student (UFU), English C1.',
      },
      {
        titulo: 'Experience',
        itens: [
          {
            ...ANALISTA,
            itens: [
              '<strong>Telemetry:</strong> daily Python pipeline that validates VisionLink reports, flags suspicious data and writes to PostgreSQL. The first load brought in 45 days of history, with no failures.',
              '<strong>Dashboard analyses:</strong> defined the rule, source and chart of the 10 fleet analyses and checked the math in pandas.',
              '<strong>SAP → Looker Studio:</strong> daily order extraction processed in Python, in a self-service dashboard for a client.',
              '<strong>SIS2 API:</strong> automated the parts list of each machine, from hours to seconds; 81 machines in the first request.',
              'RPA automations and data matching (Power Query, SQL) to prioritize sales proposals.',
              'Financial analyses with SAP BW (DOL, net revenue) and pipeline consolidation.',
              'Mentor of the intern squad and instructor of internal Python workshops.',
            ],
          },
          {
            ...ESTAGIO,
            itens: [
              '<strong>SAP checkers (VBA):</strong> price and stock lookup of 50 items went from over 30 minutes to about 3; used by Sotreq across Brazil.',
              '<strong>PDF extractor (Python):</strong> each order, invoice or quote went from 8 to 10 minutes of typing down to 1.',
              'Python (Pandas, Selenium, openpyxl) and VBA automations for routines and data matching.',
              'SAP data extraction for management reports, in an agile squad (Kanban/Scrum).',
            ],
          },
        ],
      },
      {
        titulo: 'Projects',
        itens: [
          {
            titulo: 'Theme park ride recommender',
            direita: '2026 · GitHub',
            itens: ['App that combines live wait times (ThemeParks.wiki API) and proximity to recommend the next ride, with wait-time history in PostgreSQL.'],
          },
          EPTA,
        ],
      },
      {
        titulo: 'Technical skills',
        tabela: [
          ['Data and analysis', 'Python (Pandas, NumPy, Matplotlib), SQL, Power Query, advanced Excel'],
          ['Databases and quality', 'PostgreSQL (Supabase), Parquet, data validation and quality rules, pytest'],
          ['BI and visualization', 'Looker Studio, Excel dashboards, executive presentations'],
          ['Integration and automation', 'REST/JSON APIs, ETL pipelines, RPA (Selenium, PyAutoGUI, openpyxl), VBA'],
          ['Systems and tools', 'SAP (ERP and BW), VisionLink, Git/GitHub, VS Code, Firebase, C#/Unity'],
          ['Methods', 'Kanban, Scrum'],
        ],
      },
      formacao(''),
      {
        titulo: 'Languages and certificates',
        tabela: [
          ['Languages', 'Portuguese (native) · English C1 — FCE, Cambridge University'],
          ['Certificates', 'Undergraduate research: VIII Iniciação Científica, FAMAT (UFU)'],
        ],
      },
    ],
  },
  {
    arquivo: 'Gabriel-de-Angelis-resume-ai.pdf',
    cargo: 'AI Engineer · Python · LLMs · AI-assisted development',
    contato: contato(true),
    secoes: [
      {
        titulo: 'Summary',
        texto:
          'I build software with AI as part of the method: coding agents, versioned context and custom skills, with tests and CI to make sure the result works in production. At Sotreq (Caterpillar dealer), I bring machine and SAP data into products that use LLMs. Information Systems student (UFU, graduating Dec 2027), English C1.',
      },
      {
        titulo: 'Featured project',
        itens: [
          {
            ...NEXTUP,
            linha: 'Python · FastAPI · PostgreSQL · Docker · Claude Code · nextup-rcux.onrender.com',
            itens: [
              'Production product that combines live wait times and distance to recommend the next ride in theme parks.',
              '<strong>Built with AI agents, in an auditable way:</strong> project context in CLAUDE.md, custom agent skills (e.g., measure before implementing) and selected prompts published in the repository.',
              "<strong>LLM assistant (in development):</strong> natural-language questions answered by the model via <em>tool calling</em> on the app's own recommendation API.",
              'Engineering behind it: asynchronous REST API, wait-time history in PostgreSQL, 946 tests, CI and continuous deployment.',
            ],
          },
        ],
      },
      {
        titulo: 'Experience',
        itens: [
          {
            ...ANALISTA,
            itens: [
              "<strong>Telemetry with AI:</strong> I build the data pipeline of an application that sends a client's fleet telemetry to Gemini, which returns insights on the machines' fuel use and idle time.",
              'Python integration with the SIS2 API (Caterpillar) to collect part numbers for 81 machines.',
              'Python RPA automations and a daily SAP → Python → dashboard routine for a client.',
              'Instructor of internal Python workshops and mentor of the intern squad.',
            ],
          },
          {
            ...ESTAGIO,
            itens: ['Python (Pandas, Selenium, openpyxl) and VBA automations; SAP data integration in an agile squad.'],
          },
        ],
      },
      { titulo: 'Other projects', itens: [EPTA] },
      {
        titulo: 'Technical skills',
        tabela: [
          ['AI and LLMs', 'Claude Code, GitHub Copilot, Gemini API, prompt engineering, agents and skills, tool calling, Claude Design'],
          ['Programming', 'Python, SQL, JavaScript, C#'],
          ['Backend and data', 'FastAPI, Pydantic, REST APIs, PostgreSQL, SQLAlchemy, Pandas'],
          ['Quality and DevOps', 'pytest, Playwright, ruff, Docker, GitHub Actions, Git, Linux'],
          ['Automation', 'RPA (Selenium, PyAutoGUI), SAP, Power Query'],
          ['Languages', 'Portuguese (native) · English C1 (FCE, Cambridge)'],
        ],
      },
      formacao(' · Undergraduate research (VIII Iniciação Científica, FAMAT)'),
    ],
  },
];
