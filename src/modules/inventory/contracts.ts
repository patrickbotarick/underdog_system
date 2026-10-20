import type { EntityId, ISOInstant, Money } from '../../shared/domain/types';

export interface Product {
  readonly id: EntityId;
  readonly name: string;
  readonly price: Money;
  readonly active: boolean;
}
export interface StockBalance {
  readonly productId: EntityId;
  readonly physical: number;
  readonly reserved: number;
  readonly available: number;
  readonly version: number;
}
export interface InventoryMovement {
  readonly id: EntityId;
  readonly productId: EntityId;
  readonly quantity: number;
  readonly kind: 'receipt' | 'sale' | 'adjustment' | 'reserve' | 'release';
  readonly idempotencyKey: string;
  readonly actorId: EntityId;
  readonly reason: string;
  readonly occurredAt: ISOInstant;
}
