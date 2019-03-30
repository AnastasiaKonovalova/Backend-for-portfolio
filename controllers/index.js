const cheerio = require("cheerio");

const renderPage = app => {
  let rootHTML;
  app.render("index.html", (err, html) => (rootHTML = html));

  const fnHTML = cheerio.load(rootHTML);
  return fnHTML.html();
};

module.exports.getIndexPage = (req, res, next) => {
  const html = renderPage(req.app);
  res.send(html);
};
