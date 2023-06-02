const bcrypt = require("bcrypt");

function hashPassword(plainPassword) {
    return bcrypt.hashSync(plainPassword, 10);
}

function comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
}

module.exports = {
    hashPassword,
    comparePassword,
};
