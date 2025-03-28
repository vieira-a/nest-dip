import { Injectable } from '@nestjs/common';
import { Order } from './order';
import { IOrderRepository } from './order-repository.interface';

@Injectable()
export class OrderRepository implements IOrderRepository {
  private orders: Order[] = [];

  create(order: Order): Order {
    this.orders.push(order);
    return order;
  }
}
