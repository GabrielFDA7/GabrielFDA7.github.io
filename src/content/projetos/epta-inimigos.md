---
title: EPTA — inimigos e lore de um roguelike isométrico
slug: epta-inimigos
summary: Criação dos inimigos de um jogo em Unity, da história ao código, na frente de entretenimento de uma equipe aeroespacial da UFU.
role: Equipe universitária — responsável pela criação dos inimigos e coautor da lore
context: academico
period: ago/2025 – atual
status: em-desenvolvimento
tags: [jogos]
stack: [Unity 6, C#, ScriptableObjects]
metrics:
  - { label: Inimigos que criei, value: 8 de 13 }
links:
  repo: https://github.com/EntertainmentEpta/LeavingPlerotus
cover: ../../assets/projetos/epta-capa.webp
coverAlt: "Capa do jogo: uma pessoa de traje espacial branco sentada em um tronco, com um pequeno animal de capacete deitado a seus pés, em uma floresta alienígena de cristais rosa e céu magenta."
featured: false
order: 7
confidential: false
draft: false
---

## Problema

A EPTA (Equipe de Propulsão e Tecnologia Aeroespacial) é uma equipe universitária da UFU que constrói foguetes, satélites e tecnologia aeroespacial. Ela se divide em frentes, como propulsão, recuperação e aerodinâmica.

Eu faço parte do Entertainment, a frente que não constrói foguetes. O papel dela é tornar a equipe conhecida e trazer o investimento que permite concluir os projetos aeroespaciais.

Hoje, o principal meio para isso é um jogo: Leaving Plerotus (nome provisório), um roguelike isométrico. Um trabalhador espacial enfrenta problemas e fica preso em um planeta hostil, que ninguém tinha explorado. Para sair dali, ele precisa reconstruir a nave e superar os desafios dessa terra desconhecida.

Um jogo assim depende dos inimigos. Cada um precisa de uma história, de um visual, de um jeito de se mover e de atacar e de uma recompensa.

## Solução

**Lore.** Formulei a ideia inicial da história e a desenvolvi com o time.

**Inimigos.** Na divisão das tarefas, escolhi a criação dos inimigos. Para cada um, defini a história, a ideia de design, o padrão de movimento, o padrão de ataque e o que ele deixa ao morrer. Eu não desenhava: descrevia o inimigo para quem fazia a arte.

**Código.** Em Unity e C#, programei:

- o **Shard Swarm**, um enxame de cristal que se divide em fragmentos;
- o **Geobionte**, um dos inimigos de elite, que busca minério e se funde a ele para se transformar;
- o **sistema de drops**: a essência cai sempre, e as partes do corpo dependem de sorte, em quatro raridades;
- o **primeiro inventário**, em grade, com cada item definido em um ScriptableObject.

Os dois inimigos funcionam como máquinas de estados: cada um está sempre em um estado, com regras próprias, e um acontecimento faz ele passar para o próximo. O Shard Swarm alterna entre forma unida, quando fica vulnerável e acumula carga, disparo e reagrupamento. O Geobionte vaga, busca minério, se funde a ele e se transforma, ou foge se for impedido.

Os ScriptableObjects separam o balanceamento, como atributos e chance de drop, do código dos inimigos. Assim, quem ajusta o jogo mexe nos números sem tocar na lógica.

## Resultados

- **8 dos 13 inimigos** do bestiário foram criados por mim, sem contar o chefe do primeiro bioma.
- **Jogo em beta fechado**, com o primeiro bioma fechado e em testes.

## O que eu aprendi

Me aprofundei em C# e em orientação a objetos. Foi um dos meus primeiros projetos com programação pesada.

Também aprendi a descrever uma ideia para que outra pessoa a construa: o inimigo só ficava certo quando a descrição era clara para quem fazia a arte.
