import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { ProductRepository } from '../product/product.repository';
import { ProductService } from '../product/product.service';
import { PRODUCT_REPOSITORY } from '../product/product-repository.interface';
import { ORDER_REPOSITORY } from './order-repository.interface';

@Module({
  providers: [
    ProductService,
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderRepository,
    },
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository,
    },
    OrderService,
  ],
})
export class OrderModule {}
