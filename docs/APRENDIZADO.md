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

## Fase 3: Conteúdo

### O que existe agora

Os projetos ficam em [src/content/projetos/](../src/content/projetos/). Dos 9 do inventário inicial,
ficaram 7: o Gabriel retirou o mapa de municípios e o Arquivos-Suporte-Visitas, que não era dele.
Adicionar um projeto é criar um arquivo desses, sem mexer em nenhum componente.

### Diagrama no build, não no navegador

O jeito comum de usar Mermaid é baixar o script dele e desenhar no navegador do visitante, o que
pesa e atrasa a página. Aqui, o `rehype-mermaid` abre um navegador **durante o build**, desenha o
diagrama e coloca o SVG pronto no HTML. O visitante recebe só o resultado.

Veja a configuração em [astro.config.ts](../astro.config.ts). O custo é o build precisar de um
navegador: na máquina local ele usa o Edge, e no CI vai usar o Chromium do Playwright.

### Por que o diagrama muda de cor com o tema

O plugin tem uma opção pronta de tema escuro, mas ela usa um `<picture>`, que só obedece à preferência
do sistema e ignora o botão do site. Por isso o SVG entra direto no HTML (`inline-svg`), e o CSS em
[global.css](../src/styles/global.css) repinta cada parte com os tokens.

O `!important` é necessário ali porque o SVG traz um `<style>` próprio, com seletores mais fortes.

### Três defeitos que só apareceram olhando

Os testes passavam, e as capturas de tela mostraram três problemas nos diagramas:

1. **Texto invisível no tema escuro.** Os rótulos são HTML dentro do SVG, então a cor vem de `color`,
   e não de `fill`. A regra estava pintando a propriedade errada.
2. **Letras minúsculas no celular.** Subgrupos sem ligação ficam lado a lado, e o SVG encolhe para
   caber na tela. A solução foi escrever os diagramas na vertical, ligando os subgrupos com `~~~`, uma
   ligação invisível que só serve para empilhar.
3. **Rótulo cortado.** O Mermaid mede a caixa com uma fonte, e a página desenhava com outra, mais
   larga. O texto quebrava em mais linhas do que a caixa previa.

Cada um virou uma checagem automática: contraste real do rótulo, tamanho final da letra e texto que
escapa da caixa. Um defeito encontrado uma vez não deveria depender de alguém olhar de novo.

### Duas imagens, uma por tema

[CapaProjeto.astro](../src/components/CapaProjeto.astro) coloca as duas versões na página, e o CSS mostra
uma. Normalmente isso baixaria as duas, mas o `loading="lazy"` muda o resultado: o navegador só
carrega uma imagem lazy quando ela vai aparecer, e a escondida nunca aparece.

### Rascunho visível só para mim

[src/lib/projetos.ts](../src/lib/projetos.ts) mostra os rascunhos quando `import.meta.env.MODE` é
`development`, que é o caso do `npm run dev`. No build eles somem. Assim dá para revisar um projeto
antes de publicar. Mas o repositório é público: o arquivo do rascunho continua legível no GitHub.

### Por que há `PREENCHER` em vez de um texto genérico

Seria fácil escrever "reduziu o tempo de consulta" sem número. Mas um avaliador técnico pergunta
"quanto?", e uma frase vaga custa mais credibilidade do que uma seção curta. Por isso o que falta está
marcado, e a Fase 5 fará o build falhar enquanto houver marcador na página final.

### Como a identidade passou da abertura para o site inteiro

**O diagnóstico.** A abertura tinha linguagem própria, e o resto era um template de cartões. O remédio
não foi enfeitar os cartões, e sim trocar a estrutura: um sistema de materiais, em que cada tipo de
conteúdo tem um jeito próprio de aparecer em cromo.

**Metal nas letras.** A classe `.metal`, em [global.css](../src/styles/global.css), usa
`background-clip: text`: a imagem de fundo só aparece dentro do formato das letras, e o texto em si
fica transparente. A textura é gerada em [gerar-arte.mjs](../scripts/gerar-arte.mjs) com uma faixa de
luz que nunca fica escura demais, porque letra de metal ainda precisa ser legível.

Três cuidados para olhar:

- `background-color` junto da imagem: se ela falhar, o texto continua visível.
- `background-attachment: fixed`: a textura fica presa à janela e as letras passam por cima dela.
  É isso que faz o reflexo andar na rolagem, sem JavaScript. Vale só em computador e para quem não
  pediu menos movimento.
- Contraste medido pixel a pixel, porque ferramentas como o axe não conseguem avaliar texto sobre
  imagem. O mínimo ficou acima de 3,7:1, e a regra para texto grande pede 3:1.

**Os divisores que saíram.** A primeira separação, com lâminas, parecia um raio. A segunda, com fios
finos, também foi retirada depois: no computador, o espaço em branco separa as seções sem disputar
atenção. A lição é simples: nem toda seção precisa de um objeto entre ela e a próxima.

**Logos em metal.** Em [FerramentasIA.astro](../src/components/FerramentasIA.astro), o desenho de cada
logo vira uma máscara CSS, e a mesma textura das letras preenche a forma. O pacote `simple-icons` roda só
no build: o caminho do desenho entra no HTML, e o visitante não baixa JavaScript nenhum por isso.

**Por que linhas em vez de cartões.** Um cartão diz "aqui tem um item". Uma linha com número grande em
metal e título enorme dá ritmo e hierarquia. O hover continua dizendo que é clicável: o título vira
metal, e a seta avança.

**A técnica do link esticado.** Em [LinhaProjeto.astro](../src/components/LinhaProjeto.astro), o `::after`
do link cobre a linha inteira. Assim toda a área é clicável, mas o leitor de tela anuncia só o título.

**CSS como material.** O fio e as esferas não são imagens: são degradês (`--cromo-fio` e
`--cromo-esfera`, em [tokens.css](../src/styles/tokens.css)). Pesam quase nada e ficam nítidos em
qualquer tela. A esfera é um `radial-gradient` com a luz deslocada para o canto.

### Como o celular foi amarrado

**O diagnóstico.** Cada seção estava bonita sozinha, mas nada ligava uma à outra. No celular, a arte
era um retângulo solto, e o layout era o do computador empilhado. O remédio foi estrutural: uma peça
só, que atravessa a página. O fio também chegou a existir no computador, onde foi retirado a pedido do
Gabriel: lá, a composição já funcionava sem ele.

**O fio é um único elemento.** Em [global.css](../src/styles/global.css), o `.trilho::before` envolve
`main` e rodapé e vai de cima a baixo. As pontas não são calculadas: quem está na frente cobre o fio.
A arte (`z-index: 2`) esconde o começo, e assim ele parece nascer de dentro do metal. Isso evita medir
a altura de cada seção, que mudaria com o texto.

**A posição vem de contas em CSS.** O fio e as esferas usam a mesma margem e o mesmo recuo, e por isso
as esferas caem sobre o fio em qualquer largura. O desvio medido foi de 0 px.

**A borda líquida.** [MetalLiquido.astro](../src/components/MetalLiquido.astro) usa `clip-path: path()`
para recortar a arte. O mesmo desenho, com comandos relativos, serve para qualquer altura. Três traços
sobrepostos, do mais grosso e escuro ao mais fino e claro, imitam o volume de um cilindro em qualquer
ângulo, coisa que um degradê comum não faz numa curva. A poça do rodapé é o mesmo componente com
`scale: 1 -1`.

**Composição própria com a mesma marcação.** Em [LinhaProjeto.astro](../src/components/LinhaProjeto.astro),
`grid-template-areas` desenha o layout de cada tela, e o HTML não se repete. Em
[ProjetoPrincipal.astro](../src/components/ProjetoPrincipal.astro), a ordem do HTML (nome, aparelho,
texto) é a do celular. No computador, a grade coloca o aparelho na segunda coluna.

**Decoração oculta não pesa.** Com `display: none`, nem o fundo CSS nem a imagem lazy são baixados. O
celular não baixa a versão grande da arte.

**O reflexo das letras no toque.** No computador, o reflexo vem de `background-attachment: fixed`, em
que o iPhone não é confiável. No toque, [global.css](../src/styles/global.css) usa uma animação presa à
rolagem (`animation-timeline: view()`): a textura desliza enquanto o texto atravessa a tela. Navegador
sem suporte mostra a textura parada, o que continua legível.

**A diferença entre `overflow: hidden` e `clip`.** Os dois cortam o que passa da caixa, mas `hidden` cria
um contêiner de rolagem. A animação passou a escutar a seção em vez da página, e as letras dentro dela
ficaram paradas. O teste encontrou isso: 7 de 14 títulos da home não se moviam. Com `overflow-clip`,
nenhum ficou parado.

**O que só aparece em produção.** Em `npm run dev` funcionava, mas no build todas as letras ficaram
paradas. O compactador de CSS fundiu `animation` e `animation-timeline` em uma única linha, que o
navegador rejeita. Com as propriedades escritas uma a uma, não há o que fundir. A verificação no
`dist/` pegou o erro antes do deploy, e por isso a conferência final roda sempre no build.
