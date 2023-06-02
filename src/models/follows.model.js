const { DataTypes } = require("sequelize");
const db = require("../utils/database");
const Users = require("./users.model");

const Follows = db.define("follows", {
    // ! follower - Usuario que sigue a alguien
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Users,
            key: "id",
        },
    },
    // ! followed - Usuario que es seguido por alguien
    userId2: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Users,
            key: "id",
        },
    },
});

module.exports = Follows;
