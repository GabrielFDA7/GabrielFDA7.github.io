// Gera os currículos em inglês (public/cv/*-resume-*.pdf) a partir de curriculos/en.mjs, com o mesmo
// layout dos PDFs em português: A4, Inter e as mesmas medidas, em pontos. O build não roda este script;
// os PDFs ficam versionados, como a arte. Uso: `npm run curriculos`.
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { CURRICULOS } from '../curriculos/en.mjs';

const raiz = process.cwd();
const fonte = async (peso, faixa = 'latin') =>
  (await readFile(join(raiz, `node_modules/@fontsource/inter/files/inter-${faixa}-${peso}-normal.woff2`))).toString('base64');

const NOME = 'Gabriel Faria de Angelis';

const escapar = (texto) => texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function item({ titulo, direita, empresa, linha, itens = [] }) {
  return `
    <div class="item">
      <div class="topo"><span class="titulo">${escapar(titulo)}</span>${direita ? `<span class="direita">${escapar(direita)}</span>` : ''}</div>
      ${empresa ? `<p class="linha"><strong>${escapar(empresa[0])}</strong>${empresa[1] ? ` · ${escapar(empresa[1])}` : ''}</p>` : ''}
      ${linha ? `<p class="linha">${escapar(linha)}</p>` : ''}
      ${itens.length ? `<ul>${itens.map((texto) => `<li>${texto}</li>`).join('')}</ul>` : ''}
    </div>`;
}

function secao({ titulo, texto, itens, tabela }) {
  return `
    <section>
      <h2>${escapar(titulo)}</h2>
      ${texto ? `<p class="texto">${escapar(texto)}</p>` : ''}
      ${itens ? itens.map(item).join('') : ''}
      ${tabela ? `<table>${tabela.map(([rotulo, valor]) => `<tr><th>${escapar(rotulo)}</th><td>${escapar(valor)}</td></tr>`).join('')}</table>` : ''}
    </section>`;
}

async function html({ cargo, contato, secoes }) {
  const [regular, seminegrito, negrito, regularExt] = await Promise.all([fonte(400), fonte(600), fonte(700), fonte(400, 'latin-ext')]);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${NOME} — Résumé</title>
<style>
  @font-face { font-family: Inter; font-weight: 400; src: url(data:font/woff2;base64,${regular}) format('woff2'); }
  @font-face { font-family: Inter; font-weight: 400; src: url(data:font/woff2;base64,${regularExt}) format('woff2'); unicode-range: U+0100-024F, U+2190-21FF; }
  @font-face { font-family: Inter; font-weight: 600; src: url(data:font/woff2;base64,${seminegrito}) format('woff2'); }
  @font-face { font-family: Inter; font-weight: 700; src: url(data:font/woff2;base64,${negrito}) format('woff2'); }
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Inter, sans-serif; color: #16181d; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .folha { padding: 28pt 42.5pt 20pt; }
  h1 { margin: 0; font-size: 21pt; font-weight: 700; line-height: 1.25; letter-spacing: -0.02em; }
  .cargo { margin: 3pt 0 0; font-size: 10.5pt; font-weight: 600; color: #1f4e8c; }
  .contato { margin-top: 6pt; font-size: 8.8pt; line-height: 14.3pt; color: #5b6270; }
  .contato p { margin: 0; }
  .sep { margin: 0 6pt; color: #d9dde4; }
  h2 { margin: 10pt 0 0; padding-bottom: 4pt; border-bottom: 0.75pt solid #d9dde4; font-size: 8.6pt; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #1f4e8c; }
  .texto { margin: 5pt 0 0; font-size: 9.19pt; line-height: 13.5pt; }
  .item { margin-top: 6pt; }
  .item + .item { margin-top: 8pt; }
  .topo { display: flex; justify-content: space-between; align-items: baseline; gap: 12pt; }
  .titulo { font-size: 9.9pt; font-weight: 700; }
  .direita { flex: none; font-size: 8.6pt; color: #5b6270; }
  .linha { margin: 1pt 0 0; font-size: 8.89pt; color: #5b6270; }
  .linha strong { font-weight: 600; color: #16181d; }
  /* Marcador nativo, não desenhado com ::before e position: o elemento posicionado fazia a extração de texto
     (sistemas de candidatura) ler os tópicos no fim da página, fora de ordem. */
  ul { margin: 2pt 0 0; padding: 0 0 0 11pt; list-style: disc; }
  li { margin-top: 2pt; font-size: 9.19pt; line-height: 13.5pt; }
  li::marker { color: #1f4e8c; font-size: 7pt; }
  li strong { font-weight: 600; }
  table { margin-top: 5pt; border-collapse: collapse; width: 100%; }
  th, td { padding: 1.4pt 0; font-size: 9.19pt; line-height: 13pt; text-align: left; vertical-align: top; }
  th { width: 120pt; padding-right: 8pt; font-weight: 600; white-space: nowrap; }
</style>
</head>
<body>
<div class="folha">
  <h1>${NOME}</h1>
  <p class="cargo">${escapar(cargo)}</p>
  <div class="contato">${contato.map((linha) => `<p>${linha.map(escapar).join('<span class="sep">|</span>')}</p>`).join('')}</div>
  ${secoes.map(secao).join('')}
</div>
</body>
</html>`;
}

const navegador = await chromium.launch(process.env.CI ? {} : { channel: 'msedge' });
// A janela tem a largura de uma A4 (210 mm = 794 px), para a medida da altura ser a da impressão.
const pagina = await navegador.newPage({ viewport: { width: 794, height: 1123 } });
for (const curriculo of CURRICULOS) {
  await pagina.setContent(await html(curriculo), { waitUntil: 'load' });
  await pagina.evaluate(() => document.fonts.ready);
  const altura = await pagina.evaluate(() => document.querySelector('.folha').scrollHeight);
  const destino = join(raiz, 'public/cv', curriculo.arquivo);
  await pagina.pdf({ path: destino, format: 'A4', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  // 1 pt = 4/3 px; uma A4 tem 842 pt de altura.
  const pontos = Math.round(altura * 0.75);
  console.log(`${curriculo.arquivo}: ${pontos} pt de 842${pontos > 842 ? ' — PASSOU DE UMA PÁGINA' : ''}`);
}
await navegador.close();
