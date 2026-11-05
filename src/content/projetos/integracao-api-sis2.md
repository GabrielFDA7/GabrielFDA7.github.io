---
title: Integração com a API do SIS2 (Caterpillar)
slug: integracao-api-sis2
summary: Automação em Python que levanta os part numbers de uma frota de 81 máquinas, antes consultados à mão.
role: Solo
context: profissional
period: set/2026
status: concluido
tags: [automacao, backend, industrial]
stack: [Python, API REST/JSON, SIS2]
metrics:
  - { label: Máquinas cobertas, value: '81' }
links: {}
featured: true
order: 3
confidential: true
draft: false
---

## Problema

Levantar os part numbers de uma frota de 81 máquinas exigia consulta manual, item a item, no catálogo técnico da Caterpillar. A busca era em uma lista enorme e pouco amigável: alguns itens eram fáceis de achar, e outros, quase impossíveis. Também não existia na empresa o catálogo completo de peças de uma máquina.

## Solução

Uma automação em Python que recebe a lista de números de série, consome a API JSON do SIS2 e monta uma planilha com as peças de cada máquina.

## Decisões técnicas

**API em vez de raspagem de tela com Selenium.** A API entrega tudo o que o projeto precisa em uma requisição. Já a estrutura do site dificulta a raspagem: o código ficaria mais instável, mais lento e com resultados piores. O custo é depender de uma interface que pode mudar sem aviso e de uma sessão que expira durante o lote.

**Guardar cada resposta antes de processar.** Se a sessão cair no meio do lote, a execução seguinte reaproveita o que já veio e continua de onde parou. O custo é ocupar espaço com arquivos brutos e poder reler um dado antigo.

**Abrir as peças individuais só onde importa.** O detalhamento vale para material rodante e ferramentas de penetração de solo: cerca de 20 chamadas extras por máquina, contra cerca de 587 se fosse a máquina inteira. O custo é o resto do catálogo ficar no nível dos conjuntos.

## Resultados

- **81 máquinas** cobertas, sem consulta manual.
- **De um trabalho impossível de medir para uma busca em segundos.** Antes, cada item era procurado à mão. Agora, basta rodar o projeto e consultar a planilha.
- **Catálogo completo de peças de uma máquina**, algo que não existia na empresa.

## O que eu aprendi

Aprendi a investigar como um site conversa com o próprio servidor antes de decidir como automatizá-lo.
