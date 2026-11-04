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

- **O metal fica na moldura, o conteúdo em fundo liso.** O cromo aparece na arte, no nome, nos
  botões e nas bordas. Texto corrido nunca fica sobre imagem nem em degradê.
- **Toda a arte é gerada por código**, em `scripts/gerar-arte.mjs` (`npm run arte`). As saídas
  ficam versionadas e o build não roda o script. Não usar imagem de banco nem de terceiros.
- **Dois temas:** cromo negro (`#050608`) e prata polida (`#eceef1`). Azul `#1f4e8c` no claro,
  azul-gelo `#8ec5ff` no escuro. O acento térmico (laranja) é raro e nunca o único sinal de algo.
- **Continuam proibidos:** gradiente roxo, glassmorphism, barra de nível de habilidade, emoji como
  ícone, animação que atrasa a leitura, carrossel e texto sobre imagem.
- `.cromo-texto` só em texto grande: o tom mais fraco do degradê mira 3:1, não 4,5:1.

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

## Fases

| Fase | Conteúdo | Situação |
|---|---|---|
| 0 | Plano | Aprovada |
| 1 | Fundação | Aguardando aprovação |
| 2 | Páginas e componentes, filtro React com testes | — |
| 3 | Conteúdo de todos os projetos e lista de `PREENCHER` | — |
| 4 | Focos por vaga e download do currículo | — |
| 5 | Qualidade: a11y, SEO, imagens OG, CI, Lighthouse, links | — |
| 6 | Publicação no GitHub Pages | — |
| 7 | (Depois) Versão em inglês | — |

**Pendências combinadas:**

- Currículo do botão da home: `curriculo-dev-python.pdf`, recomendação ainda sem confirmação.
- Fase 5: só links internos bloqueiam o deploy; os externos geram aviso. O build falha se houver
  `PREENCHER` na pasta final.
- Fase 3: Mermaid com `rehype-mermaid`, que exige Chromium no CI.

## Comandos

```bash
npm run dev      # servidor local em http://localhost:4321
npm run check    # tipos e diagnósticos do Astro
npm run build    # gera dist/
npm run preview  # serve dist/
npm run arte     # regenera a arte de cromo e os favicons
```
