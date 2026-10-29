import type { Chamado } from '../types/chamado';
import { nomesPrioridade, nomesStatus } from '../types/chamado';
import { formatarData } from '../utils/formatarData';

interface ListaChamadosProps {
  chamados: Chamado[];
}

function ListaChamados({ chamados }: ListaChamadosProps) {
  if (chamados.length === 0) {
    return (
      <div>
        <h3>Nenhum chamado encontrado</h3>
        <p>Os chamados cadastrados aparecerão aqui.</p>
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
        </li>
      ))}
    </ul>
  );
}

export default ListaChamados;