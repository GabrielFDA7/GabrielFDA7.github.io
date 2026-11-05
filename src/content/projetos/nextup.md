---
title: NextUp — recomendador de atrações em tempo real
slug: nextup
summary: Cruza a fila ao vivo com a caminhada até cada atração para indicar qual compensa agora em um parque temático.
role: Solo
context: pessoal
period: set/2026 – atual
status: em-producao
tags: [backend, dados, ia, web]
stack: [Python, FastAPI, Pydantic, httpx, PostgreSQL, SQLAlchemy, Alembic, JavaScript, Leaflet, pytest, respx, Playwright, ruff, Docker, GitHub Actions, Render, Claude Code]
metrics:
  - { label: Testes automatizados, value: '946' }
  - { label: Coleta de filas, value: a cada 5 min }
  - { label: Status, value: Em produção }
links:
  repo: https://github.com/GabrielFDA7/nextup
  demo: https://nextup-rcux.onrender.com
cover: ../../assets/projetos/nextup-celular-claro.webp
coverEscuro: ../../assets/projetos/nextup-celular-escuro.webp
coverLargo: ../../assets/projetos/nextup-computador-claro.webp
coverLargoEscuro: ../../assets/projetos/nextup-computador-escuro.webp
coverAlt: NextUp com o mapa do Magic Kingdom, as melhores atrações numeradas, a rota a pé até a primeira e o cartão "Seu próximo passo", que soma caminhada e fila.
featured: true
order: 1
confidential: false
draft: false
---

## Problema

Em um parque temático, a menor fila nem sempre é a melhor escolha. Se ela está com 5 minutos, mas fica a 900 metros, o visitante caminha 15 minutos para economizar 10.

As filas também mudam rápido, e quem não acompanha decide mal o dia inteiro. Por isso surgiu um serviço informal: um consultor monitora um site de filas e avisa o cliente por WhatsApp. É uma pessoa executando um algoritmo em tempo real. O NextUp é esse algoritmo.

## Solução

O ranking usa uma única conta: `custo_total = tempo_de_caminhada + tempo_de_fila`. Uma fila de 10 minutos a 900 metros perde para uma de 20 minutos a 50 metros, e um teste trava essa regra. Toda recomendação mostra a conta aberta, porque uma sugestão sem motivo não gera confiança.

A tela abre com o mapa do parque e o cartão "Seu próximo passo". O GPS acompanha o visitante, o ranking é refeito a cada 25 metros e as filas se renovam a cada 2 minutos. Quem nega o GPS toca no mapa para marcar onde está.

Duas perguntas opcionais definem o perfil: a altura da criança mais baixa e o gosto por atrações tranquilas ou radicais. As alturas e as etiquetas das 35 atrações foram conferidas à mão na listagem oficial. Tudo fica no próprio celular, sem cadastro.

Os dados vêm ao vivo da API pública ThemeParks.wiki. Desde 28/10/2026, a primeira versão mostra só o Magic Kingdom.

**Em desenvolvimento:** um assistente com LLM que responde perguntas em linguagem natural, usando *tool calling* sobre a própria API de recomendação.

**Em investigação:** um roteiro do dia. O otimizador exato já existe, mas ainda não tem tela. Ela depende de a medição provar que vale a pena.

**Método:** construí com Claude Code, com contexto versionado em [`CLAUDE.md`](https://github.com/GabrielFDA7/nextup/blob/main/CLAUDE.md), skills próprias em [`.claude/skills/`](https://github.com/GabrielFDA7/nextup/tree/main/.claude/skills) e todos os prompts registrados em [`docs/PROMPTS.md`](https://github.com/GabrielFDA7/nextup/blob/main/docs/PROMPTS.md).

## Arquitetura

```mermaid
flowchart TD
  accTitle: Camadas do NextUp
  accDescr: A interface chama a API. A API usa o core, que contém a lógica pura e depende só dos models. A API e o coletor, que roda a cada 5 minutos, usam a periferia: a camada clients, que busca as filas na ThemeParks.wiki com cache, e a camada storage, que guarda o histórico no PostgreSQL.
  W[Interface web] --> A[API FastAPI]
  K[Coletor]
  subgraph Puro [Lógica pura]
    C[core] --> M[models]
  end
  subgraph Periferia [Periferia]
    H[clients]
    S[storage]
  end
  A --> C
  A --> H
  A --> S
  K --> H
  K --> S
  H --> T[ThemeParks]
  S --> B[(PostgreSQL)]
```

**A regra é a direção das dependências.** O `core`, onde está o ranking, recebe objetos prontos e não sabe de onde eles vieram. Só a periferia fala com a rede e com o banco: `clients` busca as filas na ThemeParks.wiki, com cache, e `storage` guarda o histórico no PostgreSQL. Por isso os testes do algoritmo rodam offline, em milissegundos, sem depender de a API estar no ar nem de o parque estar aberto.

**A regra é testada, não só documentada.** `test_arquitetura.py` lê a árvore sintática de cada módulo, sem executá-lo, e falha se `core` ou `models` importarem `httpx`, `sqlalchemy` ou as camadas da periferia.

**Dois caminhos até os dados.** A API responde a quem está no parque. O coletor grava as filas mesmo sem ninguém acessando o site, porque sem histórico não existe tendência. Uma falha da fonte não derruba o coletor: ele continua vivo para quando ela voltar.

## Decisões técnicas

**Ranking por custo total, não pela menor fila.** É a tese do produto. O preço é exigir as coordenadas de cada atração e a posição do visitante.

**Previsão de fila descartada por medição.** No horizonte de uma caminhada, a previsão da própria fonte erra 9,52 minutos, contra 2,03 de simplesmente usar a fila atual. O ganho seria um ranking mais sofisticado, e o custo, recomendações piores. Ficou de fora.

**Personalização no navegador, sem conta.** Exigir cadastro de quem pergunta "para onde vou agora" mataria o produto. O custo é os dados não viajarem entre aparelhos.

**SQLite no desenvolvimento, PostgreSQL em produção.** Quem clona o repositório roda os testes sem instalar banco. O custo é o comportamento poder divergir entre os dois, por isso há testes de fuso horário e de unicidade.

**Ping externo para manter o coletor acordado.** O plano gratuito do Render hiberna sem acessos, e o coletor dorme junto. O agendamento do GitHub Actions parecia resolver e sempre ficava verde, mas a medição mostrou 244 execuções em 37 dias, quando deveriam ser cerca de 5.300. Hoje o ping principal é externo, e o Actions ficou de reserva. O custo é depender de mais um serviço.

## Resultados

- **946 testes** automatizados: 745 na suíte rápida e 201 de interface em navegador. Nenhum toca a internet.
- **CI** em Python 3.11, 3.12 e 3.13, com lint, formatação e um job que sobe a imagem Docker e confere que ela não roda como root.
- **Deploy contínuo** no Render a cada push na branch principal.
- **Decisões medidas:** a faixa de popularidade saiu de 1.257 medições reais, com 83% de estabilidade contra 74% da alternativa.
- **Processo auditável:** 10 sessões e 70 prompts registrados na íntegra.

## O que eu aprendi

**Confira o dado, não o painel.** Entre 22/09 e 27/10/2026, o coletor gravou de 7 a 23 ciclos por dia, contra cerca de 156 esperados. O job que deveria mantê-lo acordado mostrava 100% de sucesso: ele não falhava, só não rodava. Hoje a saúde da coleta se confere no banco.

**Fixture de um caso só esconde bug.** Todos os dados de teste eram do Magic Kingdom, onde toda atração tem coordenada. Um bug deixou o Disneyland Paris inacessível e sobreviveu a 261 testes. Só apareceu quando abri o app e cliquei.
