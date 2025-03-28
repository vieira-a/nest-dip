import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './order';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly repository: OrderRepository,
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
