var express = require('express');
var router = express.Router();

const userHandler = require("./handler/user");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, userHandler.getUser);
router.put("/", verifyToken, userHandler.updateUser);

module.exports = router;
