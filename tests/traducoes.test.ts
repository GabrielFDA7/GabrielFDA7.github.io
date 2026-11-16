// A versão em inglês não pode ficar para trás. Projeto ou experiência sem tradução sumiria de /en/, e um
// campo de texto esquecido apareceria em português no meio da página em inglês.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { idiomaDe, rotaFoco, rotaProjeto } from '../src/i18n/rotas';

interface Arquivo {
  dados: Record<string, unknown>;
  corpo: string;
}

function ler(caminho: string): Arquivo {
  const texto = readFileSync(caminho, 'utf8').replace(/\r\n/g, '\n');
  const [, frontmatter = '', corpo = ''] = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(texto) ?? [];
  return { dados: parse(frontmatter) as Record<string, unknown>, corpo };
}

const contar = (texto: string, padrao: RegExp) => (texto.match(padrao) ?? []).length;
const ESTRUTURA = {
  'seções (##)': /^## /gm,
  imagens: /!\[/g,
  diagramas: /```mermaid/g,
  links: /\]\(http/g,
};

function pares(colecao: string) {
  const base = `src/content/${colecao}`;
  return readdirSync(base)
    .filter((nome) => nome.endsWith('.md'))
    .map((nome) => ({ nome, original: ler(`${base}/${nome}`), caminhoEn: `src/content/en/${colecao}/${nome}` }));
}

describe('tradução dos projetos', () => {
  const projetos = pares('projetos').filter(({ original }) => !original.dados.draft);

  it.each(projetos.map((p) => [p.nome, p] as const))('%s tem versão em inglês completa', (_nome, { original, caminhoEn }) => {
    expect(existsSync(caminhoEn)).toBe(true);
    const traducao = ler(caminhoEn);
    const o = original.dados;
    const t = traducao.dados;
    expect((t.metrics as unknown[]).length).toBe((o.metrics as unknown[]).length);
    for (const campo of ['coverAlt', 'coverLegenda', 'avisoConfidencial']) {
      expect(campo in t, `${campo} precisa existir nos dois idiomas, ou em nenhum`).toBe(campo in o);
    }
    for (const [nome, padrao] of Object.entries(ESTRUTURA)) {
      expect(contar(traducao.corpo, padrao), nome).toBe(contar(original.corpo, padrao));
    }
  });

  it('não repete slug em inglês', () => {
    const slugs = projetos.map(({ caminhoEn }) => ler(caminhoEn).dados.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe('tradução da experiência', () => {
  it.each(pares('experiencia').map((p) => [p.nome, p] as const))('%s tem versão em inglês', (_nome, { original, caminhoEn }) => {
    expect(existsSync(caminhoEn)).toBe(true);
    const traducao = ler(caminhoEn);
    expect(contar(traducao.corpo, /^- /gm)).toBe(contar(original.corpo, /^- /gm));
    expect('contexto' in traducao.dados).toBe('contexto' in original.dados);
  });
});

describe('rotas dos idiomas', () => {
  it('reconhece o inglês só em /en/', () => {
    expect(idiomaDe('/en/')).toBe('en');
    expect(idiomaDe('/en/projects/nextup/')).toBe('en');
    expect(idiomaDe('/')).toBe('pt');
    expect(idiomaDe('/projetos/energia/')).toBe('pt');
    expect(idiomaDe('/entrada/')).toBe('pt');
  });

  it('monta os endereços de cada idioma terminando em /', () => {
    expect(rotaProjeto('pt', 'nextup')).toBe('/projetos/nextup/');
    expect(rotaProjeto('en', 'fleet-telemetry')).toBe('/en/projects/fleet-telemetry/');
    expect(rotaFoco('pt', 'dados')).toBe('/foco/dados/');
    expect(rotaFoco('en', 'data')).toBe('/en/focus/data/');
  });
});
