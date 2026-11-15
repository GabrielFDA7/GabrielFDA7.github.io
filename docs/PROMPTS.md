# Registro de Prompts — Portfólio

Mesmo formato do `docs/PROMPTS.md` do NextUp.

**Regras deste arquivo:**

- Todo prompt é registrado **na íntegra**, sem correção de digitação ou reescrita.
- Nome de cliente da Sotreq, valor financeiro real ou dado sensível é substituído por `***`, porque
  este repositório é público.
- Anexos não são versionados. O registro apenas descreve o que foi enviado.

---

## Sessão 001 — 03 a 04/11/2026

### Prompt #001
**Data:** 03/11/2026
**Contexto:** Pasta só com o briefing, hoje em [prompt-inicial.md](prompt-inicial.md). Sem repositório.

```
Subi nesse projeto um .md para você criar um portfólio para mim. Qualquer dúvida, manda ai.
```

**O que resultou:**

1. Fase 0: plano com estrutura de pastas, componentes e perguntas.
2. Conferência do briefing contra o repositório do NextUp: as skills existem, a contagem de testes
   do README estava desatualizada e não havia sinal do assistente com LLM na `main`.

### Prompt #002
**Data:** 03/11/2026
**Contexto:** O repositório `GabrielFDA7.github.io` ainda não existia.

```
Crie o repositório pra mim. Pode clonar ele na área de trabalho.
```

**O que resultou:**

1. O modo automático do Claude Code bloqueou a criação de um repositório público, e nada foi criado.
2. Foram apresentadas as opções: o Gabriel cria pelo link ou autoriza o comando.

### Prompt #003
**Data:** 03/11/2026
**Contexto:** Resposta às opções acima.

```
Criado, pode clonar.
Eu autorizo.
```

**O que resultou:**

1. Clone em `C:\Users\500557\Desktop\GabrielFDA7.github.io`.

### Prompt #004
**Data:** 04/11/2026
**Contexto:** Respostas às perguntas da Fase 0. Anexos: 3 imagens de referência de chrome artwork e os
3 currículos em PDF.

```
Quero que você se inspire no design de chrome artwork para fazer o front, pode se basear em nessas imagens que te anexei (só no estilo)

Sobre as recomendações:

Pode colocar o projeto 9 do mesmo jeito, depois de ver como fica eu faço as alterações.
Sim, os projetos podem ser públicos.

Pode manter dentro (Assistente com LLM)

Use 946 e altere o readme do nextup
```

**O que resultou:**

1. Direção visual trocada para cromo líquido, registrada em [CLAUDE.md](../CLAUDE.md).
2. Fase 1 construída: Astro, tokens, tema, layout, schemas e arte gerada por código.
3. Contagem de 946 testes confirmada com `pytest --collect-only`. A correção do README do NextUp foi
   para a branch `docs/readme-contagem-testes`, aguardando o merge do Gabriel, porque todo push na
   `main` daquele repositório republica o serviço no Render.

### Prompt #005
**Data:** 04/11/2026
**Contexto:** Revisão da Fase 1 no servidor local.

```
É nessa pegada ai mesmo a arte visual.  Coloca a minha foto do github ou linkedin em algum lugar ai.
Pode ser o currículo de dev mesmo.
```

**O que resultou:**

1. Fase 1 aprovada e integrada à `main`.
2. Foto do GitHub recortada e colocada na abertura da home e em `/sobre`. O LinkedIn exige login.
3. Fase 2 construída: home, `/projetos` com filtro em React e testes, estudo de caso, `/sobre` e 404,
   com o NextUp e o SIS2 como projetos de exemplo.
4. `curriculo-dev-python.pdf` confirmado como o currículo do botão da home.

### Prompt #006
**Data:** 04/11/2026
**Contexto:** Revisão da Fase 2 no servidor local.

```
Ok!
As fotos que você pegou do nextup são bem antigas, o projeto está bem diferente hoje em dia, tem até versao clara e escura.
```

**O que resultou:**

1. Fase 2 aprovada e integrada à `main`.
2. A imagem antiga saiu. As capas passaram a ser capturas do site no ar, em versão clara e escura,
   acompanhando o tema do portfólio, com o script `npm run capturas` para refazê-las.
3. Fase 3 construída: 9 projetos, diagramas Mermaid sem script e a lista de `PREENCHER`.

### Prompt #007
**Data:** 04/11/2026
**Contexto:** Revisão da Fase 3. O Gabriel pediu para resolver o design antes de preencher os dados.

```
Vou preencher tudo que você precisa, mas antes disso, vamos ter que voltar a parte de desing.

A parte inicial, onde batemos os olhos primeiramente está muito bontia, fonte diferente, elemento cromático ao fundo e tudo mais (nas duas versões).

Porém, quando descemos a página ou vamos para outra sessão a identidade do site morre. Passa a ser apenas um monte de quadradinhos que tem texto dentro. Precisamos mudar isso, trazer de volta a personalidade do site e colocar mais elementos cromáticos que sintonizem e pareçam fazer parte do site.
```

**O que resultou:**

1. Novos materiais gerados por código: textura de metal para as letras e fitas com lâminas.
2. Os cartões saíram do site: projetos viraram linhas editoriais, e as sequências, um tubo de cromo
   com esferas.
3. Títulos e números em metal, com reflexo que anda na rolagem, e assinatura no rodapé.
4. Páginas internas passaram a repetir a composição da abertura. A abertura em si não mudou.

### Prompt #008
**Data:** 04/11/2026
**Contexto:** Revisão da nova identidade visual.

```
A separação entre as sessões hoje é um tipo de raio, bem agressivo. Transforme em uma coisa mais suave e fina.

Substitua o G na parte que fala como eu uso IA pela logo das IAs usadas.

Claude code, gemini, e mais ferramentas de IA que usamos. 

Na sessão "sobre" você poderia acrescentar que eu fui professor de inglês. Acho que isso está nos meus currículos, se não estiver, me fala que eu te atualizo.

Remova o "Português nativo" da parte que fala que eu tenho inglês C1

O meu nome ao final está cortado em algumas letras e fora de centralização. Pode substituir o raio que eu tinha falado antes nessas páginas também.
```

**O que resultou:**

1. A fita com lâminas virou dois fios finos de cromo, em todas as páginas.
2. O emblema da seção de IA deu lugar aos logos de Claude Code, Claude Design, Gemini e GitHub Copilot.
3. "Professor de inglês" entrou em `/sobre`. A informação não está nos currículos, e o Gabriel foi avisado.
4. "Português nativo" saiu de `/sobre`.
5. A assinatura do rodapé foi centralizada, e o corte das letras foi corrigido em todo o `.metal`.

### Prompt #009
**Data:** 04/11/2026
**Contexto:** Respostas às perguntas anteriores. Anexo: captura do LinkedIn com a experiência no CNA Idiomas (janeiro a novembro de 2024, Uberlândia, alunos de todas as idades e níveis).

```
1 -  imagem em anexo.

2 - Tá bom desse jeito.

3 - Sim

4 - Depois preencho.

A versão de computador está bem montada, já a de celular eu não estou gostando tanto assim. 

Aquele fundo cromado parece estar meio desconectado com o resto. Não está muito bem amarrado.

Me dê ideias para melhorar a estrutura geral do site como um todo. Principalmente a parte do celular, que está muito desamarrado.

Outra coisa, as fotos do NextUP não demonstram a funcionalidade do app. Você tirou a foto em um momento que o parque estava fechado. Se você clicar no mapa agora, vai ter as funcionalidades aparentes.
Gostei muito da forma que você fez o celular para display do nextup, bem criativo!
```

**O que resultou:**

1. CNA Idiomas entrou na linha do tempo de `/sobre`.
2. O nome da abertura passou a usar o mesmo metal do resto do site.
3. As capas do NextUp foram refeitas tocando no mapa, com as opções numeradas e a rota à vista.
4. Ideias de estrutura apresentadas, para o Gabriel escolher antes de qualquer mudança.

### Prompt #010
**Data:** 04/11/2026
**Contexto:** Escolha entre as ideias de estrutura: A (fio condutor), B (arte com borda líquida) e C
(composição própria no celular).

```
Manda bala, faz A + B + C
```

**O que resultou:**

1. Fio de cromo contínuo em todas as páginas, com as seções presas a ele por esferas.
2. No celular, a arte virou metal derretido no topo, que escorre e vira o fio, e uma poça fecha a página.
3. No computador, uma curva liga a arte ao fio. A seção de método mudou de lado para os passos ficarem
   sobre ele.
4. Celular recomposto: métricas em uma linha, aparelho logo abaixo do nome, linhas de projeto e botões
   mais compactos. A home foi de cerca de 8,5 para 6,7 telas em 390 px.

### Prompt #011
**Data:** 04/11/2026
**Contexto:** Revisão do fio condutor, com o Chrome simulando um Samsung A55.

```
Beleza, testei no chrome simulando um samsung a55, lá as letras não tinham o efeito de chrome que tem no desktop, aquele que eu desço a página e ele vai dando um efeito de chromado. Depois irei testar no celular quando for feito o deploy.

No modo de computador, ainda tem aquele fio de chrome que separa a página. 

Chega de inovação, remova esse fio e vamos no simples, talvez nem precise de separação entre essas etapas.
```

**O que resultou:**

1. No computador saíram o fio, as curvas e os divisores. Quem separa as seções é o espaço.
2. A seção de método voltou ao layout anterior, com os passos à direita.
3. No toque, o reflexo das letras passou a acompanhar a rolagem, com animação presa à rolagem.

### Prompt #012
**Data:** 04/11/2026
**Contexto:** Aprovação do visual.

```
FIcou zika, menó 

Vamos PREENCHER
```

**O que resultou:**

1. Lista de 45 itens a preencher, agrupados em 9 projetos.

### Prompt #013
**Data:** 04/11/2026
**Contexto:** Respostas à lista. Trechos sobre como o acesso a um sistema de terceiros foi investigado e
sobre uma questão interna da empresa foram mascarados com `***`, porque este repositório é público.

```
1 - apenas 2. Talvez seja melhor tirar o item, por enquanto. O que acha?

2 - A integração também foi minha.

2 - b) Em produção;

2 - c) Máquinas monitoradas são 54, enquanto os relatórios processados foram 1 por dia desde 25/10/2026.

2 - d) Aprendi todo o processo de um pipeline de dados, desde a extração, entendimento dos dados, normalização, qualidade e análise dados. Refinei a forma que uso IA para aprender a fazer os códigos e projetos sozinho, sem escrita de código por IA para que eu aprendesse o conteúdo de fato e não só copiasse e colasse. Foi meu primeiro projeto em grupo com uma separação clara de atividades.

3 - a) Foi por volta do mês 09/26.

3 - b) Sim, o projeto está concluído.

3 - c) A API entregava tudo que era necessário para montar o projeto a partir de uma simples requisição. É prefirivel ao Selenium visto que o site não tinha uma estrutura fácil de fazer scrapping, então o código ficaria mais instável e ainda demoraria mais com resultados piores.

3 - c) Antes o tempo era imensurável, dependiamos de olhar item a item de forma manual, primeiro procurar o item dentre uma enorme lista que não era nada amigável ao usuário, o que fazia com que alguns itens fossem fáceis de acha e outros praticamente impossíveis. Atualmente, basta rodar o projeto e ele lê todos os itens a partir da API de catálogo da CAT e monta uma planilha de EXCEL muito mais agradável visualmente e permite com que achemos o que procuramos em segundos. Esse projeto também serviu para extrairmos todo o catálogo de peças para uma máquina, algo que antes não existia dentro da empresa.

3 - e) ***

4 - a) O período da parte 2 é de Setembro de 2026.

4 - b) O projeto continua em uso até os dias de hoje.

4 - c) Tinhamos cerca de 10 - 20 documentos em um dia de trabalho. Com isso, levavamos cerca de 8 - 10 minutos por documento para transcrever todos os itens e realizar uma cotação para o cliente. Após a implementação, o documento já chegava e era anexado a automação, o resultado saia em 1 minuto. 

4 - d) Aprendi a integrar projetos que nasceram com propósitos diferentes, mas que poderiam ser usados para um objetivo em comum. No caso, extrair as informações de um pdf de cotação e a partir desses dados entregar um sistema completo de acompanhamento e análise para o cliente.

5 -  a) continua em produçaõ.

5 - b) Esse tópico de quantos itens são consultados por dia é impossível de responder. O projeto é usado pela Sotreq a nível Brasil, não consigo estimar quantos itens são consultados por dia.  Porém, 50 itens demoram cerca de 3 minutos e antes era mais de 30 minutos fácil.

5 - c) Esse foi meu primeiro projeto que passou a ser usado por pessoas que não mantinham contato direto comigo e aprendi que todo projeto deve ser blindado contra todo tipo de erro que o usuário possa causar, desde o mais pequeno até o maior possível.

6 - a) Foi feito em julho/agosto de 2026.

b) ***

c) Não entendi essa pergunta

d) Cobrimos desde 2022 até 2026 e ainda foi feita uma projeção para a primeira metade do ano de 2027.

e) Aprendi que se especializar em um negócio pode te tornar um grande candidato a crescer na área de desenvolvimento e análise apenas por você entender muito do processo. Nem sempre é preciso estudar apenas código.

7 - a) Tudo meu.

b) Não.

c) Por IA dos inimigos eu quero dizer o padrão de raciocínio deles dentro do jogo. Como atacam, quando, de qual forma, por onde e esse tipo de coisa. Focado em combate.

d - pula

e - pula

f - Eu fiz mais de 7 inimigos, por volta de uns 10. Atualmente, o jogo está em beta fechado, o primeiro bioma (primeira fase) está fechado e sendo testado ao máximo.

g - Me aprofundei bastante em c#  e aprendi mais sobre linguagens orientadas a objetos, foi um dos meus primeiros projetos com programação forte.

8 - pode remover esse projeto.

9 - Pode remover esse também. O projeto não é meu, o que eu fiz foi apenas trocar a tecnologia.
Antes era tudo feito em VBA, passei para python e html + css e js.

Os projetos estão na pasta:

C:\Users\500557\OneDrive - Sotreq\Gabriel de Angelis\Projetos

Lá tem três pastas, pode entrar em todas e dá uma fuçada, alguns nomes estão diferentes, mas são alguns dos projetos que estão descritos acima.
```

**O que resultou:**

1. Respostas aplicadas aos projetos, com detalhes técnicos conferidos no código e na documentação das
   pastas indicadas. Nenhum dado, nome de cliente ou credencial foi copiado.
2. O mapa de municípios e o Arquivos-Suporte-Visitas saíram do site, que ficou com 7 projetos.
3. Quatro pontos em que a resposta diverge da documentação do projeto de telemetria foram levados ao
   Gabriel para confirmar antes da publicação.

### Prompt #014
**Data:** 04/11/2026
**Contexto:** Respostas às divergências do projeto de telemetria e às decisões das análises com SAP BW.

```
1 - Como você bem sabe, sou o tutor do squad da filial que cuida dos projetos. Eu fiz a tutoria da "Pessoa B" para implementarmos o gemini no projeto. Dei a ideia e acompanhei de perto todo o passo a passo da execução.

2 - Mesmo com os arquivos sendo gravados localmente o projeto está em produção. Análises sao feitas em cima desses arquivos, realmente ainda não foi finalizado todo o escopo como haviamos planejado, mas já está sendo usado.

3 - Realmente, por conta de prazo, removi o freio de criação de código por parte da IA no projeto. Havia me esquecido disso, implemente no texto como você acha que deve ser feito.

4 - O início é 26/09.


Começamos em 2022 para ter uma grande base de dados para analisar, trazendo mais profundidade e garantindo que os padrões analisados fossem reais e não algo que aconteceu em um ano apenas.

As filiais de tamanhos diferentes foram analisadas com pesos e métricas personalizadas, além da expertise do meu gestor.

2027 foi projetado de acordo com os gastos dos anos prévios, mais uma análise de mercado e possiveis variáveis que entrariam em jogo para o ano que vem, como as eleições presidenciais do Brasil e as midterms dos EUA.
```

**O que resultou:**

1. O texto do painel de telemetria passou a separar o pipeline da tutoria na integração com o Gemini.
2. O selo "Em produção" foi mantido, com o escopo que ainda falta descrito no texto.
3. As decisões técnicas das análises foram escritas, e nenhum `PREENCHER` ficou nos projetos.
4. Fase 3 integrada à `main`.
5. Fase 4 construída: `/foco/dados`, `/foco/ia` e `/foco/backend`, à espera dos PDFs corrigidos.

### Prompt #015
**Data:** 04/11/2026
**Contexto:** Resposta sobre os currículos e as duas decisões pendentes.

```
Você não consegue fazer a alteraão nos PDFs pra mim? Eles foram feitos pelo claude online. Caso não consiga, me dê um prompt para eu colar lá no chat e ele fazer as alterações.

O que você quer que eu responda sobre o SIS2? Pode publicar ele com esse nome, sem problemas.

SIm, a pergunta veio de lá.
```

**O que resultou:**

1. Os 3 currículos foram corrigidos direto no PDF e entraram em `public/cv/`: sem telefone, sem valor
   financeiro e com 946 testes, 10 sessões e 70 prompts. Os originais não foram alterados.
2. O nome SIS2 e a pergunta vinda da diretoria foram confirmados.

### Prompt #016
**Data:** 04/11/2026
**Contexto:** Aprovação dos focos.

```
Troque os e-mails do site por:
gfaria.deangelis@gmail.com

Pode seguir a fase 5.
```

**O que resultou:**

1. Fase 4 integrada à `main`, e o e-mail trocado no site e nos 3 currículos.
2. Fase 5 construída: imagem de compartilhamento por página, mapa do site, `robots.txt`, JSON-LD,
   verificações automáticas e CI com Lighthouse.

### Prompt #017
**Data:** 04/11/2026
**Contexto:** Revisão da Fase 5 no site local, com a foto original em anexo.

```
Claude, essa é a imagem que você pegou do linkedin.

Ela está com baixa resolução no site atual. Talvez se você usar o arquivo original fique melhor. O enquadramento está top.
```

**O que resultou:**

1. A foto de 240x240 foi trocada por um recorte de 800x800 do original, no mesmo enquadramento,
   localizado por comparação de imagem. Só o recorte entrou no repositório.
2. A foto passou a ser servida também em densidade 3x, para celulares de tela mais densa.

### Prompt #018
**Data:** 04/11/2026
**Contexto:** Dúvida sobre mostrar as tecnologias no site.

```
Ficou muito bom. 

Será que é importante ter uma área de tecnologias logo no "Sobre" ou em alguma outra área do site? Onde mostramos todas tecnologias que tenho ou já tem coisa demais?
```

**O que resultou:** recomendação de uma seção só no Sobre, com um rascunho de tecnologias por área.

### Prompt #019
**Data:** 04/11/2026
**Contexto:** Resposta à recomendação de uma lista simples.

```
Pensei em fazer uma coisa mais animada, vai trocando as tecnologias com algum tipo de animação que faça sentido para o site. Pra colocarmos todas as tecnologias e não ficar tão extenso e nem feio. O que acha?

No máximo 5 ou 6 tecnologias por vez, e vai mudando.
```

**O que resultou:** proposta de troca por área, com faixa de luz, sem obrigar ninguém a esperar. Como o
briefing proíbe carrossel, a exceção foi apontada para o Gabriel decidir.

### Prompt #020
**Data:** 04/11/2026
**Contexto:** Decisões sobre a lista de tecnologias.

```
Pode colocar sql, git e power bi.

Só 30 tá bom.
```

**O que resultou:**

1. `VitrineTecnologias` em `/sobre/`: 30 tecnologias em 6 áreas, com troca a cada 5 segundos.
2. A pergunta sobre React e Vite ficou sem resposta, então os dois ficaram de fora.

### Prompt #021
**Data:** 05/11/2026
**Contexto:** Revisão da vitrine, do tema escuro e dos estudos de caso.

```
Remove a parte de IA das tecnologias e acho que precisamos deixar o efeito no modo escuro um pouco mais sóbrio. Acho que está muito chamativo, na versão branca está um pouco mais escuro e acaba ficando mais profissional. 

Como podemos contornar isso? Está lindo, mas algo me diz que não está tão profissional.

Outra coisa, a setinha que deveria levar aos projetos não funciona e a parte de arquitetura deles está muito simples, capaz que é melhor nem ter ela em todos os projetos se for pra ficar assim. Também precisamos melhorar.
```

**O que resultou:**

1. A área de IA saiu da vitrine, que ficou com 28 tecnologias em 5 áreas.
2. As letras de metal do tema escuro viraram prata mais contida, sem branco puro e com pouca cor.
3. A seta das linhas de projeto voltou a funcionar, com um teste para isso não voltar.
4. "Arquitetura" ficou só em NextUp e Telemetria, com diagramas e textos refeitos a partir do código e das
   decisões documentadas. Cada um dos dois ganhou também uma decisão técnica nova.

### Prompt #022
**Data:** 05/11/2026 e 06/11/2026
**Contexto:** Fotos dos projetos e centralização das ferramentas de IA.

```
Abre o localhost desse projeto, por favor.

Como vamos adicionar fotos dos projetos ao site, sem alterar muito o layout. Tem ideias?

Opus, você tem alguma ideia melhor do que as que o seu modelo irmão deu?

Irei enviar as imagens de alguns que tenho.
Você consegue ver a ordem das imagens que eu anexar?

Beleza, vou enviar.
Corrija a centralização das tecnologias com o nome delas na sessão "Como eu trabalho com IA"

Imagem 1 - EPTA, capa do jogo;
Imagem 2 - Telemetria - visão geral;
Imagem 3 - Telemetria - Insights de IA.
Imagem 4 - Telemetria - Visão geral, destaques da frota;
Imagem 5 - Telemetria, Login.

Acho que esses são os únicos projetos que conseguimos ter foto.
```

**O que resultou:**

1. Logos de "Como eu trabalho com IA" centralizados com os nomes.
2. Capas em EPTA e Telemetria, com a home e a lista sem mudança.
3. Na telemetria, duas telas no texto e legendas que dizem de quem é cada uma e que os dados são fictícios.
4. Só 4 das 5 imagens chegaram: "destaques da frota" ficou de fora.

### Prompt #023
**Data:** 13/11/2026
**Contexto:** Respostas sobre as imagens da telemetria e revisão do texto de cinco projetos. A primeira
parte chegou colada e sem quebras de linha.

```
1 - Sim, posso publicá-las.2 - É um e-mail fictício.3 - Pode sim.4 - Também não tem problema.Precisamos atualizar o projeto de telemetria, como eu posso te conectar ao projeto para você entender tudo o que mudou? Quer redigir um prompt para eu colar lá e ele entregar as respostas do jeito que você precisa para adicionar ao portfólio?Reparei que nesse projeto, as outras duas telas não tem a moldura de metal que existe nas outras, foi proposital? Acho que talvez seria melhor manter.Vamos reformular o projeto da API so SIS2:Na verdade, o projeto levanta as peças de qualquer máquina e em qualquer quantidade. Ele foi desenhado e projetado numa época que a minha demanda era entender todas as peças dessas 81 máquinas, mas ele não é preso a elas.Problema:O problema era que levantar as peças que compunham uma máquina era muito sofrido, anteriormente era feito completamente a mão e poderia levar horas apenas para uma máquina, visto que o site (SIS2) é pouco user friendly para essa questão. O que me motivou a criar esse projeto? O meu gestor precisava demonstrar resultado numa campanha de reposicionamento de preços que algumas máquinas específicas sofreram. No caso, são as 81 máquinas que já são citadas.O pedido dele era pra eu simplesmente levantar as peças, não me deu uma específicação para eu automatizar o processo ou melhorar, só queria o resultado, a parte de facilitar tudo veio de mim, eu mesmo não queria sofrer a dor de ter que fazer manual kkk.A solução:Essa parte está fiel, é realmente uma automação em Python, que usando os números de série de máquinas selecionadas pelo usuário, se conecta com a API JSON do site SIS2, puxa os dadaos da máquina e devolve uma planilha em Excel com as peças de cada máquina, já separada por grupo (tipo de peça) e com uma granulação do dado profunda.Decisões técnicas:Precisamos mudar apenas a última parte, em que fala que Abrir as peças individuais só onde importa.Isso realmente acontece, mas é uma limitação imposta por mim, acho que ficaria mais bonito fala que é uma escolha do usuário se ele quer analisar a máquina inteira ou se quer focar em grupos específicos da máquina, no caso da demnada, era realmente só material rodante e fps, mas eu criei a solução pensando em já facilitar para a máquina completa.Automação do ciclo de pedidos de um cliente: do PDF ao dashboard:Acho que podemos mudar a descrição para algo do tipo "Extrator de dados de PDFs para o time de vendas e um painel para acompanhamento diário de pedidos para o cliente."Problema:Acho que podemos manter a primeira parte, mas para a segunda, devemos escrever "O cliente também não tinha visibiliadade do status das próprias entregas, dependia do vendedor responsável para entender se seu pedido já havia sido faturado, separado para coleta, enviado ou concluído."A primera parte da solução está boa, mas acho que podemos melhorar a segunda. Acho que também podemos nos conectar ao diretório do projeto para você entender melhor do que se trata. Pode gerar um prompt também ou siga a mesma ideia da primeira solução que pedi mais acima.Automações SAP e RPA:Esse projeto está completamente desconexo. Essas três coisas realemente acontecem, mas não são ligadas e ainda ficaram má descritas na página.A parte de verificadores de preço e disponibilidade é a parte que merece mais destaque, acho que devemos remover as outras partes dessa página.O problema:Na Sotreq, os grandes clientes possuem listas de preços que são diferentes dos preços da maioria dos clientes, possuem condições especiais. Um dos vendedores havia solicitado que extraíssemos os preços das peças para montarmos uma nova lista para um cliente, com mais de 1000 itens. Esse processo era feito todo manualmente, por uma transação do SAP (YLP_PARTS), essa é uma transação específica da empresa (verifique esse fato, por favor), por ela era possível inserir uma lista de itens e esses itens eram buscados no catalogo da CAT e da Sotreq (alcance global) e retornava onde cada peça tinha estoque. O problema era que, apesar de conseguirmos colocar muitos itens a transação demorava exageradamente para rodar e entregar os itens em uma forma inicial de visualização, nessa forma, era possível apenas ver o preço e algumas outras específicações do item, porém, não era possível ver a disponibilidade e onde ela estava.Para ver isso, o usuário deveria clicar item a item dentro da transação, ela demorava mais uns 30 segundos e finalmente retornava a disponibilidade. Porém, isso não era extraível, não tinha como o usuário criar uma planilha automaticamente ou um txt. Foi então que eu pensei em uma forma de automatizar todo o processo, desde a inserção dos itens na transação, ao clique um a um e copiar de uma forma não usual (por conta do SAP) e jogar os dados de disponibilidade numa matriz, que seria contruída para todos os itens e após todo o processo, colocada em uma planilha do excel, já estruturada e com uma tabela dinâmica que facilitava a visualização do item para o usuário.Os outros tópicos já estão bem definidos, mas mesmo assim, veja se consegue extrair alguma coisa desse texto para melhorá-los.

Essa primeira parte da mensagem ficou bem mal formata, precisei colar ela aqui no chat.

Análise de negócios com SAP e Power Query:

Um estudo feito para analisar a eficiência de gastos da filiail de Uberlândia da Sotreq, comparando com as outras filiais da regional.

Acho que podemos remover esse projeto, não faz sentido ficar falando de DRE, ou talvez reformular para algo como "Análise e inteligência de negócio".

Problema:

A empresa reformulou o modelo de trabalho e a diretoria exigiu que as filiais reduzissem os gastos ao máximo possível, com isso, a principal frente atacada foi a folha de pagamento.

Como uma forma de defender nossa estrutura eu e meu superior direto iniciamos uma jornada pela DRE da empresa toda, verificando cada filial, onde gastavam, qual era a porcentagem de conversão, etc. Analisamos todas as contas do balanço e percebemos que não era necessário cortar funcionários para que a meta de redução de custos fosse atingida.

Dessa forma, estruturei uma apresentação que demonstrava todos os resultados que encontramos, reunia as nossas ideias para corte de custos e ainda justificava manter todos os nossos funcionários (que era a principal dor da nossa filial, não queriamos cortar pessoas).

A análise foi feita em cima da DRE da Sotreq, a partir do SAP BW, lá montamos um fluxo de extração das contas para fazermos as análises e tratamos os dados com o Power query.  A partir dai, montamos gráficos e demonstrações de resultado que defendiam nosso posicionamento.

O aprendizado que ficou para essa tarefa foi que o conhecimento da operação que você trabalha vale tanto quanto o conhecimento em tecnologias de desenvolvimento. Além disso, ferramentas básicas como o Excel, Power Point e Power query já fazem um trabalho excelente para tarefas mais básicas.

(pode reformular esse texto se sentir que é necessário)

A parte de decisões técnicas está bem estruturada, pode manter.


EPTA:

A EPTA (Equipe de propulsão e tecnologia aeroespacial) é uma equipe universitária da UFU que constrói foguetes, satélites e tecnologia aeroespacial.
A equipe é dividida em vários times, cada um toma conta de uma área que faz ser possível o desenvolvimento dos foguetes. Temos a equipe de propulsão, recuperação, aeroinâmica, etc.
Dentre a lista das equipes, temos a equipe de entertainment, e é dessa equipe que eu participo.
O entertainment é uma das frentes da ETPA que não participa diretamente na construção e desenvolvimento dos foguetes. O intuito da equipe é promover a popularidade da equipe e trazer investimento para que consigamos concluir os projetos aeroespaciais.

A principalm forma de fazer isso atualmente é o Leaving Plerotus (nome provisório), um jogo roguelike isométrico em que um trabalhador espacial acaba passando por problemas e preso em um planeta hóstil, que nunca antes havia sido explorado. O objetivo do personagem principal é reconstruir sua nave e sair do planeta, mas para isso ele terá que transpor todos os desafios que essa terra inexplorada apresenta.

Nesse projeto, participei muito da criação da lore, formulando a ideia inicial e depois desenvolvendo com meus colegas de time. Além disso, quando houve a divisão de tarefas iniciais, optei por cuidar da parte de criação dos inimigos, criando desde lore, ideia de design (eu não desenhava, apenas descrevia como queria o inimigo), padrão de movimento, padrão de ataques, drops dos inimigos, primeiro sistema de inventário. 
Não tenho o projeto aqui nesse computador, mas está no github. Você consegue analisar sem eu ter que clonar?

Eu ainda vou baixar a versão mais nova do jogo para tirar uns prints e colocarmos no portfólio.

Aqueles resultados que aparecem logo abaixo do nome estão ruins. Coloque um número exato de inimigos

Qualque dúvida, pergunte!
```

**O que resultou:**

1. As imagens no meio do texto ganharam a mesma moldura de cromo da capa.
2. Telemetria atualizada direto da pasta do projeto, sem prompt intermediário: gravação no Supabase, as 10
   análises do painel, a regra que separa máquina parada de aparelho mudo e 34 testes.
3. SIS2: serve para qualquer máquina, a motivação da campanha e o detalhamento como escolha de quem usa.
4. Ciclo de pedidos: resumo e problema novos, e a parte 2 com a decisão de não usar Power BI.
5. Verificadores SAP: só preço e disponibilidade, conferidos no código das macros. A YLP_PARTS é
   transação própria da empresa, pelo prefixo Y.
6. A análise de negócio virou "Análise e inteligência de negócio", com o texto novo.
7. EPTA: lido o repositório público do jogo, com 13 inimigos no bestiário e o que foi do Gabriel pelos commits.

### Prompt #024
**Data:** 13/11/2026
**Contexto:** Respostas às perguntas sobre os projetos reescritos.

```
No SIS2, tenho uma versão com a possibilidade de escolha.

2 - Por enquanto pode falar só do que eu escrevi, logo mais atualizaremos o portfólio.

3 - Sim

4 - Sim, a equipe foi completamente mantida, apenas uma pessoa se demitiu e outra foi remanejada de cargo, mas por livre e espontânea vontade, acho que não vale colocar isso.

5 - É Leaving Plerotus;

Coloque que eu fiz 8 de 13 inimigos;

O que é uma máquina de estados?

Sim, continua
```

**O que resultou:**

1. SIS2 mantido: o detalhamento é escolha de quem usa.
2. Ciclo de pedidos sem a decisão sobre o Power BI, que vinha do plano da versão nova.
3. Análise de negócio com o resultado "ninguém da filial foi demitido".
4. EPTA com "8 de 13 inimigos" na métrica e nos resultados.
5. Explicação de máquina de estados. A frase saiu do texto até o Gabriel dizer se escreveu essa parte.

### Prompt #025
**Data:** 13/11/2026
**Contexto:** Resposta à explicação sobre máquina de estados.

```
Ah entendi. Pode manter que a máquina de estados foi minha.
```

**O que resultou:** a página da EPTA voltou a citar as máquinas de estados do Shard Swarm e do Geobionte,
com os estados de cada um.

### Prompt #026
**Data:** 15/11/2026
**Contexto:** Início de sessão, com as mudanças de 13/11 ainda sem commit.

```
Abra um localhost do projeto e me fale as pendências da última sessão
```

**O que resultou:** servidor local no ar e a lista de pendências: commit da sessão anterior, um arquivo
solto na raiz, o registro no APRENDIZADO e o que dependia do Gabriel (capturas da EPTA, versão nova do ciclo
de pedidos, aprovação da Fase 5).

### Prompt #027
**Data:** 15/11/2026
**Contexto:** Resposta à lista de pendências.

```
1 - pode commitar tudo.

2 -  Qual a diferença entre os arquivos?

3 - Vamos alterar mais uma coisa ainda antes de registrar. Estou sentindo que  a parte que mostra os resultados no projeto está jogando contra em vez de jogar a favor. Não senti que nada daqueles resultados deveriam ser mostrados, eles não são relevantes.

Acho que podemos remover essa parte ou então reformular, mas não tenho ideia do que colocar no lugar.

Além disso, acho que a forma que as páginas de projetos tem as informações dispostas está muto ruim. Pode criar uma versão diferente para compararmos? Dá uma analisada e procura outros portfólios para termos uma ideia de como é feito.
```

**O que resultou:**

1. Build e todas as verificações, e 9 commits da sessão de 13/11, um por assunto.
2. O arquivo solto era uma cópia do briefing, com outra quebra de linha.
3. Pesquisa sobre estudos de caso: quem recruta lê rápido, a parte de cada um precisa ser explícita e
   número só ajuda quando mostra mudança.
4. Versão B do estudo de caso, só no `npm run dev`: três frases na abertura (problema, o que eu fiz,
   resultado), sem a faixa de métricas e sem a seção "Resultados", com ficha e índice numa coluna lateral.

### Prompt #028
**Data:** 15/11/2026
**Contexto:** Comparação entre a versão atual e a versão B.

```
Sim, pode apagar.

Ficou infinitamente melhor na versão B, podemos mudar para essa versão.

Uma coisa que pensei, nos projetos que temos imagens, acho que seria válido colocar a imagem principal do projeto no lugar daquele forma cromática que vem ao lado do título. O que acha?

As páginas estão muito genéricas. No que não tem foto, acho que mantemos daquele jeito mesmo, me fale o que acha sobre.
```

**O que resultou:**

1. Versão B como a única, com o campo `resumo` obrigatório e as seções "Resultados" removidas. No NextUp, os
   946 testes e o deploy foram para a frase de resultado.
2. Em NextUp, telemetria e EPTA, a imagem do projeto na moldura de cromo no lugar da arte, no computador.
3. Preload só da imagem do tema visível, depois de o Lighthouse mostrar as duas versões disputando banda.
4. Sem foto, a arte continua: imagem decorativa nova seria pior que ela.

### Prompt #029
**Data:** 15/11/2026
**Contexto:** Tema escuro.

```
Uma coisa que estou achando ruim no modo escuro é o preto puro.

No modo branco, eu consigo perceber que o branco não é o #fffff, ele tem uma tom a mais de alguma outra cor no meio. Enquanto isso, no modo escuro o preto parece ser o preto puro. Acho que podemos dar uma neutralizada nisso, o que acha?
```

**O que resultou:** fundo escuro de `#050608` para o grafite `#111317`, com superfícies e linhas junto. A arte
escura passou a terminar no novo fundo, no próprio script. O metal das letras ficou entre 5,9:1 e 12,6:1.

### Prompt #030
**Data:** 15/11/2026
**Contexto:** Fim dos ajustes visuais.

```
Ficou muito melhor e acho que finalizamos com os detalhes, demorou mas foi.

Agora quero que você passe um pente fino no projeto. Teste fim a fim para identificar problemas que haviam passado despercebidos e liste para que arrumemos.

Também fique a vontade para analisar a estrutura e como as informações estão dispostas, pode verificar nos sites de referência. As mudanças para melhor ainda são bem vindas.
```

**O que resultou:** teste das 14 páginas em quatro larguras e dois temas, dos links externos, dos currículos
e das interações. Lista com 11 itens, em três prioridades, e uma proposta de estrutura.

### Prompt #031
**Data:** 15/11/2026
**Contexto:** Aprovação da lista.

```
Muito bem, comece. Vá me perguntando se é para fazer o próximo item quando acabar o atual.
```

**O que resultou** (cada item depois de uma pergunta ao Gabriel):

1. Só o índice "Nesta página" fica fixo: a coluna inteira passava da tela em 1366x768 no NextUp.
2. Números da home e da lista trocados por números que mostram mudança. A Inteligência ficou sem número.
3. Abertura de `/projetos/` e a imagem de compartilhamento com a estrutura atual.
4. Área de clique de 36 px nos links do índice.
5. Período do ciclo no padrão, frase dos estados da EPTA, repetição do Sobre e aviso próprio na
   Inteligência ("valores financeiros omitidos").
6. Currículos baixam como `Gabriel-de-Angelis-curriculo-<foco>.pdf`.
7. Campo `principal` nos focos: `/foco/dados/` abre pela telemetria, com a tela larga na moldura.

### Prompt #032
**Data:** 15/11/2026
**Contexto:** Pergunta sobre os itens que dependiam de conteúdo do Gabriel.

```
Vamos fazer apenas o da EPTA, mas quero que você faça pra mim kkk, consegue não? Os currículos estão aqui no computador em algum lugar.
```

**O que resultou:** só havia os PDFs, sem fonte editável. A linha da EPTA foi apagada por *redaction* nos três
currículos e reescrita com a Inter já embutida neles: "Criei 8 dos 13 inimigos de um roguelike em Unity e
programei em C# dois deles, os drops e o inventário." A comparação linha a linha mostrou que só ela mudou.
Os originais em Downloads ficaram como estavam. Depois, o Gabriel pediu para registrar e encerrar a sessão.

### Prompt #033
**Data:** 15/11/2026
**Contexto:** Fim do pente fino, com tudo commitado na `fase-5`.

```
Aprovo a fase 5
```

**O que resultou:** Fase 5 marcada como aprovada no `CLAUDE.md` e integrada à `main`.
