import type { Chamado } from '../types/chamado';

export function filtrarChamados(
  chamados: Chamado[],
  busca: string,
  status: string,
  prioridade: string,
): Chamado[] {
  const texto = busca.trim().toLowerCase();

  return chamados.filter((chamado) => {
    const bateTitulo = chamado.titulo.toLowerCase().includes(texto);
    const bateStatus = status === 'todos' || chamado.status === status;
    const batePrioridade =
      prioridade === 'todos' || chamado.prioridade === prioridade;

    return bateTitulo && bateStatus && batePrioridade;
  });
}