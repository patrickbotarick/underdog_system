import type { AuthGateway } from './contracts';

/** Falha fechada: nunca fabrica usuário, papel, token ou sessão. Não persiste dados. */
export const unavailableAuthGateway: AuthGateway = {
  async getVerifiedSession() {
    return {
      ok: false,
      error: { code: 'backend_unavailable', message: 'Autenticação ainda não integrada.' },
    };
  },
  async signOut() {
    return {
      ok: false,
      error: { code: 'backend_unavailable', message: 'Nenhuma sessão está disponível.' },
    };
  },
};
