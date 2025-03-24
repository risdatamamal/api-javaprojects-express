require("dotenv").config();
var createError = require("http-errors");
var path = require("path");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();

var indexRouter = require("./routes/index");
var refreshTokensRouter = require("./routes/refreshTokens");
var verifyToken = require("./middlewares/verifyToken");
var authRouter = require("./routes/auth");
var userRouter = require("./routes/user");

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var v1 = process.env.URL_API_V1;
app.use(v1 + "/", indexRouter);
app.use(v1 + "/refresh-tokens", refreshTokensRouter);
app.use(v1 + "/auth", authRouter);
// app.use(v1 + '/user', verifyToken, userRouter);

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, _next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ code: err.status, status: "error", message: err.message });
});

module.exports = app;
