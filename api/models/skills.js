const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const SkillSchema = new Schema({
//   skill: {
//     type: String,
//     required: [true, "Укажите навык"]
//   },
//   percent: {
//     type: Number,
//     default: 0,
//     required: [true, "Укажите уровень владения"]
//   }
// });
const SkillsSchema = new Schema({
  type: String,
  skills: [{ skill: String, percent: Number }]
});

mongoose.model("skills", SkillsSchema);
