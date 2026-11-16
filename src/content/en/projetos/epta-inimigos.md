---
title: EPTA — enemies and lore for an isometric roguelike
slug: epta-enemies
summary: Designing the enemies of a Unity game, from story to code, on the entertainment front of a UFU aerospace team.
role: University team — responsible for creating the enemies and co-author of the lore
period: Aug 2025 – present
metrics:
  - { label: Enemies I created, value: 8 of 13 }
resumo:
  problema: "The team’s game needed enemies, each with a story, a look, movement, an attack and a reward."
  feito: "I created 8 of the 13 enemies, from story to design idea, and programmed two of them in C#, along with the drop system and the first inventory."
  resultado: "The game is in closed beta, with the first biome being tested."
coverAlt: "Game cover: a person in a white spacesuit sitting on a log, with a small helmeted animal lying at their feet, in an alien forest of pink crystals under a magenta sky."
---

## Problem

EPTA (Equipe de Propulsão e Tecnologia Aeroespacial, the Propulsion and Aerospace Technology Team) is a university team at UFU that builds rockets, satellites and aerospace technology. It is split into fronts, such as propulsion, recovery and aerodynamics.

I am part of Entertainment, the front that does not build rockets. Its role is to make the team known and bring in the investment that allows the aerospace projects to be finished.

Today, the main way to do that is a game: Leaving Plerotus (working title), an isometric roguelike. A space worker runs into trouble and gets stranded on a hostile planet that nobody had explored. To leave, he has to rebuild his ship and overcome the challenges of this unknown land.

A game like this depends on its enemies. Each one needs a story, a look, a way of moving and attacking, and a reward.

## Solution

**Lore.** I came up with the initial idea for the story and developed it with the team.

**Enemies.** When tasks were split, I chose enemy creation. For each one, I defined the story, the design idea, the movement pattern, the attack pattern and what it drops when it dies. I did not draw: I described the enemy to whoever made the art.

**Code.** In Unity and C#, I programmed:

- the **Shard Swarm**, a crystal swarm that splits into fragments;
- the **Geobionte**, one of the elite enemies, which seeks out ore and fuses with it to transform;
- the **drop system**: essence always drops, and body parts depend on luck, across four rarities;
- the **first inventory**, a grid, with each item defined in a ScriptableObject.

Both enemies work as state machines: each is always in one state, with its own rules, and an event moves it to the next. The Shard Swarm alternates between three states: united form (when it becomes vulnerable and builds up charge), firing and regrouping. The Geobionte wanders, seeks ore, fuses with it and transforms, or flees if it is blocked.

ScriptableObjects separate balancing, such as attributes and drop chance, from the enemy code. That way, whoever tunes the game changes the numbers without touching the logic.

## What I learned

I went deeper into C# and object-oriented programming. It was one of my first projects with heavy programming.

I also learned to describe an idea so that someone else can build it: an enemy only came out right when the description was clear to whoever made the art.
