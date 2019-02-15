const router = require('express').Router();
const passwordController = require('../controllers/password-controller');

router.post('/save', passwordController.saveNewPassword);

router.post('/send-token', passwordController.sendRestorePasswordMail);

module.exports = router;
