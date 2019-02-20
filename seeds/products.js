require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const url = process.env.NODE_ENV === 'test' ? process.env.DB_MONGO_URL_TEST : process.env.DB_MONGO_URL;

// Connect to the db
MongoClient.connect(url, { useNewUrlParser: true })
  .then((connect) => {
    return connect.db('shop');
  })
  .then((db) => {
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, './products.json'), 'utf8'));
    return db.collection('products').insert(data);
  })
  .then((res) => console.log(`Succeed. Seeded ${res.insertedCount} records`))
  .catch(console.log);



