# Boas práticas para implementações de dependências no Nest.js

## Introdução

Ao desenvolver aplicações com Nest.js, é comum nos depararmos com a necessidade de gerenciar dependências entre módulos e serviços. Duas abordagens principais podem ser utilizadas para estruturar essas dependências:

1. **Injeção direta da implementação concreta**
2. **Uso de interfaces e tokens com o princípio de Inversão de Dependência (DIP - Dependency Inversion Principle)**

Esta documentação discute ambas as implementações, destacando suas vantagens e desvantagens.

É apenas um exemplo de aplicação, portanto, é irrelevante a organização de arquivos e diretórios bem como os recursos de implementação; o foco aqui é aplicar de forma prática o **Pricípio da Inversão de Dependência**, melhorando a comunicação entre módulos/funcionalidades.

## CASO 1. Injeção direta da implementação concreta

[Branch do repositório](https://github.com/vieira-a/nest-dip/tree/direct-dependency)

### Exemplo de implementação

```typescript
@Injectable()
export class OrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly productService: ProductService,
  ) {}

  create(order: Order): Order {
    const product = this.productService.findById(order.productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.repository.create(order);
  }
}
```

O `OrderModule` precisa importar **todas** as dependências do `ProductService`

```typescript
@Module({
  providers: [OrderService, OrderRepository, ProductService, ProductRepository],
})
export class OrderModule {}
```

O teste do `OrderService` também precisa importar **todas** as dependências do `ProductService`

```typescript
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
```

### Vantagens

- **Simplicidade**: o código é mais fácil de entender e configurar.
- **Menos configuração**: Não é necessário definir tokens ou interfaces adicionais.
- **Boa para pequenos projetos**: Se a aplicação não for muito complexa, essa abordagem pode ser suficiente.

### Desvantagens

- **Acoplamento forte**: `OrderService` depende diretamente da implementação concreta de `ProductService`, dificultando futuras alterações.
- **Dificuldade para testes**: É necessário carregar toda a implementação real dos serviços ao testar `OrderService`, tornando os testes menos isolados.
- **Pouca flexibilidade**: Se precisarmos substituir `ProductRepository` por outra implementação (por exemplo, um repositório que consulta um cache), será necessário modificar diretamente os serviços.

---

## CASO 2. Uso de Interfaces e Tokens com DIP (Dependency Injection Principle, o "D" do SOLID)

[Branch do repositório](https://github.com/vieira-a/nest-dip/tree/dependency-inversion)

### Exemplo de implementação

1. Criando uma Interface para o `ProductService`

```typescript
export const PRODUCT_SERVICE = Symbol('PRODUCT_SERVICE');

export interface IProductService {
  create(product: Product): Product;
  findById(id: string): Product | null;
}
```

2. Modificando a classe `ProductService` para implementa a nova interface criada

```typescript
@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  create(product: Product): Product {
    // Lógica para criar produto
  }

  findById(id: string): Product | null {
    // Lógica para buscar produto
  }
}
```

3. Exportando os recuros que serão utilizados pelo `OrderService`

```typescript
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
  exports: [PRODUCT_SERVICE],
})
export class ProductModule {}
```

4. Ao importar o `ProductModule`, o `OrderService` terá acesso ao recurso provido pelo `ProductService` através do token `PRODUCT_SERVICE` que corresponde à interface implementada pelo `ProductService`.

```typescript
@Module({
  imports: [ProductModule],
  providers: [
    OrderService,
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderRepository,
    },
  ],
})
export class OrderModule {}
```

5. Injetando a abstração ao invés da classe concreta

```typescript
@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repository: IOrderRepository,
    @Inject(PRODUCT_SERVICE)
    private readonly productService: IProductService,
  ) {}

  create(order: Order): Order {
    const product = this.productService.findById(order.productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.repository.create(order);
  }
}
```

6. Observe que o teste não precisa mais carregar a classe concreta, mas sim a abstração que pode ser mockada.

```typescript
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
```

### Vantagens

- **Desacoplamento**: `OrderService` não depende diretamente de `ProductService`, mas sim de uma interface, permitindo que a implementação real seja alterada facilmente.
- **Facilidade para testes**: No teste de `OrderService`, podemos mockar `IProductService` sem precisar carregar toda a lógica real de `ProductService`.

### Desvantagens

- **Maior complexidade inicial**: É necessário configurar interfaces e tokens, o que pode aumentar a curva de aprendizado para desenvolvedores iniciantes.
- **Mais boilerplate**: É necessário criar e gerenciar tokens e interfaces, aumentando a quantidade de código.

---

## Conclusão

A escolha entre as duas abordagens depende do contexto do projeto:

- Para **pequenos projetos ou MVPs**, a injeção direta da implementação concreta pode ser mais simples e rápida.
- Para **projetos maiores, escaláveis e modulares**, a abordagem baseada em interfaces e DIP é mais vantajosa, pois reduz o acoplamento, melhora a testabilidade e aumenta a flexibilidade da arquitetura.

Em aplicações de grande porte, onde as dependências podem mudar ao longo do tempo, **usar interfaces e tokens** é a melhor escolha, pois permite substituir implementações sem impactar diretamente os serviços que as utilizam. Essa abordagem segue os princípios SOLID e melhora a manutenção e expansão do código a longo prazo.

#### Autor

[Anderson Vieira](@vieira-a)
