---
title: Integração com a API do SIS2 (Caterpillar)
slug: integracao-api-sis2
summary: Automação em Python que levanta os part numbers de uma frota de 81 máquinas, antes consultados à mão.
role: Solo
context: profissional
# PREENCHER: período exato; "2026" vem do cargo atual no currículo
period: '2026'
# PREENCHER: confirmar o status
status: concluido
tags: [automacao, backend, industrial]
stack: [Python, API REST/JSON, SIS2]
metrics:
  - { label: Máquinas cobertas, value: '81' }
links: {}
featured: true
order: 3
confidential: true
draft: false
---

## Problema

Levantar os part numbers de uma frota de 81 máquinas exigia consulta manual, máquina a máquina, no catálogo técnico da Caterpillar.

## Solução

Uma automação em Python que consome a API JSON do SIS2 e levanta os part numbers da frota inteira.

## Arquitetura

```mermaid
flowchart TD
  accTitle: Fluxo da integração com o SIS2
  accDescr: Uma lista de máquinas alimenta a automação em Python, que consulta a API JSON do SIS2 e produz o levantamento de part numbers.
  L[Frota de 81 máquinas] --> P[Automação em Python]
  P --> A[API JSON do SIS2]
  A --> P
  P --> R[Levantamento de part numbers]
```

## Decisões técnicas

**API em vez de raspagem de tela com Selenium.**

<!-- PREENCHER: por que escolhi a API e qual foi o custo dessa escolha -->

## Resultados

- 81 máquinas cobertas, sem consulta manual.

<!-- PREENCHER: tempo antes e depois -->

## O que eu aprendi

<!-- PREENCHER: o que eu aprendi ou faria diferente -->
