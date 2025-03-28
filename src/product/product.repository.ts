import { Injectable } from '@nestjs/common';
import { Product } from './product';
import { IProductRepository } from './product-repository.interface';

@Injectable()
export class ProductRepository implements IProductRepository {
  private products: Product[] = [];

  create(product: Product): Product {
    this.products.push(product);
    return product;
  }

  findById(id: string): Product | null {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      return null;
    }

    return product;
  }
}
