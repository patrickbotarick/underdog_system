import type { BasisPoints, EntityId, ISOInstant, Money, TimeZone } from '../../shared/domain/types';

export interface Barber {
  readonly id: EntityId;
  readonly profileId: EntityId;
  readonly displayName: string;
  readonly active: boolean;
  readonly serviceCommissionBasisPoints: BasisPoints;
  readonly settlementPeriod: 'weekly' | 'monthly';
}
export interface Service {
  readonly id: EntityId;
  readonly name: string;
  readonly durationMinutes: number;
  readonly price: Money;
  readonly eligibleBarberIds: readonly EntityId[];
  readonly active: boolean;
}
/** Horários locais HH:mm; weekday 0=domingo. Servidor resolve DST e intervalos. */
export interface WeeklyAvailability {
  readonly barberId: EntityId;
  readonly weekday: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  readonly timeZone: TimeZone;
  readonly intervals: readonly { start: string; end: string }[];
}
export interface ScheduleException {
  readonly id: EntityId;
  readonly barberId: EntityId;
  readonly startsAt: ISOInstant;
  readonly endsAt: ISOInstant;
  readonly kind: 'leave' | 'break' | 'block' | 'extra_hours';
  readonly reason: string;
}
