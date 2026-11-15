---
title: Verificadores de preço e disponibilidade no SAP
slug: verificadores-sap
summary: Macros em Excel VBA que consultam listas de peças no SAP e entregam numa planilha o preço e o estoque que a transação não exporta.
role: Solo
context: profissional
period: mai/2025 – atual
status: em-producao
tags: [automacao, dados, industrial]
stack: [Excel VBA, SAP GUI Scripting, Tabela dinâmica]
metrics:
  - { label: '50 itens (antes, mais de 30 min)', value: 3 min }
resumo:
  problema: "A transação de preço e estoque do SAP não exportava nada, e conferir uma lista de 1.000 peças passava de 8 horas de cliques."
  feito: "Fiz sozinho duas macros em VBA que conduzem o SAP e montam uma planilha com o preço e o estoque de cada peça."
  resultado: "50 itens passaram de mais de 30 minutos para cerca de 3, e a Sotreq usa as macros no Brasil inteiro."
links: {}
featured: false
order: 5
confidential: true
draft: false
---

## Problema

Na Sotreq, os grandes clientes têm listas de preços próprias, com condições diferentes das da maioria. Um vendedor pediu os preços de mais de 1.000 peças para montar a nova lista de um cliente.

A consulta era feita à mão na YLP_PARTS, uma transação feita pela própria Sotreq: no SAP, os nomes começados por Y ou Z são reservados para o que a empresa desenvolve. Ela aceita uma lista de peças, busca cada uma no catálogo da Caterpillar e da Sotreq e mostra onde há estoque, no Brasil e fora dele.

Ela tinha dois problemas. Com muitos itens, demorava para mostrar a primeira tela, e essa tela trazia o preço e a descrição, mas não a disponibilidade. Para ver onde havia estoque, era preciso abrir item por item, e cada um levava uns 30 segundos. Nada disso podia ser exportado: não havia como tirar uma planilha ou um arquivo de texto dali. Em uma lista de 1.000 itens, só os cliques passavam de 8 horas.

## Solução

Duas planilhas com macros em Excel VBA, que conduzem o SAP pelo SAP GUI Scripting.

A pessoa cola a lista de peças na planilha. A macro abre a transação, cola a lista inteira de uma vez na seleção múltipla do SAP e executa a consulta.

- **Verificador de preço.** Lê, linha por linha, a primeira tela: código, descrição, preço do cliente e preço de lista.
- **Verificador de disponibilidade.** Faz o caminho que antes era manual: abre item por item e lê a tabela de estoque que aparece. O código de cada centro vira nome, local e país, por uma tabela de referência. No fim, os dados vão para uma planilha estruturada, com uma tabela dinâmica por peça e por centro, filtrável por país.

## Decisões técnicas

**SAP GUI Scripting em vez de RFC ou BAPI.** O script usa a sessão do próprio operador, o que dispensa permissões diretas de RFC e BAPI. O custo é depender da interface gráfica aberta durante a execução.

**Ler a tela célula por célula, pelo nome técnico da coluna.** Como a tela de estoque não exporta nada, a macro lê cada célula pelo nome interno da coluna no SAP, e não pela posição. Assim, se alguém mudar a ordem das colunas no próprio layout, a leitura não quebra. O custo é depender dos identificadores da tela, que mudam se a transação mudar.

**Montar uma matriz na memória e gravar de uma vez.** Escrever célula por célula no Excel é lento. A macro guarda as linhas de cada peça em uma matriz e grava todas de uma vez. O custo é um código um pouco menos direto de ler.

**Conferir as peças na entrada.** Ao colar a lista, a célula que não tem um código de peça válido fica vermelha. A macro também aceita o código com hífen ou no meio de uma frase e o limpa antes de consultar. O custo é um formato novo de código ser marcado como erro até a regra ser atualizada.

## O que eu aprendi

Foi meu primeiro projeto usado por pessoas que não tinham contato direto comigo. Aprendi que um projeto precisa ser blindado contra todo tipo de erro que o usuário possa causar, do menor ao maior.
