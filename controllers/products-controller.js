const { response } = require('../lib/response');
const Product = require('../models/product-model');

/**
 * Get all products
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
exports.find = function getAllProducts(req, res, next) {
  const data = {
    perPage: parseInt(req.query.perPage, 10) || 10,
    page: parseInt(req.query.page, 10) || 1
  };

  Product.find().skip(data.perPage * ( data.page - 1 )).limit(data.perPage)
    .then((records) => {
      data.records = records;
      return Product.find().count();
    })
    .then((count) => {
      data.count = count;
      data.pagesTotal = Math.ceil(count / data.perPage);
      res.status(200).json(response(data));
      next();
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });
};
