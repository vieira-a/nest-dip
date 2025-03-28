import { Module } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { PRODUCT_REPOSITORY } from './product-repository.interface';
import { PRODUCT_SERVICE } from './product-service-interface';

@Module({
  providers: [
    ProductService,
    {
      provide: PRODUCT_SERVICE,
      useClass: ProductService,
    },
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository,
    },
  ],
  exports: [ProductService, PRODUCT_REPOSITORY, PRODUCT_SERVICE],
})
export class ProductModule {}
