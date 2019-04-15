const cheerio = require('cheerio');
const axios = require('axios');
const config = require('../config/config.json');
const nodemailer = require('nodemailer');

const apiRequest = axios.create({
  baseURL: config.apiOptions.server
});

const renderPage = (app, works) => {
  let rootHTML;
  let sliderHTML;

  app.render('works.html', (err, html) => (rootHTML = html));
  app.render(
    'components/works/slider.pug',
    {
      myWorks: works
    },
    (err, html) => {
      if (err) console.log('err', err);
      sliderHTML = html;
    }
  );
  const fnHTML = cheerio.load(rootHTML);
  const newScript = `window.WORKS = ${JSON.stringify(works)}`;

  fnHTML('.slider__section').replaceWith(sliderHTML);
  fnHTML('#myWorks').text(newScript);
  return fnHTML.html();
};

module.exports.getWorksPage = (req, res, next) => {
  apiRequest
    .get('/api/works', { mode: 'cors' })
    .then(response => {
      const { data } = response;
      const html = renderPage(req.app, data.works);
      res.send(html);
    })
    .catch(error => console.log('getWorksPage error axios', error));
};

module.exports.sendMail = (req, res) => {
  console.log('sendMail req.body', req.body);

  const transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: `"${req.body.name}" <${req.body.mail}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text: req.body.message.trim().slice(0, 500) + `\n Отправлено с: <${req.body.mail}>`
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('transporter.sendMail error', error);
      return res.status(400).json({ status: 'err', message: 'Приотправке письма произошла ошибка' + error.message });
    }
    console.log('Письмо успешно отправлено');
    res.status(200).json({ status: 'ok', message: 'Письмо успешно отправлено' });
  });
};
