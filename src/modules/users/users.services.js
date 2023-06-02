const Users = require("../../models/users.model");
const uuid = require("uuid");
const { hashPassword } = require("../../utils/crypto");

async function findAllUsers() {
    try {
        const data = await Users.findAll({
            attributes: {
                exclude: ["password"],
            },
        });
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function findUserById(id) {
    try {
        const data = await Users.findOne({
            where: { id },
            exclude: ["password"],
        });
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function findUserByEmail(email) {
    try {
        const data = await Users.findOne({
            where: {
                email,
            },
        });

        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function createUser(userObj) {
    try {
        const newUser = {
            id: uuid.v4(),
            firstName: userObj.firstName,
            lastName: userObj.lastName,
            email: userObj.email,
            password: hashPassword(userObj.password),
        };

        const data = await Users.create(newUser);
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function updateUser(id, userUpdate) {
    try {
        const userFind = await findUserById(id);
        if (!userFind) return;
        const data = await userFind.update(userUpdate);
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function deleteUser(id) {
    // softDeleted
    try {
        const userFind = await findUserById(id);
        if (!userFind) return null;
        const data = await userFind.update({
            status: "deleted",
        });
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

module.exports = {
    findAllUsers,
    findUserById,
    findUserByEmail,
    createUser,
    updateUser,
    deleteUser,
};
