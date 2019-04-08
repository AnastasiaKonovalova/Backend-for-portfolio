const mongoose = require("mongoose");

module.exports.getSkills = (req, res) => {
  const Skills = mongoose.model("skills");

  Skills.find().then(items => {
    res.status(200).json({ skills: items });
  });
};

module.exports.createSkill = (req, res) => {
  const Skills = mongoose.model("skills");

  Skills.find({ type: req.body.type })
    .then(item => {
      if (item.length) {
        item[0].skills = [...item[0].skills, { skill: req.body.skill, percent: req.body.percent }];
        return item[0].save();
      } else {
        const skill = new Skills({
          type: req.body.type,
          skills: [{ skill: req.body.skill, percent: req.body.percent }]
        });

        return skill.save();
      }
    })
    .then(item => {
      return res.status(201).json({ message: "Запись успешно добавлена", skill: item });
    })
    .catch(error => {
      console.log("При добавлении записи произошла ошибка");
      res.status(400).json({
        message: `При добавлении записи произошла ошибка: + ${error.message}`
      });
    });
};
module.exports.editSkill = (req, res) => {
  const Skills = mongoose.model("skills");
  const id = req.params.id;

  Skills.findOne({ type: req.body.type })
    .then(item => {
      item.skills.id(id).remove();
      if (item.skills.length === 0) {
        return Skills.deleteOne({ type: req.body.type });
      }

      return item.save();
    })
    .then(item => {
      console.log("Skills after set/remove model", item);

      if (!!item) res.status(201).json({ message: "Запись успешно удалена" });
      else {
        res.status(404).json({ message: "Запись в БД не обнаружена" });
      }
    })
    .catch(error => {
      console.log("editSkill findByIdAndRemove error", error.message);
      res.status(400).json({
        message: `При удалении  записи произошла ошибка: + ${error.message}`
      });
    });
};
module.exports.deleteSkill = (req, res) => {};
