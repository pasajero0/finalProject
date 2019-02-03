const router = require('express').Router();
const dbClose = require('../lib/db').close;

const userController = require('../controllers/users');

router.get('/', userController.getAll);

router.post('/', userController.add);

router.get('/:id', userController.getById);

router.put('/:id', userController.update);

router.delete('/:id', userController.removeById);

router.use(function (req, res, next) {
  dbClose();
  next();
});

module.exports = router;
