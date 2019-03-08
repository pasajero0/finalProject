const router = require('express').Router();

const orderController = require('../controllers/orders-controller');

router.post('/add', orderController.add);

module.exports = router;