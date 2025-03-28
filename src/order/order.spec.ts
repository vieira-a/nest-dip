import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from './order-repository.interface';
import { OrderRepository } from './order.repository';
import { ProductService } from '../product/product.service';
import {
  IProductService,
  PRODUCT_SERVICE,
} from '../product/product-service-interface';

describe('OrderService', () => {
  let service: OrderService;
  let repository: IOrderRepository;
  let productService: IProductService;

  beforeEach(async () => {
    const mockProductService: IProductService = {
      create: jest.fn(),
      findById: jest.fn(),
    };

    const mockOrderRepository: IOrderRepository = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: ORDER_REPOSITORY,
          useValue: mockOrderRepository,
        },
        {
          provide: PRODUCT_SERVICE,
          useValue: mockProductService,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    repository = module.get<IOrderRepository>(ORDER_REPOSITORY);
    productService = module.get<IProductService>(PRODUCT_SERVICE);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
