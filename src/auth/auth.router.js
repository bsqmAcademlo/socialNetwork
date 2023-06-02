const authControllers = require("./auth.controllers");

const router = require("express").Router();

router.post("/login", authControllers.loginUser);

module.exports = router;
