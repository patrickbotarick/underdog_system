import type { Money } from './types';

/** Apenas apresentação; cálculo comercial, descontos e arredondamento ficam no servidor. */
export function formatMoney(value: Money): string {
  if (!Number.isSafeInteger(value.cents))
    throw new RangeError('Valor deve usar centavos inteiros seguros.');
  const cents = BigInt(value.cents);
  const absolute = cents < 0n ? -cents : cents;
  const fraction = String(absolute % 100n).padStart(2, '0');
  const parts = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: value.currency,
  }).formatToParts(absolute / 100n);
  return `${cents < 0n ? '-' : ''}${parts.map((part) => (part.type === 'fraction' ? fraction : part.value)).join('')}`;
}

export function isPositiveInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value > 0;
}
