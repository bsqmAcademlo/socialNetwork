const usersServices = require("../modules/users/users.services");
const { comparePassword } = require("../utils/crypto");

async function checkUserCredentials(email, password) {
    try {
        const user = await usersServices.findUserByEmail(email);
        const validatePassword = comparePassword(password, user.password);

        if (!validatePassword) return;
        return user;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    checkUserCredentials,
};
