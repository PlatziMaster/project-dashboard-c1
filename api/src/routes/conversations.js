const express = require('express');
const ConversationsService = require('./../services/conversations');

const conversationsApi = (app) => {
  const router = express.Router();
  app.use('/api/conversations/', router);

  const conversationsService = new ConversationsService();

  router.get('/', async (req, res, next) => {
    try {
      const data = await conversationsService.getAllConversations();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  router.get('/stats', async (req, res, next) => {
    try {
      // const { start_date, end_date } = req.query;
      const data = await conversationsService.getStats();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  router.get('/mocks', async (req, res, next) => {
    try {
      const data = await conversationsService.createConversations();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

};

module.exports = conversationsApi;