---
title: 'Automação do ciclo de pedidos de um cliente: do PDF ao dashboard'
slug: ciclo-de-pedidos
summary: Extrator de PDFs para o time e acompanhamento diário de pedidos para o cliente, sem custo de hospedagem.
role: Solo
context: profissional
# PREENCHER: período da parte 2; o extrator é de jan–fev/2026
period: desde jan/2026
# PREENCHER: confirmar o status; a rotina diária sugere que segue em uso
status: em-producao
tags: [automacao, dados, bi]
stack: [Python, pdfplumber, pandas, openpyxl, CustomTkinter, PyInstaller, SAP, Looker Studio, Google Sites]
metrics: []
links: {}
featured: true
order: 4
confidential: true
draft: false
---

## Problema

Os dados de pedidos e faturas de um cliente chegavam em PDF e eram digitados à mão. O cliente também não tinha visibilidade do status das próprias entregas.

## Solução

**Parte 1, extrator (jan–fev/2026).** Uma aplicação desktop lê os PDFs semiestruturados de pedidos e faturas com pdfplumber, trata os dados com pandas e openpyxl e exporta planilhas prontas. A interface é em CustomTkinter, e a distribuição é um executável único, feito com PyInstaller.

**Parte 2, acompanhamento.** O Agendador de Tarefas extrai relatórios do SAP todo dia, e o Python os trata. O resultado alimenta um relatório em Looker Studio, com busca e filtros, publicado em um Google Sites.

## Arquitetura

```mermaid
flowchart TD
  accTitle: Fluxo do extrator e do acompanhamento de pedidos
  accDescr: PDFs passam pelo extrator desktop e viram planilhas. Em paralelo, o Agendador de Tarefas extrai relatórios do SAP todo dia, que são tratados em Python e publicados em Looker Studio dentro de um Google Sites.
  subgraph Extrator
    direction TB
    PDF[PDFs de pedidos e faturas] --> X[Aplicação desktop: pdfplumber e pandas]
    X --> XL[Planilhas prontas]
  end
  subgraph Acompanhamento
    direction TB
    SAP[Relatórios do SAP] --> AG[Agendador de Tarefas, todo dia]
    AG --> PY[Tratamento em Python]
    PY --> LS[Looker Studio]
    LS --> GS[Google Sites]
  end
  Extrator ~~~ Acompanhamento
```

## Decisões técnicas

**Executável único.** Assim o extrator roda nas máquinas corporativas sem instalar Python. O custo é um arquivo maior e uma nova geração do executável a cada mudança.

**Looker Studio e Google Sites.** Entregam o acompanhamento ao cliente sem custo de infraestrutura. O custo é ficar limitado ao que essas ferramentas oferecem.

## Resultados

<!-- PREENCHER: volume de documentos por mês e tempo economizado -->

## O que eu aprendi

<!-- PREENCHER: o que eu aprendi ou faria diferente -->
