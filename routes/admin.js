var express = require('express');
var router = express.Router();

const adminAuthHandler = require("./handler/admin/auth");
const verifyToken = require("../middlewares/verifyToken");

// Role: Admin
router.post("/auth/login", adminAuthHandler.login);
router.post("/auth/logout", verifyToken, adminAuthHandler.logout);

module.exports = router;
