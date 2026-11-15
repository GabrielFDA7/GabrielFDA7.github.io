---
title: 'Automação do ciclo de pedidos de um cliente: do PDF ao dashboard'
slug: ciclo-de-pedidos
summary: Extrator de dados de PDFs para o time de vendas e um painel para o cliente acompanhar os próprios pedidos, todo dia.
role: Solo
context: profissional
period: desde jan/2026
status: em-producao
tags: [automacao, dados, bi]
stack: [Python, pdfplumber, pandas, openpyxl, CustomTkinter, PyInstaller, SAP, Looker Studio, Google Sites]
metrics:
  - { label: 'Por documento (antes, de 8 a 10 min)', value: 1 min }
links: {}
featured: true
order: 4
confidential: true
draft: false
---

## Problema

Os pedidos, as faturas e as cotações de um cliente chegavam em PDF, e o time transcrevia cada item à mão. Eram de 10 a 20 documentos por dia. O cliente também não tinha visibilidade do status das próprias entregas. Dependia do vendedor responsável para saber se o pedido já tinha sido faturado, separado para coleta, enviado ou concluído.

## Solução

**Parte 1, extrator (jan–fev/2026).** Uma aplicação desktop lê os PDFs semiestruturados com pdfplumber, trata os dados com pandas e openpyxl e exporta planilhas prontas. A interface é em CustomTkinter, e a distribuição é um executável único, feito com PyInstaller.

**Parte 2, acompanhamento (set/2026).** O objetivo é o cliente acompanhar os pedidos sozinho, sem precisar perguntar a ninguém. Todo dia, o Agendador de Tarefas do Windows dispara a extração dos relatórios de pedidos no SAP, e o Python os trata. O resultado alimenta um painel em Looker Studio, publicado em um Google Sites, onde o cliente encontra o pedido com busca e filtros e vê em que etapa ele está.

## Decisões técnicas

**Executável único.** Assim o extrator roda nas máquinas corporativas sem instalar Python. O custo é um arquivo maior e uma nova geração do executável a cada mudança.

**Looker Studio e Google Sites.** Entregam o acompanhamento ao cliente sem custo de infraestrutura. O custo é ficar limitado ao que essas ferramentas oferecem.

## Resultados

- **De 8 a 10 minutos para 1 minuto por documento**, em um volume de 10 a 20 documentos por dia.
- **Em uso até hoje**, com o acompanhamento atualizado todo dia para o cliente.
- **O status do pedido deixou de depender do vendedor:** o cliente consulta sozinho.

## O que eu aprendi

Aprendi a integrar projetos que nasceram com propósitos diferentes, mas que serviam a um objetivo comum: a extração dos PDFs e o acompanhamento viraram um sistema completo para o cliente.
