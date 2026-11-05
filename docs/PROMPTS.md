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
