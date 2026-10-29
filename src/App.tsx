import { useEffect, useState } from 'react';
import ResumoChamados from './components/ResumoChamados';
import ListaChamados from './components/ListaChamados';
import Filtros from './components/Filtros';
import FormularioChamado from './components/FormularioChamado';
import DetalhesChamado from './components/DetalhesChamado';
import {
  atualizarChamado,
  buscarChamados,
  criarChamado,
  excluirChamado,
} from './services/chamadosService';
import { filtrarChamados } from './utils/filtrarChamados';
import type { Chamado, NovoChamado, StatusChamado } from './types/chamado';

function App() {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroPrioridade, setFiltroPrioridade] = useState('todos');

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [idSelecionado, setIdSelecionado] = useState<string | null>(null);
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

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

  function mostrarSucesso(texto: string) {
    setMensagemSucesso(texto);
    setTimeout(() => setMensagemSucesso(''), 3000);
  }

  async function criar(novoChamado: NovoChamado) {
    setMensagemErro('');

    try {
      const chamadoCriado = await criarChamado(novoChamado);
      setChamados([...chamados, chamadoCriado]);
      setMostrarFormulario(false);
      mostrarSucesso('Chamado criado com sucesso!');
    } catch {
      setMensagemErro('Não foi possível criar o chamado. Tente novamente.');
    }
  }

  async function mudarStatus(id: string, status: StatusChamado) {
    setMensagemErro('');

    try {
      const chamadoAtualizado = await atualizarChamado(id, { status });
      setChamados(chamados.map((c) => (c.id === id ? chamadoAtualizado : c)));
      mostrarSucesso('Status atualizado com sucesso!');
    } catch {
      setMensagemErro('Não foi possível atualizar o status. Tente novamente.');
    }
  }

  async function excluir(id: string) {
    setMensagemErro('');

    try {
      await excluirChamado(id);
      setChamados(chamados.filter((c) => c.id !== id));
      setIdSelecionado(null);
      mostrarSucesso('Chamado excluído com sucesso!');
    } catch {
      setMensagemErro('Não foi possível excluir o chamado. Tente novamente.');
    }
  }

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

  const chamadoSelecionado = chamados.find((c) => c.id === idSelecionado);

  return (
    <main>
      <header>
        <h1>NexoDesk</h1>
        <p>Central de chamados internos</p>
      </header>

      {mensagemSucesso && <p role="status">{mensagemSucesso}</p>}
      {mensagemErro && <p role="alert">{mensagemErro}</p>}

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

          {mostrarFormulario ? (
            <FormularioChamado
              aoSalvar={criar}
              aoCancelar={() => setMostrarFormulario(false)}
            />
          ) : (
            <button type="button" onClick={() => setMostrarFormulario(true)}>
              Novo chamado
            </button>
          )}

          {chamadoSelecionado && (
            <DetalhesChamado
              chamado={chamadoSelecionado}
              aoFechar={() => setIdSelecionado(null)}
              aoMudarStatus={mudarStatus}
              aoExcluir={excluir}
            />
          )}

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

            <ListaChamados
              chamados={chamadosFiltrados}
              aoSelecionar={setIdSelecionado}
            />
          </section>
        </>
      )}
    </main>
  );
}

export default App;