const bcrypt = require('bcryptjs');

/**
 * String to hash encrypt function
 * @param password {string}
 * @param callback {function} - function (err, hash)=>{}
 */
exports.encrypt = function cryptPassword(password, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, callback);
  });
};

/**
 * Compare string to the hashed one
 * @param password {string}
 * @param hash {string}
 * @param callback {function} - function (res)=>{} - res is boolean
 */

exports.compare = function comparePassword(password, hash, callback) {
  bcrypt.compare(password, hash).then(callback);
};
