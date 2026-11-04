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
        links: z.object({ repo: z.url().optional(), demo: z.url().optional() }),
        cover: image().optional(),
        coverAlt: z.string().min(1).optional(),
        featured: z.boolean(),
        order: z.number().int(),
        confidential: z.boolean(),
        draft: z.boolean(),
      })
      .refine((projeto) => !(projeto.confidential && projeto.links.repo), {
        error: 'projeto confidencial não pode ter link de código',
        path: ['links', 'repo'],
      })
      .refine((projeto) => !projeto.cover || projeto.coverAlt, {
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
  }),
});

export const collections = { projetos, experiencia };
