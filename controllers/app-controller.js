const { response } = require('../lib/response');
const Department = require('../models/department-model');
/**
 * Get initial data for the client application
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
exports.getInitialData = function getInitialData(req, res, next) {
  Department.find()
    .then((records) => {
      res.status(200).json(response({
        departments: records,
        customer: req.user
      }));
      next();
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });
};


