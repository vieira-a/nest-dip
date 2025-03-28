import { Module } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
  providers: [ProductRepository, ProductService],
})
export class ProductModule {}
