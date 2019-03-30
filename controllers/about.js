const cheerio = require("cheerio");

const frontend = [{ tech: "HTML5", percent: 85 }, { tech: "CSS", percent: 70 }, { tech: "JavaScript", percent: 50 }];

const backend = [
  { tech: "PHP", percent: 55 },
  { tech: "MySQL", percent: 25 },
  { tech: "Node.js & npm", percent: 10 },
  { tech: "Mongo.db", percent: 5 }
];

const workflow = [{ tech: "git", percent: 20 }, { tech: "webpack", percent: 45 }, { tech: "gulp", percent: 35 }];

const renderPage = app => {
  let rootHTML;
  let stackListHTML;
  app.render("about.html", (err, html) => (rootHTML = html));
  app.render(
    "components/about/stack_list.pug",
    {
      myFrontend: frontend,
      myBackend: backend,
      myWorkflow: workflow
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
  const html = renderPage(req.app);
  res.send(html);
};
