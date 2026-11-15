---
title: Integração com a API do SIS2 (Caterpillar)
slug: integracao-api-sis2
summary: Automação em Python que levanta as peças de qualquer máquina Caterpillar pelo número de série, em vez de horas de consulta à mão.
role: Solo
context: profissional
period: set/2026
status: concluido
tags: [automacao, backend, industrial]
stack: [Python, API REST/JSON, SIS2]
metrics:
  - { label: Máquinas na primeira demanda, value: '81' }
resumo:
  problema: "Levantar as peças de uma máquina no catálogo da Caterpillar era trabalho manual e podia levar horas."
  feito: "Automatizei por iniciativa própria: um programa em Python consulta a API do SIS2 pelo número de série e devolve uma planilha."
  resultado: "As 81 máquinas da primeira demanda saíram sem consulta manual, e a empresa ganhou um catálogo completo de peças por máquina."
links: {}
featured: true
order: 3
confidential: true
draft: false
---

## Problema

Levantar as peças que compõem uma máquina era um trabalho todo à mão no SIS2, o catálogo técnico da Caterpillar. O site não foi feito para isso: a lista é enorme e pouco amigável, alguns itens são fáceis de achar e outros, quase impossíveis. Uma máquina podia levar horas.

A demanda veio do meu gestor. Ele precisava mostrar o resultado de uma campanha de reposicionamento de preços em 81 máquinas e me pediu as peças de cada uma. O pedido era só o levantamento. Automatizar foi ideia minha, porque eu não queria fazer aquilo à mão.

## Solução

Uma automação em Python. A pessoa escolhe as máquinas pelos números de série, o programa consome a API JSON do SIS2 e devolve uma planilha com as peças de cada máquina, separadas por grupo, como material rodante ou ferramentas de penetração de solo, e com o detalhamento até a peça individual.

O projeto nasceu das 81 máquinas da campanha, mas não está preso a elas. Funciona com qualquer máquina e em qualquer quantidade.

## Decisões técnicas

**API em vez de raspagem de tela com Selenium.** A API entrega tudo o que o projeto precisa em uma requisição. Já a estrutura do site dificulta a raspagem: o código ficaria mais instável, mais lento e com resultados piores. O custo é depender de uma interface que pode mudar sem aviso e de uma sessão que expira durante o lote.

**Guardar cada resposta antes de processar.** Se a sessão cair no meio do lote, a execução seguinte reaproveita o que já veio e continua de onde parou. O custo é ocupar espaço com arquivos brutos e poder reler um dado antigo.

**O detalhamento é escolha de quem usa.** A máquina inteira sempre vem no nível dos conjuntos. Abrir cada conjunto até a peça individual pode valer para a máquina toda ou só para os grupos que interessam. Na campanha, eram material rodante e ferramentas de penetração de solo: cerca de 20 chamadas extras por máquina, contra cerca de 587 para a máquina inteira. O custo de abrir tudo é o tempo de execução crescer na mesma proporção.

## O que eu aprendi

Aprendi a investigar como um site conversa com o próprio servidor antes de decidir como automatizá-lo. E que o pedido nem sempre é o problema inteiro: me pediram uma lista, e a ferramenta que sobrou serve para qualquer máquina.
