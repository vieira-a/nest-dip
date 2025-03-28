import { Order } from './order';

export const ORDER_REPOSITORY = Symbol('ORDER_REPOSITORY');

export interface IOrderRepository {
  create(order: Order): Order;
}
