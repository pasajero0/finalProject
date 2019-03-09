require('./config/env');
require('./config/passport');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const FileStore = require('session-file-store')(session);
const path = require('path');
const flash = require('connect-flash');
const cors = require('cors');

const customersRoutes = require('./routes/customers-routes');
const productsRoutes = require('./routes/products-routes');
const passwordRoutes = require('./routes/password-routes');
const departmentsRoutes = require('./routes/departments-routes');
const ordersRoutes = require('./routes/orders-routes');

const app = express();
const port = process.env.PORT || 5000;
const hostname = '127.0.0.1';

const { connect } = require( './config/mongoose' );

process.on('unhandledRejection', () => {});
// middlewares //
/*
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST');
  next();
});
*/

app.use(cors({
  origin:['http://localhost:3000'],
  methods:['GET','POST', 'PUT'],
  credentials: true // enable set cookie
}));

app.use(morgan('combined'));
app.use(flash());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());
app.use(session({
  store: new FileStore({retries: 0}),
  secret: process.env.SESSION_SECRET_KEY,
  resave: true,
  saveUninitialized: false,
  cookie:{
    secure: false,
    httpOnly: false
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// before all //

app.use('/product-images', express.static(__dirname + '/images/products'));

app.use((req, res, next) => {
  next();
});

app.use('/customers', customersRoutes);
app.use('/departments', departmentsRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

app.use('/password', passwordRoutes);
// after all //

app.use((req, res, next) => {
  next();
});

connect()
  .then(() => {
    app.listen(port, hostname, () => {
      if(process.env.NODE_ENV === 'development') {
        console.log(`Server running at http://${hostname}:${port}/`);
      }
    });
  })
  .catch(console.log);

module.exports = app;
