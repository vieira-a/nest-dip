import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './order';
import { ProductService } from '../product/product.service';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from './order-repository.interface';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repository: IOrderRepository,
    private readonly productService: ProductService,
  ) {}

  create(order: Order): Order {
    const product = this.productService.findById(order.productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.repository.create(order);
  }
}
