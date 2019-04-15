const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Укажите заголовок статьи']
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, 'Укажите дату публикации']
  },
  text: {
    type: String,
    required: [true, 'Укажите содержимое статьи']
  }
});

mongoose.model('blog', BlogSchema);
