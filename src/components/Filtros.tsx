interface FiltrosProps {
  busca: string;
  status: string;
  prioridade: string;
  aoMudarBusca: (valor: string) => void;
  aoMudarStatus: (valor: string) => void;
  aoMudarPrioridade: (valor: string) => void;
  aoLimpar: () => void;
}

function Filtros({
  busca,
  status,
  prioridade,
  aoMudarBusca,
  aoMudarStatus,
  aoMudarPrioridade,
  aoLimpar,
}: FiltrosProps) {
  return (
    <div>
      <div>
        <label htmlFor="busca">Buscar por título</label>
        <input
          id="busca"
          type="text"
          value={busca}
          onChange={(e) => aoMudarBusca(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="filtro-status">Status</label>
        <select
          id="filtro-status"
          value={status}
          onChange={(e) => aoMudarStatus(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="aberto">Aberto</option>
          <option value="em_andamento">Em andamento</option>
          <option value="concluido">Concluído</option>
        </select>
      </div>

      <div>
        <label htmlFor="filtro-prioridade">Prioridade</label>
        <select
          id="filtro-prioridade"
          value={prioridade}
          onChange={(e) => aoMudarPrioridade(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>
      </div>

      <button type="button" onClick={aoLimpar}>
        Limpar filtros
      </button>
    </div>
  );
}

export default Filtros;