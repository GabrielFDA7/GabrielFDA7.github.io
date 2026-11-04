# Aprendizado

Roteiro para estudar o código depois: o que foi feito em cada fase, por quê e onde olhar.

## Fase 1: Fundação

### O que existe agora

Um site Astro que gera HTML estático, com tema claro e escuro, cabeçalho, rodapé, sistema de cores
e a arte de cromo. A página inicial ainda é uma prévia: a home real chega na Fase 2.

### Astro: HTML pronto, sem servidor

O Astro roda no build, não no navegador. Um arquivo `.astro` tem duas partes: o trecho entre `---`,
que roda só na hora de gerar o site, e o HTML abaixo dele. O visitante recebe o resultado pronto,
sem o JavaScript que o gerou. É por isso que dá para hospedar de graça no GitHub Pages.

- Comece por [src/pages/index.astro](../src/pages/index.astro): cada arquivo em `src/pages/` vira uma rota.
- [src/layouts/BaseLayout.astro](../src/layouts/BaseLayout.astro) é a moldura de toda página. O `<slot />` é onde o conteúdo entra.

### Tokens: as cores têm nome de função

Em vez de escrever `#050608` em cada componente, o código usa nomes como `bg-fundo` e `text-destaque`.
Quem define o valor é [src/styles/tokens.css](../src/styles/tokens.css). Trocar o tema é trocar os
valores desses nomes, e nenhum componente precisa saber qual tema está ativo.

[src/styles/global.css](../src/styles/global.css) liga os tokens ao Tailwind no bloco `@theme inline`.
Esse `inline` faz a classe apontar para a variável CSS, em vez de copiar um valor fixo.

### Tema sem a tela piscar

Se o tema fosse aplicado depois de a página aparecer, ela piscaria na cor errada. Por isso um script
minúsculo roda dentro do `<head>`, antes da primeira pintura, em
[BaseLayout.astro](../src/layouts/BaseLayout.astro). O botão em
[ThemeToggle.astro](../src/components/ThemeToggle.astro) grava a escolha no `localStorage`.

Sem JavaScript, o CSS ainda respeita a preferência do sistema, e o botão fica escondido, porque não
faria nada. O `try/catch` existe porque o acesso ao `localStorage` pode lançar erro em aba anônima.

### A arte é matemática

[scripts/gerar-arte.mjs](../scripts/gerar-arte.mjs) não parte de nenhuma imagem. Em quatro passos:

1. **Relevo.** Uma função de ruído dá uma altura para cada pixel. Deformar as coordenadas com outro
   ruído antes de ler a altura cria o aspecto de líquido escorrendo (*domain warping*).
2. **Normal.** A diferença de altura entre pixels vizinhos dá a inclinação da superfície.
3. **Reflexo.** Metal polido quase não tem cor própria: ele mostra o que reflete. A normal diz para
   onde o reflexo aponta, e esse valor consulta uma faixa de luz fixa. Faixas estreitas e brilhantes
   viram os fios luminosos. É o princípio de um *matcap*.
4. **Dispersão.** Ler a faixa com um deslocamento pequeno para vermelho e azul separa as cores só nas
   bordas, onde a luz muda rápido. Daí vêm as franjas de cor.

O emblema usa o mesmo sombreamento. A diferença é o relevo: a distância de cada pixel até a borda do
desenho do G forma um bisel, depois suavizado para não mostrar degraus.

**Por que gerar em vez de baixar?** A arte fica original, sem risco de licença, e dá para refazer
mudando uma linha. As saídas ficam versionadas, então o build não paga esse custo.

### Por que a arte é fundo CSS e não `<img>`

São duas imagens, uma por tema. Com duas `<img>`, o navegador baixaria as duas mesmo escondendo uma.
Com `background-image` ligado ao tema, só a imagem em uso é baixada. E como a arte é decorativa, o
leitor de tela não precisa dela. Veja [src/components/ArteCromo.astro](../src/components/ArteCromo.astro).

### O schema recusa conteúdo errado no build

[src/content.config.ts](../src/content.config.ts) descreve em Zod como um projeto deve ser. Se um
arquivo fugir da regra, o build para com uma mensagem clara. Testei quatro regras:

- Resumo com mais de 140 caracteres é recusado.
- Mais de 3 métricas é recusado.
- Tag fora da lista é recusada.
- **Projeto confidencial com link de código é recusado.** O `.refine()` transforma uma regra de
  negócio em erro de build, o que protege mais do que depender de lembrar.

### Testar não é o mesmo que olhar

A primeira verificação no navegador passou com a arte invisível: o contêiner dela tinha altura zero.
A causa está em [CLAUDE.md](../CLAUDE.md), nas armadilhas: o `<style>` de um componente tem escopo e
não alcança os elementos internos de um componente filho. Só apareceu ao olhar a captura de tela.
Depois disso, a verificação passou a conferir também o tamanho da arte.

## Fase 2: Páginas e componentes

### O que existe agora

Todas as páginas: home, lista de projetos com filtro, estudo de caso, sobre e 404. O conteúdo ainda é
de exemplo, com o NextUp e o SIS2. O restante entra na Fase 3.

### O que é uma ilha

Em um site React comum, a página inteira vira JavaScript: o navegador baixa o código de tudo, mesmo
do que é só texto, e então "liga" cada parte (*hidratação*). O Astro inverte isso. A página é HTML
puro, e só os pedaços marcados viram JavaScript. Esses pedaços são as **ilhas**, em um mar de HTML.

Quem marca é a diretiva `client:*`. Veja em [src/pages/projetos/index.astro](../src/pages/projetos/index.astro):

```astro
<ProjectFilter client:visible projetos={...} />
```

`client:visible` significa: só baixe e ligue este componente quando ele aparecer na tela. Sem
diretiva nenhuma, o Astro geraria o HTML do componente e descartaria o JavaScript.

### Por que só o filtro usa React

React é útil quando a tela muda com o estado: o filtro precisa lembrar a tag escolhida e atualizar
botões, contagem e URL. O resto do site não muda depois de carregar, e carregar React para exibir
texto seria pagar por algo sem uso. O resultado é mensurável: `/projetos` baixa 3 arquivos JS, e as
outras páginas não baixam nenhum.

O maior deles tem 212 KB antes da compressão e é o próprio React. Esse é o custo da ilha, e só quem
abre `/projetos` paga por ele.

### O filtro não desenha os cartões

Em [src/components/ProjectFilter.tsx](../src/components/ProjectFilter.tsx), o caminho óbvio seria
receber os projetos e desenhar os cartões em React. Isso criaria dois cartões para manter, um em
Astro para a home e outro em React para a lista, e deixaria de usar a otimização de imagem do Astro.

A escolha foi outra: o Astro gera todos os cartões, cada um com `data-tags`, e a ilha só liga o
atributo `hidden` nos que não combinam. Sem JavaScript, nada fica escondido, e a lista completa
aparece sozinha. Isso cumpre a regra de o filtro ser melhoria, não requisito. O custo é o componente
mexer em elementos fora da própria árvore, o que não é o padrão do React.

Dois detalhes para olhar no código:

- **A URL só é lida depois de montar.** O HTML foi gerado no build, sem URL nenhuma. Se o primeiro
  desenho já usasse `?tag=`, ele sairia diferente do HTML, e o React reclamaria (*hydration mismatch*).
  Por isso existe o `useEffect`.
- **`replaceState`, não `pushState`.** Trocar de filtro não cria uma entrada no histórico, então o
  botão Voltar sai da página em vez de desfazer filtros um a um.

### Testes

[tests/ProjectFilter.test.tsx](../tests/ProjectFilter.test.tsx) usa Vitest e Testing Library. Ele
procura os botões pelo papel e pelo nome, como um leitor de tela faria, e não por classes CSS. Assim,
trocar o visual não quebra o teste, mas trocar o comportamento sim.

[src/lib/projetos.ts](../src/lib/projetos.ts) não importa nada do Astro de propósito: função pura
roda no teste sem precisar simular o framework.

### Um arquivo por rota, um componente por seção

- [src/pages/index.astro](../src/pages/index.astro) só escolhe os dados e empilha as seções. Na Fase 4,
  as páginas de foco vão reaproveitar essas mesmas seções.
- [src/pages/projetos/[slug].astro](../src/pages/projetos/[slug].astro) cria uma página por projeto com
  `getStaticPaths`, que roda no build e já calcula o anterior e o próximo.
- [src/layouts/EstudoDeCaso.astro](../src/layouts/EstudoDeCaso.astro) monta o cabeçalho a partir do
  frontmatter. O texto vem do Markdown, então um projeto novo continua sendo um único arquivo.

### Hierarquia de títulos

O mesmo cartão aparece em dois contextos: na home ele fica abaixo de um `h2`, e na lista fica logo
abaixo do `h1`. Por isso [ProjectCard.astro](../src/components/ProjectCard.astro) recebe o nível do
título como propriedade. Pular um nível atrapalha quem navega por títulos com leitor de tela.
