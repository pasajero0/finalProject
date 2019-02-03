const url = process.env.DB_MONGO_URL;

const { MongoClient, ObjectID } = require('mongodb');

let client = null;

/**
 * connect to database and run callback function on success
 * pass db as function argument
 *
 *
 */
exports.connect = function connectToDatabaseAndRunCallback() {
  return new Promise((resolve, reject) => {
    if (client) {
      resolve(client);
    } else {
      MongoClient.connect(url, {useNewUrlParser: true}, function (err, _client) {
        if (err) reject(err);
        client = _client;
        resolve(client);
      });
    }
  });
};

/**
 * connect to database collection and run callback function on success
 * pass collection as function argument
 *
 * @param name {string} - collection name to be connected
 */
exports.collection = function connectToDbCollection(name) {
  return new Promise((resolve, reject) => {
    exports
      .connect()
      .then(res => resolve(res.db('shop').collection(name)))
      .catch(err => console.log(err));
  });
};
/**
 * finds documents by where filters. call callback function with found documents array as argument
 *
 * @param name {string} - collection name
 * @param where {object} - find object
 * @param skip {number} - skip value
 * @param limit {number} - limit value
 */
exports.find = function findDocumentsByWhereObjectFilters(name, where = {}, skip = 0, limit = 10) {
  return exports
    .collection(name)
    .then(collection => collection.find(where).skip(skip).limit(limit).toArray());
};


/**
 * finds documents by where filters. call callback function with found documents array as argument
 *
 * @param name {string} - collection name
 * @param where {object} - find object
 */
exports.count = function countDocumentsByWhereObjectFilters(name, where = {}) {
  return exports
    .collection(name)
    .then(collection => collection.countDocuments(where));
};
/**
 * finds documents by id string.
 * create ObjectID, find record
 * call callback function with found documents array as argument
 *
 * @param name {string} - collection name
 * @param id {string} - id value
 */
exports.findById = function findDocumentByIdInCollection(name, id) {
  return exports
    .collection(name)
    .then(collection => collection.find({ _id: ObjectID(id) }).toArray());
};
/**
 * insert document into selected collection.
 * callback cs function with the data with attached id
 *
 * @param name {string} - collection name
 * @param data {object} - data to be inserted
 */
exports.insertOne = function inertDocumentIntoCollection(name, data) {
  return exports
    .collection(name)
    .then(collection => collection.insertOne(data));
};
/**
 * update document into selected collection.
 * callback cb function with the data with attached id
 *
 * @param name {string} - collection name
 * @param id {string} - id value
 * @param data {object} - data to be inserted
 */
exports.updateById = function updateDocumentByIdInCollection(name, id, data) {
  return exports
    .collection(name)
    .then(collection => collection.updateOne({ _id: ObjectID(id) }, { $set: { ...data } }));
};
/**
 * remove document by id string.
 * callback cb function with the data with attached id
 *
 * @param name {string} - collection name
 * @param id {string} - id value
 */
exports.removeById = function removeDocumentByIdInCollection(name, id) {
  return exports
    .collection(name)
    .then(collection => collection.deleteOne({ _id: ObjectID(id) }, { justOne: true }));
};
/**
 * close database connection if it is opened
 */
exports.close = function closeStoredClientConnection() {
  if (client !== null) {
    client.close();
    client = null;
  }
};

/**
 * Removes a collection or view from the database.
 * The method also removes any indexes associated with the dropped collection.
 * The method provides a wrapper around the drop command.
 *
 * @param name {string} - collection name
 */
exports.drop = function dropCollection(name) {
  return exports
    .collection(name)
    .then(collection => collection.drop());
};
