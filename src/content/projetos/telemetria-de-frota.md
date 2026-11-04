---
title: Painel de telemetria de frota com insights por IA
slug: telemetria-de-frota
summary: Aplicação que consolida a telemetria de uma frota mista e usa o Gemini para sugerir o que melhorar.
# PREENCHER: confirmar se a integração com o Gemini também foi minha
role: Time de 3 — responsável pelo pipeline de dados (ingestão e tratamento)
context: profissional
period: set/2026 – atual
# PREENCHER: confirmar o status
status: em-desenvolvimento
tags: [dados, ia, industrial]
stack: [Python, VisionLink, React, Vite, API Gemini]
metrics: []
links: {}
featured: true
order: 2
confidential: true
draft: false
---

## Problema

Um cliente com frota mista, de Caterpillar e outras marcas, não tem uma visão única de consumo de combustível, ociosidade e deslocamento das máquinas.

## Solução

Uma aplicação web em React e Vite que consolida a telemetria. Os dados chegam por relatórios agendados do VisionLink em um e-mail dedicado e são tratados em Python. A aplicação envia esses dados à API do Gemini, que devolve insights sobre o que melhorar na frota.

**O que foi meu:** o pipeline de dados, da ingestão ao tratamento.

## Arquitetura

```mermaid
flowchart TD
  accTitle: Arquitetura do painel de telemetria
  accDescr: Relatórios agendados do VisionLink chegam a um e-mail dedicado, são tratados em Python e alimentam a aplicação web, que consulta a API do Gemini e mostra os insights.
  V[Relatórios agendados do VisionLink] --> E[E-mail dedicado]
  E --> P[Tratamento em Python]
  P --> W[Aplicação web: React e Vite]
  W --> G[API Gemini]
  G --> W
```

## Decisões técnicas

**Ingestão por e-mail agendado, em vez de API.** O acesso às APIs dos fabricantes é difícil e não estava disponível. O relatório agendado resolve a entrada de dados sem depender desse acesso. O custo é ficar preso ao formato e à frequência dos relatórios.

**Custo zero como requisito.** A solução precisava funcionar sem gasto de infraestrutura.

**Base pensada para replicar.** A estrutura foi desenhada para servir a outros clientes, e não só a este.

## Resultados

<!-- PREENCHER: máquinas monitoradas, relatórios processados ou outro número que possa ser público -->

## O que eu aprendi

<!-- PREENCHER: o que eu aprendi ou faria diferente -->
