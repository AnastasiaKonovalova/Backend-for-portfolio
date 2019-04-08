const mongoose = require("mongoose");

module.exports.getSkills = (req, res) => {
  const Skills = mongoose.model("skills");

  Skills.find().then(items => {
    res.status(200).json({ skills: items });
  });
};

module.exports.createSkill = (req, res) => {
  // console.log("req.body", req.body);
  const Skills = mongoose.model("skills");

  Skills.find({ type: req.body.type })
    .then(item => {
      // console.log("Skills.find item", item);
      if (item.length) {
        // console.log("item found", item);
        // console.log("item.skills", item[0].skills);
        item[0].skills = [...item[0].skills, { skill: req.body.skill, percent: req.body.percent }];
        return item[0].save();
      } else {
        // console.log("Skills.find item not found", item);
        const skill = new Skills({
          type: req.body.type,
          skills: [{ skill: req.body.skill, percent: req.body.percent }]
        });

        return skill.save();
      }
    })
    .then(item => {
      // console.log("Skills.find item after mod + save Запись успешно добавлена", item);
      return res.status(201).json({ message: "Запись успешно добавлена", skill: item });
    })
    .catch(error => {
      console.log("При добавлении записи произошла ошибка");
      res.status(400).json({
        message: `При добавлении записи произошла ошибка: + ${error.message}`
      });
    });
};
module.exports.editSkill = (req, res) => {};
module.exports.deleteSkill = (req, res) => {};
