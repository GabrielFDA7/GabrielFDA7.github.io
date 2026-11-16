---
title: 'Automating a client’s order cycle: from PDF to dashboard'
slug: order-cycle
summary: A PDF data extractor for the sales team and a dashboard where the client tracks their own orders, updated every day.
role: Solo
period: Jan 2026 – present
metrics:
  - { label: 'Per document (before, 8 to 10 min)', value: 1 min }
resumo:
  problema: "A client’s orders, invoices and quotes arrived as PDFs and were typed in by hand, and the client depended on the salesperson to know about their order."
  feito: "I built, on my own, a Python extractor for the PDFs and a dashboard updated every day from SAP."
  resultado: "Each document went from 8 to 10 minutes down to 1, and the client checks their own order without asking anyone."
---

## Problem

A client’s orders, invoices and quotes arrived as PDFs, and the team transcribed each item by hand. That meant 10 to 20 documents a day. The client also had no visibility into the status of their own deliveries. They depended on the salesperson in charge to know whether the order had been invoiced, prepared for pickup, shipped or completed.

## Solution

**Part 1, extractor (Jan–Feb 2026).** A desktop application reads the semi-structured PDFs with pdfplumber, processes the data with pandas and openpyxl and exports ready-to-use spreadsheets. The interface is built with CustomTkinter, and it is distributed as a single executable, built with PyInstaller.

**Part 2, tracking (Sep 2026).** The goal is for the client to track orders on their own, without having to ask anyone. Every day, Windows Task Scheduler triggers the extraction of order reports from SAP, and Python processes them. The result feeds a Looker Studio dashboard, published on Google Sites, where the client finds the order with search and filters and sees which stage it is at.

## Technical decisions

**A single executable.** That way the extractor runs on corporate machines without installing Python. The cost is a larger file and a new build of the executable for every change.

**Looker Studio and Google Sites.** They deliver tracking to the client with no infrastructure cost. The cost is being limited to what these tools offer.

## What I learned

I learned to integrate projects that were born with different purposes but served a common goal: PDF extraction and tracking became a complete system for the client.
