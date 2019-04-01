const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorksSchema = new Schema({
  id: {
    type: Number,
    required: [true]
  },
  name: {
    type: String,
    required: [true, "Укажите название работы"]
  },
  techs: {
    type: String,
    required: [true, "Укажите используемые технологии"]
  },
  url: {
    type: String,
    required: [true, "Укажите ссылку на работу"]
  },
  img: {
    type: String
  }
});

mongoose.model("works", WorksSchema);
