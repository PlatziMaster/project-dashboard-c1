const { ViewQuery } = require('couchbase');
const faker = require('faker');

const CouchbaseLib = require('./../libs/couchbase');

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
      countConversationsByMonth: await this.getCountConversationsByMonth(),
      groupByRateConversations: await this.getGroupByRateConversations(),
      groupByRateConversationsByMonth: await this.getGroupByRateConversationsByMonth(),
    };
  }

  async getCountConversations() {
    const viewQuery = ViewQuery.from(
      'conversations',
      'count_by_date'
    );
    const rta = await this.couchbaseClient.runView(viewQuery);
    return rta.length > 0 ? rta[0].value : 0;
  }

  async getCountConversationsByMonth() {
    const viewQuery = ViewQuery.from(
      'conversations',
      'count_by_date'
    ).group_level(2);
    const rta = await this.couchbaseClient.runView(viewQuery);

    return rta.map(item => {
      return {
        name: item.key[1],
        value: item.value
      };
    });
  }

  async getGroupByRateConversations() {
    const viewQuery = ViewQuery.from(
      'conversations',
      'group_by_rate'
    );
    const rta = await this.couchbaseClient.runView(viewQuery);
    if (rta.length > 0) {
      const data = rta[0].value;
      return Object.keys(data).map(key => ({
        name: key,
        value: data[key]
      }))
    };
    return [];
  }

  async getGroupByRateConversationsByMonth() {
    const viewQuery = ViewQuery.from(
      'conversations',
      'group_by_rate'
    ).group_level(2);
    const rta = await this.couchbaseClient.runView(viewQuery);
    return rta.map(item => {
      return {
        ...item.value,
        name: item.key[1]
      };
    });
  }
}

module.exports = ConversationsService;
