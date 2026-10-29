
import type {
  Chamado,
  NovoChamado,
  AtualizacaoChamado,
} from '../types/chamado';

const URL_API = 'http://localhost:3001/tickets';

async function requisicao<T>(
  url: string,
  opcoes?: RequestInit,
): Promise<T> {
  const resposta = await fetch(url, {
    ...opcoes,
    headers: {
      'Content-Type': 'application/json',
      ...opcoes?.headers,
    },
  });

  if (!resposta.ok) {
    throw new Error(
      `Erro na requisição: ${resposta.status} ${resposta.statusText}`,
    );
  }

  if (resposta.status === 204) {
    return undefined as T;
  }

  return resposta.json() as Promise<T>;
}

export function buscarChamados(): Promise<Chamado[]> {
  return requisicao<Chamado[]>(URL_API);
}

export function buscarChamadoPorId(
  id: string,
): Promise<Chamado> {
  return requisicao<Chamado>(
    `${URL_API}/${encodeURIComponent(id)}`,
  );
}

export function criarChamado(
  dados: NovoChamado,
): Promise<Chamado> {
  return requisicao<Chamado>(URL_API, {
    method: 'POST',
    body: JSON.stringify(dados),
  });
}

export function atualizarChamado(
  id: string,
  dados: AtualizacaoChamado,
): Promise<Chamado> {
  return requisicao<Chamado>(
    `${URL_API}/${encodeURIComponent(id)}`,
    {
      method: 'PATCH',
      body: JSON.stringify(dados),
    },
  );
}

export function excluirChamado(id: string): Promise<void> {
  return requisicao<void>(
    `${URL_API}/${encodeURIComponent(id)}`,
    {
      method: 'DELETE',
    },
  );
}
