const router = require('express').Router();
const passport = require('passport');

const {response} = require('../lib/response');
const customerController = require('../controllers/customers-controller');

router.get('/', customerController.find);

router.post('/', customerController.add);

router.put('/:id', customerController.update);

router.post('/auth', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(200).json(response({}, info.message, 1));
      return next();
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      if (req.body.remember) {
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
      } else {
        req.session.cookie.expires = false; // Cookie expires at end of session
      }
      res.status(200).json(response({}, 'You have been logged in', 0));
      return next();
    });
  })(req, res, next);
});

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn('/customers/auth'),
  customerController.profile);

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json(response({}, 'You have been logged out', 0));
});

router.post('/is-authenticated',  (req, res) => {
  res.status(200).json(response({ isAuthenticated: !!req.user }, '', 0));
});

module.exports = router;
