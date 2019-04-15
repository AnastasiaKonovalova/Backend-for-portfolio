const cheerio = require('cheerio');
const axios = require('axios');
const config = require('../config/config.json');

const apiRequest = axios.create({
  baseURL: config.apiOptions.server
});

const renderPage = (app, articles) => {
  let rootHTML;
  let articlesHTML;
  let headersHTML;

  app.render('blog.html', (err, html) => (rootHTML = html));

  app.render(
    'components/blog/articles_list.pug',
    {
      myArticles: articles
    },
    (err, html) => {
      if (err) console.log('err articles_list', err);
      articlesHTML = html;
    }
  );

  app.render(
    'components/blog/headers_list.pug',
    {
      myArticles: articles
    },
    (err, html) => {
      if (err) console.log('err headers_list', err);
      headersHTML = html;
    }
  );

  const fnHTML = cheerio.load(rootHTML);
  fnHTML('.posts').replaceWith(articlesHTML);
  fnHTML('.headers').replaceWith(headersHTML);

  return fnHTML.html();
};

module.exports.getBlogPage = (req, res, next) => {
  apiRequest
    .get('/api/blog')
    .then(response => {
      const { data } = response;
      const html = renderPage(req.app, data.articles);
      res.send(html);
    })
    .catch(error => console.log('getBlogPage error axios', error));

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
