---
title: Business analysis and intelligence
slug: business-intelligence
summary: A study of the spending efficiency of Sotreq's Uberlândia branch, compared with the other branches in the region.
role: Paired with my direct manager — responsible for data preparation and the presentation
period: Jul 2026 – Aug 2026
stack: [SAP BW, Power Query (M), Excel, PowerPoint]
metrics: []
resumo:
  problema: "Senior management asked the branches to cut spending as much as possible, and the main target was payroll."
  feito: "Together with my manager, I prepared the financial results data of every branch and built the presentation for senior management."
  resultado: "We showed that the reduction target could be met without cutting people, and no one at the branch was laid off."
avisoConfidencial: 'Corporate project: financial figures omitted.'
---

## Problem

The company changed its working model, and senior management asked the branches to reduce spending as much as possible. The main target was payroll.

To defend our branch's structure, my direct manager and I analyzed the results of the whole company, branch by branch: where each one spent and how much it turned into results. After going through every account, we saw that the cost reduction target could be met without cutting anyone from the team.

## Solution

We set up an extraction flow in SAP BW for the income statement accounts and prepared the data in Power Query. From there, I built the charts and statements that supported our position.

With that, I structured a presentation for senior management in three parts: what the analysis found, our cost-cutting proposals and the case for keeping everyone at the branch.

## Technical decisions

**Starting in 2022.** A larger base adds depth and makes sure the patterns are real, not something that happened in a single year. The cost is more data to prepare and compare.

**Custom weights and metrics for each branch size.** Branches of different sizes cannot be compared by raw numbers. So I used custom weights and metrics, combined with my manager's experience. The cost is that the comparison depends on judgment, not on a simple formula anyone can reproduce.

**A 2027 projection beyond the trend.** I started from previous years' spending and added an analysis of the market and possible variables, such as the presidential election in Brazil and the midterm elections in the US. The cost is that the result depends on those assumptions, which need to be revisited when the scenario changes.

## What I learned

Knowing the operation you work in is worth as much as knowing technology. That knowledge is what showed where to cut without letting people go.

I also learned that simple tools, such as Excel, PowerPoint and Power Query, handle a job of this size very well.
