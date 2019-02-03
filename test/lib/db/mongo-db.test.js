require('dotenv').config();

const expect = require('chai').expect;
const DB = require('../../../lib/db/mongo-db');

describe('MongoDB helpers test', function () {

  describe('sample tests:', function () {
    const src = {a: 1, b: 1};

    it('insertOne:', function (done) {
      DB.insertOne('test', src)
        .then(() => {
          expect(src).to.have.all.keys('a', 'b', '_id');
          done();
        });
    });

    it('findById:', function (done) {
      DB.findById('test', src._id)
        .then((res) => {
          expect(res[0]).to.deep.equal(src);
          done();
        });
    });

    it('updateById:', function (done) {
      const {_id, ...source} = src;
      DB.updateById('test', _id, {...source, foo: 'bar'})
        .then(()=> {
          done();
        });
    });

    it('count:', function (done) {
      DB.count('test', {})
        .then((res) => {
          expect(res).to.be.a('number');
          expect(res).to.be.greaterThan(-1);
          done();
        });
    });

    it('drop:', function (done) {
      DB.drop('test')
        .then(() => done());
    });

    after(function () {
      setTimeout(() => process.exit(), 500);
    });
  });
});
