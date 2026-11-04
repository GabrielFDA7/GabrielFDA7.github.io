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
