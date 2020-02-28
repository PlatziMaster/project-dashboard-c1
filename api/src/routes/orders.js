const express = require('express');
const OrdersService = require('./../services/orders');

const ordersApi = (app) => {
  const router = express.Router();
  app.use('/api/orders/', router);

  const ordersService = new OrdersService();

  router.get('/', async (req, res, next) => {
    try {
      const data = await ordersService.getOrders();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  router.get('/total', async (req, res, next) => {
    try {
      const data = await ordersService.getTotals();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

};

module.exports = ordersApi;