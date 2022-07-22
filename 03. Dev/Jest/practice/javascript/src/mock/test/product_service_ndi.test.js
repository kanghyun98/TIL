const ProductService = require('../product_service_ndi.js');
const ProductClient = require('../product_client.js');

// 모듈간 의존성 해결하기 위한 방법
jest.mock('../product_client.js'); // module 전체 mock 처리

describe('ProductService', () => {
  // ProductClient의 fetchItems 메소드에 대해서도 mock 함수 생성
  const fetchItems = jest.fn(async () => [
    { item: '🍎', available: true },
    { item: '🍌', available: false },
  ]);

  // ProductClient의 fetchItems 메소드에 생성한 mock function 주입
  ProductClient.mockImplementation(() => {
    return {
      fetchItems,
    };
  });

  let productService;

  beforeEach(() => {
    productService = new ProductService();
  });

  test('filter available items', async () => {
    const items = await productService.fetchAvailableItems();
    expect(items.length).toBe(1);
    expect(items).toEqual([{ item: '🍎', available: true }]);
  });
});
