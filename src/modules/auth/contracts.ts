import type { EntityId, ISOInstant, Result, Role } from '../../shared/domain/types';

export interface User {
  readonly id: EntityId;
  readonly createdAt: ISOInstant;
}
export interface Profile {
  readonly userId: EntityId;
  readonly displayName: string;
  readonly roles: readonly Role[];
}
/** O adapter futuro consulta sessão validada no servidor. Nunca aceitar papel de localStorage. */
export interface VerifiedSession {
  readonly user: User;
  readonly profile: Profile;
  readonly expiresAt: ISOInstant;
}
export interface AuthGateway {
  getVerifiedSession(): Promise<Result<VerifiedSession>>;
  signOut(): Promise<Result<void>>;
}
export interface PhoneVerificationGateway {
  requestCode(phone: string): Promise<Result<{ challengeId: EntityId; retryAfterSeconds: number }>>;
  verifyCode(
    challengeId: EntityId,
    code: string,
  ): Promise<Result<{ verifiedIdentityId: EntityId }>>;
  linkPreviousReservations(): Promise<Result<void>>;
}
export const backendCapabilities = Object.freeze({
  authentication: false,
  booking: false,
  payments: false,
  inventory: false,
});
