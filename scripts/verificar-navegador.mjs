// Abre o site pronto em um navegador real e confere o que só aparece nele: acessibilidade, layout,
// teclado, filtro, tema, diagramas, reflexo do metal e links de foco.
import { readdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { FOCOS } from '../src/config/focos.ts';
import { TECNOLOGIAS } from '../src/config/tecnologias.ts';
import { servirDist } from './servir-dist.mjs';

const PORTA = 4398;
const BASE = `http://localhost:${PORTA}`;
const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const axe = readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');

const rotas = readdirSync(DIST, { recursive: true, withFileTypes: true })
  .filter((item) => item.isFile() && item.name.endsWith('.html') && item.name !== '404.html')
  .map((item) => `/${relative(DIST, join(item.parentPath, item.name)).split(sep).join('/')}`.replace(/index\.html$/, ''));
const ROTAS = [...rotas.map((caminho) => ({ caminho, status: 200 })), { caminho: '/nao-existe/', status: 404 }];
const VISTAS = [
  { nome: 'computador', viewport: { width: 1280, height: 800 } },
  { nome: 'celular', viewport: { width: 360, height: 780 }, isMobile: true, hasTouch: true },
];

let falhas = 0;
const conferir = (ok, mensagem) => {
  if (!ok) {
    falhas += 1;
    console.log(`FALHOU: ${mensagem}`);
  }
};

const servidor = await servirDist(PORTA);
// No CI usa o Chromium instalado pelo Playwright; na máquina local, o Edge que já existe.
const navegador = await chromium.launch(process.env.CI ? {} : { channel: 'msedge' });

// --- Todas as páginas, nas duas telas e nos dois temas -------------------------------------
for (const { nome: vista, ...opcoes } of VISTAS) {
  for (const colorScheme of ['dark', 'light']) {
    const contexto = await navegador.newContext({ ...opcoes, colorScheme });
    for (const { caminho, status } of ROTAS) {
      const p = await contexto.newPage();
      const erros = [];
      p.on('console', (m) => { if (m.type() === 'error' && !/404/.test(m.text())) erros.push(m.text()); });
      p.on('pageerror', (e) => erros.push(String(e)));
      const resposta = await p.goto(BASE + caminho, { waitUntil: 'networkidle' });
      const rotulo = `${vista}/${colorScheme}${caminho}`;
      conferir(resposta.status() === status, `${rotulo}: HTTP ${resposta.status()}`);

      const e = await p.evaluate(() => ({
        rolagem: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        h1: document.querySelectorAll('h1').length,
        main: document.querySelectorAll('main').length,
        pulos: [...document.querySelectorAll('h1,h2,h3,h4')].map((h) => Number(h.tagName[1])).filter((n, i, l) => i > 0 && n - l[i - 1] > 1).length,
        semAlt: document.querySelectorAll('img:not([alt])').length,
        js: performance.getEntriesByType('resource').filter((r) => /\.js(\?|$)/.test(r.name)).length,
      }));
      conferir(e.rolagem <= 0, `${rotulo}: rolagem horizontal de ${e.rolagem}px`);
      conferir(e.h1 === 1 && e.main === 1, `${rotulo}: ${e.h1} h1 e ${e.main} main`);
      conferir(e.pulos === 0, `${rotulo}: hierarquia de títulos pula nível`);
      conferir(e.semAlt === 0, `${rotulo}: imagem sem alt`);
      conferir(caminho === '/projetos/' || e.js === 0, `${rotulo}: ${e.js} arquivos JS em página sem ilha`);

      // Rola até o fim, como uma pessoa, para as imagens lazy carregarem.
      await p.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 30));
        }
      });
      await p.waitForLoadState('networkidle');
      const quebradas = await p.evaluate(() => [...document.images].filter((i) => getComputedStyle(i).display !== 'none' && i.complete && i.naturalWidth === 0).map((i) => i.src));
      conferir(quebradas.length === 0, `${rotulo}: imagem quebrada ${quebradas[0]}`);

      await p.addScriptTag({ content: axe });
      const violacoes = await p.evaluate(async () => {
        const r = await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] });
        return r.violations.map((v) => `${v.id}: ${v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(' ; ')}`);
      });
      violacoes.forEach((v) => conferir(false, `${rotulo}: axe ${v}`));
      erros.forEach((m) => conferir(false, `${rotulo}: console ${m}`));
      await p.close();
    }
    await contexto.close();
  }
  console.log(`páginas conferidas: ${vista}`);
}

const contexto = await navegador.newContext({ viewport: { width: 1280, height: 800 }, colorScheme: 'dark' });
const p = await contexto.newPage();

// --- Teclado ---------------------------------------------------------------------------------
await p.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await p.keyboard.press('Tab');
const pulo = await p.evaluate(() => {
  const a = document.activeElement;
  const r = a.getBoundingClientRect();
  return { href: a.getAttribute('href'), visivel: r.width > 1 && r.height > 1 && r.top >= 0, contorno: getComputedStyle(a).outlineStyle };
});
conferir(pulo.href === '#conteudo' && pulo.visivel, `teclado: primeiro Tab deve mostrar "pular para o conteúdo" (${JSON.stringify(pulo)})`);
await p.keyboard.press('Enter');
conferir(await p.evaluate(() => document.activeElement?.id === 'conteudo' || location.hash === '#conteudo'), 'teclado: pular para o conteúdo não levou ao conteúdo');
const semFoco = await p.evaluate(() => [...document.querySelectorAll('main a[href], main button')].filter((e) => e.tabIndex < 0).length);
conferir(semFoco === 0, `teclado: ${semFoco} elementos fora da ordem de foco`);

// --- Filtro de projetos ----------------------------------------------------------------------
const visiveis = () => p.evaluate(() => [...document.querySelectorAll('[data-projeto]')].filter((c) => !c.hidden).map((c) => c.dataset.projeto));
await p.goto(`${BASE}/projetos/`, { waitUntil: 'networkidle' });
await p.locator('button[aria-pressed="true"]').waitFor();
const total = await p.locator('[data-projeto]').count();
conferir((await visiveis()).length === total, 'filtro: deve começar com todos os projetos');
await p.getByRole('button', { name: 'Automação' }).click();
const automacao = await visiveis();
conferir(automacao.length > 0 && automacao.length < total && p.url().endsWith('?tag=automacao'), `filtro: Automação (${automacao}), URL ${p.url()}`);
await p.getByRole('button', { name: 'Todos' }).focus();
await p.keyboard.press('Enter');
conferir((await visiveis()).length === total && !p.url().includes('tag='), 'filtro: Todos pelo teclado deve restaurar a lista');
await p.goto(`${BASE}/projetos/?tag=ia`, { waitUntil: 'networkidle' });
await p.waitForFunction(() => [...document.querySelectorAll('[data-projeto]')].some((c) => c.hidden));
conferir((await visiveis()).includes('nextup'), 'filtro: link ?tag=ia deve abrir filtrado');

const semJs = await navegador.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
const q = await semJs.newPage();
await q.goto(`${BASE}/projetos/`);
conferir(await q.locator('[data-projeto]:visible').count() === total, 'sem JS: a lista completa deve ficar visível');
conferir(await q.locator('button:visible').count() === 0, 'sem JS: nenhum botão morto visível');
await semJs.close();

// --- Vitrine de tecnologias ------------------------------------------------------------------
const TOTAL_TECNOLOGIAS = TECNOLOGIAS.flatMap(({ itens }) => itens).length;
const UMA_TROCA = 5800; // a troca é a cada 5 s e dura 0,7 s; no meio dela, as duas áreas aparecem
const paineisVisiveis = (pagina) => pagina.locator('[data-painel]').evaluateAll((lista) => lista.filter((e) => getComputedStyle(e).opacity === '1').map((e) => e.querySelector('h3').textContent));
const areaAtiva = (pagina) => pagina.locator('[data-areas] button[aria-pressed="true"]').textContent();

await p.goto(`${BASE}/sobre/`, { waitUntil: 'networkidle' });
const nomesNoHtml = await p.locator('[data-painel] li').count();
conferir(nomesNoHtml === TOTAL_TECNOLOGIAS, `vitrine: ${nomesNoHtml} tecnologias no HTML, esperava ${TOTAL_TECNOLOGIAS}`);
conferir(await p.locator('[data-areas] button').count() === TECNOLOGIAS.length, 'vitrine: um botão por área');
await p.waitForTimeout(UMA_TROCA);
conferir(await areaAtiva(p) === TECNOLOGIAS[0].area, 'vitrine: não deve trocar fora da tela');

await p.locator('[data-vitrine]').scrollIntoViewIfNeeded();
await p.mouse.move(0, 0);
const alturaAntes = await p.locator('.paineis').evaluate((e) => e.getBoundingClientRect().height);
await p.waitForTimeout(UMA_TROCA);
const segundaArea = await areaAtiva(p);
conferir(segundaArea === TECNOLOGIAS[1].area, `vitrine: deve trocar sozinha na tela (está em ${segundaArea})`);
conferir((await paineisVisiveis(p)).join() === segundaArea, `vitrine: mostra ${await paineisVisiveis(p)} com ${segundaArea} ativa`);
conferir(alturaAntes === await p.locator('.paineis').evaluate((e) => e.getBoundingClientRect().height), 'vitrine: a altura não pode mudar na troca');

await p.locator('[data-vitrine]').hover();
const areaNaPausa = await areaAtiva(p);
await p.waitForTimeout(UMA_TROCA);
conferir(await areaAtiva(p) === areaNaPausa, 'vitrine: o mouse em cima deve pausar');

const ultimaArea = TECNOLOGIAS.at(-1).area;
await p.getByRole('button', { name: ultimaArea, exact: true }).click();
await p.waitForTimeout(800);
conferir((await paineisVisiveis(p)).join() === ultimaArea, 'vitrine: clicar deve mostrar a área');
await p.mouse.move(0, 0);
await p.waitForTimeout(UMA_TROCA);
conferir(await areaAtiva(p) === ultimaArea, 'vitrine: depois do clique, a troca automática para');

// Sem animação, a lista inteira fica à vista e não sobra botão sem função.
const calmoSobre = await navegador.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
const semJsSobre = await navegador.newContext({ viewport: { width: 1280, height: 800 }, javaScriptEnabled: false });
for (const [nome, c] of [['movimento reduzido', calmoSobre], ['sem JS', semJsSobre]]) {
  const pg = await c.newPage();
  await pg.goto(`${BASE}/sobre/`);
  conferir(await pg.locator('[data-areas] button:visible').count() === 0, `vitrine ${nome}: botões devem ficar escondidos`);
  const opacidades = await pg.locator('[data-painel]').evaluateAll((lista) => lista.map((e) => getComputedStyle(e).opacity));
  conferir(opacidades.length === TECNOLOGIAS.length && opacidades.every((o) => o === '1'), `vitrine ${nome}: todas as áreas devem aparecer`);
  await c.close();
}

// --- Links de foco ---------------------------------------------------------------------------
for (const [nome, foco] of Object.entries(FOCOS)) {
  const prefixo = `/foco/${nome}:`;
  await p.goto(`${BASE}/foco/${nome}/`, { waitUntil: 'networkidle' });
  const f = await p.evaluate(() => ({
    robots: document.querySelector('meta[name="robots"]')?.content,
    cv: document.querySelector('.hero a[download]')?.getAttribute('href'),
    hero: document.querySelector('.hero')?.innerText ?? '',
    titulos: [...document.querySelectorAll('main h2')].map((h) => h.id),
    menu: [...document.querySelectorAll('header nav a')].map((a) => a.getAttribute('href')),
  }));
  conferir(f.robots === 'noindex', `${prefixo} sem noindex`);
  conferir(f.hero.includes(foco.chamada), `${prefixo} sem a chamada do foco`);
  conferir(f.cv === foco.curriculo, `${prefixo} currículo errado: ${f.cv}`);
  conferir(!f.menu.some((href) => href.includes('/foco')), `${prefixo} não pode aparecer no menu`);
  const metodoAntes = f.titulos.indexOf('metodo-ia') < f.titulos.indexOf('projeto-principal');
  conferir(metodoAntes === Boolean(foco.iaPrimeiro), `${prefixo} posição errada da seção de IA`);
  const pdf = await p.request.get(BASE + f.cv);
  const corpo = await pdf.body();
  conferir(pdf.status() === 200 && corpo.subarray(0, 5).toString() === '%PDF-', `${prefixo} o currículo não baixa`);
}
await p.goto(`${BASE}/`, { waitUntil: 'networkidle' });
const cvHome = await p.locator('.hero a[download]').getAttribute('href');
conferir((await p.request.get(BASE + cvHome)).status() === 200, `home: o currículo ${cvHome} não baixa`);

// --- Tema ------------------------------------------------------------------------------------
// Cada tema baixa só a própria capa, mesmo depois de rolar até ela.
for (const [colorScheme, certa, errada] of [['dark', 'escuro', 'claro'], ['light', 'claro', 'escuro']]) {
  const c = await navegador.newContext({ viewport: { width: 1280, height: 800 }, colorScheme });
  const pg = await c.newPage();
  await pg.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await pg.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
  });
  await pg.waitForLoadState('networkidle');
  const nomes = await pg.evaluate(() => performance.getEntriesByType('resource').map((r) => decodeURIComponent(r.name)).filter((n) => n.includes('nextup-celular-')));
  conferir(nomes.some((n) => n.includes(certa)) && !nomes.some((n) => n.includes(`nextup-celular-${errada}`)), `tema ${colorScheme}: capas baixadas ${nomes}`);
  await c.close();
}

// --- Diagramas -------------------------------------------------------------------------------
const lum = (rgb) => {
  const c = rgb.match(/[\d.]+/g).slice(0, 3).map((v) => {
    const n = Number(v) / 255;
    return n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const estudos = rotas.filter((r) => r.startsWith('/projetos/') && r !== '/projetos/');
for (const colorScheme of ['dark', 'light']) {
  const c = await navegador.newContext({ viewport: { width: 360, height: 780 }, colorScheme });
  const m = await c.newPage();
  for (const rota of estudos) {
    await m.goto(BASE + rota, { waitUntil: 'networkidle' });
    const diagrama = m.locator('.prosa svg[aria-roledescription]');
    if (!(await diagrama.count())) continue;
    conferir(!(await m.locator('code.language-mermaid').count()), `${rota}: diagrama como código cru`);
    const r = await diagrama.first().evaluate((svg) => {
      const rotulo = svg.querySelector('.nodeLabel p, .nodeLabel');
      const no = svg.querySelector('.node rect');
      return {
        cor: getComputedStyle(rotulo).color,
        fundo: getComputedStyle(no).fill,
        fonte: parseFloat(getComputedStyle(rotulo).fontSize),
        escala: svg.getBoundingClientRect().width / svg.viewBox.baseVal.width,
        cortados: [...svg.querySelectorAll('.node')].flatMap((n) => {
          const caixa = n.querySelector('.label-container')?.getBoundingClientRect();
          const texto = n.querySelector('.nodeLabel');
          if (!caixa || !texto) return [];
          const t = texto.getBoundingClientRect();
          return t.bottom > caixa.bottom + 1 || t.top < caixa.top - 1 || t.right > caixa.right + 1 ? [texto.textContent] : [];
        }),
      };
    });
    const [a, b] = [lum(r.cor), lum(r.fundo)].sort((x, y) => y - x);
    const contraste = (a + 0.05) / (b + 0.05);
    const letra = Math.min(r.fonte * r.escala, r.fonte);
    conferir(contraste >= 4.5, `${colorScheme}${rota}: contraste do diagrama ${contraste.toFixed(1)}:1`);
    conferir(letra >= 10.5, `${colorScheme}${rota}: letra do diagrama com ${letra.toFixed(1)}px`);
    conferir(r.cortados.length === 0, `${colorScheme}${rota}: rótulos cortados: ${r.cortados.join(' | ')}`);
  }
  await c.close();
}
await p.goto(`${BASE}${estudos[0]}`, { waitUntil: 'networkidle' });
const corDoNo = () => p.locator('.prosa svg[aria-roledescription] .node rect').first().evaluate((e) => getComputedStyle(e).fill);
const corAntes = await corDoNo();
await p.locator('#alternar-tema').click();
conferir(corAntes !== (await corDoNo()), 'diagrama: a cor precisa mudar com o botão de tema');
await p.evaluate(() => localStorage.clear());

// --- Letras de metal -------------------------------------------------------------------------
for (const [largura, altura] of [[1280, 800], [768, 900], [360, 780]]) {
  const c = await navegador.newContext({ viewport: { width: largura, height: altura }, colorScheme: 'dark' });
  const pm = await c.newPage();
  for (const rota of ['/', '/projetos/', estudos[0], '/sobre/', '/nao-existe/']) {
    await pm.goto(BASE + rota, { waitUntil: 'networkidle' });
    const cortes = await pm.evaluate(() => [...document.querySelectorAll('.metal, .prosa h2')].flatMap((e) => {
      const s = getComputedStyle(e);
      if (s.display === 'inline') return [];
      const fonte = parseFloat(s.fontSize);
      const linha = parseFloat(s.lineHeight) || fonte * 1.2;
      const folga = parseFloat(s.paddingBottom) + (linha - fonte * 1.21) / 2;
      const espaco = parseFloat(s.letterSpacing) || 0;
      const nome = e.textContent.trim().slice(0, 24);
      return [
        ...(folga < -0.5 ? [`${nome}: cauda cortada`] : []),
        ...(espaco < 0 && parseFloat(s.paddingRight) < -espaco ? [`${nome}: última letra cortada`] : []),
      ];
    }));
    conferir(cortes.length === 0, `metal ${largura}px ${rota}: ${cortes.join(' | ')}`);
  }
  await pm.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  const a = await pm.evaluate(() => {
    const r = document.createRange();
    r.selectNodeContents(document.querySelector('.assinatura'));
    const t = r.getBoundingClientRect();
    return { esquerda: t.left, direita: document.documentElement.clientWidth - t.right };
  });
  conferir(Math.abs(a.esquerda - a.direita) <= 2 && a.esquerda >= 0 && a.direita >= 0, `assinatura ${largura}px fora do centro: ${a.esquerda.toFixed(1)} e ${a.direita.toFixed(1)}`);
  await c.close();
}

// O reflexo no toque depende de animação presa à rolagem. Já quebrou só no build: o teste fica aqui.
const toque = await navegador.newContext({ viewport: { width: 412, height: 915 }, isMobile: true, hasTouch: true, colorScheme: 'dark' });
const pt = await toque.newPage();
for (const rota of ['/', '/sobre/', estudos[0]]) {
  await pt.goto(BASE + rota, { waitUntil: 'networkidle' });
  const posicao = (el) => el.evaluate((e) => getComputedStyle(e).backgroundPosition);
  const metais = pt.locator('.metal, .prosa h2');
  const quantidade = await metais.count();
  for (let i = 0; i < quantidade; i += 1) {
    const alvo = metais.nth(i);
    if (!(await alvo.isVisible())) continue;
    await pt.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await pt.waitForTimeout(60);
    const noTopo = await posicao(alvo);
    await pt.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
    await pt.waitForTimeout(60);
    const noFim = await posicao(alvo);
    conferir(noTopo !== noFim, `reflexo no toque ${rota}: "${(await alvo.textContent()).trim().slice(0, 20)}" parado em ${noTopo}`);
  }
}
await toque.close();

// Quem pede menos movimento não recebe a animação.
const calmo = await navegador.newContext({ viewport: { width: 412, height: 915 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
const pc = await calmo.newPage();
await pc.goto(`${BASE}/`, { waitUntil: 'networkidle' });
conferir((await pc.locator('.metal').first().evaluate((e) => getComputedStyle(e).animationName)) === 'none', 'movimento reduzido: o reflexo deve ficar parado');
await calmo.close();

await navegador.close();
servidor.close();
console.log(`\nfalhas: ${falhas}`);
process.exit(falhas ? 1 : 0);
