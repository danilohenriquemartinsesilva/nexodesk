import { useEffect, useState } from 'react';
import ResumoChamados from './components/ResumoChamados';
import ListaChamados from './components/ListaChamados';
import { buscarChamados } from './services/chamadosService';
import type { Chamado } from './types/chamado';

function App() {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

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
            <ListaChamados chamados={chamados} />
          </section>
        </>
      )}
    </main>
  );
}

export default App;