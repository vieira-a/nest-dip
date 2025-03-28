import { Injectable } from '@nestjs/common';
import { Order } from './order';

@Injectable()
export class OrderRepository {
  private orders: Order[] = [];

  create(order: Order): Order {
    this.orders.push(order);
    return order;
  }
}
