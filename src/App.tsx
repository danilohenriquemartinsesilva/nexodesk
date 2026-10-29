import { useEffect, useState } from 'react';
import ResumoChamados from './components/ResumoChamados';
import ListaChamados from './components/ListaChamados';
import Filtros from './components/Filtros';
import { buscarChamados } from './services/chamadosService';
import { filtrarChamados } from './utils/filtrarChamados';
import type { Chamado } from './types/chamado';

function App() {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroPrioridade, setFiltroPrioridade] = useState('todos');

  useEffect(() => {
    async function carregarChamados() {
      try {
        const dados = await buscarChamados();
        setChamados(dados);
      } catch {
        setErro('Não foi possível carregar os chamados.');
      } finally {
        setCarregando(false);
      }
    }

    carregarChamados();
  }, []);

  function limparFiltros() {
    setBusca('');
    setFiltroStatus('todos');
    setFiltroPrioridade('todos');
  }

  const chamadosFiltrados = filtrarChamados(
    chamados,
    busca,
    filtroStatus,
    filtroPrioridade,
  );

  return (
    <main>
      <header>
        <h1>NexoDesk</h1>
        <p>Central de chamados internos</p>
      </header>

      {carregando && <p role="status">Carregando chamados...</p>}

      {erro && (
        <div role="alert">
          <p>{erro}</p>
          <p>Verifique se a API está rodando na porta 3001 e recarregue a página.</p>
        </div>
      )}

      {!carregando && !erro && (
        <>
          <ResumoChamados chamados={chamados} />

          <section>
            <h2>Chamados</h2>

            <Filtros
              busca={busca}
              status={filtroStatus}
              prioridade={filtroPrioridade}
              aoMudarBusca={setBusca}
              aoMudarStatus={setFiltroStatus}
              aoMudarPrioridade={setFiltroPrioridade}
              aoLimpar={limparFiltros}
            />

            <p>
              Exibindo {chamadosFiltrados.length} de {chamados.length}
            </p>

            <ListaChamados chamados={chamadosFiltrados} />
          </section>
        </>
      )}
    </main>
  );
}

export default App;