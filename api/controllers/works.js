const mongoose = require('mongoose');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

module.exports.getWorks = (req, res) => {
  const Works = mongoose.model('works');

  Works.find().then(items => {
    res.status(200).json({ works: items });
  });
};

module.exports.deleteWork = (req, res) => {
  const Works = mongoose.model('works');
  const id = req.params.id;
  Works.findByIdAndRemove(id)
    .then(item => {
      console.log('findByIdAndRemove', item);
      if (item) {
        fs.unlink(path.join('public/', item.img));
        res.status(201).json({ message: 'Запись успешно удалена' });
      } else {
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

module.exports.createWork = (req, res) => {
  const upload = 'public/upload';
  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }

  const form = new formidable.IncomingForm();

  form.uploadDir = path.join(process.cwd(), upload);
  form.parse(req, (error, fields, files) => {
    const fileName = path.join(upload, files.img.name);

    fs.rename(files.img.path, fileName, err => {
      if (err) {
        console.log(err);
        fs.unlink(fileName);
        fs.rename(files.photo.path, fileName);
      }
    });

    if (error) {
      res.status(400).json({
        message: `При добавлении записи произошла ошибка: + ${error.message}`
      });
      return;
    }
    const dbPath = fileName.replace(/public/, '');
    const Works = mongoose.model('works');
    const item = new Works({
      title: fields.title,
      stack: fields.stack,
      url: fields.url,
      img: dbPath
    });

    item
      .save()
      .then(item => {
        console.log('Запись успешно добавлена');
        res.status(201).json({ message: 'Запись успешно добавлена', work: item });
      })
      .catch(err => {
        console.log('При добавлении записи произошла ошибка');
        res.status(400).json({
          message: `При добавлении записи произошла ошибка: + ${error.message}`
        });
      });
  });
};
