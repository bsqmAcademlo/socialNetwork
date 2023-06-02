const router = require("express").Router();

const jwtPassport = require("../../middlewares/passport.middleware");

const uploads = require("../../middlewares/multer.middleware");

const postsControllers = require("./posts.controllers");
const commentsControllers = require("../comments/comments.controllers");
const likesControllers = require("../likes/likes.controllers");

router.get("/posts", postsControllers.getPosts);

router.get("/posts/:id", postsControllers.getPost);

router.get(
    "/posts/user/me",
    jwtPassport.authenticate("jwt", { session: false }),
    postsControllers.getPostsMe
);

router.get("/posts/user/:id", postsControllers.getPostsByUser);

router.post(
    "/posts",
    jwtPassport.authenticate("jwt", { session: false }),
    uploads.array("postImages", 10),
    postsControllers.postCreatePost
);

router.patch(
    "/posts/:id",
    jwtPassport.authenticate("jwt", { session: false }),
    postsControllers.patchPost
);
router.delete(
    "/posts/:id",
    jwtPassport.authenticate("jwt", { session: false }),
    postsControllers.deletePost
);

// comments and posts
router.get("/posts/:id/comments", commentsControllers.getCommentsByPost);

router.post(
    "/posts/:id/comments",
    jwtPassport.authenticate("jwt", { session: false }),
    commentsControllers.postNewComment
);

//likes and posts

router.get("/posts/:id/likes", likesControllers.getAllLikesByPost);
router.post(
    "/posts/:id/likes",
    jwtPassport.authenticate("jwt", { session: false }),
    likesControllers.postNewLike
);

module.exports = router;
