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
    for (let index = 0; index < 200; index++) {
      docs.push({
        id: faker.random.uuid(),
        customer_id: faker.random.number(12),
        rate: faker.random.number(6),
        created_at: faker.date.between('2020-01-01', '2020-03-31'),
        type: 'conversation'
      });
    }
    return await this.couchbaseClient.insertDocuments(docs);
  }

  async getStats(startDate, endDate) {
    const startDateArray = startDate.split("/").map(item => parseInt(item, 10));
    const endDateArray = endDate.split("/").map(item => parseInt(item, 10));
    console.log(startDateArray, endDateArray);
    const diff = differenceInDays(new Date(endDate), new Date(startDate));
    console.log(diff);
    let countConversationsByTime = [];
    if (diff <= 31) {
      countConversationsByTime = await this.getCountConversationsByDays(startDateArray, endDateArray);
    }
    if (diff > 31 && diff < 365) {
      countConversationsByTime = await this.getCountConversationsByMoths(startDateArray, endDateArray);
    }
    if (diff >= 365) {
      countConversationsByTime = await this.getCountConversationsByYears(startDateArray, endDateArray);
    }
    return {
      countConversations: await this.getCountConversations(startDateArray, endDateArray),
      countConversationsByTime: countConversationsByTime,
      // groupByRateConversationsByMonth: await this.getGroupByRateConversationsByMonth(),
      // groupByRateConversations: await this.getGroupByRateConversations()
    };
  }

  async getCountConversations(startKey, endKey) {
    const viewQuery = ViewQuery.from(
      'conversations',
      'count_by_date'
    ).range(startKey, endKey);
    const rta = await this.couchbaseClient.runView(viewQuery);
    if (rta.length > 0) {
      return rta[0].value;
    }
    return 0;
  }

  async getCountConversationsByYears(startKey, endKey) {
    const viewQuery = ViewQuery.from(
      'conversations',
      'count_by_date'
    )
    .group_level(1)
    .range(startKey, endKey);
    const rta = await this.couchbaseClient.runView(viewQuery);
    return rta.map(item => {
      return {
        name: item.key[0],
        value: item.value
      }
    });
  }

  async getCountConversationsByMoths(startKey, endKey) {
    const viewQuery = ViewQuery.from(
      'conversations',
      'count_by_date'
    )
    .group_level(2)
    .range(startKey, endKey);
    const rta = await this.couchbaseClient.runView(viewQuery);
    return rta.map(item => {
      return {
        name: item.key.join('/'),
        value: item.value
      }
    });
  }

  async getCountConversationsByDays(startKey, endKey) {
    const viewQuery = ViewQuery.from(
      'conversations',
      'count_by_date'
    )
    .group_level(3)
    .range(startKey, endKey);
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
