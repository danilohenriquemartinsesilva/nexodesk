import { describe, expect, it } from 'vitest';
import { filtrarChamados } from './filtrarChamados';
import type { Chamado } from '../types/chamado';

const chamados: Chamado[] = [
  {
    id: '1',
    titulo: 'Instalar VS Code',
    descricao: 'Instalar o VS Code no notebook',
    nomeSolicitante: 'Carlos Silva',
    email: 'carlos@nexotech.com',
    setor: 'TI',
    prioridade: 'alta',
    status: 'aberto',
    dataCriacao: '2026-10-20T10:00:00.000Z',
  },
  {
    id: '2',
    titulo: 'Trocar teclado',
    descricao: 'Teclado com defeito na tecla Enter',
    nomeSolicitante: 'Marcos Lima',
    email: 'marcos@nexotech.com',
    setor: 'Vendas',
    prioridade: 'baixa',
    status: 'concluido',
    dataCriacao: '2026-10-21T10:00:00.000Z',
  },
];

describe('filtrarChamados', () => {
  it('retorna todos quando não há filtro', () => {
    expect(filtrarChamados(chamados, '', 'todos', 'todos')).toHaveLength(2);
  });

  it('filtra pelo texto do título', () => {
    const resultado = filtrarChamados(chamados, 'teclado', 'todos', 'todos');
    expect(resultado).toHaveLength(1);
    expect(resultado[0].id).toBe('2');
  });

  it('combina busca, status e prioridade', () => {
    expect(filtrarChamados(chamados, 'vs', 'aberto', 'alta')).toHaveLength(1);
    expect(filtrarChamados(chamados, 'vs', 'concluido', 'alta')).toHaveLength(0);
  });
});