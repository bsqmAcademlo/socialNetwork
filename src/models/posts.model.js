const { DataTypes } = require("sequelize");
const db = require("../utils/database");
const Users = require("./users.model");

const Posts = db.define("posts", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Users,
            key: "id",
        },
    },
    status: {
        type: DataTypes.ENUM("active", "deleted"),
        defaultValue: "active",
    },
});

module.exports = Posts;
