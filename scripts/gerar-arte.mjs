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
  // Texturas para letras: o tom mais fraco precisa manter 3:1 contra o fundo de cada tema.
  letrasEscuro: criarTabela([
    [0.0, 0.62], [0.2, 0.96], [0.3, 1.0], [0.36, 0.56], [0.4, 0.47], [0.46, 0.74], [0.54, 1.0],
    [0.62, 0.8], [0.68, 0.48], [0.72, 0.72], [0.82, 1.0], [0.92, 0.78], [1.0, 0.5],
  ]),
  letrasClaro: criarTabela([
    [0.0, 0.34], [0.2, 0.08], [0.3, 0.03], [0.36, 0.34], [0.4, 0.47], [0.46, 0.2], [0.54, 0.03],
    [0.62, 0.16], [0.68, 0.46], [0.72, 0.22], [0.82, 0.04], [0.92, 0.18], [1.0, 0.42],
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
      if (tema !== 'claro' && tema !== 'letrasClaro') {
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
function suavizar(campo, largura, alturaPx, raio, passes) {
  let origem = campo;
  for (let n = 0; n < passes * 2; n += 1) {
    const horizontal = n % 2 === 0;
    const destino = new Float32Array(campo.length);
    const linhas = horizontal ? alturaPx : largura;
    const colunas = horizontal ? largura : alturaPx;
    for (let a = 0; a < linhas; a += 1) {
      let soma = 0;
      const pos = (b) => (horizontal ? a * largura + limitar(b, 0, largura - 1) : limitar(b, 0, alturaPx - 1) * largura + a);
      for (let b = -raio; b <= raio; b += 1) soma += origem[pos(b)];
      for (let b = 0; b < colunas; b += 1) {
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
    altura: suavizar(altura, lado, lado, 5, 3),
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
  await original.clone().resize(900).webp({ quality: 84, alphaQuality: 90 }).toFile(`${SAIDA}/emblema-grande.webp`);
  await original.clone().resize(64).png({ compressionLevel: 9 }).toFile('public/favicon.png');
  await original.clone().resize(180).flatten({ background: '#050608' }).png({ compressionLevel: 9 }).toFile('public/apple-touch-icon.png');
  if (process.env.ARTE_PREVIA) {
    await original.clone().resize(720).flatten({ background: '#050608' }).png().toFile(`${process.env.ARTE_PREVIA}/emblema-escuro.png`);
    await original.clone().resize(720).flatten({ background: '#eceef1' }).png().toFile(`${process.env.ARTE_PREVIA}/emblema-claro.png`);
  }
  console.log('ok: emblema e favicons');
}

// --- Textura das letras: metal recortado no formato do texto -------------------

async function gerarTextura(tema, tabela) {
  const largura = 1800;
  const alturaPx = 1125;
  const fbm = criarRuido(90);
  const altura = relevoDoFluxo(largura, alturaPx, 73);
  const rgb = sombrear({
    altura,
    largura,
    alturaPx,
    forca: 165,
    tema: tabela,
    // Dispersão alta: é ela que põe as franjas de azul e laranja nas letras.
    dispersao: (x, y) => 0.016 + 0.012 * degrau(-0.1, 0.25, fbm((x / alturaPx) * 1.4, (y / alturaPx) * 1.4, 2)),
    termico: () => 0,
  });
  const { bytes, canais } = paraBytes(rgb);
  const arquivo = `${SAIDA}/letras-${tema}.webp`;
  await sharp(bytes, { raw: { width: largura, height: alturaPx, channels: canais } })
    .resize(1500)
    .webp({ quality: 78, effort: 6 })
    .toFile(arquivo);
  console.log(`ok: ${arquivo}`);
}

// --- Fita: metal derretido que atravessa a página entre as seções ---------------

async function gerarFita({ nome, semente, espinhos, largura = 2400, alturaPx = 520, espessura = 54, amplitude = 150 }) {
  const fbm = criarRuido(semente);
  const fbm2 = criarRuido(semente + 11);
  const lamina = (t, e) => {
    const d = t < e.t ? (e.t - t) / e.antes : (t - e.t) / e.depois;
    return d < 1 ? (1 - d) ** 1.7 : 0;
  };
  const passos = 1400;
  const cima = [];
  const baixo = [];
  for (let i = 0; i <= passos; i += 1) {
    const t = i / passos;
    const x = t * largura;
    const centro = alturaPx / 2 + amplitude * 2.2 * fbm(t * 2.1 + 3, 0.5, 2);
    // A fita afina até virar ponta nas duas extremidades, como uma lâmina.
    const miolo = espessura * Math.sin(Math.PI * t) ** 0.75 * (0.62 + 1.25 * limitar(0.5 + 1.5 * fbm2(t * 4.2, 1.7, 2)));
    const noLado = (lado) => espinhos.filter((e) => e.lado === lado);
    const forca = (lado) => noLado(lado).reduce((m, e) => Math.max(m, lamina(t, e)), 0);
    const altura = (lado) => noLado(lado).reduce((m, e) => Math.max(m, lamina(t, e) * e.altura), 0);
    // Cada espinho é arrastado no sentido da fita: vira lâmina, como os do emblema.
    cima.push([x + 34 * forca('cima'), centro - miolo - altura('cima')]);
    baixo.push([x - 34 * forca('baixo'), centro + miolo + altura('baixo')]);
  }
  const pontos = [...cima, ...baixo.reverse()].map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${largura}" height="${alturaPx}"><path fill="#fff" d="M${pontos}Z"/></svg>`;
  const { data: alfa } = await sharp(Buffer.from(svg))
    .resize(largura, alturaPx)
    .ensureAlpha()
    .extractChannel('alpha')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const dentro = new Uint8Array(alfa.length);
  for (let i = 0; i < alfa.length; i += 1) dentro[i] = alfa[i] > 127 ? 1 : 0;
  const distancia = transformadaDeDistancia(dentro, largura, alturaPx);
  const raio = 40;
  const relevo = new Float32Array(alfa.length);
  for (let y = 0; y < alturaPx; y += 1) {
    for (let x = 0; x < largura; x += 1) {
      const i = y * largura + x;
      const t = limitar(distancia[i] / raio);
      relevo[i] = Math.sqrt(1 - (1 - t) ** 2) + 0.6 * t * fbm((x / alturaPx) * 1.6, (y / alturaPx) * 3.4, 2);
    }
  }
  const rgb = sombrear({
    altura: suavizar(relevo, largura, alturaPx, 6, 3),
    largura,
    alturaPx,
    forca: 30,
    tema: 'emblema',
    dispersao: () => 0.014,
    termico: (x, y) => 0.62 * degrau(0.0, 0.18, fbm2((x / alturaPx) * 0.9 + 4, (y / alturaPx) * 0.9, 2)),
  });
  const { bytes, canais } = paraBytes(rgb, alfa);
  const arquivo = `${SAIDA}/fita-${nome}.webp`;
  await sharp(bytes, { raw: { width: largura, height: alturaPx, channels: canais } })
    .resize(1800)
    .webp({ quality: 82, alphaQuality: 90, effort: 6 })
    .toFile(arquivo);
  if (process.env.ARTE_PREVIA) {
    await sharp(bytes, { raw: { width: largura, height: alturaPx, channels: canais } })
      .resize(1400).flatten({ background: '#050608' }).png().toFile(`${process.env.ARTE_PREVIA}/fita-${nome}.png`);
  }
  console.log(`ok: ${arquivo}`);
}

await mkdir(SAIDA, { recursive: true });
await mkdir('public', { recursive: true });
await gerarFundo('escuro');
await gerarFundo('claro');
await gerarTextura('escuro', 'letrasEscuro');
await gerarTextura('claro', 'letrasClaro');
await gerarFita({
  nome: 'a',
  semente: 12,
  espinhos: [
    { t: 0.16, lado: 'cima', altura: 74, antes: 0.07, depois: 0.012 },
    { t: 0.31, lado: 'baixo', altura: 92, antes: 0.012, depois: 0.075 },
    { t: 0.44, lado: 'cima', altura: 120, antes: 0.085, depois: 0.014 },
    { t: 0.58, lado: 'baixo', altura: 104, antes: 0.012, depois: 0.08 },
    { t: 0.7, lado: 'cima', altura: 96, antes: 0.08, depois: 0.012 },
    { t: 0.85, lado: 'baixo', altura: 70, antes: 0.01, depois: 0.06 },
  ],
});
await gerarFita({
  nome: 'b',
  semente: 57,
  espinhos: [
    { t: 0.13, lado: 'baixo', altura: 66, antes: 0.01, depois: 0.06 },
    { t: 0.27, lado: 'cima', altura: 104, antes: 0.08, depois: 0.013 },
    { t: 0.4, lado: 'baixo', altura: 118, antes: 0.013, depois: 0.085 },
    { t: 0.55, lado: 'cima', altura: 126, antes: 0.09, depois: 0.014 },
    { t: 0.68, lado: 'baixo', altura: 88, antes: 0.012, depois: 0.07 },
    { t: 0.83, lado: 'cima', altura: 78, antes: 0.07, depois: 0.012 },
  ],
});await gerarEmblema();
