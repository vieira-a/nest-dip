import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from './order-repository.interface';
import { OrderRepository } from './order.repository';
import { ProductService } from '../product/product.service';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../product/product-repository.interface';

describe('OrderService', () => {
  let service: OrderService;
  let repository: IOrderRepository;
  let productRepository: IProductRepository;

  beforeEach(async () => {
    const mockProductRepository: IProductRepository = {
      create: jest.fn(),
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: ORDER_REPOSITORY,
          useClass: OrderRepository,
        },
        ProductService,
        {
          provide: PRODUCT_REPOSITORY,
          useValue: mockProductRepository,
        },
      ],
    }).compile();
    service = module.get<OrderService>(OrderService);
    repository = module.get<IOrderRepository>(ORDER_REPOSITORY);
    productRepository = module.get<IProductRepository>(PRODUCT_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
