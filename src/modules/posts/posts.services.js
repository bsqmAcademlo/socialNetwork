const uuid = require("uuid");
const Posts = require("../../models/posts.model");
const Users = require("../../models/users.model");
const MultimediaPost = require("../../models/posts_multimedia.model");
const PostsMultimedia = require("../../models/posts_multimedia.model");
const { HOST } = require("../../../config");

const findAllPost = async (offset, limit) => {
    const posts = await Posts.findAndCountAll({
        offset,
        limit,
        include: [
            {
                model: Users,
            },
            {
                model: MultimediaPost,
            },
        ],
    });
    return posts;
};

const findPostById = async (id) => {
    const post = await Posts.findOne({
        where: { id },
    });
    return post;
};

const findPostUserId = async (userId) => {
    const userFound = await Users.findOne({
        where: { id: userId },
    });

    if (!userFound) return null;

    const posts = await Posts.findAll({
        where: { userId: userId },
        include: {
            model: Users,
            attributes: {
                include: ["id", "firstName", "lastName", "password"],
            },
        },
    });

    return posts;
};

const createPost = async (postObj) => {
    const newPost = await Posts.create({
        id: uuid.v4(),
        content: postObj.content,
        userId: postObj.userId,
    });

    return newPost;
};

const updatePost = async (id, userId, postObj) => {
    const selectedPost = await Posts.findOne({
        where: { id, userId },
    });
    if (!selectedPost) return null;
    const updatedPost = await selectedPost.update(postObj);
    return updatedPost;
};

const deletePost = async (id, userId) => {
    // softDeleted
    const selectedPost = await Posts.findOne({
        where: { id, userId },
    });
    if (!selectedPost) return null;
    const updatedPost = await selectedPost.update({
        status: "deleted",
    });
    return updatedPost;
};

const createMultimediaPost = async (multimediaPostObj, postId) => {
    const multimediaPostData = multimediaPostObj.map((obj) => ({
        id: uuid.v4(),
        url: `${HOST}/api/v1/uploads/${obj.filename}`,
        type: obj.type,
        status: "active",
        postId,
    }));

    const newMultimediaPost = await PostsMultimedia.bulkCreate(
        multimediaPostData
    );

    return newMultimediaPost;
};

module.exports = {
    findAllPost,
    findPostById,
    findPostUserId,
    createPost,
    updatePost,
    deletePost,
    createMultimediaPost,
};
