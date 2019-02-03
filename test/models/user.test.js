const {expect} = require('chai');
const user = require('../../models/user');

describe('User model tests', function () {
  describe('Required exports:', function () {
    const testUserData = {
      name: 'ringo',
      surname: 'star',
      email: 'ringo.star@example.com'
    };
    const newEmail = 'ringo.star@gmail.com';
    const invalidEmail = 'foo';
    const where = {email: newEmail};

    it('add: good data', function (done) {
      user.add(testUserData)
        .then(res => {
          expect(testUserData).to.be.an('object').to.include.key('_id');
          done();
        })
        .catch(err => {
          console.log(err)
        });
    });

    it('add: duplicate data', function (done) {
      user.add(testUserData)
        .then(res => {
        })
        .catch(err => {
          expect(function () {
            throw err;
          }).to.throw();
          done();
        });
    });

    it('add: invalid email', function (done) {
      user.add({...testUserData, email: invalidEmail})
        .then(res => {
        })
        .catch(err => {
          expect(function () {
            throw err;
          }).to.throw();
          done();
        });
    });

    it('findById:', function (done) {
      user.findById(testUserData._id)
        .then((res) => {
          expect(res[0]).to.deep.equal(testUserData);
          done();
        })
    });


    it('update:', function (done) {
      user.update(testUserData._id, {email: newEmail})
        .then(() => {done();})
        .catch(err => {
          console.log(err)
        });
    });

    it('count:', function (done) {
      user.count(where)
        .then(res => {
          expect(res).to.be.a('number');
          expect(res).to.be.greaterThan(0);
          done();
        })
        .catch(err => {
          console.log(err)
        });
    });

    it('all:', function (done) {
      user.all(where, 0, 1)
        .then((res) => {
          expect(res).to.have.lengthOf(1);
          done();
        })
        .catch((err) => {
          console.log(err)
        });
    });

    it('removeById:', function (done) {
      user.removeById(testUserData._id)
        .then(() => {
          done();
        })
        .catch((err) => {
          console.log(err)
        });
    });
  });
});
