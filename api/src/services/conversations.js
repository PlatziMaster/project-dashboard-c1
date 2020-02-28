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
      countConversationsByMonth: await this.getCountConversationsByMonth(),
      countConversations: await this.countConversations(),
    }
  }

  async getCountConversationsByMonth() {
    const viewQuery = ViewQuery
    .from('conversations', 'count_by_date')
    .group_level(2);
    const rta = await this.couchbaseClient.runView(viewQuery);
    return rta.map(item => {
      return {
        label: item.key[1],
        value: item.value
      }
    })
  }

  async countConversations() {
    const viewQuery = ViewQuery
    .from('conversations', 'count_by_date')
    .group_level(1);
    const rta = await this.couchbaseClient.runView(viewQuery);
    const values = rta.map(item => item.value);
    return values.length === 0 ? 0 : values[0];
  }


}

module.exports = ConversationsService;