// Endereços da arte de cromo já otimizada. O ArteCromo os usa como fundo, e o BaseLayout os pré-carrega.
import { getImage } from 'astro:assets';
import claro from '../assets/arte/cromo-claro.webp';
import escuro from '../assets/arte/cromo-escuro.webp';

const gerar = async (src: ImageMetadata, width: number) => (await getImage({ src, width, format: 'webp', quality: 80 })).src;

export async function enderecosDaArte() {
  const [claroP, claroG, escuroP, escuroG] = await Promise.all([gerar(claro, 900), gerar(claro, 1600), gerar(escuro, 900), gerar(escuro, 1600)]);
  return { claroP, claroG, escuroP, escuroG };
}
