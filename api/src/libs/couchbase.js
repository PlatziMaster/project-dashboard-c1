const { Cluster, N1qlQuery } = require('couchbase');
const { config } = require('./../config/index');

const COUCHBASE_URI = `couchbase://${config.cdbHost}:${config.cdbPort}`;

class CouchbaseLib {
  constructor() {
    this.cluster = new Cluster(COUCHBASE_URI);
    this.cluster.authenticate(config.cdbUser, config.cdbPassword);
  }

  getBucket() {
    return this.cluster.openBucket(config.cdbName);
  }

  async runQuery(query, params) {
    return new Promise((resolve, reject) => {
      const n1ql = N1qlQuery.fromString(query);
      this.getBucket().query(n1ql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async runView(viewQuery) {
    return new Promise((resolve, reject) => {
      this.getBucket().query(viewQuery, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  async insertDoc(doc) {
    return new Promise((resolve, reject) => {
      this.getBucket().insert(doc.id, doc, (err, rta) => {
        if (err) {
          reject(err);
        } else {
          resolve(rta);
        }
      });
    });
  }

  async insertDocuments(docs) {
    const promises = docs.map(doc => this.insertDoc(doc));
    return Promise.all(promises);
  }
}

module.exports = CouchbaseLib;
