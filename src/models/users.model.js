const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const Users = db.define("users", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 255],
        },
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 255],
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    profileImg: {
        type: DataTypes.STRING,
    },
    rol: {
        type: DataTypes.ENUM("normal", "admin", "superAdmin"),
        defaultValue: "normal",
    },
    status: {
        type: DataTypes.ENUM("active", "banned", "inactive", "deleted"),
        defaultValue: "active",
    },
});

module.exports = Users;
