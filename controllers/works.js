const cheerio = require("cheerio");
const path = require("path");
const axios = require("axios");
const config = require("../config/config.json");

const apiRequest = axios.create({
  baseURL: config.apiOptions.server
});

const works = [
  {
    _id: 1,
    title: "школа онлайн образования школа онлайн образования",
    stack: "HTML, CSS",
    url: "#",
    img: path.normalize("/img/work-1.png")
  },
  {
    _id: 2,
    title: "itLoft",
    stack: "HTML, JS",
    url: "#",
    img: path.normalize("/img/work-2.png")
  },
  {
    _id: 3,
    title: "smth",
    stack: "CSS, JS",
    url: "#",
    img: path.normalize("/img/work-3.png")
  }
];

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
  fnHTML(".slider__section").replaceWith(sliderHTML);
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

  // const html = renderPage(req.app);
  // res.send(html);
};
