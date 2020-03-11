const { ViewQuery } = require('couchbase');
const faker = require('faker');

const CouchbaseLib = require('./../libs/couchbase');

const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Aug', 'sep', 'oct', 'nov', 'dic']

class ConversationsService {
  constructor() {
    this.couchbaseClient = new CouchbaseLib();
  }

  async getAllConversations() {
    const query = `
      SELECT doc.*
      FROM platzi_store AS doc
      WHERE doc.type = "conversation"`;
    return await this.couchbaseClient.runQuery(query);
  }

  async createConversations() {
    const docs = [];
    for (let index = 0; index < 50; index++) {
      docs.push({
        id: faker.random.uuid(),
        customer_id: faker.random.number(12),
        rate: faker.random.number(6),
        created_at: faker.date.between('2019-01-01', '2019-12-31'),
        type: 'conversation'
      });
    }
    return await this.couchbaseClient.insertDocuments(docs);
  }

  async getStats() {
    return {
      countConversations: await this.getCountConversations(),
      countConversationsByYears: await this.getCountConversationsByYears(),
      countConversationsByMonths: await this.getCountConversationsByMonths(),
      countConversationsByDays: await this.getCountConversationsByDays(),
      // groupByRateConversationsByMonth: await this.getGroupByRateConversationsByMonth(),
      // groupByRateConversations: await this.getGroupByRateConversations()
    };
  }

  async getCountConversations() {
    const viewQuery = ViewQuery.from(
      'conversations',
      'count_by_date'
    );
    const rta = await this.couchbaseClient.runView(viewQuery);
    if (rta.length > 0) {
      return rta[0].value;
    }
    return 0;
  }

  async getCountConversationsByYears() {
    const viewQuery = ViewQuery.from(
      'conversations',
      'count_by_date'
    ).group_level(1);
    const rta = await this.couchbaseClient.runView(viewQuery);
    return rta.map(item => {
      return {
        name: item.key[0],
        value: item.value
      };
    });
  }

  async getCountConversationsByMonths() {
    const viewQuery = ViewQuery.from(
      'conversations',
      'count_by_date'
    ).group_level(2);
    const rta = await this.couchbaseClient.runView(viewQuery);
    return rta.map(item => {
      return {
        name: item.key.join('-'),
        value: item.value
      };
    });
  }

  async getCountConversationsByDays() {
    const viewQuery = ViewQuery.from(
      'conversations',
      'count_by_date'
    ).group_level(3);
    const rta = await this.couchbaseClient.runView(viewQuery);
    return rta.map(item => {
      return {
        name: item.key.join('/'),
        value: item.value
      };
    });
  }

  async getGroupByRateConversationsByMonth() {
    const viewQuery = ViewQuery.from(
      'conversations',
      'count_by_date'
    ).group_level(2);
    const rta = await this.couchbaseClient.runView(viewQuery);
    return rta.map(item => {
      return {
        name: this.convertMonthName(item.key[1]),
        ...item.value
      };
    });
  }

  async getGroupByRateConversations() {
    const viewQuery = ViewQuery.from(
      'conversations',
      'count_by_date'
    ).group_level(1);
    const rta = await this.couchbaseClient.runView(viewQuery);
    const values = rta.map(item => item.value);
    var result = Object.keys(values[0]).map(key => {
      return {
        name: key,
        value: values[0][key]
      };
    });
    return result;
  }

  async countConversations() {
    const viewQuery = ViewQuery.from(
      'conversations',
      'count_by_date'
    ).group_level(1);
    const rta = await this.couchbaseClient.runView(viewQuery);
    const values = rta.map(item => item.value);
    if (values.length === 0) {
      return [];
    }
    var result = Object.keys(values[0]).map(key => {
      return {
        rate: key,
        count: values[0][key]
      };
    });
    return result;
  }
}

module.exports = ConversationsService;
