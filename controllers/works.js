const cheerio = require('cheerio');
const axios = require('axios');
const config = require('../config/config.json');
const nodemailer = require('nodemailer');

const renderPage = (app, works) => {
  let rootHTML;
  let sliderHTML;

  app.render('works.html', (err, html) => {
    if (err) {
      console.log('works render error', err);
    }
    return (rootHTML = html);
  });
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
  axios
    .get(`${req.protocol}://${req.get('host')}/api/works`)
    .then(response => {
      const { data } = response;
      const html = renderPage(req.app, data.works);
      res.send(html);
    })
    .catch(error => console.log('getWorksPage error axios', error));
};

module.exports.sendMail = (req, res) => {
  const transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: `"${req.body.name}" <${req.body.mail}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text: req.body.message.trim().slice(0, 500) + `\n Отправлено с: <${req.body.mail}>`
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return res.status(400).json({ status: 'err', message: 'При отправке письма произошла ошибка: ' + error.message });
    }
    res.status(200).json({ status: 'ok', message: 'Письмо успешно отправлено' });
  });
};
