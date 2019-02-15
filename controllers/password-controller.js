const mongoose = require('mongoose');
const uniqid = require('uniqid');
const { response } = require('../lib/response');
const Customer = require('../models/customer-model');
const { mail } = require('../services/mail');

/**
 * Check if current user has credentials to save new password
 * @param inDbToken {string}
 * @param inDbTokenTime {number}
 * @param reqToken {string}
 * @param reqEmail {string}
 * @param userEmail {string}
 * @returns {*|boolean}
 */
function hasCredentialsToSaveNewPassword(inDbToken, inDbTokenTime, reqToken, reqEmail, userEmail) {
  return (!!inDbToken && inDbToken === reqToken && inDbTokenTime > (new Date().getTime()))
    || (!!reqEmail && reqEmail === userEmail);
}

/**
 * Send email to the customer with restore password link
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
exports.sendRestorePasswordMail = function findUserByEmailAndSendResetPasswordMail(req, res, next) {
  const token = uniqid();
  Customer.updateOne({ email: req.body.email },
    {
      $set: {
        reset_password_token: token,
        reset_password_token_time: (new Date()).getTime() + (60 * 60 * 24 * 1000)
      }
    })
    .then((result) => {
      if (result.nModified > 0) {
        mail(
          process.env.MAIL_FROM,
          req.body.email,
          'Reset password link',
          `/restore-password/${token}`,
          `<p>/restore-password/${token}</p>`
        )
          .then(() => {
            res.status(200).json(response({}, 'Reset password link has been sent', 0));
            next();
          });
      } else {
        res.status(200).json(response({}, 'No valid entry found', 1));
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });
};


/**
 * Send email to the customer with restore password link
 * @param req {object}
 * @param res {object}
 * @param next {Function}
 */
exports.saveNewPassword = function findUserByEmailAndSaveNewPassword(req, res, next) {
  if (!req.body.email || !req.body.token || !req.body.password) {
    res.status(200).json(response({}, 'Required data is missing', 1));
    return next();
  }
  Customer.find({ email: req.body.email })
    .then((found) => {
      if (found.length === 0) {
        res.status(200).json(response({}, 'User not found', 1));
        return next();
      }
      const customer = new Customer(found[0]);
      const credential = hasCredentialsToSaveNewPassword(
        customer.reset_password_token,
        customer.reset_password_token_time,
        req.body.token,
        req.body.email,
        req.user ? req.user.email : ''
      );

      if ( credential === false ) {
        res.status(200).json(response({}, 'Token is invalid or outdated', 1));
        return next();
      }

      customer.reset_password_token_time = undefined;
      customer.reset_password_token = undefined;
      customer.password = req.body.password;

      customer.save()
        .then(() => {
          res.status(200).json(response({}, 'New password has been saved', 0));
          return next();
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next();
    });
};


