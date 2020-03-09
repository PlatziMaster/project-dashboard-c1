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
      groupByRateConversations: await this.getGroupByRateConversations(conversations),
      groupByRateConversationsByMonth: await this.getGroupByRateConversationsByMonth(),

    }
  }
   
  async getCountConversationsByMonth(){
    let conversationsBymonth = []
    const conversations = ViewQuery
    .from('conversations', 'count_by_date')
    const rta = await this.couchbaseClient.runView(conversations);
    const stadistics = rta.map(item => {
      return item.key[1]
    })
    .reduce((response, month) => {
      if(response[month]){
        response[month] += 1;
      } else {
        response[month] = 1;
      }
      return response;
    },{})
    Object.keys(stadistics).map(item => {
      conversationsBymonth.push({ name: monthList[item],
        value: stadistics[item]
      });
    });
    return conversationsBymonth;
  }
  getGroupByRateConversations(conversations) {
    let groupByRateConversations = [];
    const stadistics = conversations
      .map(item => item.rate)
      .reduce((response, rate) => {
        if(response[rate]){
          response[rate] += 1;
        } else {
          response[rate] = 1;
        }
        return response;
      },{})
      Object.keys(stadistics).map(item => {
        groupByRateConversations.push({ name: item,
          value: stadistics[item]
        });
      });
      return groupByRateConversations;
    }
    async getGroupByRateConversationsByMonth(){
      const conversations = ViewQuery
      .from('conversations', 'GroupByRateConversationsByMonth')
      const rta = await this.couchbaseClient.runView(conversations);
      const stadistics = rta.map(item => {
        return item
      })
      return stadistics;
    }
    



}

module.exports = ConversationsService;