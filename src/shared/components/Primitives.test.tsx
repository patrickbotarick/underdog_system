import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { UnavailableState } from './Primitives';

it('apresenta dependência indisponível com ação desabilitada e explicação', () => {
  render(
    <UnavailableState
      title="Servidor pendente"
      description="Nenhuma reserva será confirmada."
      action="Reservar"
    />,
  );
  expect(screen.getByRole('heading', { name: 'Servidor pendente' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'Reservar' })).toBeDisabled();
  expect(screen.getByText('Nenhuma reserva será confirmada.')).toBeVisible();
});
