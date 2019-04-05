const cheerio = require("cheerio");
const path = require("path");
const axios = require("axios");
const config = require("../config/config.json");

const apiRequest = axios.create({
  baseURL: config.apiOptions.server
});

const renderPage = (app, works) => {
  let rootHTML;
  let sliderHTML;

  app.render("works.html", (err, html) => (rootHTML = html));
  app.render(
    "components/works/slider.pug",
    {
      myWorks: works
    },
    (err, html) => {
      if (err) console.log("err", err);
      sliderHTML = html;
    }
  );
  const fnHTML = cheerio.load(rootHTML);
  const newScript = `window.WORKS = ${JSON.stringify(works)}`;

  fnHTML(".slider__section").replaceWith(sliderHTML);
  fnHTML("#myWorks").text(newScript);
  return fnHTML.html();
};

module.exports.getWorksPage = (req, res, next) => {
  apiRequest
    .get("/api/works", { mode: "cors" })
    .then(response => {
      const { data } = response;
      const html = renderPage(req.app, data.works);
      res.send(html);
    })
    .catch(error => console.log("getWorksPage error axios", error));
};
