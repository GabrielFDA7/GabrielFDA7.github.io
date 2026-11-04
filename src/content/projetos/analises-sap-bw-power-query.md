---
title: Análises de negócio com SAP BW e Power Query
slug: analises-sap-bw-power-query
summary: Estudo plurianual de eficiência entre filiais e pipelines que atualizam relatórios sem intervenção manual.
role: Solo
context: profissional
# PREENCHER: período do estudo com SAP BW; jan–jun/2026 vale para os pipelines em Power Query
period: jan/2026 – jun/2026
status: concluido
tags: [dados, bi, negocio]
stack: [SAP BW, Power Query (M), Excel]
metrics: []
links: {}
featured: false
order: 6
confidential: true
draft: false
---

## Problema

<!-- PREENCHER: qual pergunta de negócio motivou o estudo e quem precisava da resposta -->

## Solução

**Estudo de eficiência entre filiais.** Um estudo plurianual com exportações do SAP BW, sobre DOL, Receita Líquida e a relação DOL/RL, entregue em Excel e em apresentação para a diretoria.

**Pipelines em Power Query (jan–jun/2026).** Limpam, normalizam e cruzam históricos de vendas, cadastro de clientes e laudos de inspeção, atualizando os relatórios sem intervenção manual.

## Arquitetura

```mermaid
flowchart TD
  accTitle: Fluxo das análises
  accDescr: Exportações do SAP BW alimentam o estudo em Excel e a apresentação para a diretoria. Históricos de vendas, cadastro de clientes e laudos de inspeção passam pelo Power Query e atualizam os relatórios.
  subgraph Estudo
    direction TB
    BW[Exportações do SAP BW] --> X[Excel]
    X --> D[Apresentação para a diretoria]
  end
  subgraph Pipelines
    direction TB
    V[Histórico de vendas, cadastro de clientes e laudos de inspeção] --> PQ[Power Query]
    PQ --> R[Relatórios atualizados]
  end
  Estudo ~~~ Pipelines
```

## Decisões técnicas

<!-- PREENCHER: 2 a 4 escolhas, com o trade-off de cada uma -->

## Resultados

<!-- PREENCHER: resultado sem nenhum valor financeiro real, como anos cobertos ou horas economizadas -->

## O que eu aprendi

<!-- PREENCHER: o que eu aprendi ou faria diferente -->
