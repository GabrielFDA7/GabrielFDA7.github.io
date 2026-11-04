import { useEffect, useMemo, useState } from 'react';
import { FILTROS } from '../config/tags';

const PARAMETRO = 'tag';

interface Props {
  /** Tags de cada projeto publicado, para contar os resultados sem ler o DOM. */
  projetos: readonly (readonly string[])[];
}

/**
 * Os cartões são HTML gerado pelo Astro, fora desta ilha, e cada um traz `data-projeto`
 * e `data-tags`. O filtro só decide quais ficam escondidos. Assim, sem JavaScript, a
 * lista completa continua visível, e existe uma única versão do cartão no site.
 */
export default function ProjectFilter({ projetos }: Props) {
  const [ativo, setAtivo] = useState<string | null>(null);
  const [pronto, setPronto] = useState(false);

  const disponiveis = useMemo(
    () => FILTROS.filter(({ tag }) => projetos.some((tags) => tags.includes(tag))),
    [projetos],
  );

  const quantidade = useMemo(
    () => (ativo ? projetos.filter((tags) => tags.includes(ativo)).length : projetos.length),
    [projetos, ativo],
  );

  // Lê a URL só depois de montar: o HTML do build sempre nasce com a lista completa.
  useEffect(() => {
    const daUrl = new URLSearchParams(window.location.search).get(PARAMETRO);
    if (disponiveis.some(({ tag }) => tag === daUrl)) setAtivo(daUrl);
    setPronto(true);
  }, [disponiveis]);

  useEffect(() => {
    document.querySelectorAll<HTMLElement>('[data-projeto]').forEach((cartao) => {
      cartao.hidden = ativo !== null && !(cartao.dataset.tags ?? '').split(' ').includes(ativo);
    });
  }, [ativo]);

  const escolher = (tag: string | null) => {
    setAtivo(tag);
    const url = new URL(window.location.href);
    if (tag) url.searchParams.set(PARAMETRO, tag);
    else url.searchParams.delete(PARAMETRO);
    window.history.replaceState(null, '', url);
  };

  const opcoes = [{ tag: null, rotulo: 'Todos' }, ...disponiveis];
  const rotuloAtivo = disponiveis.find(({ tag }) => tag === ativo)?.rotulo;

  return (
    // Sem JavaScript os botões não fariam nada: ficam invisíveis, mas guardam o espaço.
    <div className={pronto ? '' : 'invisible'}>
      <div role="group" aria-label="Filtrar projetos por foco" className="flex flex-wrap gap-2">
        {opcoes.map(({ tag, rotulo }) => (
          <button
            key={rotulo}
            type="button"
            aria-pressed={ativo === tag}
            onClick={() => escolher(tag)}
            className={`btn ${ativo === tag ? 'btn-cromo' : 'btn-contorno'}`}
          >
            {rotulo}
          </button>
        ))}
      </div>
      <p role="status" className="mt-4 text-sm text-texto-suave">
        {quantidade} {quantidade === 1 ? 'projeto' : 'projetos'}
        {rotuloAtivo ? ` em ${rotuloAtivo}` : ''}
      </p>
    </div>
  );
}
