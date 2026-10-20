/** IDs e instantes serão validados pelo servidor; tipos TS não validam rede. */
export type EntityId = string;
export type ISOInstant = string;
export type TimeZone = string;
export type Role = 'client' | 'barber' | 'admin';
export type MoneyCents = number;
export type BasisPoints = number;
export interface Money {
  readonly currency: 'BRL';
  readonly cents: MoneyCents;
}
export interface AuditReference {
  readonly actorId: EntityId;
  readonly reason: string;
  readonly occurredAt: ISOInstant;
}
export interface IdempotentCommand {
  readonly idempotencyKey: string;
}
export interface AdministrativeException {
  readonly authorizationId: EntityId;
  readonly audit: AuditReference;
}
export type DomainErrorCode =
  | 'backend_unavailable'
  | 'unauthenticated'
  | 'forbidden'
  | 'validation'
  | 'conflict'
  | 'limit_reached'
  | 'out_of_stock'
  | 'rate_limited';
export type Result<T> =
  | { readonly ok: true; readonly value: T }
  | {
      readonly ok: false;
      readonly error: { readonly code: DomainErrorCode; readonly message: string };
    };
export interface AuditEvent {
  readonly id: EntityId;
  readonly actorId: EntityId;
  readonly action: string;
  readonly entityId: EntityId;
  readonly occurredAt: ISOInstant;
  readonly requestId: string;
}
