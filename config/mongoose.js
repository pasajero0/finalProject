const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

const url = process.env.NODE_ENV === 'test' ? process.env.DB_MONGO_URL_TEST : process.env.DB_MONGO_URL;


console.log(url);
exports.connect = () => {
  mongoose.connect(url, { useNewUrlParser: true, promiseLibrary: true })
    .then();
};

exports.disconnect = () => {
  mongoose.connection.close();
};
