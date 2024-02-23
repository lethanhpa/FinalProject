'use strict';
const { CONNECTION_STRING, DATABASE_NAME } = require('../constants/dbSettings');
const { MongoClient, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const path = require('path')

function insertDocument(data, collectionName) {
<<<<<<< HEAD
  return new Promise((resolve, reject) => {
    mongoose.model(collectionName)
      .create(data)
      .then((result) => {
        resolve({ result: result });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function insertDocuments(list, collectionName) {
  return new Promise((resolve, reject) => {
    mongoose.model(collectionName)
      .insertMany(list)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
=======
    return new Promise((resolve, reject) => {
        mongoose.model(collectionName)
            .create(data)
            .then((result) => {
                resolve({ result: result });
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function insertDocuments(list, collectionName) {
    return new Promise((resolve, reject) => {
        mongoose.model(collectionName)
            .insertMany(list)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
>>>>>>> task/create-cart-cartDetail
}


function updateDocument(condition, data, collectionName) {
<<<<<<< HEAD
  return new Promise((resolve, reject) => {
    mongoose.model(collectionName)
      .findOneAndUpdate(condition, { $set: data })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function updateDocuments(query, data, collectionName) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((client) => {
        const dbo = client.db(DATABASE_NAME);
        const collection = dbo.collection(collectionName);
        collection
          .updateMany(query, { $set: data })
          .then((result) => {
            client.close();
            resolve(result);
          })
          .catch((err) => {
            client.close();
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function deleteDocument(id, collectionName) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((client) => {
        const dbo = client.db(DATABASE_NAME);
        const collection = dbo.collection(collectionName);
        const query = { _id: ObjectId(id) };
        collection
          .deleteOne(query)
          .then((result) => {
            client.close();
            resolve(result);
          })
          .catch((err) => {
            client.close();
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
=======
    return new Promise((resolve, reject) => {
        mongoose.model(collectionName)
            .findOneAndUpdate(condition, { $set: data })
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function updateDocuments(query, data, collectionName) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
            .then((client) => {
                const dbo = client.db(DATABASE_NAME);
                const collection = dbo.collection(collectionName);
                collection
                    .updateMany(query, { $set: data })
                    .then((result) => {
                        client.close();
                        resolve(result);
                    })
                    .catch((err) => {
                        client.close();
                        reject(err);
                    });
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function deleteDocument(id, collectionName) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
            .then((client) => {
                const dbo = client.db(DATABASE_NAME);
                const collection = dbo.collection(collectionName);
                const query = { _id: ObjectId(id) };
                collection
                    .deleteOne(query)
                    .then((result) => {
                        client.close();
                        resolve(result);
                    })
                    .catch((err) => {
                        client.close();
                        reject(err);
                    });
            })
            .catch((err) => {
                reject(err);
            });
    });
>>>>>>> task/create-cart-cartDetail
}


function deleteDocuments(query, collectionName) {
<<<<<<< HEAD
  return new Promise((resolve, reject) => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((client) => {
        const dbo = client.db(DATABASE_NAME);
        const collection = dbo.collection(collectionName);
        collection
          .deleteMany(query)
          .then((result) => {
            client.close();
            resolve(result);
          })
          .catch((err) => {
            client.close();
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}


function findDocument(id ,collectionName) {
  return new Promise((resolve, reject) => {
    const collection = mongoose.model(collectionName);
    const query = { _id: id };
    collection
      .findOne(query)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function findDocuments({ query = null, sort = null, limit = 50, aggregate = [], skip = 0, projection = null }, collectionName) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((client) => {
        const dbo = client.db(DATABASE_NAME);
        const collection = dbo.collection(collectionName);
        let cursor = collection;
        if (query) {
          cursor = cursor.find(query);
        } else {
          cursor = cursor.aggregate(aggregate);
        }

        if (sort) {
          cursor = cursor.sort(sort);
        }
        cursor.limit(limit).skip(skip);

        if (projection) {
          cursor = cursor.project(projection);
        }

        cursor
          .toArray()
          .then((result) => {
            client.close();
            resolve(result);
          })
          .catch((err) => {
            console.log(err);
            client.close();
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function toSafeFileName(fileName) {
  const fileInfo = path.parse(fileName);
  const safeFileName = fileInfo.name.replace(/[^a-z0-9]/gi, '-').toLowerCase() + fileInfo.ext;
  return `${Date.now()}-${safeFileName}`;
}

module.exports = { insertDocument, insertDocuments, updateDocument, updateDocuments, deleteDocument, deleteDocuments, findDocument, findDocuments, toSafeFileName };
=======
    return new Promise((resolve, reject) => {
        MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
            .then((client) => {
                const dbo = client.db(DATABASE_NAME);
                const collection = dbo.collection(collectionName);
                collection
                    .deleteMany(query)
                    .then((result) => {
                        client.close();
                        resolve(result);
                    })
                    .catch((err) => {
                        client.close();
                        reject(err);
                    });
            })
            .catch((err) => {
                reject(err);
            });
    });
}


function findDocument(id, collectionName) {
    return new Promise((resolve, reject) => {
        const collection = mongoose.model(collectionName);
        const query = { _id: id };
        collection
            .findOne(query)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function findDocuments({ query = null, sort = null, limit = 50, aggregate = [], skip = 0, projection = null }, collectionName) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
            .then((client) => {
                const dbo = client.db(DATABASE_NAME);
                const collection = dbo.collection(collectionName);
                let cursor = collection;
                if (query) {
                    cursor = cursor.find(query);
                } else {
                    cursor = cursor.aggregate(aggregate);
                }

                if (sort) {
                    cursor = cursor.sort(sort);
                }
                cursor.limit(limit).skip(skip);

                if (projection) {
                    cursor = cursor.project(projection);
                }

                cursor
                    .toArray()
                    .then((result) => {
                        client.close();
                        resolve(result);
                    })
                    .catch((err) => {
                        console.log(err);
                        client.close();
                        reject(err);
                    });
            })
            .catch((err) => {
                reject(err);
            });
    });
}

function toSafeFileName(fileName) {
    const fileInfo = path.parse(fileName);
    const safeFileName = fileInfo.name.replace(/[^a-z0-9]/gi, '-').toLowerCase() + fileInfo.ext;
    return `${Date.now()}-${safeFileName}`;
}

module.exports = { insertDocument, insertDocuments, updateDocument, updateDocuments, deleteDocument, deleteDocuments, findDocument, findDocuments, toSafeFileName };
>>>>>>> task/create-cart-cartDetail
