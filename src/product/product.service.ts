import { Inject, Injectable } from '@nestjs/common';
import { Product } from './product';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from './product-repository.interface';
import { IProductService } from './product-service-interface';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  create(product: Product): Product {
    return this.productRepository.create(product);
  }

  findById(id: string): Product | null {
    return this.productRepository.findById(id);
  }
}
