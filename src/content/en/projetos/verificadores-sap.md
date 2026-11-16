---
title: SAP price and availability checkers
slug: sap-checkers
summary: Excel VBA macros that look up parts lists in SAP and deliver the price and stock the transaction cannot export in a spreadsheet.
role: Solo
period: May 2025 – present
stack: [Excel VBA, SAP GUI Scripting, Pivot tables]
metrics:
  - { label: '50 items (before, over 30 min)', value: 3 min }
resumo:
  problema: "SAP's price and stock transaction exported nothing, and checking a list of 1,000 parts took over 8 hours of clicking."
  feito: "I built two VBA macros on my own that drive SAP and build a spreadsheet with each part's price and stock."
  resultado: "50 items went from over 30 minutes to about 3, and Sotreq uses the macros across Brazil."
---

## Problem

At Sotreq, large clients have their own price lists, with terms that differ from most. A salesperson asked for the prices of more than 1,000 parts to build a client's new list.

The lookup was done by hand in YLP_PARTS, a transaction built by Sotreq itself: in SAP, names starting with Y or Z are reserved for what the company develops. It takes a list of parts, looks each one up in the Caterpillar and Sotreq catalogs and shows where there is stock, in Brazil and abroad.

It had two problems. With many items, it took a long time to show the first screen, and that screen had the price and description, but not availability. To see where there was stock, you had to open each item, and each one took about 30 seconds. None of it could be exported: there was no way to get a spreadsheet or a text file out of it. For a list of 1,000 items, the clicking alone took more than 8 hours.

## Solution

Two spreadsheets with Excel VBA macros that drive SAP through SAP GUI Scripting.

The user pastes the parts list into the spreadsheet. The macro opens the transaction, pastes the whole list at once into SAP's multiple selection and runs the query.

- **Price checker.** Reads the first screen line by line: part number, description, client price and list price.
- **Availability checker.** Follows the path that used to be manual: opens each item and reads the stock table that appears. Each plant code becomes a name, location and country, through a reference table. At the end, the data goes into a structured spreadsheet, with a pivot table by part and by plant, filterable by country.

## Technical decisions

**SAP GUI Scripting instead of RFC or BAPI.** The script uses the operator's own session, which avoids the need for direct RFC and BAPI permissions. The cost is depending on the graphical interface being open during the run.

**Reading the screen cell by cell, by the column's technical name.** Since the stock screen exports nothing, the macro reads each cell by the column's internal name in SAP, not by its position. That way, if someone changes the column order in their own layout, the reading does not break. The cost is depending on the screen's identifiers, which change if the transaction changes.

**Building an array in memory and writing it all at once.** Writing to Excel cell by cell is slow. The macro keeps each part's rows in an array and writes them all at once. The cost is code that is a little less straightforward to read.

**Validating the parts on input.** When the list is pasted, any cell without a valid part number turns red. The macro also accepts part numbers with hyphens or in the middle of a sentence and cleans them up before the lookup. The cost is that a new part number format gets flagged as an error until the rule is updated.

## What I learned

It was my first project used by people who had no direct contact with me. I learned that a project has to be hardened against every kind of mistake a user can make, from the smallest to the biggest.
