import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { ProductRepository } from 'src/product/product.repository';
import { ProductService } from 'src/product/product.service';

@Module({
  providers: [OrderRepository, OrderService, ProductService, ProductRepository],
})
export class OrderModule {}
