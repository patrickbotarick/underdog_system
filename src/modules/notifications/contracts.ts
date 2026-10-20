import type { EntityId, ISOInstant } from '../../shared/domain/types';

/** Outbox futura: gravação transacional com alteração; entrega idempotente com retries. */
export interface NotificationEvent {
  readonly id: EntityId;
  readonly recipientBarberId: EntityId;
  readonly bookingId: EntityId;
  readonly kind: 'late_cancellation' | 'late_reschedule';
  readonly originalStartsAt: ISOInstant;
  readonly occurredAt: ISOInstant;
  readonly deliveryStatus: 'pending' | 'delivered' | 'failed';
}
