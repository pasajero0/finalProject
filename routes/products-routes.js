const router = require('express').Router();

const productController = require('../controllers/products-controller');

router.get('/', productController.find);

router.get('/sale', productController.findOnSale);

router.get('/new', productController.findNew);

router.get('/:slug', productController.findBySlug);

module.exports = router;
