import { Product } from './product';

// Evita erro de token utilizando string literal
export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');

export interface IProductRepository {
  create(product: Product): Product;
  findById(id: string): Product | null;
}
