import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from './product';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  create(product: Product): Product {
    return this.productRepository.create(product);
  }

  findById(id: string): Product | undefined {
    return this.productRepository.findById(id);
  }
}
