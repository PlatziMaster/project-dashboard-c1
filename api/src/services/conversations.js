const { ViewQuery } = require('couchbase');
const faker = require('faker');
const differenceInDays = require('date-fns/differenceInDays')

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

  async getStats(startDate, endDate) {
    const startDateArray = startDate.split('/').map(item => parseInt(item, 10));
    const endDateArray = endDate.split('/').map(item => parseInt(item, 10));

    const diff = differenceInDays(new Date(endDate), new Date(startDate));
    console.log('diff', diff);
    let countConversationsByTime = [];
    if (diff <= 30) {
      countConversationsByTime = await this.getCountConversationsByDays(startDateArray, endDateArray);
    } else if(diff > 30 && diff <= 365) {
      countConversationsByTime = await this.getCountConversationsByMonths(startDateArray, endDateArray);
    } else if(diff > 365) {
      countConversationsByTime = await this.getCountConversationsByYears(startDateArray, endDateArray);
    }

    return {
      countConversations: await this.getCountConversations(startDateArray, endDateArray),
      countConversationsByTime: countConversationsByTime,
    };
  }

  async getCountConversations(startDateArray, endDateArray) {
    const viewQuery = ViewQuery.from(
      'conversations',
      'count_by_date'
    ).range(startDateArray, endDateArray);
    const rta = await this.couchbaseClient.runView(viewQuery);
    if (rta.length > 0) {
      return rta[0].value;
    }
    return 0;
  }

  async getCountConversationsByYears(startDateArray, endDateArray) {
    const viewQuery = ViewQuery.from(
      'conversations',
      'count_by_date'
    )
    .group_level(1)
    .range(startDateArray, endDateArray);
    const rta = await this.couchbaseClient.runView(viewQuery);
    return rta.map(item => {
      return {
        name: item.key[0],
        value: item.value
      }
    });
  }

  async getCountConversationsByMonths(startDateArray, endDateArray) {
    const viewQuery = ViewQuery.from(
      'conversations',
      'count_by_date'
    )
    .group_level(2)
    .range(startDateArray, endDateArray);
    const rta = await this.couchbaseClient.runView(viewQuery);
    return rta.map(item => {
      return {
        name: item.key.join('/'),
        value: item.value
      }
    });
  }

  async getCountConversationsByDays(startDateArray, endDateArray) {
    const viewQuery = ViewQuery.from(
      'conversations',
      'count_by_date'
    )
    .group_level(3)
    .range(startDateArray, endDateArray);
    const rta = await this.couchbaseClient.runView(viewQuery);
    return rta.map(item => {
      return {
        name: item.key.join('/'),
        value: item.value
      }
    });
  }
}

module.exports = ConversationsService;
