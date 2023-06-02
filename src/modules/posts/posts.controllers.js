const postServices = require("./posts.services");
const { HOST } = require("../../../config");

async function getPosts(req, res) {
    const offset = +req.query.offset || 0;
    const limit = +req.query.limit || 10;

    try {
        const data = await postServices.findAllPost(offset, limit);

        const next =
            data.count - offset > limit
                ? `${HOST}/api/v1/posts?limit=${limit}&offset=${offset + limit}`
                : null;

        const prev =
            offset - limit >= 0
                ? `${HOST}/api/v1/posts?limit=${limit}&offset=${offset - limit}`
                : null;

        return res.status(200).json({
            next,
            prev,
            ...data,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Bad request",
            error,
        });
    }
}

async function getPost(req, res) {
    try {
        const id = res.params.id;
        const data = await postServices.findPostById(id);

        if (!data)
            return res
                .status(404)
                .json({ message: `Post witch if ${id} not found` });

        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Bad request",
            error,
        });
    }
}

async function getPostsByUser(req, res) {
    try {
        const userId = req.params.id;
        const data = await postServices.findPostUserId(userId);
        if (!data)
            return res
                .status(404)
                .json({ message: `Post witch id ${userId} not found` });

        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Bad request",
            error: error.message,
        });
    }
}

async function getPostsMe(req, res) {
    try {
        const userId = req.user.id;
        console.log(userId);

        const data = await postServices.findPostUserId(userId);
        if (!data)
            return res
                .status(404)
                .json({ message: `Post witch id ${userId} not found` });

        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Bad request",
            error: error.message,
        });
    }
}

async function postCreatePost(req, res) {
    try {
        const { content } = req.body;
        const userId = req.user.id;

        if (req.files?.length) {
            const dataMultimedia = req.files.map((file) => ({
                filename: file.filename,
                type: "img",
            }));

            const data = await postServices.createPost({ content, userId });

            const responseMultimedia = await postServices.createMultimediaPost(
                dataMultimedia,
                data.id
            );

            res.status(201).json({
                post: data.dataValues,
                multimedia: responseMultimedia,
            });
            return;
        }

        const data = await postServices.createPost({
            content,
            userId,
        });
        res.status(201).json(data);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Bad request",
            error,
        });
    }
}

async function patchPost(req, res) {
    try {
        const id = req.params.id;
        const userId = req.user.id;
        const { content } = req.body;

        const data = await postServices.updatePost(id, userId, { content });

        if (!data)
            return res
                .status(404)
                .json({ message: `Post witch id ${id} not found` });

        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Bad request",
            error,
        });
    }
}

async function deletePost(req, res) {
    try {
        const id = req.params.id;
        const userId = req.user.id;
        const data = await postServices.deletePost(id, userId);

        if (!data)
            return res
                .status(404)
                .json({ message: `Post witch id ${id} not found` });

        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Bad request",
            error,
        });
    }
}

module.exports = {
    getPosts,
    getPost,
    getPostsByUser,
    getPostsMe,
    postCreatePost,
    patchPost,
    deletePost,
};
