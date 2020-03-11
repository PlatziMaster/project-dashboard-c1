const { ViewQuery } = require('couchbase');
const faker = require('faker');

const CouchbaseLib = require('./../libs/couchbase');
const monthList=[
  null,
 'Enero',
 'Febrero',
 'Marzo',
 'Abril',
 'Mayo',
 'Junio',
 'Julio',
 'Agosto',
 'Septiembre',
 'Octubre',
 'Noviembre',
 'Diciembre'
]

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
    const conversations = await this.getAllConversations()
   
    return {
      countConversationsByMonth: await this.getCountConversationsByMonth(),
      countConversations:  conversations.length,
      groupByRateConversations: await this.getGroupByRateConversations(),
      groupByRateConversationsByMonth: await this.getGroupByRateConversationsByMonth(),
    }
  }
  async getCountConversationsByMonth(){
    let conversationsBymonth = []
    const conversations = ViewQuery
    .from('conversations', 'conversations_by_month')
    .group_level('2')
    const rta = await this.couchbaseClient.runView(conversations);
    conversationsBymonth = rta.map(item => {
      return {
        name: monthList[item.key[1]],
        value: item.value
      };
    })
    return conversationsBymonth;
  }
  async getGroupByRateConversations() {
    const viewQuery = ViewQuery.from(
      'conversations',
      'group_by_rate_coversations'
    ).group_level(1);
    const rta = await this.couchbaseClient.runView(viewQuery);
    const values = rta.map(item => {
      return {
        name: item.key,
        value: item.value
      };
    });
    return values;
    }
    async getGroupByRateConversationsByMonth(){
      const data = ViewQuery.from(
        'conversations',
        'group_by_rate_coversations_by_month'
        ).group_level('2')
      const rta = await this.couchbaseClient.runView(data);
      const stadistics = rta.map(item => {
        return {
          name: monthList[item.key[1]],
          ...item.value,
        };
      })
      return stadistics;

    }
    



}

module.exports = ConversationsService;