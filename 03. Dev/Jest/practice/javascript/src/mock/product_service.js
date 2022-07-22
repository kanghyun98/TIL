class ProductService {
  constructor(productClient) {
    this.productClient = productClient;
  }

  async fetchAvailableItems() {
    const items = await this.productClient.fetchItems();
    return items.filter((item) => item.available);
  }
}

module.exports = ProductService;
