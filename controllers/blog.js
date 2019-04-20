const cheerio = require('cheerio');
const axios = require('axios');

const renderPage = (app, articles) => {
  let rootHTML;
  let articlesHTML;
  let headersHTML;

  app.render('blog.html', (err, html) => {
    if (err) {
      console.log('blog render error', err);
    }
    return (rootHTML = html);
  });

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
  axios
    .get(`${req.protocol}://${req.get('host')}/api/blog`)
    .then(response => {
      const { data } = response;
      const html = renderPage(req.app, data.articles);
      res.send(html);
    })
    .catch(error => console.log('getBlogPage error axios', error));
};
