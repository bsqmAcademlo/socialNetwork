const { DataTypes } = require("sequelize");
const db = require("../utils/database");
const Posts = require("./posts.model");

const PostsMultimedia = db.define("posts_multimedia", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    postId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Posts,
            key: "id",
        },
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true,
        },
    },
    type: {
        type: DataTypes.ENUM("img", "video", "reel"),
        allowNull: false,
        defaultValue: "img",
    },
    status: {
        type: DataTypes.ENUM("active", "deleted"),
        defaultValue: "active",
    },
});

module.exports = PostsMultimedia;
