const uuid = require("uuid");
const Comments = require("../../models/comments.model");
const Posts = require("../../models/posts.model");
const Users = require("../../models/users.model");

const findAllCommentsByPost = async (postId) => {
    const comments = await Comments.findAll({
        where: { postId },
        include: [
            {
                model: Users,
                attributes: {
                    exclude: "password",
                },
            },
            {
                model: Posts,
            },
        ],
    });

    return comments;
};

const createComment = async (commentObj) => {
    const newComment = await Comments.create({
        id: uuid.v4(),
        userId: commentObj.userId,
        postId: commentObj.postId,
        comment: commentObj.comment,
    });

    return newComment;
};

const updateComment = async (commentId, commentObj) => {
    const commentSelected = await Comments.findOne({
        where: { id: commentId },
    });

    if (!commentSelected) return;

    const commentUpdated = await commentSelected.update({
        comment: commentObj.comment,
    });

    return commentUpdated;
};

const deleteComment = async (commentId) => {
    const commentSelected = await Comments.findOne({
        where: { id: commentId },
    });

    if (!commentSelected) return;

    const commentUpdated = await commentSelected.update({
        status: "deleted",
    });

    return commentUpdated;
};

module.exports = {
    findAllCommentsByPost,
    createComment,
    updateComment,
    deleteComment,
};
