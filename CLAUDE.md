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
  - **Fio condutor, só abaixo de 64rem** (`.trilho`, no `BaseLayout`): uma peça de cromo desce a página,
    e as seções se penduram nele com esferas (`.com-conta`, `.parada`).
  - `MetalLiquido`: abaixo de 64rem, a arte sangra no topo, termina em uma onda e escorre em um gargalo
    que vira o fio. Invertida, é a poça no fim do rodapé. A arte não aparece em outro lugar no celular.
  - `FerramentasIA`: logos das ferramentas em metal, com desenhos do pacote `simple-icons` (CC0).
  - `LinhaProjeto`: lista editorial com número em metal, no lugar de cartões de projeto.
  - `TopoPagina`: a composição da abertura (texto à esquerda, arte à direita) nas páginas internas.
- **No computador, nada de fio nem divisor entre seções** (Gabriel, 04/11/2026: "chega de inovação").
  Quem separa as seções é o espaço. Divisores em forma de raio e de fios finos já foram testados e
  rejeitados. Não proponha outro elemento decorativo sem o Gabriel pedir.
- **O celular tem composição própria, não é o computador empilhado** (Gabriel, 04/11/2026). Métricas em
  uma linha (`Metricas`), aparelho logo abaixo do nome do projeto, número e seta na linha do título e
  botões em grade (`.botoes`), para nenhum cair sozinho.
- **Texto corrido fica em fundo liso**, nunca sobre imagem nem em degradê. A arte se encaixa ao lado
  ou atrás de objetos, como o aparelho do projeto principal.
- **Toda a arte é gerada por código**, em `scripts/gerar-arte.mjs` (`npm run arte`). As saídas
  ficam versionadas e o build não roda o script. Não usar imagem de banco nem de terceiros.
- **Dois temas:** cromo negro (`#050608`) e prata polida (`#eceef1`). Azul `#1f4e8c` no claro,
  azul-gelo `#8ec5ff` no escuro. O acento térmico (laranja) é raro e nunca o único sinal de algo.
- **Continuam proibidos:** gradiente roxo, glassmorphism, barra de nível de habilidade, emoji como
  ícone, animação que atrasa a leitura, carrossel e texto sobre imagem.
- **Única exceção ao carrossel: `VitrineTecnologias`, em `/sobre/`** (pedido do Gabriel, 04/11/2026). Mostra
  uma área por vez, com no máximo 6 tecnologias, em `src/config/tecnologias.ts`. Para não atrasar a
  leitura: os nomes das áreas ficam sempre à vista, clicar mostra a área e para a troca, e o mouse ou
  o foco pausam. Sem JavaScript ou com movimento reduzido, é uma lista completa e parada. Não
  estender o padrão a outras seções. React e Vite ficaram fora porque, na telemetria, a parte do
  Gabriel foi o pipeline e a tutoria. Só entram se ele confirmar.
- `.metal` só em texto grande: o tom mais fraco mira 3:1, não 4,5:1. Se regenerar a textura, meça de
  novo em todo pixel. Em 05/11/2026, a escura ficou entre 6,4:1 e 13,8:1, depois de sair de 3,7:1 e 19,9:1.
- **No tema escuro, o metal é sóbrio** (Gabriel, 05/11/2026: "muito chamativo", "mais profissional"). Prata
  sem branco puro e com pouca cor: não voltar a subir o teto de `letrasEscuro` nem a força da cor.

## Conteúdo e confidencialidade

- Português do Brasil, primeira pessoa, frases curtas. Sem clichês.
- **Não inventar número, nome, cliente ou resultado.** Faltou dado: `<!-- PREENCHER: o quê -->` no
  corpo ou `# PREENCHER: o quê` no frontmatter.
- **Nunca, em lugar nenhum do repositório:** nome de cliente da Sotreq, valor financeiro real,
  captura de tela com dado real. O repositório é **público desde o primeiro commit**: `draft: true`
  esconde do site, mas não do GitHub, e o histórico é permanente.
- Em trabalho de equipe, deixar claro o que foi meu.
- **As pastas de projetos do Gabriel têm nomes de clientes e credenciais.** Podem ser lidas para
  conferir fatos, mas nada delas é copiado: nem nome de pasta, nem dado, nem arquivo de credencial.
- Projetos corporativos podem ser descritos publicamente (autorizado pelo Gabriel em 04/11/2026).

## Autoria no painel de telemetria

O pipeline é do Gabriel. A integração com o Gemini foi implementada por outra pessoa do time, com ideia e
tutoria do Gabriel: nunca descrever essa parte como código dele. Parte do pipeline foi escrita por IA na
reta final, por causa do prazo, e o texto do projeto diz isso.

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

- **Todo link interno termina em `/`** (`/projetos/`, `/sobre/`). Cada página é uma pasta com
  `index.html`, e `trailingSlash: 'always'` faz o servidor local dar 404 no link errado. Não use
  `build.format: 'file'`: `projetos.html` ao lado da pasta `projetos/` deixa `/projetos` ambíguo no Pages.
- **Lighthouse local precisa de compressão.** `scripts/servir-dist.mjs` comprime como o GitHub Pages. Sem
  isso, a nota cai vários pontos por medir arquivos até 3 vezes maiores que os reais.
- **A arte é o LCP no celular.** Por estar no CSS, é pré-carregada no `BaseLayout` com `media` por tema e
  tamanho. Se mudar o corte no `ArteCromo`, os dois leem `src/lib/arte.ts`.
- **Dado real não entra nas verificações.** `verificar-dist.mjs` procura padrões genéricos de telefone e
  de valor. Listar nome de cliente ou número ali o publicaria, porque o repositório é público.
- **`overflow-hidden` paralisa o reflexo do metal no celular.** Ele transforma a seção em rolador, e a
  animação presa à rolagem (`view()`) passa a escutar a seção, que nunca rola. Em volta de `.metal`,
  use `overflow-clip`.
- **Animação presa à rolagem não usa o atalho `animation`.** O compactador do build funde o atalho com
  `animation-timeline` em uma forma inválida, e o efeito some só em produção. Declare as propriedades
  separadas e **confira efeitos de CSS no build**, não só em `npm run dev`.
- **Sequência com esferas precisa começar na margem do conteúdo, no celular.** A esfera é posicionada
  a partir da margem (`--recuo-fio`). Um `.tubo` centralizado deixa a esfera fora do fio.
- **O gargalo do `MetalLiquido` está desenhado em x = 14px.** Se mudar `--margem-esquerda` ou
  `--recuo-fio` no celular, mude o desenho também, ou a arte se solta do fio.

- **Estilo com escopo não atravessa componente.** Uma classe passada a um componente filho não
  recebe o CSS `<style>` do pai. Envolva o filho em um elemento do pai.
- **Elemento sobre um link esticado precisa de `pointer-events: none`.** A seta da `LinhaProjeto` sobe de
  camada com o `translate` do hover e engolia o clique, mesmo com o link cobrindo a linha inteira.
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
- **O metal some em captura de página inteira**, porque a textura fica presa à janela. Não é bug:
  julgue o `.metal` em capturas da janela, rolando até cada elemento.
- **A textura do `.metal` termina na borda da caixa.** Caudas de "g" e "ç" e a última letra, com
  espaçamento negativo, ficam cortadas sem folga. Por isso a classe tem `padding`. Em texto
  centralizado, zere o `padding-inline-end`, que desloca o centro.

## Fases

| Fase | Conteúdo | Situação |
|---|---|---|
| 0 | Plano | Aprovada |
| 1 | Fundação | Aprovada |
| 2 | Páginas e componentes, filtro React com testes | Aprovada |
| 3 | Conteúdo de todos os projetos e lista de `PREENCHER` | Aprovada |
| 4 | Focos por vaga e download do currículo | Aprovada |
| 5 | Qualidade: a11y, SEO, imagens OG, CI, Lighthouse, links | Aguardando aprovação |
| 6 | Publicação no GitHub Pages | — |
| 7 | (Depois) Versão em inglês | — |

**Pendências combinadas:**

- O SIS2 pode aparecer com esse nome e a pergunta das análises veio da diretoria (Gabriel, 04/11/2026).

- Currículo do botão da home: `curriculo-dev-python.pdf`, confirmado pelo Gabriel em 04/11/2026.
- **Os 3 PDFs em `public/cv/` são públicos:** sem telefone e sem valor financeiro. Foram corrigidos a
  partir dos originais do Gabriel, que continuam em Downloads, com telefone. Um novo currículo precisa
  passar pela mesma limpeza antes de entrar aqui.
- **Depois da publicação:** medir o Lighthouse no site real e testar em um celular de verdade, em
  especial o reflexo das letras e a fluidez da rolagem. O CI mede um servidor local que imita o Pages.
- `npm audit` acusa 5 alertas, todos em dependências de desenvolvimento, e 0 em produção: 3 baixos (katex,
  via mermaid, sobre diagramas escritos por nós) e 2 moderados (fflate, via satori, que só lê fontes
  do próprio repositório). A correção sugerida rebaixaria o satori. Rever quando eles atualizarem.
- Rascunhos (`draft: true`) aparecem no `npm run dev`, com o rótulo "Rascunho", e nunca no build.
- O CNA Idiomas (LinkedIn do Gabriel) não está nos currículos. No site, aparece só em `/sobre`
  (`naHome: false`), porque a home mostra a experiência na Sotreq, como pede o briefing.

## Decisões de arquitetura

- **O filtro não renderiza os cartões.** `ProjectFilter.tsx` só desenha os botões e esconde os
  `[data-projeto]` que o Astro gerou. Assim existe uma única versão do cartão, as imagens seguem
  otimizadas e, sem JavaScript, a lista completa fica visível. O custo é a ilha mexer em um DOM fora
  da própria árvore, o que os testes cobrem.
- **`coverAlt` é um campo a mais no schema do briefing.** Toda capa precisa de texto alternativo, e
  o build falha sem ele.
- **A foto é um recorte de 800x800 do original enviado pelo Gabriel**, em `src/assets/foto/gabriel.jpg`,
  no enquadramento que ele aprovou. O original completo não entra no repositório.
- **Capas do NextUp são capturas do site no ar**, não `docs/img/` do repositório dele, que está
  desatualizado. Refaça com `npm run capturas` quando a interface mudar (Gabriel, 04/11/2026). O
  script toca no mapa, porque é aí que a função aparece: aproximação, opções numeradas e rota.
- **Diagramas escritos para caber em 360 px:** `flowchart TD`, subgrupos empilhados e no máximo três
  nós lado a lado. Cada um leva `accTitle` e `accDescr`, que viram o texto para leitor de tela.
- **"Arquitetura" é opcional e só existe com decisão real para mostrar** (Gabriel, 05/11/2026). Hoje só em
  NextUp e Telemetria. Um fluxo linear que repete a seção "Solução" não ganha diagrama. Em projeto novo,
  tire os fatos do código e das decisões documentadas. Na telemetria, a aplicação com Gemini fica fora
  do diagrama, porque a parte do Gabriel é o pipeline.

- **Foco novo é uma entrada em `src/config/focos.ts`.** `Inicio.astro` é a composição única da home e
  dos focos, e `selecionarParaFoco` decide a lista: projetos com as tags do foco primeiro, mesmo fora
  dos destaques, e depois os demais destaques. Focos ficam fora do menu e têm `noindex`.

## Comandos

```bash
npm run dev      # servidor local em http://localhost:4321
npm run check    # tipos e diagnósticos do Astro
npm test         # testes do Vitest
npm run build    # gera dist/
npm run preview  # serve dist/
npm run arte     # regenera a arte de cromo e os favicons
npm run capturas # recaptura o NextUp no ar; espera o parque ter fila (--agora para não esperar)

# Depois de `npm run build`. O CI roda todos, e qualquer falha reprova:
npm run verificar:dist       # links internos, PREENCHER, dados proibidos, SEO e mapa do site
npm run verificar:navegador  # acessibilidade, layout, teclado, filtro, focos, tema, diagramas e metal
npm run lighthouse           # 95 ou mais no celular; localmente, defina CHROME_PATH com o Edge
```
