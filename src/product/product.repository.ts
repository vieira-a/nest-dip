import { Injectable } from '@nestjs/common';
import { Product } from './product';

@Injectable()
export class ProductRepository {
  private products: Product[] = [];

  create(product: Product): Product {
    this.products.push(product);
    return product;
  }

  findById(id: string): Product | undefined {
    return this.products.find((product) => product.id === id);
  }
}
