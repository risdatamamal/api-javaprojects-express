var express = require('express');
var router = express.Router();

const authHandler = require("./handler/auth");
const verifyToken = require("../middlewares/verifyToken");

// Role: User
router.post("/register", authHandler.register);
router.post("/login", authHandler.login);
router.post("/logout", verifyToken, authHandler.logout);

module.exports = router;
