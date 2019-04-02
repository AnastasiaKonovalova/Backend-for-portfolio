const cheerio = require("cheerio");
const path = require("path");
const http = require("request");
const axios = require("axios");
const config = require("../config/config.json");

const myHttp = axios.create({
  baseURL: "http://localhost:3000/api"
});

const articles = [
  {
    title: "Самое важное в SASS",
    date: "22 ноября 2016",
    text:
      "Таким образом начало повседневной работы по формированию позиции позволяет выполнять важные задания по разработке направлений прогрессивного развития. Разнообразный и богатый опыт новая модель организационной деятельности играет важную роль в формировании новых предложений.",
    img: path.normalize("/img/ava.jpg")
  },
  {
    title: "Приёмы в вёрстке, без которых не обходится ни один сайт",
    date: "13 ноября 2016",
    text:
      "Таким образом начало повседневной работы по формированию позиции позволяет выполнять важные задания по разработке направлений прогрессивного развития. Разнообразный и богатый опыт новая модель организационной деятельности играет важную роль в формировании новых предложений.",
    img: path.normalize("")
  },
  {
    title: "Самый необходимый набор Gulp плагинов",
    date: "5 ноября 2016",
    text:
      "Таким образом начало повседневной работы по формированию позиции позволяет выполнять важные задания по разработке направлений прогрессивного развития. Разнообразный и богатый опыт новая модель организационной деятельности играет важную роль в формировании новых предложений.",
    img: path.normalize("")
  },
  {
    title: "Почему я выбрал Jade",
    date: "20 октября 2016",
    text:
      "Таким образом начало повседневной работы по формированию позиции позволяет выполнять важные задания по разработке направлений прогрессивного развития. Разнообразный и богатый опыт новая модель организационной деятельности играет важную роль в формировании новых предложений. Товарищи! новая модель организационной деятельности играет важную роль в формировании систем массового участия. Не следует, однако забывать, что укрепление и развитие структуры обеспечивает широкому кругу (специалистов) участие в формировании систем массового участия. Идейные соображения высшего порядка, а также рамки и место обучения кадров обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленных задач. Товарищи! постоянный количественный рост и сфера нашей активности способствует подготовки и реализации модели развития. С другой стороны рамки и место обучения кадров влечет за собой процесс внедрения и модернизации системы обучения кадров, соответствует насущным потребностям.",
    img: path.normalize("")
  }
];

const renderPage = (app, articles) => {
  let rootHTML;
  let articlesHTML;
  let headersHTML;

  app.render("blog.html", (err, html) => (rootHTML = html));

  app.render(
    "components/blog/articles_list.pug",
    {
      myArticles: articles
    },
    (err, html) => {
      if (err) console.log("err articles_list", err);
      articlesHTML = html;
    }
  );

  app.render(
    "components/blog/headers_list.pug",
    {
      myArticles: articles
    },
    (err, html) => {
      if (err) console.log("err headers_list", err);
      headersHTML = html;
    }
  );

  const fnHTML = cheerio.load(rootHTML);
  fnHTML(".posts").replaceWith(articlesHTML);
  fnHTML(".headers").replaceWith(headersHTML);

  return fnHTML.html();
};

module.exports.getBlogPage = (req, res, next) => {
  myHttp
    .get("/blog")
    .then(response => {
      const { articles } = JSON.parse(response);
      console.log("getBlogPage http articles", articles);

      const html = renderPage(req.app, articles);
      res.send(html);
    })
    .catch(error => console.log("getBlogPage error axios", error));

  // const pathApi = "/api/blog";
  // const requestOptions = {
  //   url: config.apiOptions.server + pathApi,
  //   method: "GET"
  // };

  // http(requestOptions, (error, response, body) => {
  //   if (error) console.log("error getBlogPage http", error);

  //   const { articles } = JSON.parse(body);
  //   console.log("getBlogPage http articles", articles);
  //   const html = renderPage(req.app, articles);
  //   res.send(html);
  // });
};
