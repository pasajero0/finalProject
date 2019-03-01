const { response } = require('../lib/response');
const Product = require('../models/product-model');
const Department = require('../models/department-model');
/**
 * Get all products
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
exports.find = function getAllProducts(req, res, next) {
  const data = {
    perPage: parseInt(req.query.perPage, 10) || 10,
    page: parseInt(req.query.page, 10) || 1,
    records: [],
    count: 0,
    pagesTotal: 0,
    filters: {}
  };
  Promise.resolve()
    .then(() => {
      // if department is requested add to filter
      if (req.query.department) {
        return Department.findOne({ slug: req.query.department });
      }
      return Promise.resolve({});
    })
    .then((dep) =>{
      if (dep === null) {
        res.status(200).json(response(data));
        next();
        return null;
      }
      if( dep._id ){
        data.filters.product = { departmentIds: dep._id };
      };
      return Product.find(data.filters.product).skip(data.perPage * ( data.page - 1 )).limit(data.perPage);
    })
    .then((records) => {
      data.records = records;
      return Product.find(data.filters.product).countDocuments();
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

/**
 * Get all products
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
exports.findBySlug = function getProductBySlug(req, res, next) {

     Product.find({ slug: req.params.slug })
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json(response(result[0]));
      } else {
        res.status(404).json(response({}, 'No valid entry found', 1));
      }
      next();
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });
};
