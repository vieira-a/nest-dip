import { Module } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { PRODUCT_REPOSITORY } from './product-repository.interface';

@Module({
  providers: [
    ProductService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository,
    },
  ],
  exports: [ProductService, PRODUCT_REPOSITORY],
})
export class ProductModule {}
