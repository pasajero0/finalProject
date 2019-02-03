const src = require('./mongo-db');

const DB = {
  connect: src.connect,
  collection: src.collection,
  find: src.find,
  count: src.count,
  findById: src.findById,
  insertOne: src.insertOne,
  updateById: src.updateById,
  removeById: src.removeById,
  close: src.close,
  drop: src.drop
};

module.exports = DB;
