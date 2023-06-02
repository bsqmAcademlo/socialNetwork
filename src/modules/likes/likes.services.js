const Likes = require("../../models/likes.model");
const Users = require("../../models/users.model");

const findAllLikesFromPost = async (postId) => {
    const likes = await Likes.findAndCountAll({
        where: {
            postId,
        },
        include: {
            model: Users,
            attributes: {
                exclude: ["password"],
            },
        },
    });

    return likes;
};

const createLikes = async (likeObj) => {
    const existLike = await Likes.findOne({
        where: {
            userId: likeObj.userId,
            postId: likeObj.postId,
        },
    });

    if (existLike) {
        await existLike.destroy();
        return false;
    }

    await Likes.create({
        userId: likeObj.userId,
        postId: likeObj.postId,
    });

    return true;
};

module.exports = {
    findAllLikesFromPost,
    createLikes,
};
