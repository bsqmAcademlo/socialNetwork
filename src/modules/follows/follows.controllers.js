const followsServices = require("./follows.services");

const getFollowing = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = await followsServices.findAllFollowingByUser(userId);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({
            message: "Bad request",
            error,
        });
    }
};

const getFollowers = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = await followsServices.findAllFollowersByUser(userId);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({
            message: "Bad request",
            error,
        });
    }
};

const newFollow = async (req, res) => {
    try {
        const userId = req.user.id;
        const userId2 = req.params.id;

        const data = await followsServices.createFollowToUser({
            userId,
            userId2,
        });

        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({
            message: "Bad request",
            error,
        });
    }
};

const deleteFollow = async (req, res) => {
    try {
        const userId = req.user.id;
        const userId2 = req.params.id;

        const data = await followsServices.deleteFollowToUser({
            userId,
            userId2,
        });

        if (!data) return res.status(404).json({ mesagge: "Invalid ID" });
        res.status(200).json({ message: "User unfollow succesfuly" });
    } catch (error) {
        res.status(200).json({
            message: "Bad request",
            error,
        });
    }
};

module.exports = {
    getFollowing,
    getFollowers,
    newFollow,
    deleteFollow,
};
