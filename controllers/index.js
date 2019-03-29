const cheerio = require("cheerio");

const testErr = {
  status: "1234",
  stack: "1-2-3-4-5"
};

const renderPage = app => {
  let rootHTML;
  let errorHTML;
  app.render("index.html", (err, html) => (rootHTML = html));
  app.render(
    "components/error1",
    {
      message: "testest",
      error: testErr
    },
    (err, html) => {
      if (err) console.log(err);
      errorHTML = html;
    }
  );

  const fnHTML = cheerio.load(rootHTML);
  // fnHTML(".login__form").append(errorHTML);
  return fnHTML.html();
};

module.exports.getIndexPage = (req, res, next) => {
  const html = renderPage(req.app);
  res.send(html);
};
