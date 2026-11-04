# Portfólio do Gabriel — contexto do projeto

Site de portfólio de Gabriel Faria de Angelis, publicado no GitHub Pages em
`https://gabrielfda7.github.io`. Precisa servir a vagas de **dados**, **desenvolvimento
Python/backend** e **IA** sem virar três sites: cada candidatura recebe um link de foco
(`/foco/dados`, `/foco/ia`, `/foco/backend`).

O briefing original, na íntegra, está em [docs/prompt-inicial.md](docs/prompt-inicial.md). Onde
ele divergir deste arquivo, **vale este arquivo**, que guarda as decisões posteriores.

## Critérios de sucesso

1. Quem é, o que faz e qual o melhor projeto: visível sem rolar a página.
2. Estudo de caso completo a no máximo 2 cliques.
3. Link de foco reordena os projetos, troca a chamada e oferece o currículo certo.
4. Projeto novo = **um arquivo Markdown**, sem editar componente.
5. Lighthouse ≥ 95 em todas as categorias, no celular.
6. Custo zero de hospedagem.

## Stack

| Item | Escolha |
|---|---|
| Framework | Astro 7, site estático, TypeScript strict |
| Estilos | Tailwind 4 via `@tailwindcss/vite`, tokens em `src/styles/tokens.css` |
| Conteúdo | Content Collections com Zod (`src/content.config.ts`) |
| Fonte | Inter Variable, auto-hospedada via Fontsource |
| Interação | Só `ProjectFilter.tsx` usa React (ilha, Fase 2). Fora ele, nada de framework de UI sem perguntar |
| Node | LTS 26 no CI (`.nvmrc`); o Astro aceita o 24 usado hoje na máquina |

## Direção visual: cromo líquido

Decisão de 04/11/2026, que **substitui** o "sóbrio e editorial" da seção 4 do briefing.
Referência: chrome artwork, só no estilo. As imagens de referência não entram no repositório.

- **A identidade não pode morrer depois da abertura.** Exigência do Gabriel em 04/11/2026: a grade de
  cartões "matou" o site. **Não use cartões com texto como padrão.** Toda seção precisa ter um
  elemento de cromo que pareça parte dela. Os materiais do sistema são:
  - `.metal`: textura de cromo recortada no texto, com reflexo que anda na rolagem. Em títulos e
    números grandes.
  - `DivisorFita`: fita de metal com lâminas, da mesma família do emblema, entre seções.
  - `.tubo` e `.parada`: tubo de cromo com esferas, para sequências e linhas do tempo.
  - `LinhaProjeto`: lista editorial com número em metal, no lugar de cartões de projeto.
  - `TopoPagina`: a composição da abertura (texto à esquerda, arte à direita) nas páginas internas.
- **Texto corrido fica em fundo liso**, nunca sobre imagem nem em degradê. A arte se encaixa ao lado
  ou atrás de objetos, como o aparelho do projeto principal.
- **Toda a arte é gerada por código**, em `scripts/gerar-arte.mjs` (`npm run arte`). As saídas
  ficam versionadas e o build não roda o script. Não usar imagem de banco nem de terceiros.
- **Dois temas:** cromo negro (`#050608`) e prata polida (`#eceef1`). Azul `#1f4e8c` no claro,
  azul-gelo `#8ec5ff` no escuro. O acento térmico (laranja) é raro e nunca o único sinal de algo.
- **Continuam proibidos:** gradiente roxo, glassmorphism, barra de nível de habilidade, emoji como
  ícone, animação que atrasa a leitura, carrossel e texto sobre imagem.
- `.metal` e `.cromo-texto` só em texto grande: o tom mais fraco mira 3:1, não 4,5:1. A textura foi
  medida: em todo pixel, o contraste com o fundo fica acima de 3,7:1 nos dois temas. Se regenerar,
  meça de novo.
- A abertura (`Hero`) segue com o degradê prateado, de que o Gabriel gostou. As demais usam `.metal`.

## Conteúdo e confidencialidade

- Português do Brasil, primeira pessoa, frases curtas. Sem clichês.
- **Não inventar número, nome, cliente ou resultado.** Faltou dado: `<!-- PREENCHER: o quê -->` no
  corpo ou `# PREENCHER: o quê` no frontmatter.
- **Nunca, em lugar nenhum do repositório:** nome de cliente da Sotreq, valor financeiro real,
  captura de tela com dado real. O repositório é **público desde o primeiro commit**: `draft: true`
  esconde do site, mas não do GitHub, e o histórico é permanente.
- Em trabalho de equipe, deixar claro o que foi meu.
- Projetos corporativos podem ser descritos publicamente (autorizado pelo Gabriel em 04/11/2026).

## Números do NextUp

Fonte: `pytest --collect-only` em `a656d19`, feito em 04/11/2026.

- **946 testes:** 745 na suíte rápida e 201 de interface. Usar 946, nunca "740+".
- `docs/PROMPTS.md` do NextUp tem **10 sessões e 70 prompts**.
- O assistente com LLM entra como **em desenvolvimento**, por decisão do Gabriel. Não há código
  dele na `main` do NextUp, então não descrever como pronto nem citar resultado.
- A interface mostra só o Magic Kingdom desde 28/10/2026. O texto precisa refletir isso.

## Convenções

- Commits pequenos, Conventional Commits, em português.
- **Uma branch por fase** (`fase-1`, `fase-2`...), integrada à `main` só depois da aprovação.
- Prompts do Gabriel vão **na íntegra** em `docs/PROMPTS.md`, ao fim de cada sessão.
- Cada fase ganha uma seção em `docs/APRENDIZADO.md`, em linguagem simples.
- Duas opções razoáveis: mostrar as duas com o trade-off em 2 linhas e recomendar uma.

### Armadilhas já encontradas

- **Estilo com escopo não atravessa componente.** Uma classe passada a um componente filho não
  recebe o CSS `<style>` do pai. Envolva o filho em um elemento do pai.
- **Quebra de linha antes de tag inline pode comer o espaço.** Em texto corrido, mantenha a frase
  na mesma linha ou use `{' '}`.
- **Ano sozinho no frontmatter vira número.** Escreva `period: "2026"`, com aspas.
- **Captura de tela em página inteira altera o layout.** Meça downloads antes de capturar a tela.
- **O Mermaid mede as caixas no build.** Se a página desenhar o rótulo com outra fonte, o texto é
  cortado. Por isso a fonte dos diagramas é fixa em Arial, nos dois lados.
- **Plugin de Markdown exige `@astrojs/markdown-remark`** no Astro 7, cujo processador padrão mudou.
  `syntaxHighlight: false` fica fora de `unified()`; sem ele, o Mermaid não reconhece os blocos.
- **Imagem lazy não carrega em captura de página inteira.** Role a página antes de capturar, ou o
  resultado mostra buracos que não existem.

## Fases

| Fase | Conteúdo | Situação |
|---|---|---|
| 0 | Plano | Aprovada |
| 1 | Fundação | Aprovada |
| 2 | Páginas e componentes, filtro React com testes | Aprovada |
| 3 | Conteúdo de todos os projetos e lista de `PREENCHER` | Aguardando aprovação |
| 4 | Focos por vaga e download do currículo | — |
| 5 | Qualidade: a11y, SEO, imagens OG, CI, Lighthouse, links | — |
| 6 | Publicação no GitHub Pages | — |
| 7 | (Depois) Versão em inglês | — |

**Pendências combinadas:**

- Currículo do botão da home: `curriculo-dev-python.pdf`, confirmado pelo Gabriel em 04/11/2026.
  Os PDFs entram na Fase 4; até lá o botão dá 404.
- Fase 5: só links internos bloqueiam o deploy; os externos geram aviso. O build falha se houver
  `PREENCHER` na pasta final: os comentários do Markdown **chegam ao HTML**, verificado.
- Fase 5: rodar `npm test` no CI e instalar o Chromium do Playwright, que o Mermaid usa no build.
- Fase 5: `npm audit` acusa 3 alertas de baixa gravidade (katex, via mermaid). Só rodam no build,
  sobre diagramas escritos por nós. Rever quando o mermaid atualizar.
- Rascunhos (`draft: true`) aparecem no `npm run dev`, com o rótulo "Rascunho", e nunca no build.

## Decisões de arquitetura

- **O filtro não renderiza os cartões.** `ProjectFilter.tsx` só desenha os botões e esconde os
  `[data-projeto]` que o Astro gerou. Assim existe uma única versão do cartão, as imagens seguem
  otimizadas e, sem JavaScript, a lista completa fica visível. O custo é a ilha mexer em um DOM fora
  da própria árvore, o que os testes cobrem.
- **`coverAlt` é um campo a mais no schema do briefing.** Toda capa precisa de texto alternativo, e
  o build falha sem ele.
- **A foto vem do avatar público do GitHub** (460 px), recortada em `src/assets/foto/gabriel.jpg`.
- **Capas do NextUp são capturas do site no ar**, não `docs/img/` do repositório dele, que está
  desatualizado. Refaça com `npm run capturas` quando a interface mudar (Gabriel, 04/11/2026).
- **Diagramas escritos para caber em 360 px:** `flowchart TD`, subgrupos empilhados e no máximo três
  nós lado a lado. Cada um leva `accTitle` e `accDescr`, que viram o texto para leitor de tela.

## Comandos

```bash
npm run dev      # servidor local em http://localhost:4321
npm run check    # tipos e diagnósticos do Astro
npm test         # testes do Vitest
npm run build    # gera dist/
npm run preview  # serve dist/
npm run arte     # regenera a arte de cromo e os favicons
npm run capturas # recaptura o NextUp no ar; espera o parque ter fila (--agora para não esperar)
```
