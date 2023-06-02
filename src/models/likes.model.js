const { DataTypes } = require("sequelize");

const db = require("../utils/database");
const Users = require("./users.model");
const Posts = require("./posts.model");

const Likes = db.define("likes", {
    userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Users,
            key: "id",
        },
    },
    postId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Posts,
            key: "id",
        },
    },
});

module.exports = Likes;
