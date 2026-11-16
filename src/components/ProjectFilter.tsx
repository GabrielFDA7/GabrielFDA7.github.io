import { useEffect, useMemo, useState } from 'react';
import { FILTROS } from '../config/tags';
import type { Idioma } from '../i18n/rotas';

// Os poucos textos da ilha ficam aqui, e não em src/i18n/textos.ts, para o navegador não baixar os
// textos do site inteiro junto com o filtro.
const TEXTOS = {
  pt: {
    todos: 'Todos',
    grupo: 'Filtrar projetos por foco',
    quantidade: (n: number) => `${n} ${n === 1 ? 'projeto' : 'projetos'}`,
    em: (area: string) => ` em ${area}`,
  },
  en: {
    todos: 'All',
    grupo: 'Filter projects by focus',
    quantidade: (n: number) => `${n} ${n === 1 ? 'project' : 'projects'}`,
    em: (area: string) => ` in ${area}`,
  },
} satisfies Record<Idioma, unknown>;

const PARAMETRO = 'tag';

interface Props {
  /** Tags de cada projeto publicado, para contar os resultados sem ler o DOM. */
  projetos: readonly (readonly string[])[];
  idioma?: Idioma;
}

/**
 * Os cartões são HTML gerado pelo Astro, fora desta ilha, e cada um traz `data-projeto`
 * e `data-tags`. O filtro só decide quais ficam escondidos. Assim, sem JavaScript, a
 * lista completa continua visível, e existe uma única versão do cartão no site.
 */
export default function ProjectFilter({ projetos, idioma = 'pt' }: Props) {
  const t = TEXTOS[idioma];
  const [ativo, setAtivo] = useState<string | null>(null);
  const [pronto, setPronto] = useState(false);

  const disponiveis = useMemo(
    () =>
      FILTROS.filter(({ tag }) => projetos.some((tags) => tags.includes(tag))).map((filtro) => ({
        tag: filtro.tag,
        rotulo: idioma === 'en' ? filtro.rotuloEn : filtro.rotulo,
      })),
    [projetos, idioma],
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

  const opcoes = [{ tag: null, rotulo: t.todos }, ...disponiveis];
  const rotuloAtivo = disponiveis.find(({ tag }) => tag === ativo)?.rotulo;

  return (
    // Sem JavaScript os botões não fariam nada: ficam invisíveis, mas guardam o espaço.
    <div className={pronto ? '' : 'invisible'}>
      <div role="group" aria-label={t.grupo} className="flex flex-wrap gap-2">
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
        {t.quantidade(quantidade)}
        {rotuloAtivo ? t.em(rotuloAtivo) : ''}
      </p>
    </div>
  );
}
