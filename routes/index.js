var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({ title: "Express" });
});

module.exports = router;

// TODO: API for Home
// var express = require("express");
// var router = express.Router();

// const homeHandler = require("./handler/home");

// // Home
// // router.get("/header", homeHandler.getHeader);

// module.exports = router;
