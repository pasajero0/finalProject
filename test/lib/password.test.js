const {expect} = require('chai');
const password = require('../../lib/password');

const string = 'fgh567mn&*mdsfdf*hG565542';

describe('Password encryption tests', function () {
  describe('Required exports:', function () {
    let hash;
    it('encrypt:', function (done) {
      password.encrypt(string, (err, res) => {
        expect(res).to.be.a('string');
        hash = res;
        done();
      });
    });

    it('compare:', function (done) {
      password.compare(string, hash, (res) => {
        expect(res).to.be.true;
        password.compare("", hash, (res) => {
          expect(res).to.be.false;
          done();
        });
      });
    });
  });
});