---
title: Automações SAP e RPA
slug: automacoes-sap-e-rpa
summary: Consultas em lote no SAP, coleta de relatórios em portais internos e RPA do tratamento de leads.
role: Solo
context: profissional
period: mai/2025 – atual
# PREENCHER: confirmar o status
status: em-producao
tags: [automacao, dados, industrial]
stack: [Excel VBA, SAP GUI Scripting, Python, Selenium, pandas, PyAutoGUI, openpyxl]
metrics: []
links: {}
featured: false
order: 5
confidential: true
draft: false
---

## Problema

Várias rotinas dependiam de trabalho manual repetitivo: consultas item a item no SAP, sobre a disponibilidade global de peças Caterpillar e a divergência de preços em pedidos, e a coleta de relatórios em portais internos para a base de leads.

## Solução

Três frentes no mesmo caso:

- **Verificadores em Excel VBA e SAP GUI Scripting.** Conferem disponibilidade e preços: executam as transações em lote e cruzam os resultados com os pedidos.
- **Pipelines em Python com Selenium.** Navegam, autenticam e baixam relatórios, que depois são tratados em pandas.
- **RPA do tratamento de leads.** Usa Python com PyAutoGUI e openpyxl, além de macros VBA.

## Arquitetura

```mermaid
flowchart TD
  accTitle: As três frentes de automação
  accDescr: Pedidos passam por verificadores em Excel VBA, que executam transações no SAP e cruzam os resultados. Portais internos passam por Selenium e pandas. Os leads são tratados por RPA em Python e VBA.
  subgraph Verificadores
    direction TB
    P[Pedidos] --> V[Excel VBA]
    V --> S[SAP GUI Scripting]
    S --> C[Resultados cruzados com os pedidos]
  end
  subgraph Relatorios [Relatórios]
    direction TB
    I[Portais internos] --> L[Python e Selenium]
    L --> D[Tratamento em pandas]
  end
  subgraph Leads
    direction TB
    B[Base de leads] --> R[RPA: PyAutoGUI, openpyxl e VBA]
  end
  Verificadores ~~~ Relatorios
  Relatorios ~~~ Leads
```

## Decisões técnicas

**SAP GUI Scripting em vez de RFC ou BAPI.** O script usa a sessão do próprio operador, o que dispensa permissões diretas de RFC e BAPI. O custo é depender da interface gráfica aberta durante a execução.

## Resultados

<!-- PREENCHER: itens consultados por dia e horas economizadas -->

## O que eu aprendi

<!-- PREENCHER: o que eu aprendi ou faria diferente -->
