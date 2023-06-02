const { DataTypes } = require("sequelize");
const db = require("../utils/database");
const Users = require("./users.model");
const Posts = require("./posts.model");

const Comments = db.define("comments", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Users,
            key: "id",
        },
    },
    postId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Posts,
            key: "id",
        },
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("active", "deleted"),
        defaultValue: "active",
    },
});

module.exports = Comments;
