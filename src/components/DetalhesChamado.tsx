import type { Chamado } from '../types/chamado';
import { nomesPrioridade, nomesStatus } from '../types/chamado';
import { formatarData } from '../utils/formatarData';

interface DetalhesChamadoProps {
  chamado: Chamado;
  aoFechar: () => void;
}

function DetalhesChamado({ chamado, aoFechar }: DetalhesChamadoProps) {
  return (
    <section aria-labelledby="titulo-detalhes">
      <h2 id="titulo-detalhes">Detalhes do chamado</h2>

      <h3>{chamado.titulo}</h3>
      <p>{chamado.descricao}</p>

      <dl>
        <dt>Solicitante</dt>
        <dd>{chamado.nomeSolicitante}</dd>

        <dt>E-mail</dt>
        <dd>{chamado.email}</dd>

        <dt>Setor</dt>
        <dd>{chamado.setor}</dd>

        <dt>Prioridade</dt>
        <dd>{nomesPrioridade[chamado.prioridade]}</dd>

        <dt>Status</dt>
        <dd>{nomesStatus[chamado.status]}</dd>

        <dt>Data de criação</dt>
        <dd>{formatarData(chamado.dataCriacao)}</dd>
      </dl>

      <button type="button" onClick={aoFechar}>
        Fechar
      </button>
    </section>
  );
}

export default DetalhesChamado;