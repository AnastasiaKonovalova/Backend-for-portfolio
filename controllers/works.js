const cheerio = require("cheerio");
const path = require("path");

const works = [
  {
    id: 1,
    name: "школа онлайн образования школа онлайн образования",
    techs: "HTML, CSS",
    url: "#",
    img: path.normalize("/img/work-1.png")
  },
  {
    id: 2,
    name: "itLoft",
    techs: "HTML, JS",
    url: "#",
    img: path.normalize("/img/work-2.png")
  },
  {
    id: 3,
    name: "smth",
    techs: "CSS, JS",
    url: "#",
    img: path.normalize("/img/work-3.png")
  }
];

const renderPage = app => {
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
  const html = renderPage(req.app);
  res.send(html);
};
