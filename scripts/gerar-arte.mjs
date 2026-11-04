// Gera a arte de cromo líquido do site, sem nenhuma imagem de origem.
//
// Como funciona, em quatro passos:
//   1. Uma função de ruído cria um "relevo" (altura em cada pixel).
//   2. A inclinação desse relevo dá a direção da superfície (a normal).
//   3. A normal diz o que aquele ponto reflete numa faixa de luz fixa.
//   4. Lendo a faixa com um deslocamento diferente para vermelho e azul, nascem
//      as franjas de cor das bordas, como num metal polido.
//
// Rodar: npm run arte (as saídas ficam versionadas, o build não executa isto).

import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const SAIDA = 'src/assets/arte';

// --- Ruído -------------------------------------------------------------------

function criarRuido(semente) {
  const p = new Uint8Array(512);
  const base = Array.from({ length: 256 }, (_, i) => i);
  let estado = semente >>> 0;
  const aleatorio = () => {
    estado = (Math.imul(estado, 1664525) + 1013904223) >>> 0;
    return estado / 4294967296;
  };
  for (let i = 255; i > 0; i -= 1) {
    const j = Math.floor(aleatorio() * (i + 1));
    [base[i], base[j]] = [base[j], base[i]];
  }
  for (let i = 0; i < 512; i += 1) p[i] = base[i & 255];

  const gradiente = (h, x, y) => {
    const g = h & 7;
    const u = g < 4 ? x : y;
    const v = g < 4 ? y : x;
    return (g & 1 ? -u : u) + (g & 2 ? -2 * v : 2 * v);
  };
  const suave = (t) => t * t * t * (t * (t * 6 - 15) + 10);

  const ruido = (x, y) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = x - xi;
    const fy = y - yi;
    const a = p[xi & 255] + (yi & 255);
    const b = p[(xi + 1) & 255] + (yi & 255);
    const u = suave(fx);
    const v = suave(fy);
    const n00 = gradiente(p[a & 511], fx, fy);
    const n10 = gradiente(p[b & 511], fx - 1, fy);
    const n01 = gradiente(p[(a + 1) & 511], fx, fy - 1);
    const n11 = gradiente(p[(b + 1) & 511], fx - 1, fy - 1);
    return (n00 + u * (n10 - n00) + v * (n01 - n00 + u * (n00 - n10 - n01 + n11))) * 0.3;
  };

  return (x, y, oitavas = 4) => {
    let soma = 0;
    let amplitude = 1;
    let frequencia = 1;
    let total = 0;
    for (let i = 0; i < oitavas; i += 1) {
      soma += amplitude * ruido(x * frequencia, y * frequencia);
      total += amplitude;
      amplitude *= 0.5;
      frequencia *= 2.03;
    }
    return soma / total;
  };
}

// --- Utilidades --------------------------------------------------------------

const limitar = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

function degrau(a, b, v) {
  const t = limitar((v - a) / (b - a));
  return t * t * (3 - 2 * t);
}

// Tabela de consulta a partir de paradas [posição, valor...]: é a "faixa de luz".
function criarTabela(paradas, tamanho = 2048) {
  const canais = paradas[0].length - 1;
  const tabela = new Float32Array(tamanho * canais);
  let k = 0;
  for (let i = 0; i < tamanho; i += 1) {
    const t = i / (tamanho - 1);
    while (k < paradas.length - 2 && t > paradas[k + 1][0]) k += 1;
    const [t0, ...v0] = paradas[k];
    const [t1, ...v1] = paradas[k + 1];
    const m = degrau(t0, t1, t);
    for (let c = 0; c < canais; c += 1) tabela[i * canais + c] = v0[c] + (v1[c] - v0[c]) * m;
  }
  return { tabela, tamanho, canais };
}

function ler({ tabela, tamanho, canais }, t, canal = 0) {
  const i = Math.round(limitar(t) * (tamanho - 1));
  return tabela[i * canais + canal];
}

// Faixa de luz do cromo em cada tema: é ela que define o clima da imagem.
const LUZ = {
  escuro: criarTabela([
    [0.0, 0.0], [0.3, 0.01], [0.338, 0.55], [0.352, 1.0], [0.366, 0.06], [0.46, 0.01],
    [0.56, 0.03], [0.6, 0.38], [0.618, 1.0], [0.634, 0.18], [0.72, 0.02], [0.86, 0.006],
    [0.95, 0.25], [1.0, 0.55],
  ]),
  claro: criarTabela([
    [0.0, 0.8], [0.3, 0.72], [0.338, 0.46], [0.352, 0.16], [0.366, 0.98], [0.46, 0.86],
    [0.56, 0.66], [0.6, 0.42], [0.618, 0.12], [0.634, 0.98], [0.72, 0.84], [0.86, 0.72],
    [0.95, 0.94], [1.0, 0.6],
  ]),
  // O emblema é pequeno: precisa de prata aberta, com poucas faixas escuras.
  emblema: criarTabela([
    [0.0, 0.3], [0.2, 0.86], [0.3, 1.0], [0.36, 0.5], [0.4, 0.09], [0.46, 0.62], [0.54, 0.98],
    [0.62, 0.74], [0.68, 0.14], [0.72, 0.66], [0.82, 1.0], [0.92, 0.72], [1.0, 0.34],
  ]),
};

// Mapa térmico das bordas: preto, vermelho, laranja, azul-gelo e branco.
const TERMICO = criarTabela([
  [0.0, 0.0, 0.0, 0.0],
  [0.16, 0.2, 0.02, 0.0],
  [0.3, 0.95, 0.27, 0.07],
  [0.42, 1.0, 0.56, 0.32],
  [0.56, 0.62, 0.78, 1.0],
  [0.8, 0.86, 0.94, 1.0],
  [1.0, 1.0, 1.0, 1.0],
]);

// Sombreia uma superfície já calculada e devolve RGB em ponto flutuante.
function sombrear({ altura, largura, alturaPx, forca, tema, dispersao, termico }) {
  const luz = LUZ[tema];
  const rgb = new Float32Array(largura * alturaPx * 3);
  for (let y = 0; y < alturaPx; y += 1) {
    const cima = Math.max(0, y - 1);
    const baixo = Math.min(alturaPx - 1, y + 1);
    for (let x = 0; x < largura; x += 1) {
      const esq = Math.max(0, x - 1);
      const dir = Math.min(largura - 1, x + 1);
      const i = y * largura + x;
      let nx = (altura[y * largura + esq] - altura[y * largura + dir]) * forca;
      let ny = (altura[cima * largura + x] - altura[baixo * largura + x]) * forca;
      const nz = 1;
      const comprimento = Math.hypot(nx, ny, nz);
      nx /= comprimento;
      ny /= comprimento;
      const z = nz / comprimento;
      // Reflexo do olhar (0, 0, 1) na superfície.
      const rx = 2 * z * nx;
      const ry = 2 * z * ny;
      const t = 0.5 + 0.47 * ry + 0.16 * rx;
      const d = dispersao(x, y);
      const r = ler(luz, t + d);
      const g = ler(luz, t);
      const b = ler(luz, t - d);
      const m = termico(x, y);
      const brilho = limitar(0.5 * g + 0.25 * r + 0.25 * b);
      const j = i * 3;
      // Prata fria como base, com o mapa térmico entrando só onde m > 0.
      if (tema !== 'claro') {
        rgb[j] = r * 0.94 * (1 - m) + ler(TERMICO, brilho, 0) * m;
        rgb[j + 1] = g * 0.98 * (1 - m) + ler(TERMICO, brilho, 1) * m;
        rgb[j + 2] = b * (1 - m) + ler(TERMICO, brilho, 2) * m;
      } else {
        const fundo = brilho;
        rgb[j] = r * 0.93 * (1 - m) + (fundo * 0.93 + (1 - fundo) * 0.72) * m;
        rgb[j + 1] = g * 0.945 * (1 - m) + (fundo * 0.945 + (1 - fundo) * 0.2) * m;
        rgb[j + 2] = b * 0.965 * (1 - m) + (fundo * 0.965 + (1 - fundo) * 0.05) * m;
      }
    }
  }
  return rgb;
}

function paraBytes(rgb, alfa) {
  const canais = alfa ? 4 : 3;
  const total = rgb.length / 3;
  const bytes = Buffer.alloc(total * canais);
  for (let i = 0; i < total; i += 1) {
    bytes[i * canais] = Math.round(limitar(rgb[i * 3]) * 255);
    bytes[i * canais + 1] = Math.round(limitar(rgb[i * 3 + 1]) * 255);
    bytes[i * canais + 2] = Math.round(limitar(rgb[i * 3 + 2]) * 255);
    if (alfa) bytes[i * 4 + 3] = alfa[i];
  }
  return { bytes, canais };
}

// --- Fundo: folhas de metal que fluem na diagonal ------------------------------

function relevoDoFluxo(largura, alturaPx, semente) {
  const fbm = criarRuido(semente);
  const altura = new Float32Array(largura * alturaPx);
  const angulo = -0.5;
  const cos = Math.cos(angulo);
  const sen = Math.sin(angulo);
  for (let y = 0; y < alturaPx; y += 1) {
    for (let x = 0; x < largura; x += 1) {
      const px = x / alturaPx;
      const py = y / alturaPx;
      const u = px * cos - py * sen;
      const v = px * sen + py * cos;
      const qx = fbm(u * 0.8 + 3.1, v * 0.8 + 1.7, 3);
      const qy = fbm(u * 0.8 - 5.2, v * 0.8 + 8.3, 3);
      const u2 = u + 1.0 * qx;
      const v2 = v + 1.0 * qy;
      const largas = fbm(u2 * 0.42, v2 * 1.75, 3);
      const finas = fbm(u2 * 0.7 + 11.0, v2 * 5.2 + 4.0, 2);
      altura[y * largura + x] = largas + 0.11 * finas;
    }
  }
  return altura;
}

async function gerarFundo(tema) {
  const largura = 2400;
  const alturaPx = 1500;
  const semente = 41;
  const fbm = criarRuido(semente + 7);
  const altura = relevoDoFluxo(largura, alturaPx, semente);
  const rgb = sombrear({
    altura,
    largura,
    alturaPx,
    forca: 215,
    tema,
    dispersao: (x, y) => 0.0035 + 0.006 * degrau(0.0, 0.3, fbm((x / alturaPx) * 0.9, (y / alturaPx) * 0.9, 2)),
    termico: (x, y) => (tema === 'escuro' ? 0.95 : 0.4) * degrau(-0.04, 0.14, fbm((x / alturaPx) * 1.1 + 9, (y / alturaPx) * 1.1 + 2, 2)),
  });
  const { bytes, canais } = paraBytes(rgb);
  const arquivo = `${SAIDA}/cromo-${tema}.webp`;
  await sharp(bytes, { raw: { width: largura, height: alturaPx, channels: canais } })
    .resize(1800)
    .webp({ quality: 86, effort: 6 })
    .toFile(arquivo);
  console.log(`ok: ${arquivo}`);
}

// --- Emblema: um G de lâminas -------------------------------------------------

function poligonoDoG() {
  const c = 512;
  const inicio = (-38 * Math.PI) / 180; // ponta superior, abertura à direita
  const giro = (300 * Math.PI) / 180;
  // Cada espinho é assimétrico e arrastado no sentido do giro: vira lâmina, não estrela.
  const espinhos = [
    { t: 0.24, altura: 118, antes: 0.1, depois: 0.022 },
    { t: 0.52, altura: 132, antes: 0.11, depois: 0.022 },
    { t: 0.8, altura: 112, antes: 0.1, depois: 0.022 },
  ];
  const internos = [
    { t: 0.38, altura: 58, antes: 0.08, depois: 0.018 },
    { t: 0.68, altura: 54, antes: 0.08, depois: 0.018 },
  ];
  const lamina = (t, e) => {
    const d = t < e.t ? (e.t - t) / e.antes : (t - e.t) / e.depois;
    return d < 1 ? (1 - d) ** 1.7 : 0;
  };
  const passos = 720;
  const fora = [];
  const dentro = [];
  for (let i = 0; i <= passos; i += 1) {
    const t = i / passos;
    const espessura = 150 * Math.sin(Math.PI * t) ** 0.62;
    const sFora = espinhos.reduce((m, e) => Math.max(m, lamina(t, e)), 0);
    const hFora = espinhos.reduce((m, e) => Math.max(m, lamina(t, e) * e.altura), 0);
    const sDentro = internos.reduce((m, e) => Math.max(m, lamina(t, e)), 0);
    const hDentro = internos.reduce((m, e) => Math.max(m, lamina(t, e) * e.altura), 0);
    const aFora = inicio - giro * t - 0.1 * sFora;
    const aDentro = inicio - giro * t - 0.09 * sDentro;
    const rFora = 345 + hFora;
    const rDentro = 345 - espessura - hDentro;
    fora.push([c + rFora * Math.cos(aFora), c + rFora * Math.sin(aFora)]);
    dentro.push([c + rDentro * Math.cos(aDentro), c + rDentro * Math.sin(aDentro)]);
  }
  const anel = [...fora, ...dentro.reverse()];
  // Barra do G: lâmina em curva que nasce no fim do anel e aponta para o centro.
  const barra = 'M866 548C778 500 650 492 520 520C632 526 716 548 760 604C786 654 782 700 758 748C824 700 862 628 866 548Z';
  const caminho = (pontos) => `M${pontos.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L')}Z`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024"><path fill="#fff" d="${caminho(anel)}${barra}"/></svg>`;
}

// Distância euclidiana exata até a borda (Felzenszwalb e Huttenlocher).
function transformadaDeDistancia(dentro, largura, alturaPx) {
  const INF = 1e12;
  const f = new Float64Array(Math.max(largura, alturaPx));
  const d = new Float64Array(f.length);
  const v = new Int32Array(f.length);
  const z = new Float64Array(f.length + 1);
  const passo = (n) => {
    let k = 0;
    v[0] = 0;
    z[0] = -INF;
    z[1] = INF;
    for (let q = 1; q < n; q += 1) {
      let s;
      do {
        s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
        if (s <= z[k]) k -= 1;
      } while (s <= z[k] && k >= 0);
      k += 1;
      v[k] = q;
      z[k] = s;
      z[k + 1] = INF;
    }
    k = 0;
    for (let q = 0; q < n; q += 1) {
      while (z[k + 1] < q) k += 1;
      d[q] = (q - v[k]) ** 2 + f[v[k]];
    }
  };
  const campo = new Float64Array(largura * alturaPx);
  for (let i = 0; i < campo.length; i += 1) campo[i] = dentro[i] ? INF : 0;
  for (let x = 0; x < largura; x += 1) {
    for (let y = 0; y < alturaPx; y += 1) f[y] = campo[y * largura + x];
    passo(alturaPx);
    for (let y = 0; y < alturaPx; y += 1) campo[y * largura + x] = d[y];
  }
  for (let y = 0; y < alturaPx; y += 1) {
    for (let x = 0; x < largura; x += 1) f[x] = campo[y * largura + x];
    passo(largura);
    for (let x = 0; x < largura; x += 1) campo[y * largura + x] = Math.sqrt(d[x]);
  }
  return campo;
}

// Borra em caixa, nas duas direções: tira os degraus da distância em pixels inteiros.
function suavizar(campo, lado, raio, passes) {
  let origem = campo;
  for (let n = 0; n < passes * 2; n += 1) {
    const horizontal = n % 2 === 0;
    const destino = new Float32Array(campo.length);
    for (let a = 0; a < lado; a += 1) {
      let soma = 0;
      const pos = (b) => (horizontal ? a * lado + limitar(b, 0, lado - 1) : limitar(b, 0, lado - 1) * lado + a);
      for (let b = -raio; b <= raio; b += 1) soma += origem[pos(b)];
      for (let b = 0; b < lado; b += 1) {
        destino[pos(b)] = soma / (2 * raio + 1);
        soma += origem[pos(b + raio + 1)] - origem[pos(b - raio)];
      }
    }
    origem = destino;
  }
  return origem;
}

async function gerarEmblema() {
  const lado = 1024;
  const { data: mascara } = await sharp(Buffer.from(poligonoDoG()))
    .resize(lado, lado)
    .ensureAlpha()
    .extractChannel('alpha')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const dentro = new Uint8Array(lado * lado);
  for (let i = 0; i < dentro.length; i += 1) dentro[i] = mascara[i] > 127 ? 1 : 0;
  const distancia = transformadaDeDistancia(dentro, lado, lado);

  const raio = 58;
  const fbm = criarRuido(5);
  const altura = new Float32Array(lado * lado);
  for (let y = 0; y < lado; y += 1) {
    for (let x = 0; x < lado; x += 1) {
      const i = y * lado + x;
      const t = limitar(distancia[i] / raio);
      // Bisel arredondado, mais uma ondulação suave para o metal parecer líquido.
      altura[i] = Math.sqrt(1 - (1 - t) ** 2) + 0.55 * t * fbm((x / lado) * 3.2, (y / lado) * 3.2, 2);
    }
  }
  const rgb = sombrear({
    altura: suavizar(altura, lado, 5, 3),
    largura: lado,
    alturaPx: lado,
    forca: 24,
    tema: 'emblema',
    dispersao: () => 0.014,
    termico: (x, y) => 0.5 * degrau(0.0, 0.16, fbm((x / lado) * 1.7 + 2, (y / lado) * 1.7, 2)),
  });

  const { bytes, canais } = paraBytes(rgb, mascara);
  const original = sharp(bytes, { raw: { width: lado, height: lado, channels: canais } });
  await original.clone().resize(192).webp({ quality: 90, alphaQuality: 100 }).toFile(`${SAIDA}/emblema.webp`);
  await original.clone().resize(64).png({ compressionLevel: 9 }).toFile('public/favicon.png');
  await original.clone().resize(180).flatten({ background: '#050608' }).png({ compressionLevel: 9 }).toFile('public/apple-touch-icon.png');
  if (process.env.ARTE_PREVIA) {
    await original.clone().resize(720).flatten({ background: '#050608' }).png().toFile(`${process.env.ARTE_PREVIA}/emblema-escuro.png`);
    await original.clone().resize(720).flatten({ background: '#eceef1' }).png().toFile(`${process.env.ARTE_PREVIA}/emblema-claro.png`);
  }
  console.log('ok: emblema e favicons');
}

await mkdir(SAIDA, { recursive: true });
await mkdir('public', { recursive: true });
await gerarFundo('escuro');
await gerarFundo('claro');
await gerarEmblema();
