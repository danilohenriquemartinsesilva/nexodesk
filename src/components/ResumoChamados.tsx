import type { Chamado } from '../types/chamado';

interface ResumoChamadosProps {
  chamados: Chamado[];
}

function ResumoChamados({ chamados }: ResumoChamadosProps) {
  const total = chamados.length;
  const abertos = chamados.filter((c) => c.status === 'aberto').length;
  const emAndamento = chamados.filter((c) => c.status === 'em_andamento').length;
  const concluidos = chamados.filter((c) => c.status === 'concluido').length;

  return (
    <section className="resumo" aria-label="Resumo dos chamados">
      <article>
        <p>Total</p>
        <strong>{total}</strong>
      </article>
      <article>
        <p>Abertos</p>
        <strong>{abertos}</strong>
      </article>
      <article>
        <p>Em andamento</p>
        <strong>{emAndamento}</strong>
      </article>
      <article>
        <p>Concluídos</p>
        <strong>{concluidos}</strong>
      </article>
    </section>
  );
}

export default ResumoChamados;