process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const request = require('supertest');
const chai = require('chai');

const app = require('../../server');
const { expect } = chai;

const Customer = require('../../models/customer-model');
const Counter = require('../../models/counter-model');

mongoose.set('useCreateIndex', true);

const newPassword = 'qwe567m,.ert';
const newCustomer = new Customer({
  _id: new mongoose.Types.ObjectId(),
  password: newPassword,
  login: 'john-smith',
  first_name: 'john',
  last_name: 'smith',
  email: 'johnsmith@gmail.om'
});
const newCounter = new Counter({
  _id: new mongoose.Types.ObjectId(),
  subject: 'customer',
  count: 333
});
const validCustomerData = {
  password: 'anyPassword',
  customer: {
    login: 'bob',
    first_name: 'bob',
    last_name: 'johnson',
    email: 'bobjohnson@gmail.com'
  }
};
const validAuthData = {login: validCustomerData.customer.login, password: validCustomerData.password};

// Auxiliary function.
const authenticatedRequest = (loginDetails, done) => {
  const req = request.agent(app);
  req
    .post('/customers/auth')
    .send(loginDetails)
    .end((error, response) => {
      if (error) {
        throw error;
      }
      done(req);
    });
};

before((done) => {
  Customer.deleteMany({})
    .then(() => Counter.deleteMany())
    .then(() => newCounter.save())
    .then(() => newCustomer.save())
    .then(() => done())
    .catch(console.log);
});

after((done) => {
  Customer.deleteMany({email: { $in: [validCustomerData.customer.email, newCustomer.email]}})
    .then(() => done())
    .catch(console.log);
});

describe('API Integration Tests', () => {

  describe('POST /customers', () => {

    it('should fail on missing form fields', (done) => {
      request(app)
        .post('/customers')
        .send({})
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys(['data', 'message', 'success']);
          expect(res.body.success).to.be.a('boolean').to.be.false;
          expect(res.body.message).to.be.an('string').that.is.not.empty;
          done();
        });
    });

    it('should fail on missing required incoming data', (done) => {
      const emptyCustomerData = {
        password: '',
        customer: {
          login: '',
          first_name: '',
          last_name: '',
          email: ''
        }
      };
      request(app)
        .post('/customers')
        .send(emptyCustomerData)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys(['data', 'message', 'success']);
          expect(res.body.success).to.be.a('boolean').to.be.false;
          expect(res.body.message).to.be.an('string').that.is.not.empty;
          done();
        });
    });

    it('should fail on invalid incoming data', (done) => {
      const invalidCustomerData = {
        password: 'u',
        customer: {
          login: 'a',
          first_name: 'a',
          last_name: 'a',
          email: 'c'
        }
      };
      request(app)
        .post('/customers')
        .send(invalidCustomerData)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys(['data', 'message', 'success']);
          expect(res.body.success).to.be.a('boolean').to.be.false;
          expect(res.body.message).to.be.an('string').that.is.not.empty;
          done();
        });
    });

    it('should add a customer', (done) => {

      request(app)
        .post('/customers')
        .send(validCustomerData)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys(['data', 'message', 'success']);
          expect(res.body.success).to.be.a('boolean').to.be.true;
          expect(res.body.message).to.be.a('string').that.is.empty;
          let date = new Date(new Date(res.body.data.creation_date)).toUTCString();
          expect(res.body.data.creation_date).to.be.a('string', date);
          expect(res.body.data.customer_no).to.be.a('string').to.have.lengthOf(10);
          expect(res.body.data.email).to.be.a('string', validCustomerData.email);
          expect(res.body.data.login).to.be.a('string', validCustomerData.login);
          expect(res.body.data.first_name).to.be.a('string', validCustomerData.first_name);
          expect(res.body.data.last_name).to.be.a('string', validCustomerData.last_name);
          expect(mongoose.Types.ObjectId.isValid(res.body.data.customer_id)).to.be.true;
          done();
        });

    });

    it('should fail on same incoming data', (done) => {
      request(app)
        .post('/customers')
        .send(validCustomerData)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys(['data', 'message', 'success']);
          expect(res.body.success).to.be.a('boolean').to.be.false;
          expect(res.body.message).to.be.an('string').that.is.not.empty;
          done();
        });
    });

  });

  describe('/POST customers/auth', () => {
    it('should fail on missing password or username', (done) => {
      request(app)
        .post('/customers/auth')
        .send({})
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys(['data', 'message', 'success']);
          expect(res.body.success).to.be.a('boolean').to.be.false;
          expect(res.body.message).to.be.an('string').that.is.not.empty;
          done();
        });
    });

    it('should fail to log in on incorrect password or username', (done) => {
      request(app)
        .post('/customers/auth')
        .send({login: 'foo', password: 'bar'})
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys(['data', 'message', 'success']);
          expect(res.body.success).to.be.a('boolean').to.be.false;
          expect(res.body.message).to.be.an('string').that.is.not.empty;
          done();
        });
    });

    it('should succeed with correct password and username', (done) => {
      request(app)
        .post('/customers/auth')
        .send(validAuthData)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys(['data', 'message', 'success']);
          expect(res.body.success).to.be.a('boolean').to.be.true;
          expect(res.body.message).to.be.a('string').that.is.not.empty;
          expect(res.body.data.session_id).to.be.a('string');
          done();
        });
    });
  });

  describe('/GET customers/logout', () => {
    it('should successfully logout', (done) => {
      request(app)
        .get('/customers/logout')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.all.keys(['data', 'message', 'success']);
          expect(res.body.success).to.be.a('boolean').to.be.true;
          expect(res.body.message).to.be.a('string').that.is.not.empty;
          done();
        });
    });
  });

  describe('/GET customers/profile', () => {

    it('should not load data without authentication', (done) => {
      request(app)
        .get('/customers/profile')
        .end((err, res) => {
          expect(res.statusCode).to.equal(302);
          done();
        });
    });

    it('should fetch user data', (done) => {

      authenticatedRequest(validAuthData, (request) => {
        request
          .get('/customers/profile')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.all.keys(['data', 'message', 'success']);
            expect(res.body.success).to.be.a('boolean').to.be.true;
            expect(res.body.message).to.be.a('string').that.is.empty;
            let date = new Date(new Date(res.body.data.creation_date)).toUTCString();
            expect(res.body.data.creation_date).to.be.a('string', date);
            expect(res.body.data.customer_no).to.be.a('string').to.have.lengthOf(10);
            expect(res.body.data.email).to.be.a('string', validCustomerData.email);
            expect(res.body.data.login).to.be.a('string', validCustomerData.login);
            expect(res.body.data.first_name).to.be.a('string', validCustomerData.first_name);
            expect(res.body.data.last_name).to.be.a('string', validCustomerData.last_name);
            expect(mongoose.Types.ObjectId.isValid(res.body.data.customer_id)).to.be.true;
            done();
          });
      });
    });
  });

});

