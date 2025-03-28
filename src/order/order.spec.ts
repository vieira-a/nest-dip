import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { ProductService } from '../product/product.service';
import { ProductRepository } from '../product/product.repository';

describe('OrderService', () => {
  let service: OrderService;
  let repository: OrderRepository;
  let productService: ProductService;
  let productRepository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderRepository,
        OrderService,
        ProductRepository,
        ProductService,
      ],
    }).compile();
    service = module.get<OrderService>(OrderService);
    repository = module.get<OrderRepository>(OrderRepository);
    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<ProductRepository>(ProductRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
