import type { EntityId } from '../../shared/domain/types';
import type { ClientPolicy } from '../clients/contracts';

export interface OperationSettings extends ClientPolicy {
  readonly unitId: EntityId;
  readonly timeZone: string;
  readonly productPickupDeadlineHours: number;
  readonly version: number;
}
/** Alterações administrativas requerem autorização/RLS e auditoria no servidor. */
export interface ServerAuthorizationDecision {
  readonly actorId: EntityId;
  readonly allowed: boolean;
  readonly policyVersion: string;
}
