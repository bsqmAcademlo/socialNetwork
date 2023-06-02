const router = require("express").Router();
const jwtPassport = require("../../middlewares/passport.middleware");

const usersControllers = require("./users.controllers");
const followsControllers = require("../follows/follows.controllers");

router.get("/users", usersControllers.getUsers);
router.get(
    "/users/:id",
    jwtPassport.authenticate("jwt", { session: false }),
    usersControllers.getUser
);
router.post("/users", usersControllers.postUser);

router.patch(
    "/users/:id",
    jwtPassport.authenticate("jwt", { session: false }),
    usersControllers.patchUser
);
router.delete(
    "/users/:id",
    jwtPassport.authenticate("jwt", { session: false }),
    usersControllers.deleteUser
);

router.get(
    "/me",
    jwtPassport.authenticate("jwt", { session: false }),
    usersControllers.getMyUser
);

// user - follows

router.post(
    "/users/:id/follow",
    jwtPassport.authenticate("jwt", { session: false }),
    followsControllers.newFollow
);

router.delete(
    "/users/:id/follow",
    jwtPassport.authenticate("jwt", { session: false }),
    followsControllers.deleteFollow
);

module.exports = router;
