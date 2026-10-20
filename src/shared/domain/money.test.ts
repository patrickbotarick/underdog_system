import { describe, expect, it } from 'vitest';
import { formatMoney, isPositiveInteger } from './money';

describe('apresentação de valores monetários', () => {
  it('preserva centavos no limite seguro sem divisão em ponto flutuante', () => {
    expect(formatMoney({ currency: 'BRL', cents: Number.MAX_SAFE_INTEGER })).toMatch(
      /90\.071\.992\.547\.409,91/,
    );
  });
  it('formata centavos em BRL sem inventar cálculos comerciais', () => {
    expect(formatMoney({ currency: 'BRL', cents: 123456 })).toMatch(/1\.234,56/);
    expect(formatMoney({ currency: 'BRL', cents: -125 })).toMatch(/-.*1,25/);
  });
  it.each([NaN, Infinity, 1.25, Number.MAX_SAFE_INTEGER + 1])(
    'rejeita centavos inválidos: %s',
    (cents) => {
      expect(() => formatMoney({ currency: 'BRL', cents })).toThrow(RangeError);
    },
  );
});
describe('inteiros positivos de configuração', () => {
  it.each([1, 2, 3, 20])('aceita %s', (value) => expect(isPositiveInteger(value)).toBe(true));
  it.each([0, -1, 1.5, '2', null, undefined, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1])(
    'rejeita %s',
    (value) => expect(isPositiveInteger(value)).toBe(false),
  );
});
