/* eslint max-len: [2, 500, 4] */
import _ from 'lodash';
import mongo, { MongoClient } from 'mongodb';
let dbClient;

export default class MongoUtil {

  constructor(connectionString) {
    this.connectionString = connectionString;
  }

  openConnection() {
    return new Promise((resolve, reject) => {
      if (!dbClient) {
        MongoClient.connect(this.connectionString, (err, db) => {
          if (err) {
            reject({ status: false, message: err });
          } else {
            dbClient = db;
            resolve({ status: true });
          }
        });
      } else {
        reject({ status: false, message: 'DB cant be open' });
      }
    });
  }

  insert(collectionName, data) {
    return new Promise((resolve, reject) => {
      if (dbClient) {
        const collection = dbClient.collection(collectionName);
        collection.insert(data, (err, result) => {
          if (err) {
            reject({ status: false, message: err });
          } else {
            resolve({ status: true, data: result.result });
          }
        });
      } else {
        reject({ status: false, message: 'DB must be open' });
      }
    });
  }

  update(collectionName, data, filter, options) {
    return new Promise((resolve, reject) => {
      if (dbClient) {
        const collection = dbClient.collection(collectionName);
        const newData = _.omit(data, '_id');
        collection.update(filter || {}, { $set: newData }, options || { upsert: true }, (err, result) => {
          if (err) {
            resolve({ status: false, message: err });
          } else {
            resolve({ status: true, data: result.result });
          }
        });
      } else {
        reject({ status: false, message: 'DB must be open' });
      }
    });
  }

  find(collectionName, filter, options, skip, limit) {
    return new Promise((resolve, reject) => {
      if (dbClient) {
        const collection = dbClient.collection(collectionName);
        collection.find(filter || {}, options || {})
          .skip(skip || 0)
          .limit(limit || 0)
          .toArray((err, documents) => {
            if (err) {
              reject(err);
            } else {
              resolve(documents);
            }
          });
      } else {
        reject({ status: false, message: 'DB must be open' });
      }
    });
  }

  findOne(collectionName, filter) {
    return new Promise((resolve, reject) => {
      if (dbClient) {
        const collection = dbClient.collection(collectionName);
        collection.findOne(filter || {}, (err, item) => {
          if (err) {
            reject(err);
          } else {
            resolve(item);
          }
        });
      } else {
        reject({ status: false, message: 'DB must be open' });
      }
    });
  }

  getObjectID(id) {
    return new mongo.ObjectID(id);
  }

  closeConnection() {
    dbClient.close();
  }
}
