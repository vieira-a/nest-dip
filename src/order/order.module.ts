import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { ORDER_REPOSITORY } from './order-repository.interface';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [ProductModule],
  providers: [
    OrderService,
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderRepository,
    },
  ],
})
export class OrderModule {}
