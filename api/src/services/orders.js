const MongoLib = require('./../libs/mongo');

class OrdersService {

  constructor() {
    this.collection = 'orders';
    this.collectionTotal = 'orders_total';
    this.mongoClient = new MongoLib();
    this.createMapReduceTotal();
  }

  async getOrders() {
    return await this.mongoClient.getAll(this.collection, {});
  }

  async getTotals() {
    return await this.mongoClient.getAll(this.collectionTotal, {});
  }

  async getByCustomerTotals() {
    return await this.mongoClient.getAll(this.collectionTotal, {});
  }

  async createMapReduceTotal() {
    const mapFn = function() { emit(this.customer_id, this.total); }
    const reduceFn = function(key, values) {
      return Array.sum(values);
    }
    return await this.mongoClient.createMapReduce(
      this.collection,
      mapFn,
      reduceFn,
      {
        out: this.collectionTotal,
      }
    );
  }
}

module.exports = OrdersService;