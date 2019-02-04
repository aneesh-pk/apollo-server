const bcrypt = require('bcrypt');

const encryptPassword = (password) => {
    return new Promise((resolve) => {
        bcrypt.hash(password, 10).then(hash => {
            resolve(hash)
        });
    });
}

const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
}

module.exports.encryptPassword = encryptPassword;
module.exports.comparePassword = comparePassword;