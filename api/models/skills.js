const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SkillSchema = new Schema({
  skill: {
    type: String,
    required: [true, "Укажите навык"]
  },
  percent: {
    type: Number,
    default: 0,
    required: [true, "Укажите уровень владения"]
  }
});
const SkillsSchema = new Schema({
  type: {
    type: String,
    required: [false]
  },
  skills: [SkillSchema]
});

mongoose.model("skills", SkillsSchema);
