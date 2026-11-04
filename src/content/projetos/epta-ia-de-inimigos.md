---
title: EPTA — IA de inimigos para jogo roguelike isométrico
slug: epta-ia-de-inimigos
summary: Máquina de estados para os inimigos de um jogo de ação em Unity 6, feito em equipe na EPTA.
# PREENCHER: confirmar se outras partes, como ScriptableObjects e loot, também foram minhas
role: Equipe universitária — responsável pela IA dos inimigos
context: academico
period: ago/2025 – atual
status: em-desenvolvimento
tags: [jogos]
stack: [Unity 6, C#, ScriptableObjects]
metrics: []
# PREENCHER: link do repositório, se for público
links: {}
featured: false
order: 7
confidential: false
draft: false
---

## Problema

<!-- PREENCHER: o que a IA dos inimigos precisava resolver no jogo -->

## Solução

Um jogo de ação isométrico em Unity 6 e C#, feito em equipe na EPTA (Equipe de Propulsão e Tecnologia Aeroespacial).

**O que foi meu:** a IA dos inimigos, com uma máquina de estados de patrulha, perseguição, antecipação de golpe e recuperação.

## Arquitetura

```mermaid
flowchart TD
  accTitle: Estados da IA dos inimigos
  accDescr: A máquina de estados tem quatro estados, na ordem patrulha, perseguição, antecipação de golpe e recuperação.
  A[Patrulha] --> B[Perseguição]
  B --> C[Antecipação de golpe]
  C --> D[Recuperação]
```

<!-- PREENCHER: conferir as transições; o diagrama mostra só a ordem dos quatro estados -->

O projeto usa scripts orientados a eventos e ScriptableObjects para separar o balanceamento (atributos, magias e probabilidades de loot) do código das entidades.

## Decisões técnicas

<!-- PREENCHER: 2 a 4 escolhas da IA dos inimigos, com o trade-off de cada uma -->

## Resultados

<!-- PREENCHER: tipos de inimigo, estado do jogo ou outro número concreto -->

## O que eu aprendi

<!-- PREENCHER: o que eu aprendi ou faria diferente -->
