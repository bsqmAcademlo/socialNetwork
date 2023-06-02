const Comments = require("./comments.model");
const Follows = require("./follows.model");
const Likes = require("./likes.model");
const Posts = require("./posts.model");
const PostsMultimedia = require("./posts_multimedia.model");
const Users = require("./users.model");

const initModels = () => {
    // * User - Post 1 - M
    Users.hasMany(Posts);
    Posts.belongsTo(Users);

    // * Post - PostsMultimedia 1 - M
    Posts.hasMany(PostsMultimedia);
    PostsMultimedia.belongsTo(Posts);

    // * User - Post => Comments M - M
    Users.hasMany(Comments);
    Comments.belongsTo(Users);

    Posts.hasMany(Comments);
    Comments.belongsTo(Posts);

    // * User - Post => Likes  M - M
    Users.hasMany(Likes);
    Likes.belongsTo(Users);

    Posts.hasMany(Likes);
    Likes.belongsTo(Posts);

    // * User - User => Follows M - M
    Users.hasMany(Follows);
    Follows.belongsTo(Users, {
        foreignKey: "userId",
        as: "follower",
    });
    Follows.belongsTo(Users, {
        foreignKey: "userId2",
        as: "followed",
    });
};

module.exports = initModels;
