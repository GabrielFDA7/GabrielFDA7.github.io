// Confere o site pronto, sem navegador: links, marcadores, dados proibidos, SEO e mapa do site.
// Link interno quebrado reprova o build. Link externo só gera aviso (use --externos).
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const SITE = 'https://gabrielfda7.github.io';
const checarExternos = process.argv.includes('--externos');

const falhas = [];
const falhar = (mensagem) => falhas.push(mensagem);

const arquivos = readdirSync(DIST, { recursive: true, withFileTypes: true })
  .filter((item) => item.isFile() && item.name.endsWith('.html'))
  .map((item) => join(item.parentPath, item.name));

// sobre/index.html vira /sobre/, e 404.html vira /404.
const rotaDe = (arquivo) => `/${relative(DIST, arquivo).split(sep).join('/')}`.replace(/index\.html$/, '').replace(/\.html$/, '');

// Link para página precisa terminar em "/": sem isso, o GitHub Pages responderia com redirecionamento.
const existe = (caminho) => {
  const limpo = decodeURIComponent(caminho).replace(/^\/+/, '');
  return limpo === '' || limpo.endsWith('/') ? existsSync(join(DIST, limpo, 'index.html')) : existsSync(join(DIST, limpo)) && !existsSync(join(DIST, limpo, 'index.html'));
};

const paginas = new Map(arquivos.map((arquivo) => [rotaDe(arquivo), readFileSync(arquivo, 'utf8')]));
const idsDe = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const metaDe = (html, nome) => html.match(new RegExp(`<meta (?:property|name)="${nome}" content="([^"]*)"`))?.[1];
const externos = new Map();

for (const [rota, html] of paginas) {
  // Comentários do Markdown chegam ao HTML: o marcador não pode sobrar em lugar nenhum.
  if (html.includes('PREENCHER')) falhar(`${rota}: sobrou PREENCHER`);
  // Padrões genéricos, sem listar dado real neste arquivo público.
  if (/R\$\s?\d/.test(html)) falhar(`${rota}: valor financeiro no HTML`);
  if (/\(?\b\d{2}\)?\s?9\d{4}-\d{4}\b/.test(html)) falhar(`${rota}: telefone no HTML`);

  // Só o HTML visível: atributos de href e src, sem o conteúdo de scripts e estilos.
  const corpo = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
  const alvos = [
    ...[...corpo.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]),
    ...[...corpo.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) => m[1].split(',').map((parte) => parte.trim().split(/\s+/)[0])),
  ];
  for (const alvo of new Set(alvos)) {
    if (/^(mailto:|tel:|data:|javascript:)/.test(alvo)) continue;
    if (alvo.startsWith(SITE)) {
      if (!existe(new URL(alvo).pathname)) falhar(`${rota}: link quebrado ${alvo}`);
    } else if (/^https?:/.test(alvo)) {
      externos.set(alvo, rota);
    } else if (alvo.startsWith('#')) {
      if (alvo.length > 1 && !idsDe(html).has(alvo.slice(1))) falhar(`${rota}: âncora inexistente ${alvo}`);
    } else {
      const [caminho, ancora] = new URL(alvo, `http://local${rota}`).pathname.split('#');
      if (!existe(caminho)) falhar(`${rota}: link quebrado ${alvo}`);
      if (ancora && paginas.has(caminho) && !idsDe(paginas.get(caminho)).has(ancora)) falhar(`${rota}: âncora inexistente ${alvo}`);
    }
  }

  // SEO de cada página.
  if (!/<title>[^<]+<\/title>/.test(html)) falhar(`${rota}: sem title`);
  for (const nome of ['description', 'og:title', 'og:description', 'og:url', 'og:image', 'twitter:card', 'twitter:image']) {
    if (!metaDe(html, nome)) falhar(`${rota}: sem ${nome}`);
  }
  const imagem = metaDe(html, 'og:image');
  if (imagem && !existe(new URL(imagem).pathname)) falhar(`${rota}: imagem de compartilhamento inexistente`);

  const semIndexacao = html.includes('<meta name="robots" content="noindex"');
  const deveEsconder = rota.startsWith('/foco/') || rota === '/404';
  if (semIndexacao !== deveEsconder) falhar(`${rota}: noindex ${semIndexacao ? 'indevido' : 'ausente'}`);
  const canonica = html.includes('<link rel="canonical"');
  if (canonica === deveEsconder) falhar(`${rota}: URL canônica ${canonica ? 'indevida' : 'ausente'}`);
}

if (!/"@type":"Person"/.test(paginas.get('/') ?? '')) falhar('/: sem JSON-LD do tipo Person');
if (!existsSync(join(DIST, '404.html'))) falhar('dist: sem 404.html, que o GitHub Pages exige');

// Mapa do site: todas as páginas indexáveis, e nada além delas.
const robots = existsSync(join(DIST, 'robots.txt')) ? readFileSync(join(DIST, 'robots.txt'), 'utf8') : '';
if (!robots.includes(`${SITE}/sitemap-index.xml`)) falhar('robots.txt: não aponta para o mapa do site');
if (existsSync(join(DIST, 'sitemap-0.xml'))) {
  const noMapa = [...readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  const esperadas = [...paginas.keys()].filter((rota) => !rota.startsWith('/foco/') && rota !== '/404');
  for (const rota of esperadas) if (!noMapa.includes(rota)) falhar(`sitemap: falta ${rota}`);
  for (const rota of noMapa) if (!esperadas.includes(rota)) falhar(`sitemap: sobra ${rota}`);
} else {
  falhar('dist: sem sitemap-0.xml');
}

if (checarExternos) {
  const avisos = [];
  await Promise.all([...externos].map(async ([url, rota]) => {
    try {
      const resposta = await fetch(url, { signal: AbortSignal.timeout(15_000), redirect: 'follow' });
      if (!resposta.ok) avisos.push(`${resposta.status} ${url} (${rota})`);
    } catch (erro) {
      avisos.push(`${erro.name} ${url} (${rota})`);
    }
  }));
  console.log(`externos: ${externos.size} conferidos, ${avisos.length} com aviso (não reprovam o build)`);
  avisos.forEach((aviso) => console.log(`  aviso: ${aviso}`));
}

console.log(`páginas: ${paginas.size}; links externos encontrados: ${externos.size}`);
falhas.forEach((falha) => console.log(`FALHOU: ${falha}`));
console.log(`falhas: ${falhas.length}`);
process.exit(falhas.length ? 1 : 0);
