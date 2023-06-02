const likesServices = require("./likes.services");

const getAllLikesByPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const data = await likesServices.findAllLikesFromPost(postId);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({
            message: "Bad Request",
            error: error,
        });
    }
};

const postNewLike = async (req, res) => {
    const userId = req.user.id;
    const postId = req.params.id;

    const data = await likesServices.createLikes({
        userId,
        postId,
    });

    res.status(200).json(data);
    try {
    } catch (error) {
        res.status(400).json({
            message: "Bad Request",
            error: error,
        });
    }
};

module.exports = {
    getAllLikesByPost,
    postNewLike,
};
