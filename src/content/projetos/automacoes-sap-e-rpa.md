---
title: Automações SAP e RPA
slug: automacoes-sap-e-rpa
summary: Consultas em lote no SAP, coleta de relatórios em portais internos e RPA do tratamento de leads.
role: Solo
context: profissional
period: mai/2025 – atual
status: em-producao
tags: [automacao, dados, industrial]
stack: [Excel VBA, SAP GUI Scripting, Python, Selenium, pandas, PyAutoGUI, openpyxl]
metrics:
  - { label: '50 itens (antes, mais de 30 min)', value: 3 min }
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

## Decisões técnicas

**SAP GUI Scripting em vez de RFC ou BAPI.** O script usa a sessão do próprio operador, o que dispensa permissões diretas de RFC e BAPI. O custo é depender da interface gráfica aberta durante a execução.

## Resultados

- **De mais de 30 minutos para cerca de 3 minutos** na consulta de 50 itens.
- **Uso em todo o Brasil:** a Sotreq usa o projeto em nível nacional.

## O que eu aprendi

Foi meu primeiro projeto usado por pessoas que não tinham contato direto comigo. Aprendi que um projeto precisa ser blindado contra todo tipo de erro que o usuário possa causar, do menor ao maior.
