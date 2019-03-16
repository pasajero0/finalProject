const router = require('express').Router();

const appController = require('../controllers/app-controller');

router.get('/initial-data', appController.getInitialData);


module.exports = router;
