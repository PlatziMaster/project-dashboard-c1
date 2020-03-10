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
    const lengthConversations = await this.getAllConversations();
    return {
      countConversationsByMonth: await this.getCountConversationsByMonth(),
      countConversations: lengthConversations.length,
      groupByRateConversationsByMonth: await this.getGroupByRateConversationsByMonth(),
      groupByRateConversations: await this.getGroupByRateConversations()
    };
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

  async getCountConversationsByMonth() {
    const viewQuery = ViewQuery.from(
      'conversations',
      'counts_by_mouth'
    ).group_level(2);
    const rta = await this.couchbaseClient.runView(viewQuery);

    return rta.map(item => {
      return {
        name: this.convertMonthName(item.key[1]),
        value: item.value
      };
    });
  }

  async countConversationsLength() {
    const viewQuery = ViewQuery.from(
      'conversations',
      'counts_by_mouth'
    ).group_level(1);
    const rta = await this.couchbaseClient.runView(viewQuery);
    return rta[0].value;
  }

  convertMonthName(month) {
    switch (month) {
      case 1:
        return 'Enero';
      case 2:
        return 'Febrero';
      case 3:
        return 'Marzo';
      case 4:
        return 'Abril';
      case 5:
        return 'Mayo';
      case 6:
        return 'Junio';
      case 7:
        return 'Julio';
      case 8:
        return 'Agosto';
      case 9:
        return 'Septiembre';
      case 10:
        return 'Octubre';
      case 11:
        return 'Noviembre';
      case 12:
        return 'Diciembre';
      default:
        return '';
    }
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
