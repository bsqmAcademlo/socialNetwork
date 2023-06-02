const router = require("express").Router();

const followsControllers = require("./follows.controllers");
const jwtPassport = require("../../middlewares/passport.middleware");

router.use(jwtPassport.authenticate("jwt", { session: false }));

router.get("/followers", followsControllers.getFollowers);
router.get("/following", followsControllers.getFollowing);

module.exports = router;
