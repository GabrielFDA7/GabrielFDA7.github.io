import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TAGS } from './config/tags';

const projetos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projetos' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'use minúsculas, números e hífens'),
        summary: z.string().min(1).max(140),
        role: z.string().min(1),
        context: z.enum(['pessoal', 'profissional', 'academico', 'freelance']),
        period: z.string().min(1),
        status: z.enum(['em-producao', 'concluido', 'em-desenvolvimento']),
        tags: z.array(z.enum(TAGS)).min(1),
        stack: z.array(z.string().min(1)),
        metrics: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })).max(3),
        // Abertura do estudo de caso: uma frase para cada pergunta de quem lê com pressa.
        resumo: z.object({ problema: z.string().min(1), feito: z.string().min(1), resultado: z.string().min(1) }),
        links: z.object({ repo: z.url().optional(), demo: z.url().optional() }),
        // Capas: a estreita (celular) vai no destaque da home, e a larga (computador) no
        // estudo de caso. As versões `Escuro` são opcionais e acompanham o tema do site.
        cover: image().optional(),
        coverEscuro: image().optional(),
        coverLargo: image().optional(),
        coverLargoEscuro: image().optional(),
        coverAlt: z.string().min(1).optional(),
        // Texto visível abaixo da capa larga, para dizer de quem é a tela e se os dados são fictícios.
        coverLegenda: z.string().min(1).optional(),
        featured: z.boolean(),
        order: z.number().int(),
        confidential: z.boolean(),
        // Aviso dos projetos confidenciais; sem ele, vale o padrão sobre dados e nomes de clientes.
        avisoConfidencial: z.string().min(1).optional(),
        draft: z.boolean(),
      })
      .refine((projeto) => !(projeto.confidential && projeto.links.repo), {
        error: 'projeto confidencial não pode ter link de código',
        path: ['links', 'repo'],
      })
      .refine((projeto) => !(projeto.cover || projeto.coverLargo) || projeto.coverAlt, {
        error: 'imagem de capa precisa de texto alternativo (coverAlt)',
        path: ['coverAlt'],
      }),
});

const experiencia = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experiencia' }),
  schema: z.object({
    cargo: z.string().min(1),
    empresa: z.string().min(1),
    contexto: z.string().optional(),
    period: z.string().min(1),
    resumo: z.string().min(1).max(260), // versão curta, usada na home
    order: z.number().int(),
    naHome: z.boolean().default(true), // false: aparece só na linha do tempo de /sobre
  }),
});

// Versões em inglês. O arquivo tem o mesmo nome do original em português e traz só o que muda com o
// idioma: textos, o slug do endereço e, se preciso, a lista de tecnologias. Imagens, tags, ordem e
// links continuam vindo do original, então não há duas fontes para o mesmo dado. O teste
// tests/traducoes.test.ts cobra que nenhum texto em português fique sem tradução.
const projetosEn = defineCollection({
  // O id é o nome do arquivo, igual ao do original. Sem isto, o glob usaria o `slug` do frontmatter,
  // que em inglês é outro, e a tradução não encontraria o projeto.
  loader: glob({ pattern: '**/*.md', base: './src/content/en/projetos', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
  schema: z.object({
    title: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'use minúsculas, números e hífens'),
    summary: z.string().min(1).max(140),
    role: z.string().min(1),
    period: z.string().min(1),
    stack: z.array(z.string().min(1)).optional(),
    metrics: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })).max(3),
    resumo: z.object({ problema: z.string().min(1), feito: z.string().min(1), resultado: z.string().min(1) }),
    coverAlt: z.string().min(1).optional(),
    coverLegenda: z.string().min(1).optional(),
    avisoConfidencial: z.string().min(1).optional(),
  }),
});

const experienciaEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/en/experiencia' }),
  schema: z.object({
    cargo: z.string().min(1),
    contexto: z.string().optional(),
    period: z.string().min(1),
    resumo: z.string().min(1).max(260),
  }),
});

export const collections = { projetos, experiencia, projetosEn, experienciaEn };
