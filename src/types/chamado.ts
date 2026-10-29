export type StatusChamado = 'aberto' | 'em_andamento' | 'concluido';

export type PrioridadeChamado = 'baixa' | 'media' | 'alta';

export type SetorChamado = 'TI' | 'Financeiro' | 'RH' | 'Vendas' | 'Operações';

export interface Chamado {
  id: string;
  titulo: string;
  descricao: string;
  nomeSolicitante: string;
  email: string;
  setor: SetorChamado;
  prioridade: PrioridadeChamado;
  status: StatusChamado;
  dataCriacao: string;
}

export type NovoChamado = Omit<Chamado, 'id'>;

export type AtualizacaoChamado = Partial<Pick<Chamado, 'status'>>;

export const nomesStatus: Record<StatusChamado, string> = {
  aberto: 'Aberto',
  em_andamento: 'Em andamento',
  concluido: 'Concluído',
};

export const nomesPrioridade: Record<PrioridadeChamado, string> = {
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta',
};