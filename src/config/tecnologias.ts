// Só o que o Gabriel defende em entrevista, no máximo 6 por área: é o que cabe em uma passagem da
// vitrine. Bibliotecas pequenas ficam nos projetos. O teste em tests/tecnologias.test.ts cobra o limite.
export interface AreaTecnologia {
  area: string;
  itens: readonly string[];
}

export const TECNOLOGIAS: readonly AreaTecnologia[] = [
  { area: 'Linguagens', itens: ['Python', 'SQL', 'JavaScript', 'C#', 'C', 'C++'] },
  { area: 'Backend', itens: ['FastAPI', 'Pydantic', 'PostgreSQL', 'SQLAlchemy', 'Alembic'] },
  { area: 'Dados e BI', itens: ['pandas', 'SAP BW', 'Power Query', 'Power BI', 'Looker Studio', 'Excel'] },
  { area: 'Automação', itens: ['Selenium', 'SAP GUI Scripting', 'Excel VBA', 'PyAutoGUI', 'pdfplumber'] },
  { area: 'Testes e entrega', itens: ['pytest', 'Playwright', 'Docker', 'Git', 'GitHub Actions', 'Render'] },
];
