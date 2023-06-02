const Users = require("../../models/users.model");
const Follows = require("../../models/follows.model");

const findAllFollowingByUser = async (userId) => {
    // buscando a las personas que me siguen
    const follows = await Follows.findAll({
        where: {
            userId,
        },
        include: {
            model: Users,
            as: "followed",
        },
    });

    return follows.map(({ followed }) => followed);
};

const findAllFollowersByUser = async (userId) => {
    // buscando a las personas que yo sigo
    const follows = await Follows.findAll({
        where: {
            userId2: userId,
        },
        include: {
            model: Users,
            as: "follower",
        },
    });

    return follows.map(({ follower }) => follower);
};

const createFollowToUser = async (followObj) => {
    const newFollow = await Follows.create({
        userId: followObj.userId,
        userId2: followObj.userId2,
    });

    return newFollow;
};

const deleteFollowToUser = async (followObj) => {
    const deletedFollow = await Follows.destroy({
        where: {
            userId: followObj.userId,
            userId2: followObj.userId2,
        },
    });

    return deletedFollow;
};

module.exports = {
    findAllFollowingByUser,
    findAllFollowersByUser,
    createFollowToUser,
    deleteFollowToUser,
};
