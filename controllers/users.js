const { response } = require('../lib/response');
const User = require('../models/user');

exports.add = function addNewUser(req, res, next) {
  User.add(req.body)
    .then(() => {
      res.send(response(req.body));
      next();
    })
    .catch((err) => {
      res.send(response(err.extra, err.message, 1));
      next();
    });
};

exports.update = function updateUserData(req, res, next) {
  const { _id, ...data } = req.body;
  User.update(req.params.id, data)
    .then(() => {
      res.send(response(req.body));
      next();
    })
    .catch((err) => {
      res.send(response(err.extra, err.message, 1));
      next();
    });
};

exports.getById = function getUserById(req, res, next) {
  User.findById(req.params.id)
    .then((result) => {
      res.send(response(result[0]));
      next();
    })
    .catch((err) => {
      res.send(response(err.extra, err.message, 1));
      next();
    });
};

exports.removeById = function addNewUser(req, res, next) {
  User.removeById(req.params.id)
    .then(() => {
      res.send(response(req.body));
      next();
    })
    .catch((err) => {
      res.send(response(err.extra, err.message, 1));
      next();
    });
};

exports.getAll = function getAllUsers(req, res, next) {
  const where = {};
  const skip = 0;
  const limit = 10;

  Promise.all([
    User.all(where, skip, limit),
    User.count(where),
  ]).then((values) => {
    const [list, count] = values;
    res.send(response({ documents: list, count }));
    next();
  }).catch((err) => {
    res.send(response(err.extra, err.message, 1));
    next();
  });
};
