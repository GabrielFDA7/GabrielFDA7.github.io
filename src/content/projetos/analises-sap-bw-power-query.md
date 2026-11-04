---
title: Análises de negócio com SAP BW e Power Query
slug: analises-sap-bw-power-query
summary: Estudo plurianual de eficiência entre filiais e pipelines que atualizam relatórios sem intervenção manual.
role: Solo
context: profissional
period: jan/2026 – ago/2026
status: concluido
tags: [dados, bi, negocio]
stack: [SAP BW, Power Query (M), Excel]
metrics:
  - { label: Período analisado, value: 2022–2026 }
links: {}
featured: false
order: 6
confidential: true
draft: false
---

## Problema

A pergunta veio da diretoria: onde a operação poderia ficar mais eficiente sem reduzir a equipe?

## Solução

**Estudo de eficiência entre filiais (jul–ago/2026).** Um estudo plurianual com exportações do SAP BW, sobre DOL, Receita Líquida e a relação DOL/RL, entregue em Excel e em apresentação para a diretoria.

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

- **De 2022 a 2026 analisados**, com uma projeção para o primeiro semestre de 2027.
- **Resposta entregue direto à diretoria**, em Excel e em apresentação.

## O que eu aprendi

Aprendi que se especializar em um negócio pode abrir caminho na área de desenvolvimento e análise, só por você entender muito do processo. Nem sempre é preciso estudar apenas código.
