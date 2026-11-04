---
title: Arquivos-Suporte-Visitas
slug: arquivos-suporte-visitas
summary: Aplicação web que centraliza arquivos e insumos para visitas técnicas a clientes.
role: Solo
context: profissional
# PREENCHER: período do projeto
period: PREENCHER
# PREENCHER: confirmar o status
status: em-producao
tags: [backend, web]
stack: [Render, PostgreSQL, Supabase]
metrics: []
links: {}
featured: false
order: 9
confidential: true
# Rascunho: aparece no npm run dev, mas não no site publicado. Para publicar, troque para false.
draft: true
---

## Problema

<!-- PREENCHER: para quem é a aplicação e qual dor ela resolve -->

## Solução

Uma aplicação web que centraliza arquivos e insumos para visitas técnicas a clientes.

<!-- PREENCHER: o que a aplicação faz -->

## Arquitetura

```mermaid
flowchart TD
  accTitle: Arquitetura da aplicação de suporte a visitas
  accDescr: Quem usa acessa a aplicação web hospedada no Render, que guarda os dados em um PostgreSQL no Supabase.
  U[Quem prepara a visita] --> W[Aplicação web no Render]
  W --> B[(PostgreSQL no Supabase)]
```

## Decisões técnicas

<!-- PREENCHER: 2 a 4 escolhas, com o trade-off de cada uma -->

## Resultados

<!-- PREENCHER: número concreto de uso -->

## O que eu aprendi

<!-- PREENCHER: o que eu aprendi ou faria diferente -->
