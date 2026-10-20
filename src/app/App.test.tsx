import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { App } from './App';
import { adminNavigation, barberNavigation } from './navigation';

function open(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('navegação e limites da fundação', () => {
  it('navega da home para agendamento sem criar reserva', async () => {
    open('/');
    await userEvent.click(screen.getByRole('link', { name: 'Conhecer o agendamento' }));
    expect(screen.getByRole('heading', { level: 1, name: 'Agendamento' })).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Agendamento indisponível' })).toBeDisabled();
    expect(document.title).toBe('Agendamento | Underdog');
  });
  it.each(['/consulta', '/produtos', '/acesso'])('mostra shell público em %s', (path) => {
    open(path);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByText('Nenhuma operação ou dado real disponível nesta fase.')).toBeVisible();
  });
  it.each([...barberNavigation, ...adminNavigation])(
    'abre prévia identificada: $path',
    ({ path, label }) => {
      open(path);
      expect(screen.getByText('DEMONSTRAÇÃO')).toBeVisible();
      expect(screen.getByRole('navigation')).toHaveAccessibleName(/Prévia/);
      expect(screen.getByRole('link', { name: new RegExp(label) })).toHaveAttribute(
        'aria-current',
        'page',
      );
    },
  );
  it.each(['/admin', '/admin/clientes', '/barbeiro', '/barbeiro/agenda'])(
    'não concede acesso real em %s',
    (path) => {
      open(path);
      expect(screen.getByRole('heading', { name: 'Acesso protegido indisponível' })).toBeVisible();
      expect(screen.queryByText('DEMONSTRAÇÃO')).not.toBeInTheDocument();
    },
  );
  it('trata rota inexistente', () => {
    open('/nao-existe');
    expect(screen.getByRole('heading', { name: 'Vamos voltar ao início.' })).toBeVisible();
  });
  it('permite abrir e fechar navegação móvel com estado acessível', async () => {
    open('/');
    await userEvent.click(screen.getByRole('button', { name: 'Abrir menu' }));
    expect(screen.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    await userEvent.click(screen.getByRole('button', { name: 'Fechar menu' }));
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });
});
