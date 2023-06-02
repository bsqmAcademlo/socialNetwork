const usersServices = require("./users.services");

async function getUsers(req, res) {
    try {
        const data = await usersServices.findAllUsers();
        res.status(200).json({ data, user: req.user });
    } catch (error) {
        res.status(400).json({
            message: "Bad request",
        });
    }
}

async function getUser(req, res) {
    try {
        const id = req.params.id;
        const data = await usersServices.findUserById(id);
        if (!data)
            return res.status(404).json({ message: `ID ${id} no found` });
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({
            message: "Bad request",
        });
    }
}

async function postUser(req, res) {
    try {
        const newUser = req.body;
        const data = await usersServices.createUser(newUser);

        if (data.errors) {
            if (data.name === "SequelizeUniqueConstraintError")
                return res.status(400).json({ message: "El correo ya existe" });
        }

        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({
            message: "Bad request",
            error,
        });
    }
}

async function patchUser(req, res) {
    try {
        const id = req.params.id;
        const userUpdate = req.body;

        const data = await usersServices.updateUser(id, userUpdate);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({
            message: "Bad request",
        });
    }
}

async function deleteUser(req, res) {
    const id = req.params.id;
    try {
        const data = await usersServices.deleteUser(id);
        if (!data)
            return res.status(404).json({ message: `ID ${id} no found` });
        res.status(204).json();
    } catch (error) {
        res.status(400).json({
            message: "Bad request",
        });
    }
}

function getMyUser(req, res) {
    const user = req.user;
    res.status(200).json(user);
}

module.exports = {
    getUsers,
    getUser,
    getMyUser,
    postUser,
    patchUser,
    deleteUser,
};
