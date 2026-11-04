import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import ProjectFilter from '../src/components/ProjectFilter';

const PROJETOS = [
  ['dados', 'ia'],
  ['backend', 'web'],
  ['dados', 'bi'],
  ['jogos'],
];

function criarCartoes() {
  const lista = document.createElement('ul');
  lista.id = 'cartoes';
  PROJETOS.forEach((tags, i) => {
    const item = document.createElement('li');
    item.dataset.projeto = String(i);
    item.dataset.tags = tags.join(' ');
    lista.append(item);
  });
  document.body.append(lista);
}

const visiveis = () =>
  [...document.querySelectorAll<HTMLElement>('[data-projeto]')].filter((c) => !c.hidden).map((c) => c.dataset.projeto);

const irPara = (busca: string) => window.history.replaceState(null, '', `/projetos${busca}`);

describe('ProjectFilter', () => {
  beforeEach(() => {
    irPara('');
    criarCartoes();
  });

  afterEach(() => {
    cleanup();
    document.querySelector('#cartoes')?.remove();
  });

  it('começa com todos os projetos visíveis', () => {
    render(<ProjectFilter projetos={PROJETOS} />);
    expect(visiveis()).toEqual(['0', '1', '2', '3']);
    expect(screen.getByRole('button', { name: 'Todos' }).getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByRole('status').textContent).toBe('4 projetos');
  });

  it('esconde quem não tem a tag e grava a escolha na URL', async () => {
    render(<ProjectFilter projetos={PROJETOS} />);
    await userEvent.click(screen.getByRole('button', { name: 'Dados' }));
    expect(visiveis()).toEqual(['0', '2']);
    expect(window.location.search).toBe('?tag=dados');
    expect(screen.getByRole('button', { name: 'Dados' }).getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByRole('button', { name: 'Todos' }).getAttribute('aria-pressed')).toBe('false');
    expect(screen.getByRole('status').textContent).toBe('2 projetos em Dados');
  });

  it('usa o singular quando sobra um projeto', async () => {
    render(<ProjectFilter projetos={PROJETOS} />);
    await userEvent.click(screen.getByRole('button', { name: 'IA' }));
    expect(screen.getByRole('status').textContent).toBe('1 projeto em IA');
  });

  it('"Todos" mostra a lista inteira e limpa a URL', async () => {
    render(<ProjectFilter projetos={PROJETOS} />);
    await userEvent.click(screen.getByRole('button', { name: 'Web' }));
    await userEvent.click(screen.getByRole('button', { name: 'Todos' }));
    expect(visiveis()).toEqual(['0', '1', '2', '3']);
    expect(window.location.search).toBe('');
  });

  it('abre já filtrado por um link com ?tag=', () => {
    irPara('?tag=backend');
    render(<ProjectFilter projetos={PROJETOS} />);
    expect(visiveis()).toEqual(['1']);
    expect(screen.getByRole('button', { name: 'Backend' }).getAttribute('aria-pressed')).toBe('true');
  });

  it('ignora uma tag desconhecida na URL', () => {
    irPara('?tag=inexistente');
    render(<ProjectFilter projetos={PROJETOS} />);
    expect(visiveis()).toEqual(['0', '1', '2', '3']);
  });

  it('ignora um filtro que não tem nenhum projeto', () => {
    irPara('?tag=automacao');
    render(<ProjectFilter projetos={PROJETOS} />);
    expect(visiveis()).toEqual(['0', '1', '2', '3']);
    expect(screen.queryByRole('button', { name: 'Automação' })).toBeNull();
  });

  it('não vira botão a tag que não está na lista de filtros', () => {
    render(<ProjectFilter projetos={PROJETOS} />);
    expect(screen.queryByRole('button', { name: /jogos/i })).toBeNull();
    expect(visiveis()).toContain('3');
  });

  it('preserva outros parâmetros da URL', async () => {
    irPara('?origem=vaga');
    render(<ProjectFilter projetos={PROJETOS} />);
    await userEvent.click(screen.getByRole('button', { name: 'BI' }));
    expect(new URLSearchParams(window.location.search).get('origem')).toBe('vaga');
    expect(new URLSearchParams(window.location.search).get('tag')).toBe('bi');
  });
});
