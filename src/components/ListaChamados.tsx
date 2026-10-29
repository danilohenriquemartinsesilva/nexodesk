import type { Chamado } from '../types/chamado';
import { nomesPrioridade, nomesStatus } from '../types/chamado';
import { formatarData } from '../utils/formatarData';

interface ListaChamadosProps {
  chamados: Chamado[];
  aoSelecionar: (id: string) => void;
}

function ListaChamados({ chamados, aoSelecionar }: ListaChamadosProps) {
  if (chamados.length === 0) {
    return (
      <div>
        <h3>Nenhum chamado encontrado</h3>
        <p>Tente mudar os filtros ou cadastre um novo chamado.</p>
      </div>
    );
  }

  return (
    <ul>
      {chamados.map((chamado) => (
        <li key={chamado.id}>
          <h3>{chamado.titulo}</h3>
          <p>Setor: {chamado.setor}</p>
          <p>Prioridade: {nomesPrioridade[chamado.prioridade]}</p>
          <p>Status: {nomesStatus[chamado.status]}</p>
          <p>Criado em: {formatarData(chamado.dataCriacao)}</p>
          <button type="button" onClick={() => aoSelecionar(chamado.id)}>
            Ver detalhes
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ListaChamados;