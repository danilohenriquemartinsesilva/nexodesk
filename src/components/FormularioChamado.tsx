import { useState } from 'react';
import type { FormEvent } from 'react';
import { nomesPrioridade, setores } from '../types/chamado';
import type {
  NovoChamado,
  PrioridadeChamado,
  SetorChamado,
} from '../types/chamado';
import { validarChamado } from '../utils/validarChamado';
import type { DadosFormulario, ErrosFormulario } from '../utils/validarChamado';

interface FormularioChamadoProps {
  aoSalvar: (chamado: NovoChamado) => Promise<void>;
  aoCancelar: () => void;
}

const dadosIniciais: DadosFormulario = {
  titulo: '',
  descricao: '',
  nomeSolicitante: '',
  email: '',
  setor: '',
  prioridade: '',
};

function FormularioChamado({ aoSalvar, aoCancelar }: FormularioChamadoProps) {
  const [dados, setDados] = useState<DadosFormulario>(dadosIniciais);
  const [erros, setErros] = useState<ErrosFormulario>({});
  const [salvando, setSalvando] = useState(false);

  function mudarCampo(campo: keyof DadosFormulario, valor: string) {
    setDados({ ...dados, [campo]: valor });
  }

  async function enviar(evento: FormEvent) {
    evento.preventDefault();

    const errosEncontrados = validarChamado(dados);
    setErros(errosEncontrados);

    if (Object.keys(errosEncontrados).length > 0) {
      return;
    }

    setSalvando(true);
    await aoSalvar({
      titulo: dados.titulo.trim(),
      descricao: dados.descricao.trim(),
      nomeSolicitante: dados.nomeSolicitante.trim(),
      email: dados.email.trim(),
      setor: dados.setor as SetorChamado,
      prioridade: dados.prioridade as PrioridadeChamado,
      status: 'aberto',
      dataCriacao: new Date().toISOString(),
    });
    setSalvando(false);
  }

  return (
    <form onSubmit={enviar} noValidate>
      <h2>Novo chamado</h2>

      <div>
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          type="text"
          value={dados.titulo}
          onChange={(e) => mudarCampo('titulo', e.target.value)}
        />
        {erros.titulo && <p role="alert">{erros.titulo}</p>}
      </div>

      <div>
        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          rows={4}
          value={dados.descricao}
          onChange={(e) => mudarCampo('descricao', e.target.value)}
        />
        {erros.descricao && <p role="alert">{erros.descricao}</p>}
      </div>

      <div>
        <label htmlFor="nome">Nome do solicitante</label>
        <input
          id="nome"
          type="text"
          value={dados.nomeSolicitante}
          onChange={(e) => mudarCampo('nomeSolicitante', e.target.value)}
        />
        {erros.nomeSolicitante && <p role="alert">{erros.nomeSolicitante}</p>}
      </div>

      <div>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={dados.email}
          onChange={(e) => mudarCampo('email', e.target.value)}
        />
        {erros.email && <p role="alert">{erros.email}</p>}
      </div>

      <div>
        <label htmlFor="setor">Setor</label>
        <select
          id="setor"
          value={dados.setor}
          onChange={(e) => mudarCampo('setor', e.target.value)}
        >
          <option value="">Selecione</option>
          {setores.map((setor) => (
            <option key={setor} value={setor}>
              {setor}
            </option>
          ))}
        </select>
        {erros.setor && <p role="alert">{erros.setor}</p>}
      </div>

      <div>
        <label htmlFor="prioridade">Prioridade</label>
        <select
          id="prioridade"
          value={dados.prioridade}
          onChange={(e) => mudarCampo('prioridade', e.target.value)}
        >
          <option value="">Selecione</option>
          {Object.entries(nomesPrioridade).map(([valor, nome]) => (
            <option key={valor} value={valor}>
              {nome}
            </option>
          ))}
        </select>
        {erros.prioridade && <p role="alert">{erros.prioridade}</p>}
      </div>

      <button type="submit" disabled={salvando}>
        {salvando ? 'Salvando...' : 'Salvar chamado'}
      </button>
      <button type="button" className="botao-claro" onClick={aoCancelar}>
        Cancelar
      </button>
    </form>
  );
}

export default FormularioChamado;