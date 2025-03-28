import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './order';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from './order-repository.interface';
import {
  IProductService,
  PRODUCT_SERVICE,
} from '../product/product-service-interface';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repository: IOrderRepository,
    @Inject(PRODUCT_SERVICE)
    private readonly productService: IProductService,
  ) {}

  create(order: Order): Order {
    const product = this.productService.findById(order.productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.repository.create(order);
  }
}
