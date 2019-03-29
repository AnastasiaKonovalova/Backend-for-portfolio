var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const cheerio = require("cheerio");

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

// const testErr = {
//   status: "1234",
//   stack: "1-2-3-4-5"
// };

// let rootHTML;
// let errorHTML;
// app.render("index.html", (err, html) => (rootHTML = html));
// app.render(
//   "error1",
//   {
//     message: "testest",
//     error: testErr
//   },
//   (err, html) => {
//     errorHTML = html;
//   }
// );

// const fnHTML = cheerio.load(rootHTML);
// fnHTML(".login__form").append(errorHTML);
// const WholeHTML = fnHTML.html();
// console.log("WholeHTML", WholeHTML);

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
