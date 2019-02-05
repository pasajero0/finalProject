const mongoose = require('mongoose');
const { response } = require('../lib/response');
const Customer = require('../models/customer-model');


function mongooseErrorToResponse(src) {
  const data = {};
  if(src.errors) {
    const keys = Object.keys(src.errors);
    if(keys.length > 0) {
      keys.forEach((v) => {
        data[v] = src.errors[v].message;
      });
    }
  }
  return response(data, src.message, 1);
}

function formDataToCustomer(source) {
  if (source && 'customer' in source && 'password' in source) {
    return new Customer({
      _id: new mongoose.Types.ObjectId(),
      password: source.password,
      email: source.customer.email,
      login: source.customer.login,
      first_name: source.customer.first_name,
      last_name: source.customer.last_name
    });
  }
  return null;
}

/**
 * Add new customer to database
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
exports.add = function addNewCustomer(req, res, next) {
  const customer = formDataToCustomer(req.body);
  if (customer === null) {
    res.status(200).json(response({}, 'Invalid incoming data', 1));
    next();
  } else {
    customer.save()
      .then((result) => {
        res.status(200).json(response(result.toJSON()));
        next();
      })
      .catch((err) => {
        res.status(200).json(mongooseErrorToResponse(err));
        next();
      });
  }
};
/**
 * Get customer by id
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
exports.findById = function getCustomerById(req, res, next) {
  Customer.find({_id: new mongoose.Types.ObjectId(req.params.id)})
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json(response(result));
      } else {
        res.status(404).json(response({}, 'No valid entry found', 1));
      }
      next();
    })
    .catch((err) => {
      res.status(500).json({error: err});
      next();
    });
};
/**
 * Get all customers
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
exports.find = function getAllCustomers(req, res, next) {
  Customer.find()
    .then((result) => {
      res.status(200).json(response(result));
      next();
    })
    .catch((err) => {
      res.status(500).json({error: err});
      next();
    });
};
/**
 * Update customer data
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
exports.update = function updateCustomerData(req, res, next) {
  Customer.update({_id: req.body.id},
    {
      $set: {
        password: req.body.password,
        email: req.body.customer.email,
        login: req.body.customer.login,
        first_name: req.body.customer.first_name,
        last_name: req.body.customer.last_name
      }
    })
    .then((result) => {
      if (result) {
        res.status(200).json(response(result));
      } else {
        res.status(404).json(response({}, 'No valid entry found', 1));
      }
      next();
    })
    .catch((err) => {
      res.status(500).json({error: err});
      next();
    });
};
/**
 * Show profile information of stored in session user
 * @param req
 * @param res
 * @param next
 */
exports.profile = function customerProfile(req, res, next) {
  res.status(200).json(response(req.user));
  next();
};
