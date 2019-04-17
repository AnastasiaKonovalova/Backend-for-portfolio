const mongoose = require('mongoose');

module.exports.getArticles = (req, res) => {
  const Blog = mongoose.model('blog');

  Blog.find().then(items => {
    items.sort((a, b) => {
      const aDate = Date.parse(a.date);
      const bDate = Date.parse(b.date);
      return bDate - aDate;
    });
    items.forEach(
      item =>
        (item.date = item.date
          .split('-')
          .reverse()
          .join('.'))
    );

    res.status(200).json({ articles: items });
  });
};

module.exports.createArticle = (req, res) => {
  console.log('req.body', req.body);

  const Blog = mongoose.model('blog');
  const date = new Date(req.body.date).toLocaleString('ru', { day: 'numeric', month: 'numeric', year: 'numeric' });

  const item = new Blog({
    title: req.body.title,
    date: date,
    text: req.body.text
  });

  item
    .save()
    .then(item => {
      return res.status(201).json({ status: 'ok', message: 'Запись успешно добавлена', article: item });
    })
    .catch(error => {
      console.log('При добавлении записи произошла ошибка', error.message);
      res.status(400).json({ status: 'err', message: `При добавлении записи произошла ошибка: ${error.message}` });
    });
};

module.exports.deleteArticle = (req, res) => {
  const Blog = mongoose.model('blog');
  const id = req.params.id;
  Blog.findByIdAndRemove(id)
    .then(item => {
      if (item) res.status(201).json({ message: 'Запись успешно удалена' });
      else {
        res.status(404).json({ status: 'err', message: 'Запись в БД не обнаружена' });
      }
    })
    .catch(error => {
      console.log('При удалении  записи произошла ошибка: ', error.message);
      res.status(400).json({ status: 'err', message: `При удалении  записи произошла ошибка: ${error.message}` });
    });
};
