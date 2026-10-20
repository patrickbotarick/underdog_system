import type {
  AdministrativeException,
  EntityId,
  IdempotentCommand,
  ISOInstant,
  Money,
  Result,
} from '../../shared/domain/types';

export type BookingStatus =
  'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
export type BookingOrigin = 'app' | 'in_person' | 'phone' | 'whatsapp';
export type ProfessionalSelection =
  { readonly mode: 'specific'; readonly barberId: EntityId } | { readonly mode: 'any_available' };
export interface BookingItem {
  readonly serviceId: EntityId;
  readonly durationMinutes: number;
  readonly effectivePrice: Money;
}
export interface Booking {
  readonly id: EntityId;
  readonly verifiedClientIdentityId: EntityId;
  readonly barberId: EntityId;
  readonly startsAt: ISOInstant;
  readonly endsAt: ISOInstant;
  readonly status: BookingStatus;
  readonly origin: BookingOrigin;
  readonly items: readonly BookingItem[];
  readonly version: number;
}
export interface CreateBookingCommand extends IdempotentCommand {
  readonly serviceIds: readonly EntityId[];
  readonly professional: ProfessionalSelection;
  readonly startsAt: ISOInstant;
  readonly origin: BookingOrigin;
  readonly administrativeException?: AdministrativeException;
}
export interface ChangeBookingCommand extends IdempotentCommand {
  readonly bookingId: EntityId;
  readonly expectedVersion: number;
  readonly explicitlyConfirmed: true;
}
export interface RescheduleCommand extends ChangeBookingCommand {
  readonly startsAt: ISOInstant;
  readonly professional: ProfessionalSelection;
}
export interface BookingGateway {
  create(command: CreateBookingCommand): Promise<Result<Booking>>;
  cancel(command: ChangeBookingCommand): Promise<Result<Booking>>;
  reschedule(command: RescheduleCommand): Promise<Result<Booking>>;
  markNoShow(
    command: IdempotentCommand & { readonly bookingId: EntityId; readonly expectedVersion: number },
  ): Promise<Result<Booking>>;
}
export interface Attendance {
  readonly id: EntityId;
  readonly bookingId: EntityId;
  readonly barberId: EntityId;
  readonly completedAt: ISOInstant;
}
