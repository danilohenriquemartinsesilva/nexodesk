import type { Chamado, StatusChamado } from '../types/chamado';
import { nomesPrioridade, nomesStatus } from '../types/chamado';
import { formatarData } from '../utils/formatarData';

interface DetalhesChamadoProps {
  chamado: Chamado;
  aoFechar: () => void;
  aoMudarStatus: (id: string, status: StatusChamado) => void;
  aoExcluir: (id: string) => void;
}

function DetalhesChamado({
  chamado,
  aoFechar,
  aoMudarStatus,
  aoExcluir,
}: DetalhesChamadoProps) {
  function confirmarExclusao() {
    if (window.confirm('Tem certeza que deseja excluir este chamado?')) {
      aoExcluir(chamado.id);
    }
  }

  return (
    <section className="detalhes" aria-labelledby="titulo-detalhes">
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

      <div>
        <label htmlFor="alterar-status">Alterar status</label>
        <select
          id="alterar-status"
          value={chamado.status}
          onChange={(e) =>
            aoMudarStatus(chamado.id, e.target.value as StatusChamado)
          }
        >
          {Object.entries(nomesStatus).map(([valor, nome]) => (
            <option key={valor} value={valor}>
              {nome}
            </option>
          ))}
        </select>
      </div>

      <button type="button" className="botao-excluir" onClick={confirmarExclusao}>
        Excluir chamado
      </button>
      <button type="button" className="botao-claro" onClick={aoFechar}>
        Fechar
      </button>
    </section>
  );
}

export default DetalhesChamado;