// Recaptura as telas do NextUp no ar, nos dois temas, e grava em src/assets/projetos.
//
// Rodar: npm run capturas
// Com o parque fechado as telas ficam vazias. Por isso o script espera existir fila real,
// consultando a API a cada 10 minutos. Para capturar na hora: npm run capturas -- --agora

import { chromium } from 'playwright';
import sharp from 'sharp';

const APP = 'https://nextup-rcux.onrender.com';
const PARQUE = '75ea578a-adc8-4116-a54d-dccb60765ef9'; // Magic Kingdom
const POSICAO = { latitude: 28.41915, longitude: -81.58115 };
const MINIMO_COM_FILA = 15;
const INTERVALO_MS = 10 * 60 * 1000;
const LIMITE_MS = 4 * 60 * 60 * 1000;
const SAIDA = 'src/assets/projetos';
const PONTO_NO_MAPA = { x: 0.62, y: 0.42 }; // fração da área do mapa onde o "visitante" toca

async function atracoesComFila() {
  const url = `${APP}/api/parks/${PARQUE}/recommendations?lat=${POSICAO.latitude}&lon=${POSICAO.longitude}&limit=8`;
  const resposta = await fetch(url);
  return resposta.ok ? ((await resposta.json()).available ?? 0) : 0;
}

async function esperarFilas() {
  const inicio = Date.now();
  for (;;) {
    const disponiveis = await atracoesComFila().catch(() => 0);
    console.log(`${new Date().toISOString()} atrações com fila: ${disponiveis}`);
    if (disponiveis >= MINIMO_COM_FILA) return;
    if (Date.now() - inicio > LIMITE_MS) throw new Error('o parque não abriu dentro do limite de espera');
    await new Promise((resolve) => setTimeout(resolve, INTERVALO_MS));
  }
}

if (!process.argv.includes('--agora')) await esperarFilas();

// O Edge já vem no Windows. Para usar o Chromium do Playwright, tire o `channel`.
const navegador = await chromium.launch({ channel: 'msedge', headless: true });
const vistas = [
  { nome: 'celular', viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  { nome: 'computador', viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
];
const temas = { claro: 'light', escuro: 'dark' };

for (const { nome, ...opcoes } of vistas) {
  for (const [tema, colorScheme] of Object.entries(temas)) {
    const contexto = await navegador.newContext({
      ...opcoes,
      colorScheme,
      locale: 'pt-BR',
      timezoneId: 'America/New_York',
    });
    const pagina = await contexto.newPage();
    await pagina.goto(`${APP}/`, { waitUntil: 'networkidle', timeout: 90000 });
    const pular = pagina.getByRole('button', { name: 'Pular' });
    if (await pular.isVisible().catch(() => false)) await pular.click();
    await pagina.waitForTimeout(800);
    // Tocar no mapa marca a posição: o app aproxima, numera as opções e desenha a rota.
    // É a tela que mostra a função do produto.
    const mapa = await pagina.locator('#mapa').boundingBox();
    await pagina.mouse.click(mapa.x + mapa.width * PONTO_NO_MAPA.x, mapa.y + mapa.height * PONTO_NO_MAPA.y);
    await pagina.waitForLoadState('networkidle');
    await pagina.waitForTimeout(3500);
    const arquivo = `${SAIDA}/nextup-${nome}-${tema}.webp`;
    await sharp(await pagina.screenshot()).webp({ quality: 88 }).toFile(arquivo);
    console.log(`ok: ${arquivo}`);
    await contexto.close();
  }
}
await navegador.close();
