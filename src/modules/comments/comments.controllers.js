const commentsServices = require("./comments.services");

const getCommentsByPost = async (req, res) => {
    try {
        const idPost = req.params.id;
        const data = await commentsServices.findAllCommentsByPost(idPost);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({
            message: "Bad Request",
            error: error,
        });
    }
};

const postNewComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;
        const { comment } = req.body;
        const data = await commentsServices.createComment({
            userId,
            postId,
            comment,
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({
            message: "Bad Request",
            error: error,
        });
    }
};

module.exports = {
    getCommentsByPost,
    postNewComment,
};
