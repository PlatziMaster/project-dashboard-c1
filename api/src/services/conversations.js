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
    console.log(startDate, endDate);

    const startDateArray = startDate.split("/").map(item => parseInt(item, 10));
    const endDateArray = endDate.split("/").map(item => parseInt(item, 10));
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const diff = differenceInDays(endDate, startDate);
    console.log(diff);
    let countConversationsByTime = [];
    if (diff <= 90) {
      countConversationsByTime = await this.getCountConversationsByDays(startDateArray, endDateArray);
    }
    if (diff > 90 && diff <= 365) {
      countConversationsByTime = await this.getCountConversationsByMoths();
    }
    if (diff > 365) {
      countConversationsByTime = await this.getCountConversationsByYears();
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
    console.log(rta);
    if (rta.length > 0) {
      return rta[0].value;
    }
    return 0;
  }

  async getCountConversationsByYears() {
    const viewQuery = ViewQuery.from(
      'conversations',
      'count_by_date'
    )
    .group_level(1);
    const rta = await this.couchbaseClient.runView(viewQuery);
    return rta.map(item => {
      return {
        name: item.key[0],
        value: item.value
      }
    });
  }

  async getCountConversationsByMoths() {
    const viewQuery = ViewQuery.from(
      'conversations',
      'count_by_date'
    )
    .group_level(2);
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
