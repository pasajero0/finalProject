require('dotenv').config();

const logger = require('morgan');

const bodyParser = require('body-parser');

const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const hostname = '127.0.0.1';
const passport = require('passport');
const usersRouter = require('./routes/users');

// middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

app.use(express.static('frontend/public'));
// before all //
app.use((req, res, next) => {
  next();
});

// nested routes
app.get('/', (req, res) => {
  res.send('HOMEPAGE');
});
app.use('/users', usersRouter);

app.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect(`/users/${req.user.username}`);
  });

// after all //
app.use((req, res, next) => {
  next();
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
