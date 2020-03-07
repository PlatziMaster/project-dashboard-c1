const { ViewQuery } = require('couchbase');
const faker = require('faker');

const CouchbaseLib = require('./../libs/couchbase');
const monthList=[
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
    // usamos Fake para generar datos aleatorios
    const conversations = [];
    for ( let index = 0; index < 1000 ; index++) {
      conversations.push({
        rate: faker.random.number({min:1, max:10}),
        created_at: faker.date.past(),
        customer_id: faker.random.uuid(),
        type: "conversation",
      })
    }
    return {
      countConversationsByMonth: this.getCountConversationsByMonth(conversations),
      countConversations:  this.getCountConversations(conversations),
      groupByRateConversations:  this.getGroupByRateConversations(conversations)
      
    }

/*
    return {
      countConversationsByMonth: await this.getCountConversationsByMonth(),
      countConversations: await this.countConversations(),
    }
*/
  }
  getCountConversationsByMonth(conversations){
    const stadistics = conversations
    .map(item => item.created_at.getMonth())
    .reduce((response, month) => {
      if(response[monthList[month]]){
        response[monthList[month]] += 1;
      } else {
        response[monthList[month]] = 1;
      }
      return response;
    },{})
    return stadistics;
  }
  getCountConversations(conversations){
    let counter = 0;
    conversations
    .map(() => counter++);
    return counter
  }

  getGroupByRateConversations(conversations) {
    const stadistics = conversations
      .map(item => item.rate)
      .reduce((response, rate) => {
        //console.log(response);
        //console.log(rate);
        if(response[rate]){
          response[rate] += 1;
        } else {
          response[rate] = 1;
        }
        return response;
      },{})
    return stadistics;
  }
/*
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
*/
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