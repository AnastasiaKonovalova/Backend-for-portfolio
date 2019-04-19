const cheerio = require('cheerio');
const axios = require('axios');
const config = require('../config/config.json');

const apiRequest = axios.create({
  baseURL: config.apiOptions.server
});

const renderPage = (app, skills) => {
  let rootHTML;
  let stackListHTML;
  app.render('about.html', (err, html) => (rootHTML = html));
  app.render(
    'components/about/stack_list.pug',
    {
      stack: skills
    },
    (err, html) => {
      if (err) console.log('err', err);
      stackListHTML = html;
    }
  );
  const fnHTML = cheerio.load(rootHTML);
  fnHTML('.stack__list').replaceWith(stackListHTML);
  return fnHTML.html();
};

module.exports.getAboutPage = (req, res, next) => {
  // console.log('req', req);
  axios
    // .get('/api/skills')
    .get(`${req.protocol}://${req.get('host')}/api/skills`)
    .then(response => {
      const { skills } = response.data;
      const html = renderPage(req.app, skills);
      res.send(html);
    })
    .catch(error => console.log('getAboutPage error axios', error));
};
