---
title: SIS2 API integration (Caterpillar)
slug: sis2-api-integration
summary: A Python automation that lists the parts of any Caterpillar machine by serial number, instead of hours of manual lookups.
role: Solo
period: Sep 2026
stack: [Python, REST/JSON API, SIS2]
metrics:
  - { label: 'Per machine (before, hours)', value: seconds }
resumo:
  problema: "Listing the parts of a machine in Caterpillar's catalog was manual work and could take hours."
  feito: "I automated it on my own initiative: a Python program queries the SIS2 API by serial number and returns a spreadsheet."
  resultado: "The 81 machines of the first request came out with no manual lookups, and the company gained a complete parts catalog per machine."
---

## Problem

Listing the parts that make up a machine was entirely manual work in SIS2, Caterpillar's technical catalog. The website was not built for that: the list is huge and unfriendly, some items are easy to find and others nearly impossible. A single machine could take hours.

The request came from my manager. He needed to show the result of a price repositioning campaign across 81 machines and asked me for the parts of each one. The request was only the list. Automating it was my idea, because I did not want to do it by hand.

## Solution

A Python automation. The user picks the machines by serial number, the program consumes the SIS2 JSON API and returns a spreadsheet with each machine's parts, separated by group, such as undercarriage or ground engaging tools, and broken down to the individual part.

The project started with the 81 machines of the campaign, but it is not tied to them. It works with any machine, in any quantity.

## Technical decisions

**An API instead of screen scraping with Selenium.** The API delivers everything the project needs in one request. The website's structure, on the other hand, makes scraping hard: the code would be more fragile, slower and give worse results. The cost is depending on an interface that may change without notice and on a session that expires during a batch.

**Saving each response before processing it.** If the session drops in the middle of a batch, the next run reuses what has already arrived and continues where it stopped. The cost is disk space for raw files and the chance of rereading old data.

**The level of detail is the user's choice.** The whole machine always comes at the assembly level. Breaking each assembly down to the individual part can apply to the whole machine or only to the groups that matter. In the campaign, those were undercarriage and ground engaging tools: about 20 extra calls per machine, against about 587 for the whole machine. The cost of breaking everything down is run time growing in the same proportion.

## What I learned

I learned to investigate how a website talks to its own server before deciding how to automate it. And that the request is not always the whole problem: I was asked for a list, and the tool that came out of it works for any machine.
