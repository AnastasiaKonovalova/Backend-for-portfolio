const cheerio = require('cheerio');
const config = require('../config/config.json');
const axios = require('axios');

const apiRequest = axios.create({
  baseURL: config.apiOptions.server
});

const renderPage = app => {
  let rootHTML;
  app.render('index.html', (err, html) => (rootHTML = html));

  const fnHTML = cheerio.load(rootHTML);
  return fnHTML.html();
};

module.exports.getIndexPage = (req, res, next) => {
  const html = renderPage(req.app);
  res.send(html);
};

module.exports.authorize = (req, res) => {
  const payload = {
    login: req.body.login,
    password: req.body.password
  };
  apiRequest
    .post('/api/user', payload)
    .then(response => {
      req.session.isAdmin = true;
      res.redirect('/admin');
    })
    .catch(error => {
      console.log('При авторизации произошла ошибка', error.response.data.message);

      res.status(400).json({
        message: `При авторизации произошла ошибка: ${error.response.data.message}`
      });
    });
};
