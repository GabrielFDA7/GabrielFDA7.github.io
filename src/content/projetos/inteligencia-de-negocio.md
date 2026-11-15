---
title: Análise e inteligência de negócio
slug: inteligencia-de-negocio
summary: Estudo da eficiência de gastos da filial de Uberlândia da Sotreq, comparada às outras filiais da regional.
role: Em dupla com o meu gestor direto — responsável pelo tratamento dos dados e pela apresentação
context: profissional
period: jul/2026 – ago/2026
status: concluido
tags: [dados, bi, negocio]
stack: [SAP BW, Power Query (M), Excel, PowerPoint]
metrics:
  - { label: Período analisado, value: 2022–2026 }
resumo:
  problema: "A diretoria pediu às filiais que cortassem gastos ao máximo, e a frente mais atacada era a folha de pagamento."
  feito: "Em dupla com o meu gestor, tratei os dados do resultado de todas as filiais e montei a apresentação para a diretoria."
  resultado: "Mostramos que a meta de redução cabia sem cortar pessoas, e ninguém da filial foi demitido."
links: {}
featured: false
order: 6
confidential: true
draft: false
---

## Problema

A empresa mudou o modelo de trabalho, e a diretoria pediu às filiais que reduzissem os gastos ao máximo. A frente mais atacada era a folha de pagamento.

Para defender a estrutura da nossa filial, eu e o meu gestor direto analisamos o resultado da empresa inteira, filial por filial: onde cada uma gastava e quanto convertia em resultado. Depois de passar por todas as contas, vimos que a meta de redução de custos podia ser atingida sem cortar ninguém da equipe.

## Solução

Montamos no SAP BW um fluxo de extração das contas do demonstrativo de resultado e tratamos os dados no Power Query. A partir deles, fiz os gráficos e os demonstrativos que sustentavam a nossa posição.

Com isso, estruturei uma apresentação para a diretoria com três partes: o que a análise encontrou, as nossas propostas de corte de custos e a justificativa para manter todas as pessoas da filial.

## Decisões técnicas

**Começar em 2022.** Uma base maior traz profundidade e garante que os padrões são reais, e não algo que aconteceu em um ano só. O custo é ter mais dados para tratar e comparar.

**Pesos e métricas próprios para cada porte de filial.** Filiais de tamanhos diferentes não se comparam pelo número bruto. Por isso, usei pesos e métricas personalizadas, somados à experiência do meu gestor. O custo é a comparação depender de critério, e não de uma fórmula simples de reproduzir.

**Projeção de 2027 além da tendência.** Parti dos gastos dos anos anteriores e somei uma análise de mercado e de variáveis possíveis, como as eleições presidenciais no Brasil e as de meio de mandato nos EUA. O custo é o resultado depender dessas premissas, que precisam ser revistas quando o cenário muda.

## O que eu aprendi

Conhecer a operação em que você trabalha vale tanto quanto conhecer tecnologia. Foi esse conhecimento que mostrou onde cortar sem tirar pessoas.

Também aprendi que ferramentas simples, como Excel, PowerPoint e Power Query, resolvem muito bem um trabalho desse tamanho.
