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
