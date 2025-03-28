import { Product } from './product';

export const PRODUCT_SERVICE = Symbol('PRODUCT_SERVICE');

export interface IProductService {
  create(product: Product): Product;
  findById(id: string): Product | null;
}
