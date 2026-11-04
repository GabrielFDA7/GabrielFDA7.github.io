---
title: EPTA — IA de inimigos para jogo roguelike isométrico
slug: epta-ia-de-inimigos
summary: Máquina de estados para os inimigos de um jogo de ação em Unity 6, feito em equipe na EPTA.
role: Equipe universitária — responsável pela IA dos inimigos, ScriptableObjects e loot
context: academico
period: ago/2025 – atual
status: em-desenvolvimento
tags: [jogos]
stack: [Unity 6, C#, ScriptableObjects]
metrics:
  - { label: Inimigos criados, value: cerca de 10 }
  - { label: Estado do jogo, value: Beta fechado }
links: {}
featured: false
order: 7
confidential: false
draft: false
---

## Problema

Os inimigos precisavam de um padrão de raciocínio em combate: como atacar, quando, de qual forma e por onde.

## Solução

Um jogo de ação isométrico em Unity 6 e C#, feito em equipe na EPTA (Equipe de Propulsão e Tecnologia Aeroespacial).

**O que foi meu:** a IA dos inimigos, com uma máquina de estados de patrulha, perseguição, antecipação de golpe e recuperação, além dos ScriptableObjects e do loot.

## Arquitetura

```mermaid
flowchart TD
  accTitle: Estados da IA dos inimigos
  accDescr: A máquina de estados tem quatro estados, na ordem patrulha, perseguição, antecipação de golpe e recuperação.
  A[Patrulha] --> B[Perseguição]
  B --> C[Antecipação de golpe]
  C --> D[Recuperação]
```

O projeto usa scripts orientados a eventos e ScriptableObjects para separar o balanceamento (atributos, magias e probabilidades de loot) do código das entidades.

## Resultados

- **Cerca de 10 inimigos** criados.
- **Jogo em beta fechado**, com o primeiro bioma fechado e em testes.

## O que eu aprendi

Me aprofundei em C# e em orientação a objetos. Foi um dos meus primeiros projetos com programação pesada.
