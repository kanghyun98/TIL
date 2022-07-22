// no dependency injection (모듈간 의존성 존재)
const ProductClient = require('./product_client.js');

class ProductServiceBad {
  constructor() {
    this.productClient = new ProductClient();
  }

  async fetchAvailableItems() {
    const items = await this.productClient.fetchItems();
    return items.filter((item) => item.available);
  }
}

module.exports = ProductServiceBad;
