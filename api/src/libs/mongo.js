const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('./../config/index');

const DB_NAME = config.mdbName;

const MONGO_URI = `mongodb://${config.mdbHost}:${config.mdbPort}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {

  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    this.dbName = DB_NAME;
  }

  connect() {
    if (MongoLib.connection) {
      return MongoLib.connection;
    }
    MongoLib.connection = new Promise((resolve, reject) => {
      this.client.connect(err => {
        if (err) {
          reject(err);
        } else {
          console.log('connected');
          resolve(this.client.db(this.dbName));
        }
      });
    });
    return MongoLib.connection;
  }

  getAll(collection, query) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find(query)
        .toArray();
    });
  }

  get(collection, id) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .findOne({ _id: ObjectId(id) });
    });
  }

  create(collection, data) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .insertOne(data);
      })
      .then(result => result.insertedId);
  }

  update(collection, id, data) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      })
      .then(result => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .deleteOne({ _id: ObjectId(id) });
      })
      .then(() => id);
  }

  createMapReduce(collection, mapFn, reduceFn, options) {
    return this.connect()
    .then(db => {
      return new Promise((resolve, reject) => {
        db
        .collection(collection)
        .mapReduce(
          mapFn,
          reduceFn,
          options,
          function(err) {
            if (err) {
              reject(false);
            } else {
              resolve(true);
            }
          }
        );
      })
    });
  }
}

module.exports = MongoLib;