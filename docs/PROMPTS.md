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
