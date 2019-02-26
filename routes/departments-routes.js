const router = require('express').Router();

const departmentController = require('../controllers/departments-controller');

router.get('/', departmentController.find);

module.exports = router;
