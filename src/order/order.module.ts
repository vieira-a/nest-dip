import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { ProductRepository } from '../product/product.repository';
import { ProductService } from '../product/product.service';

@Module({
  providers: [OrderRepository, OrderService, ProductService, ProductRepository],
})
export class OrderModule {}
