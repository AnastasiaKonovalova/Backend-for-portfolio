const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SkillsSchema = new Schema({
  type: String,
  skills: [{ skill: String, percent: Number }]
});

mongoose.model('skills', SkillsSchema);
