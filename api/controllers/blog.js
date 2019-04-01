const mongoose = require("mongoose");

module.exports.getArticles = (req, res) => {
  const Blog = mongoose.model("blog");

  Blog.find().then(items => {
    res.status(200).json({ articles: items });
  });
};

module.exports.createArticle = (req, res) => {
  console.log("req.body", req.body);

  const Blog = mongoose.model("blog");

  let item = new Blog({
    title: req.body.title,
    date: new Date(req.body.date),
    text: req.body.text
  });

  item
    .save()
    .then(item => {
      console.log("Запись успешно добавлена");
      return res.status(201).json({ message: "Запись успешно добавлена" });
    })
    .catch(error => {
      console.log("При добавлении записи произошла ошибка");
      res.status(400).json({
        message: `При добавлении записи произошла ошибка: + ${error.message}`
      });
    });
};
