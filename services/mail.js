/**
 * https://nodemailer.com/about/
 */
const nodemailer = require('nodemailer');
const { NODE_ENV, MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, ETHERNAL_USER, ETHERNAL_PASS } = process.env;

let mailConfig;

if (NODE_ENV === 'production') {
  mailConfig = {
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: MAIL_PORT === 465, // true for 465, false for other ports
    auth: {
      user: MAIL_USER, // generated ethereal user
      pass: MAIL_PASS // generated ethereal password
    }
  };
} else {
  // all emails are catched by https://ethereal.email
  mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: ETHERNAL_USER,
      pass: ETHERNAL_PASS
    }
  };
}

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(mailConfig);

// async..await is not allowed in global scope, must use a wrapper
exports.mail = (from, to, subject, text, html) => {
  // send mail with defined transport object
  return transporter.sendMail({
    from, to, subject, text, html
  }).then((info) => {
    if (NODE_ENV !== 'production') {
      console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
    return Promise.resolve(info);
  });
};
