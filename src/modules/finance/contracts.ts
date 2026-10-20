import type { BasisPoints, EntityId, ISOInstant, Money } from '../../shared/domain/types';

export interface Payment {
  readonly id: EntityId;
  readonly attendanceId: EntityId | null;
  readonly productReservationId: EntityId | null;
  readonly receivingBarberId: EntityId;
  readonly amount: Money;
  readonly status: 'pending' | 'received' | 'partially_refunded' | 'refunded';
  readonly receivedAt: ISOInstant | null;
}
export type CommissionRule = {
  readonly id: EntityId;
  readonly barberId: EntityId;
  readonly basisPoints: BasisPoints;
  readonly validFrom: ISOInstant;
} & ({ readonly kind: 'service' } | { readonly kind: 'product'; readonly productId: EntityId });
export interface CommissionEntry {
  readonly id: EntityId;
  readonly paymentId: EntityId;
  readonly barberId: EntityId;
  readonly ruleId: EntityId;
  readonly appliedBasisPoints: BasisPoints;
  readonly effectiveBase: Money;
  readonly amount: Money;
  readonly occurredAt: ISOInstant;
}
export interface Settlement {
  readonly id: EntityId;
  readonly barberId: EntityId;
  readonly periodStartsAt: ISOInstant;
  readonly periodEndsAt: ISOInstant;
  readonly frequency: 'weekly' | 'monthly';
  readonly status: 'open' | 'closed' | 'transferred';
  readonly total: Money;
  readonly pending: Money;
}
export interface Transfer {
  readonly id: EntityId;
  readonly settlementId: EntityId;
  readonly amount: Money;
  readonly transferredAt: ISOInstant;
}
export interface SettlementAdjustment {
  readonly id: EntityId;
  readonly settlementId: EntityId;
  readonly amount: Money;
  readonly reason: string;
  readonly actorId: EntityId;
  readonly occurredAt: ISOInstant;
}
