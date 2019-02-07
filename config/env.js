require('dotenv').config();

const required = {
  DB_MONGO_URL: null,
  DB_MONGO_URL_TEST: null,
  SESSION_SECRET_KEY: null,
  NODE_ENV: 'development'
};

let ready = true;

Object.keys(required).forEach((name) => {
  if (!process.env[name]) {
    console.log(`Required environment variable ${name} is not set`);
    if(required[name] === null){
      console.log(`Please configure ${name} to run the server`);
      ready = false;
    }else{
      process.env[name] = required[name];
      console.log(`The value of ${name} set to default value "${required[name]}"`);
    }
  }
});

if (!ready) {
  console.log('Please configure required environment variables to run the server');
  process.exit();
}
