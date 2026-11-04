// Serve dist/ do mesmo jeito que o GitHub Pages: /sobre/ abre sobre/index.html, /sobre redireciona
// para /sobre/, endereço desconhecido devolve 404.html e texto vai comprimido. Sem a compressão, o
// Lighthouse mediria arquivos até 3 vezes maiores do que os que o visitante baixa.
import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
};

const COMPRIMIVEIS = new Set(['.html', '.css', '.js', '.json', '.xml', '.txt', '.svg']);

const enviar = (pedido, resposta, status, arquivo, conteudo) => {
  const extensao = extname(arquivo);
  const cabecalhos = { 'Content-Type': TIPOS[extensao] ?? 'application/octet-stream' };
  if (COMPRIMIVEIS.has(extensao) && /\bgzip\b/.test(pedido.headers['accept-encoding'] ?? '')) {
    resposta.writeHead(status, { ...cabecalhos, 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' });
    resposta.end(gzipSync(conteudo));
    return;
  }
  resposta.writeHead(status, cabecalhos);
  resposta.end(conteudo);
};

const tipoDe = async (caminho) => {
  try {
    const info = await stat(caminho);
    return info.isDirectory() ? 'pasta' : 'arquivo';
  } catch {
    return null;
  }
};

export function servirDist(porta) {
  const servidor = createServer(async (pedido, resposta) => {
    const url = new URL(pedido.url, 'http://local');
    const rota = decodeURIComponent(url.pathname);
    const caminho = join(DIST, normalize(rota));
    const tipo = await tipoDe(caminho);
    if (tipo === 'pasta' && !rota.endsWith('/')) {
      resposta.writeHead(301, { Location: `${rota}/${url.search}` });
      resposta.end();
      return;
    }
    const arquivo = tipo === 'pasta' ? join(caminho, 'index.html') : caminho;
    if ((await tipoDe(arquivo)) === 'arquivo') {
      enviar(pedido, resposta, 200, arquivo, await readFile(arquivo));
      return;
    }
    const pagina404 = join(DIST, '404.html');
    enviar(pedido, resposta, 404, pagina404, await readFile(pagina404));
  });
  return new Promise((pronto) => servidor.listen(porta, () => pronto(servidor)));
}

// Executado direto: fica no ar até ser encerrado, como o Lighthouse espera.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const porta = Number(process.argv[2] ?? 4399);
  await servirDist(porta);
  console.log(`dist pronto em http://localhost:${porta}`);
}
