const cheerio = require("cheerio");
const axios = require("axios");
const config = require("../config/config.json");

const apiRequest = axios.create({
  baseURL: config.apiOptions.server
});

const frontend = [{ tech: "HTML5", percent: 85 }, { tech: "CSS", percent: 70 }, { tech: "JavaScript", percent: 50 }];

const backend = [
  { tech: "PHP", percent: 55 },
  { tech: "MySQL", percent: 25 },
  { tech: "Node.js & npm", percent: 10 },
  { tech: "Mongo.db", percent: 5 }
];

const workflow = [{ tech: "git", percent: 20 }, { tech: "webpack", percent: 45 }, { tech: "gulp", percent: 35 }];

const renderPage = (app, skills) => {
  let rootHTML;
  let stackListHTML;
  app.render("about.html", (err, html) => (rootHTML = html));
  app.render(
    "components/about/stack_list.pug",
    {
      stack: skills
    },
    (err, html) => {
      if (err) console.log("err", err);
      stackListHTML = html;
    }
  );
  const fnHTML = cheerio.load(rootHTML);
  fnHTML(".stack__list").replaceWith(stackListHTML);
  return fnHTML.html();
};

module.exports.getAboutPage = (req, res, next) => {
  apiRequest
    .get("/api/skills")
    .then(response => {
      const { skills } = response.data;
      const html = renderPage(req.app, skills);
      res.send(html);
    })
    .catch(error => console.log("getBlogPage error axios", error));
};
