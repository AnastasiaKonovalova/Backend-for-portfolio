var express = require("express");
const cheerio = require("cheerio");
var router = express.Router();

// const app = require("../app");

const renderPage = app => {
  const testErr = {
    status: "1234",
    stack: "1-2-3-4-5"
  };

  let rootHTML;
  let errorHTML;
  app.render("index.html", (err, html) => (rootHTML = html));
  app.render(
    "error1",
    {
      message: "testest",
      error: testErr
    },
    (err, html) => {
      errorHTML = html;
    }
  );

  const fnHTML = cheerio.load(rootHTML);
  fnHTML(".login__form").append(errorHTML);
  const WholeHTML = fnHTML.html();

  return WholeHTML;
  // console.log("WholeHTML", WholeHTML);
};

/* GET home page. */
router.get("/", function(req, res, next) {
  const html = renderPage(req.app);
  res.send(html);
});
// router.get("/", function(req, res, next) {
//   res.render("index", { title: "Express" });
// });

module.exports = router;
