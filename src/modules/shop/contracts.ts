import type {
  AdministrativeException,
  EntityId,
  IdempotentCommand,
  ISOInstant,
  Money,
  Result,
} from '../../shared/domain/types';

export interface ProductReservation {
  readonly id: EntityId;
  readonly verifiedClientIdentityId: EntityId;
  readonly sellerBarberId: EntityId | null;
  readonly lines: readonly { productId: EntityId; quantity: number; unitPrice: Money }[];
  readonly expiresAt: ISOInstant;
  readonly status: 'reserved' | 'collected' | 'expired' | 'cancelled';
  readonly paymentMode: 'in_person';
  readonly version: number;
}
export interface ProductReservationGateway {
  reserve(
    command: IdempotentCommand & {
      readonly lines: readonly { productId: EntityId; quantity: number }[];
    },
  ): Promise<Result<ProductReservation>>;
  extend(
    command: IdempotentCommand & {
      readonly reservationId: EntityId;
      readonly expiresAt: ISOInstant;
      readonly expectedVersion: number;
      readonly exception: AdministrativeException;
    },
  ): Promise<Result<ProductReservation>>;
  cancel(
    command: IdempotentCommand & {
      readonly reservationId: EntityId;
      readonly expectedVersion: number;
      readonly exception: AdministrativeException;
    },
  ): Promise<Result<ProductReservation>>;
}
