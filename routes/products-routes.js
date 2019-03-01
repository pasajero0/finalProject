const router = require('express').Router();

const productController = require('../controllers/products-controller');

router.get('/', productController.find);

router.get('/:slug', productController.findBySlug);

module.exports = router;
