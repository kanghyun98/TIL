const ProductService = require('../product_service.js');
const StubProductClient = require('./stub/stub_product_client.js');

// stub을 사용한 버전
describe('ProductService - Stub', () => {
  let productService;
  beforeEach(() => {
    productService = new ProductService(new StubProductClient());
  });

  it('should filter out only available items', async () => {
    const items = await productService.fetchAvailableItems();
    expect(items.length).toBe(1);
    expect(items).toEqual([{ item: '🍎', available: true }]);
  });
});
