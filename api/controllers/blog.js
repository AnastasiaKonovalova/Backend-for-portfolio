const mongoose = require('mongoose');

module.exports.getArticles = (req, res) => {
  const Blog = mongoose.model('blog');

  Blog.find().then(items => {
    res.status(200).json({ articles: items });
  });
};

module.exports.createArticle = (req, res) => {
  console.log('req.body', req.body);

  const Blog = mongoose.model('blog');

  const item = new Blog({
    title: req.body.title,
    date: new Date(req.body.date),
    text: req.body.text
  });

  item
    .save()
    .then(item => {
      console.log('Запись успешно добавлена');
      return res.status(201).json({ message: 'Запись успешно добавлена', article: item });
    })
    .catch(error => {
      console.log('При добавлении записи произошла ошибка');
      res.status(400).json({
        message: `При добавлении записи произошла ошибка: + ${error.message}`
      });
    });
};

module.exports.deleteArticle = (req, res) => {
  const Blog = mongoose.model('blog');
  const id = req.params.id;
  Blog.findByIdAndRemove(id)
    .then(item => {
      // console.log("findByIdAndRemove", item);
      if (item) res.status(201).json({ message: 'Запись успешно удалена' });
      else {
        res.status(404).json({ message: 'Запись в БД не обнаружена' });
      }
    })
    .catch(error => {
      console.log('findByIdAndRemove error', error.message);
      res.status(400).json({
        message: `При удалении  записи произошла ошибка: + ${error.message}`
      });
    });
};
