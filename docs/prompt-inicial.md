# Prompt — Site de portfólio do Gabriel (para colar no Claude Code)

> Versão definitiva. Cole tudo abaixo da linha no Claude Code, dentro do repositório novo
> `GabrielFDA7.github.io` (clonado e vazio).

---

## 1. Contexto

Você vai construir comigo o meu site de portfólio profissional. Eu sou **Gabriel Faria de Angelis**,
estudante de Sistemas de Informação na UFU (conclusão dez/2027), e trabalho na Sotreq (revenda
oficial Caterpillar no Brasil) com Python, dados, automação e integrações. Estou me candidatando a
vagas de três famílias diferentes:

- **Dados:** Analista de Dados, Analytics Engineer, dados industriais
- **Desenvolvimento:** Desenvolvedor Python / Backend / APIs
- **IA:** AI Engineer, AI Builder, programas de estágio em IA

O site precisa funcionar para as três famílias **sem virar três sites**. O recrutador de cada vaga
deve ver primeiro o que importa para ele, em menos de 10 segundos.

Links que já existem:
- GitHub: https://github.com/GabrielFDA7
- LinkedIn: https://www.linkedin.com/in/gabriel-de-angelis
- E-mail: gfaria.deangelis@gmail.com
- Projeto principal: NextUp — https://github.com/GabrielFDA7/nextup · demo: https://nextup-rcux.onrender.com

## 2. Objetivo e critérios de sucesso

1. Um recrutador entende **quem eu sou, o que eu faço e qual o meu melhor projeto** sem rolar a página.
2. Um avaliador técnico encontra, em até 2 cliques, um estudo de caso com problema, arquitetura,
   decisões técnicas e resultado.
3. Para cada candidatura, eu envio um link de **foco** (ex.: `/foco/ia`) que reordena projetos,
   troca a chamada principal e oferece o currículo certo para download.
4. Adicionar um projeto novo = criar **um arquivo Markdown**. Nada de editar componente.
5. Lighthouse ≥ 95 em Performance, Acessibilidade, Boas Práticas e SEO, no celular.
6. Custo zero de hospedagem.

## 3. Stack e decisões fixas

- **Astro** (versão estável atual) com **TypeScript em modo strict**. Site estático, quase sem
  JavaScript no cliente: JS só onde houver interação real (filtro de projetos, alternar tema).
- **React** via integração oficial `@astrojs/react`, usado como *ilha* (island) **somente no filtro de
  projetos** (`ProjectFilter.tsx`). O resto do site são componentes `.astro` sem JS no cliente.
  - Carregue a ilha com `client:visible` para não pesar na abertura da página.
  - Sem bibliotecas de estado: `useState` e `useMemo` bastam.
  - Sem JS, a lista completa de projetos continua visível (o filtro é melhoria, não requisito).
  - O estado do filtro vai para a URL (`?tag=dados`), para eu poder mandar um link já filtrado.
  - Testes do componente com **Vitest + Testing Library**, rodando no CI.
- **Tailwind CSS** para estilos, com tokens de design centralizados (cores, espaçamento, tipografia).
- **Content Collections** do Astro com schema **Zod** para os projetos e para a experiência.
- **Diagramas em Mermaid** renderizados no build (o visitante recebe SVG, não um script).
- **Deploy no GitHub Pages** via GitHub Actions, no repositório `GabrielFDA7.github.io`.
- Gerenciador de pacotes: **npm**. Node na versão LTS atual.
- Fora o filtro, nada de React ou outro framework de UI. Se outra interação parecer exigir, me
  pergunte antes.

Se alguma dessas decisões tiver um problema concreto, me avise e explique o trade-off antes de trocar.

## 4. Direção visual

- **Sóbrio, técnico e editorial.** A referência é uma boa documentação técnica ou um portfólio de
  engenheiro sênior, e não um template de "dev criativo".
- **Coerência com o meu currículo:** fonte **Inter**, cor de destaque **azul `#1f4e8c`** (ajuste os
  tons para passar no contraste WCAG AA nos dois temas), muito espaço em branco.
- Tema **claro e escuro**, respeitando a preferência do sistema, com botão para alternar.
- **Proibido:** gradientes roxos, glassmorphism, barras de "nível de habilidade", emojis como ícones,
  animações que atrasam a leitura, carrossel, texto em cima de imagem.
- Microinterações discretas são bem-vindas (hover em cards, transição suave entre páginas), sempre
  respeitando `prefers-reduced-motion`.
- Mobile-first. Nada de rolagem horizontal em 360 px.

## 5. Arquitetura do site

### 5.1 Páginas

| Rota | Conteúdo |
|---|---|
| `/` | Hero, projetos em destaque, "como eu trabalho com IA", experiência resumida, contato |
| `/projetos` | Todos os projetos, com filtro por foco (dados, IA, backend, automação, BI, web) |
| `/projetos/[slug]` | Estudo de caso de cada projeto |
| `/foco/dados`, `/foco/ia`, `/foco/backend` | A home reorganizada para aquele tipo de vaga (ver 5.3) |
| `/sobre` | Minha trajetória, experiência completa em linha do tempo, formação, idiomas |
| `/404` | Página de erro útil, com links de volta |

### 5.2 Home (`/`)

1. **Hero:** nome, uma linha de posicionamento ("Construo produtos com dados, Python e IA"), uma
   frase de apoio, e três botões: *Ver projetos*, *Baixar currículo*, *GitHub*. Ícones de LinkedIn e
   e-mail.
2. **Projeto principal:** o NextUp em destaque grande, com imagem, 3 números (ex.: testes, frequência
   de coleta, status em produção) e links para estudo de caso, demo e código.
3. **Outros projetos em destaque:** grade com os demais `featured: true`.
4. **Como eu trabalho com IA:** seção curta mostrando o meu método: contexto do projeto versionado em
   `CLAUDE.md`, skills próprias para o agente, log público de prompts, e testes + CI como rede de
   segurança. Isso é um diferencial, então trate como seção própria, com links para os arquivos reais
   no repositório do NextUp.
5. **Experiência resumida:** Sotreq (Analista de Leads e Estágio) em 2 a 3 linhas cada.
6. **Contato:** e-mail clicável, LinkedIn, GitHub. **Sem formulário** (não quero backend nem spam).

### 5.3 Páginas de foco (o recurso mais importante)

Cada página de foco reaproveita os componentes da home, mas muda:

| Foco | Chamada do hero | Ordem dos projetos | Currículo para download |
|---|---|---|---|
| `dados` | "Transformo dados de máquinas, SAP e APIs em decisão" | Projetos com tag `dados`/`bi` primeiro | `/cv/curriculo-dados.pdf` |
| `ia` | "Construo software com IA no método, não só no discurso" | Projetos com tag `ia` primeiro, seção de IA sobe | `/cv/curriculo-ai-engineer.pdf` |
| `backend` | "APIs em Python testadas e em produção" | Projetos com tag `backend` primeiro | `/cv/curriculo-dev-python.pdf` |

- A configuração de cada foco fica num único arquivo (`src/config/focos.ts`), para eu criar um foco
  novo sem mexer em componente.
- As páginas de foco **não aparecem no menu**; são links que eu envio em cada candidatura.
- Coloque `noindex` nelas para não competirem com a home no Google.

### 5.4 Estudo de caso (`/projetos/[slug]`)

Todo projeto segue a mesma estrutura, nesta ordem:

1. Título, resumo de uma frase, status, período, **meu papel** (solo ou time, e o que foi meu)
2. Stack (chips) e links (código, demo)
3. **Problema** — qual dor real, de quem
4. **Solução** — o que foi construído, com imagem ou diagrama
5. **Arquitetura** — diagrama Mermaid
6. **Decisões técnicas** — 2 a 4 escolhas com o trade-off de cada uma
7. **Resultados** — números concretos
8. **O que eu aprendi / faria diferente**
9. Navegação para o projeto anterior e o próximo

Projetos marcados `confidential: true` exibem um aviso discreto ("projeto corporativo: dados e
nomes de clientes omitidos") e **não** têm link de código.

## 6. Inventário de projetos

> Crie um arquivo em `src/content/projetos/` para cada item abaixo. **Não invente números, nomes,
> clientes ou resultados.** Onde faltar informação, escreva `<!-- PREENCHER: o que falta -->` e
> liste todos esses pontos no fim da Fase 3 para eu completar.
>
> São 4 projetos em destaque e 5 complementares. Vários trabalhos parecidos da Sotreq foram
> **agrupados de propósito** em um único estudo de caso: não os separe de novo.

### Destaque (`featured: true`)

**1. NextUp — recomendador de atrações em tempo real** · pessoal · solo · em produção
- Problema: em parques temáticos, a menor fila nem sempre é a melhor escolha, porque a caminhada até
  ela custa tempo. Hoje existe um serviço informal em que uma pessoa monitora as filas e avisa
  clientes por WhatsApp. O NextUp automatiza esse raciocínio.
- Solução: `custo_total = tempo_de_caminhada + tempo_de_fila`, calculado em tempo real com dados da
  API pública ThemeParks.wiki e distância por Haversine; mapa interativo (Leaflet).
- Engenharia: API REST assíncrona em FastAPI + Pydantic; cliente httpx com cache; coletor de histórico
  de filas a cada 5 min em PostgreSQL (SQLAlchemy + Alembic); 740+ testes (pytest, respx, Playwright);
  lint com ruff; CI no GitHub Actions em Python 3.11–3.13; imagem Docker sem root com healthcheck;
  deploy contínuo no Render.
- Método com IA: construído com Claude Code, com `CLAUDE.md`, skills próprias
  (`medir-antes-de-implementar`, `fechar-sessao`) e log de prompts em `docs/PROMPTS.md`.
- Em desenvolvimento: assistente com LLM que responde perguntas em linguagem natural via tool calling
  sobre a própria API de recomendação.
- Links: código https://github.com/GabrielFDA7/nextup · demo https://nextup-rcux.onrender.com
- Fonte da verdade: leia o README, `docs/PROJETO.md` e `CLAUDE.md` do repositório antes de escrever
  este estudo de caso.
- Tags: `backend`, `dados`, `ia`, `web`

**2. Painel de telemetria de frota com insights por IA** · Sotreq · time de 3 · set/2026 – atual · confidencial
- Problema: cliente com frota mista (Caterpillar e outras marcas) não tem uma visão única de consumo
  de combustível, ociosidade e deslocamento das máquinas.
- Solução: aplicação web (React + Vite) que consolida a telemetria. Como o acesso às APIs dos
  fabricantes é difícil, os dados chegam por relatórios agendados do VisionLink num e-mail dedicado e
  são tratados em Python. A aplicação envia os dados à API do Gemini, que devolve insights sobre o que
  melhorar na frota.
- Decisões: ingestão por e-mail agendado em vez de API (acesso indisponível); custo zero como
  requisito; base pensada para ser replicada para outros clientes.
- Meu papel: pipeline de dados (ingestão e tratamento). <!-- PREENCHER: confirmar se a integração com o Gemini também foi minha -->
- Tags: `dados`, `ia`, `industrial`

**3. Integração com a API do SIS2 (Caterpillar)** · Sotreq · solo · confidencial
- Problema: levantar os part numbers de uma frota de 81 máquinas exigia consulta manual, máquina a
  máquina, no catálogo técnico da Caterpillar.
- Solução: automação em Python consumindo a API JSON do SIS2.
- Decisão: API em vez de raspagem de tela com Selenium. <!-- PREENCHER: por que escolhi a API -->
- Tags: `automacao`, `backend`, `industrial`

**4. Automação do ciclo de pedidos de um cliente: do PDF ao dashboard** · Sotreq · solo · confidencial
- Problema: os dados de pedidos e faturas de um cliente chegavam em PDF e eram digitados à mão, e o
  cliente não tinha visibilidade do status das próprias entregas.
- Parte 1, extrator (jan–fev/2026): aplicação desktop com interface gráfica que lê PDFs
  semiestruturados de pedidos e faturas (pdfplumber), trata os dados (pandas, openpyxl) e exporta
  planilhas prontas. Interface em CustomTkinter, distribuída como executável único (PyInstaller).
- Parte 2, acompanhamento: extração diária de relatórios do SAP via Agendador de Tarefas, tratamento
  em Python e relatório em Looker Studio com busca e filtros, publicado num Google Sites, sem custo
  de hospedagem.
- Decisões: executável standalone para rodar nas máquinas corporativas sem instalar Python; Looker
  Studio + Google Sites para entregar ao cliente sem custo de infraestrutura.
- **Não use o nome do cliente** em nenhum lugar (título, texto, imagens ou slug).
- <!-- PREENCHER: volume de documentos por mês e tempo economizado -->
- Tags: `automacao`, `dados`, `bi`

### Complementares (`featured: false`)

**5. Automações SAP e RPA** · Sotreq · solo · mai/2025 – atual · confidencial
- Problema: consultas item a item no SAP (disponibilidade global de peças Caterpillar, divergência de
  preços em pedidos) e coleta manual de relatórios em portais internos para a base de leads.
- Solução: três frentes no mesmo caso:
  - Verificadores de disponibilidade e de preços em Excel VBA + **SAP GUI Scripting**, que executam
    as transações em lote e cruzam os resultados com os pedidos;
  - Pipelines em Python com **Selenium** para navegar, autenticar e baixar relatórios, tratados em pandas;
  - RPA do tratamento de leads (Python com PyAutoGUI e openpyxl, e macros VBA).
- Decisão: SAP GUI Scripting usa a sessão do próprio operador, dispensando permissões diretas de RFC/BAPI.
- <!-- PREENCHER: itens consultados por dia, horas economizadas -->
- Tags: `automacao`, `dados`, `industrial`

**6. Análises de negócio com SAP BW e Power Query** · Sotreq · solo · confidencial
- Estudo plurianual de eficiência entre filiais com exportações do SAP BW (DOL, Receita Líquida,
  relação DOL/RL), entregue em Excel e apresentação para a diretoria.
- Pipelines em Power Query (M) que limpam, normalizam e cruzam históricos de vendas, cadastro de
  clientes e laudos de inspeção, atualizando relatórios sem intervenção manual (jan–jun/2026).
- **Nenhum valor financeiro real** no site.
- Tags: `dados`, `bi`, `negocio`

**7. EPTA — IA de inimigos para jogo roguelike isométrico** · equipe universitária · ago/2025 – atual
- Jogo de ação isométrico em **Unity 6 / C#**, feito em equipe na EPTA (Equipe de Propulsão e
  Tecnologia Aeroespacial).
- Meu papel: IA dos inimigos, com **máquina de estados** (patrulha, perseguição, antecipação de golpe
  e recuperação).
- Arquitetura do projeto: scripts orientados a eventos e ScriptableObjects para separar o
  balanceamento (atributos, magias, probabilidades de loot) do código das entidades.
- **É projeto de equipe:** deixe claro que a minha parte é a IA dos inimigos.
  <!-- PREENCHER: confirmar se outras partes (ScriptableObjects, loot) também foram minhas; link do repositório se for público -->
- Tags: `jogos`

**8. Mapa de municípios de Minas Gerais com rótulos automáticos** · pessoal · solo
- Rotulagem cartográfica automática de municípios com Python (Pillow, NumPy, Shapely, Matplotlib).
- <!-- PREENCHER: imagem do resultado e quantidade de municípios -->
- Tags: `dados`, `geo`

**9. Arquivos-Suporte-Visitas** · Sotreq · solo · **rascunho (`draft: true`)**
- Aplicação web no Render com PostgreSQL no Supabase, que centraliza arquivos e insumos para visitas
  técnicas a clientes.
- Crie o arquivo com `draft: true` (não aparece no site) até eu confirmar a descrição.
  <!-- PREENCHER: o que a aplicação faz, para quem, período e link do repositório -->
- Tags: `backend`, `web`

### Seção "Sobre" (não são projetos)

- Instrutor de workshops internos de Python (Pandas e Selenium) e tutor do squad de estagiários na Sotreq
- Presidente da CIPA na Sotreq Uberlândia
- Maratona de programação: algoritmos e estruturas de dados (grafos, programação dinâmica, teoria dos
  números, algoritmos gulosos) em C e C++20
- Freelance: identidades visuais para 4 pequenos negócios, com os kits gerados por código (Python/Pillow)
- Iniciação Científica (VIII IC da FAMAT/UFU)
- Inglês C1 (FCE, Cambridge)

## 7. Schema dos projetos (Zod)

```ts
{
  title: string,
  slug: string,
  summary: string,                // uma frase, até 140 caracteres
  role: string,                   // "Solo" ou "Time de 3 — responsável pelo pipeline de dados"
  context: 'pessoal' | 'profissional' | 'academico' | 'freelance',
  period: string,                 // "set/2026 – atual"
  status: 'em-producao' | 'concluido' | 'em-desenvolvimento',
  tags: ('dados'|'ia'|'backend'|'automacao'|'bi'|'web'|'industrial'|'geo'|'design'|'jogos'|'negocio')[],
  stack: string[],
  metrics: { label: string, value: string }[],   // máximo 3, exibidas no card
  links: { repo?: string, demo?: string },
  cover?: image,
  featured: boolean,
  order: number,
  confidential: boolean,
  draft: boolean,                 // true = não aparece no site nem no sitemap
}
```

## 8. Conteúdo e escrita

- Português do Brasil, primeira pessoa, frases curtas.
- Nada de clichês ("apaixonado por tecnologia", "sempre em busca de desafios", "soluções inovadoras").
- Todo resultado concreto vem com número. Se o número não existir, use o marcador `PREENCHER`.
- **Confidencialidade:** nenhum nome de cliente da Sotreq, nenhum valor financeiro real, nenhuma
  captura de tela com dados reais. Para ilustrar projetos corporativos, use diagramas.
- Deixe claro, em cada projeto, **o que foi meu** quando o trabalho foi em equipe.

## 9. Qualidade (não negociável)

- Acessibilidade WCAG 2.1 AA: contraste, foco visível, navegação por teclado, `alt` em imagens,
  landmarks e hierarquia de títulos corretas, link "pular para o conteúdo".
- SEO: `title` e `description` por página, Open Graph e Twitter Card com imagem gerada por página,
  `sitemap.xml`, `robots.txt`, dados estruturados JSON-LD do tipo `Person`, URL canônica.
- Performance: imagens otimizadas pelo Astro (`<Image />`), fontes com `font-display: swap` e
  pré-carregadas, zero JS bloqueante.
- CI no GitHub Actions a cada push: `astro check` (tipos), testes do Vitest, build, verificação de
  links quebrados e Lighthouse CI com os limites do item 2.5. O deploy só acontece se tudo passar.

## 10. Forma de trabalho

- Trabalhe **por fases**. Ao final de cada uma, pare, me mostre o resultado (rode o servidor local e
  diga o que olhar) e espere eu aprovar antes de seguir.
- Crie e mantenha um `CLAUDE.md` com o contexto do projeto, as decisões tomadas e as convenções.
- Registre os prompts de cada sessão em `docs/PROMPTS.md`, como faço no NextUp.
- Ao fim de cada fase, adicione uma seção em `docs/APRENDIZADO.md` explicando, em linguagem simples,
  **o que foi feito e por quê**, apontando os arquivos principais. Eu vou estudar o código depois, e
  esse arquivo é o meu roteiro.
- Commits pequenos, no padrão Conventional Commits, em português.
- Quando houver duas opções razoáveis, me apresente as duas com o trade-off em 2 linhas e recomende uma.

### Fases

0. **Plano:** leia este prompt inteiro e o README do NextUp. Devolva a estrutura de pastas, os
   componentes que pretende criar e qualquer dúvida. Não escreva código ainda.
1. **Fundação:** projeto Astro + TypeScript strict + Tailwind, tokens de design, layout base com
   cabeçalho e rodapé, tema claro/escuro, schema das coleções, `CLAUDE.md`, `docs/`.
2. **Páginas e componentes:** home, lista de projetos com o filtro em React (com testes), template
   de estudo de caso, sobre, 404. Use 2 projetos de exemplo para validar. No `docs/APRENDIZADO.md`,
   explique o conceito de *ilhas* do Astro e por que só o filtro usa React.
3. **Conteúdo:** crie todos os projetos do inventário. Escreva o estudo de caso do NextUp completo
   primeiro, lendo o repositório. Termine com a lista de todos os `PREENCHER`.
4. **Focos por vaga:** `src/config/focos.ts`, rotas `/foco/[foco]`, download do currículo certo.
5. **Qualidade:** acessibilidade, SEO, imagens OG, CI com Lighthouse e verificação de links.
6. **Publicação:** workflow de deploy no GitHub Pages e um passo a passo do que eu preciso clicar no
   GitHub.
7. **(Depois) Versão em inglês:** estrutura de i18n com `/en/`, mantendo o conteúdo em arquivos
   paralelos.

Os PDFs dos currículos eu vou colocar em `public/cv/` com os nomes `curriculo-dados.pdf`,
`curriculo-dev-python.pdf` e `curriculo-ai-engineer.pdf`.

Comece pela **Fase 0**.
