require('dotenv').config();

const validator = require('validator');
const dbInsertOne = require('../lib/db').insertOne;
const dbFind = require('../lib/db').find;
const dbFindById = require('../lib/db').findById;
const dbCount = require('../lib/db').count;
const dbUpdateById = require('../lib/db').updateById;
const dbRemove = require('../lib/db').removeById;

const ModelError = require('./model-error');
/**
 * Validate email. Return promise
 * @param email
 * @returns {Promise}
 */
const validateEmail = (email) => {
  return new Promise((resolve, reject) => {
    if (!email || validator.isEmpty(email)) {
      reject(new ModelError('E-mail is required', { email: 'E-mail is required' }));
    }
    if (!validator.isEmail(email)) {
      reject(new ModelError('Not valid E-mail address', { email: 'Not valid E-mail address' }));
    }
    resolve(true);
  });
};
/**
 * Add new user to database
 * @param data {object}
 * @returns {Promise}
 */
exports.add = function addUserToDatabase(data) {
  return validateEmail(data.email)
    .then(() => dbFind('users', { email: data.email }, 0, 1))
    .then((res) => {
      if (res.length > 0 && res[0]._id !== data._id) {
        throw new ModelError('E-mail already exists', { email: 'E-mail already exists' });
      } else {
        return dbInsertOne('users', data);
      }
    })
    .catch((err) => {
      throw err;
    });
};
/**
 * Find the user in database by id
 * @param id {string} - document id
 * @returns {*}
 */
exports.findById = function findUserByIdInDatabase(id) {
  return dbFindById('users', id);
};
/**
 *
 * @param id
 * @param data
 * @returns {Promise}
 */
exports.update = function updateUserByIdInDatabase(id, data) {
  return validateEmail(data.email)
    .then(() => dbFind('users', { email: data.email }, 0, 1))
    .then((res) => {
      if (res.length > 0 && res[0]._id !== id) {
        throw new ModelError('E-mail already exists', { email: 'E-mail already exists' });
      } else {
        return dbUpdateById('users', id, data);
      }
    })
    .catch((err) => {
      throw err;
    });
};

exports.count = function countUsersFromDatabase(where = {}) {
  return dbCount('users', where);
};

exports.all = function getAllUsersFromDatabase(where = {}, skip = 0, limit = 10) {
  return dbFind('users', where, skip, limit);
};

exports.removeById = function removeUserByIdFromDatabase(id, cb) {
  return dbRemove('users', id, cb);
};
