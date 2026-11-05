---
title: Painel de telemetria de frota com insights por IA
slug: telemetria-de-frota
summary: Aplicação que consolida a telemetria de uma frota mista e usa o Gemini para sugerir o que melhorar.
role: Time de 3 — responsável pelo pipeline de dados e tutor da integração com o Gemini
context: profissional
period: set/2026 – atual
status: em-producao
tags: [dados, ia, industrial]
stack: [Python, pandas, Parquet, pytest, VisionLink, React, Vite, API Gemini]
metrics:
  - { label: Máquinas monitoradas, value: '54' }
  - { label: Relatório processado, value: 1 por dia }
links: {}
featured: true
order: 2
confidential: true
draft: false
---

## Problema

Um cliente com frota mista, de Caterpillar e outras marcas, não tem uma visão única de consumo de combustível, ociosidade e deslocamento das máquinas. Os dados ficam em um site por fabricante, e acompanhar a frota significa abrir um por um.

## Solução

Uma aplicação web em React e Vite que consolida a telemetria. Os relatórios agendados do VisionLink chegam todo dia a um e-mail dedicado, e um pipeline em Python os lê, padroniza, valida e grava. A API do Gemini devolve insights sobre o que melhorar na frota.

**O que foi meu:** o pipeline de dados, da extração à execução diária, passando por normalização e qualidade.

**Integração com o Gemini:** como tutor do squad, dei a ideia e acompanhei de perto cada passo. A implementação foi de outra pessoa do time, sob a minha tutoria.

## Arquitetura

```mermaid
flowchart TD
  accTitle: Pipeline de telemetria
  accDescr: Os relatórios agendados do VisionLink chegam ao Gmail, e o JSON original é guardado sem alteração. Todo dia, o pipeline em Python normaliza cada arquivo e confere o contrato. Se o contrato quebra, aquele arquivo falha e os outros dias seguem. Se passa, as regras de qualidade marcam as linhas suspeitas e os dados são gravados em duas tabelas Parquet, uma por dia: utilização diária e alertas.
  V[Relatórios do VisionLink] --> E[Gmail: leitura por OAuth]
  E --> R[Camada raw: JSON original intacto]
  R --> N[Normalização em Python]
  N --> Q[Contrato do arquivo]
  Q -->|quebrou| F[Só este arquivo falha, os outros dias seguem]
  Q -->|passou| L[Regras marcam as linhas e gravam em Parquet]
  L --> U[(Utilização)]
  L --> A[(Alertas)]
```

O diagrama mostra o pipeline, que é a minha parte. A aplicação web com o Gemini é outra frente do time e ainda não lê esses dados.

**O dado original nunca é alterado.** Como a camada raw guarda o JSON como ele chegou, qualquer dia pode ser reprocessado quando uma regra muda.

## Decisões técnicas

**Ingestão por e-mail agendado, em vez de API.** O acesso às APIs dos fabricantes é difícil e não estava disponível. O relatório agendado resolve a entrada de dados sem depender desse acesso. O custo é ficar preso ao formato e à frequência dos relatórios.

**Parquet local até o banco existir.** Esperar as tabelas do banco travaria a coleta, e dia não coletado é histórico perdido. O Parquet preserva o tipo de cada coluna, ao contrário do CSV. O custo é ficar sem SQL até a migração, que mexe só na camada de gravação.

**Reprocessar o histórico a cada execução.** Gravar um dia substitui o arquivo daquele dia, então rodar duas vezes dá o mesmo resultado que rodar uma. Assim, uma regra nova corrige todo o passado. O custo é o tempo crescer junto com o histórico.

**Contrato para o arquivo, regra para a linha.** Um problema de formato, como unidade de tempo errada ou chave repetida, reprova o arquivo inteiro, sem atrapalhar os outros dias. Um valor estranho não descarta nada: a linha é gravada e marcada. A marcação tem três valores, porque "vazio" quer dizer que faltou dado para comparar, o que é diferente de "está certo". O custo é quem analisa precisar levar as marcações em conta.

**Custo zero como requisito.** A solução precisava funcionar sem gasto de infraestrutura.

**Base pensada para replicar.** A estrutura foi desenhada para servir a outros clientes, e não só a este.

## Resultados

- **54 máquinas** monitoradas.
- **1 relatório processado por dia**, com histórico desde 26/09/2026.
- **Já em uso:** as análises são feitas sobre os arquivos que o pipeline gera todo dia. O escopo planejado ainda não terminou: falta a carga no banco e a ligação do painel com os dados reais.

## O que eu aprendi

**O caminho inteiro de um pipeline.** Passei por extração, entendimento dos dados, normalização, qualidade e análise.

**Usar IA para aprender, não para copiar.** Comecei com uma regra: a IA explicava, e eu escrevia o código. Foi assim que fiz a leitura do relatório e a normalização. Na reta final, com o prazo apertado, abri uma exceção e a IA escreveu o restante, com cada decisão documentada.

**Trabalhar com frentes separadas.** Foi meu primeiro projeto em grupo com uma divisão clara de atividades.
