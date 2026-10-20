import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { PwaStatus } from './PwaStatus';

it('explica limites offline e acompanha a reconexão', () => {
  render(<PwaStatus />);
  fireEvent(window, new Event('offline'));
  expect(screen.getByRole('status')).toHaveTextContent(
    'nenhuma reserva, pagamento ou movimentação pode ser confirmada',
  );
  fireEvent(window, new Event('online'));
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
});
