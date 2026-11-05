import { describe, expect, it } from 'vitest';
import { TECNOLOGIAS } from '../src/config/tecnologias';

describe('TECNOLOGIAS', () => {
  const nomes = TECNOLOGIAS.flatMap(({ itens }) => itens);

  it('mostra no máximo 6 tecnologias por área', () => {
    for (const { area, itens } of TECNOLOGIAS) {
      expect(itens.length, area).toBeGreaterThan(0);
      expect(itens.length, area).toBeLessThanOrEqual(6);
    }
  });

  it('não repete tecnologia nem área', () => {
    expect(new Set(nomes).size).toBe(nomes.length);
    expect(new Set(TECNOLOGIAS.map(({ area }) => area)).size).toBe(TECNOLOGIAS.length);
  });
});
