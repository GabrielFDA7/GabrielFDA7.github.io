// Imagem de compartilhamento (1200x630), a mesma composição da abertura: texto à esquerda, arte à
// direita. Gerada no build, para que um projeto novo ganhe a sua sem nenhum passo manual.
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

export interface DadosOg {
  rotulo: string;
  titulo: string;
  apoio: string;
}

const LARGURA = 1200;
const ALTURA = 630;
const raiz = process.cwd();
const fonte = (peso: number) => readFile(join(raiz, `node_modules/@fontsource/inter/files/inter-latin-${peso}-normal.woff`));

// Fonte e arte são as mesmas em todas as imagens: carregadas uma vez só.
const recursos = (async () => {
  const [regular, negrito] = await Promise.all([fonte(400), fonte(800)]);
  // A arte começa onde o texto termina e entra aos poucos, como na abertura do site.
  const larguraArte = 500;
  const mascara = `<svg width="${larguraArte}" height="${ALTURA}"><defs><linearGradient id="m"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.55" stop-color="#fff" stop-opacity="1"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#m)"/></svg>`;
  const arte = await sharp(join(raiz, 'src/assets/arte/cromo-escuro.webp'))
    .resize(larguraArte, ALTURA, { fit: 'cover' })
    .ensureAlpha()
    .composite([{ input: Buffer.from(mascara), blend: 'dest-in' }])
    .png()
    .toBuffer();
  return { regular, negrito, arte, esquerda: LARGURA - larguraArte };
})();

const tamanhoDoTitulo = (titulo: string) => (titulo.length <= 24 ? 84 : titulo.length <= 44 ? 64 : 50);

export async function gerarImagemOg({ rotulo, titulo, apoio }: DadosOg): Promise<Uint8Array<ArrayBuffer>> {
  const { regular, negrito, arte, esquerda } = await recursos;
  const texto = (conteudo: string, style: Record<string, unknown>) => ({ type: 'div', props: { style, children: conteudo } });
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: { display: 'flex', flexDirection: 'column', justifyContent: 'center', width: LARGURA, height: ALTURA, padding: 64 },
        children: [
          texto(rotulo.toUpperCase(), { color: '#8ec5ff', fontSize: 24, fontWeight: 800, letterSpacing: 4 }),
          texto(titulo, { maxWidth: 640, marginTop: 20, color: '#eff2f6', fontSize: tamanhoDoTitulo(titulo), fontWeight: 800, lineHeight: 1.08, letterSpacing: -1.5 }),
          texto(apoio, { maxWidth: 620, marginTop: 24, color: '#a6aeba', fontSize: 30, lineHeight: 1.3 }),
        ],
      },
    } as never,
    {
      width: LARGURA,
      height: ALTURA,
      fonts: [
        { name: 'Inter', data: regular, weight: 400, style: 'normal' },
        { name: 'Inter', data: negrito, weight: 800, style: 'normal' },
      ],
    },
  );
  const imagem = await sharp({ create: { width: LARGURA, height: ALTURA, channels: 3, background: '#050608' } })
    .composite([
      { input: arte, left: esquerda, top: 0 },
      { input: Buffer.from(svg), left: 0, top: 0 },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  return new Uint8Array(imagem);
}
