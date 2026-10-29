import { describe, expect, it } from 'vitest';
import { validarChamado } from './validarChamado';

const dadosValidos = {
  titulo: 'Troca de mouse',
  descricao: 'O mouse parou de funcionar',
  nomeSolicitante: 'Ana',
  email: 'ana@nexotech.com',
  setor: 'TI',
  prioridade: 'media',
};

describe('validarChamado', () => {
  it('aceita dados válidos', () => {
    expect(validarChamado(dadosValidos)).toEqual({});
  });

  it('retorna erro para campos inválidos', () => {
    const erros = validarChamado({
      titulo: 'abc',
      descricao: 'curta',
      nomeSolicitante: 'Jo',
      email: 'email-invalido',
      setor: '',
      prioridade: '',
    });

    expect(Object.keys(erros)).toHaveLength(6);
  });
});