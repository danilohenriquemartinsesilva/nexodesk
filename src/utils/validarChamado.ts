export interface DadosFormulario {
  titulo: string;
  descricao: string;
  nomeSolicitante: string;
  email: string;
  setor: string;
  prioridade: string;
}

export type ErrosFormulario = Partial<Record<keyof DadosFormulario, string>>;

export function validarChamado(dados: DadosFormulario): ErrosFormulario {
  const erros: ErrosFormulario = {};

  if (dados.titulo.trim().length < 5) {
    erros.titulo = 'O título deve ter no mínimo 5 caracteres.';
  }

  if (dados.descricao.trim().length < 10) {
    erros.descricao = 'A descrição deve ter no mínimo 10 caracteres.';
  }

  if (dados.nomeSolicitante.trim().length < 3) {
    erros.nomeSolicitante = 'O nome deve ter no mínimo 3 caracteres.';
  }

  if (!/^\S+@\S+\.\S+$/.test(dados.email.trim())) {
    erros.email = 'Digite um e-mail válido.';
  }

  if (!dados.setor) {
    erros.setor = 'Selecione um setor.';
  }

  if (!dados.prioridade) {
    erros.prioridade = 'Selecione uma prioridade.';
  }

  return erros;
}