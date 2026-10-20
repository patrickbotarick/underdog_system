import type { EntityId, ISOInstant } from '../../shared/domain/types';

export interface ClientIdentity {
  readonly id: EntityId;
  readonly name: string;
  readonly verifiedPhone: string;
  readonly verifiedAt: ISOInstant;
  readonly userId: EntityId | null;
}
/** Resolução de identidade e associação de histórico são exclusivas do servidor. */
export interface ClientPolicy {
  readonly maximumActiveFutureBookings: number;
  readonly minimumLeadTimeMinutes: number;
  readonly maximumLeadTimeDays: number | null;
}
