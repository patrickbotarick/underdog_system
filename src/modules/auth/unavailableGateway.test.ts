import { expect, it } from 'vitest';
import { unavailableAuthGateway } from './unavailableGateway';

it('falha fechada sem fabricar sessão ou papel', async () => {
  const result = await unavailableAuthGateway.getVerifiedSession();
  expect(result.ok).toBe(false);
  expect(result).toEqual({
    ok: false,
    error: { code: 'backend_unavailable', message: 'Autenticação ainda não integrada.' },
  });
  expect(localStorage.length).toBe(0);
  expect(sessionStorage.length).toBe(0);
});
