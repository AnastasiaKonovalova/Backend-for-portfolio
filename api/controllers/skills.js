const mongoose = require('mongoose');

module.exports.getSkills = (req, res) => {
  const Skills = mongoose.model('skills');

  Skills.find().then(items => {
    res.status(200).json({ skills: items });
  });
};

module.exports.createSkill = (req, res) => {
  const Skills = mongoose.model('skills');

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
      return res.status(201).json({ status: 'ok', message: 'Запись успешно добавлена в базу данных', skill: item });
    })
    .catch(error => {
      res.status(400).json({ status: 'err', message: `При добавлении записи произошла ошибка: + ${error.message}` });
    });
};
module.exports.deleteSkill = (req, res) => {
  const Skills = mongoose.model('skills');
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
      if (item) res.status(201).json({ status: 'ok', message: 'Запись успешно удалена' });
      else {
        res.status(404).json({ status: 'err', message: 'Запись в БД не обнаружена' });
      }
    })
    .catch(error => {
      res.status(400).json({ status: 'err', message: `При удалении  записи произошла ошибка: + ${error.message}` });
    });
};

module.exports.editSkills = (req, res) => {
  const Skills = mongoose.model('skills');

  Skills.deleteMany({}, error => {
    if (error) {
      return res
        .status(400)
        .json({ status: 'err', message: `При удалении  записи произошла ошибка: + ${error.message}` });
    }

    const docs = Object.keys(req.body).map(key => {
      const skills = req.body[key];

      const test = Object.keys(skills).reduce((acc, inputKey) => {
        if (/_percent/.test(inputKey)) {
          acc[acc.length - 1].percent = skills[inputKey];
        } else {
          const newSkill = {
            skill: skills[inputKey]
          };
          acc = [...acc, newSkill];
        }
        return acc;
      }, []);
      const skill = new Skills({
        type: key,
        skills: test
      });

      return skill;
    });

    Promise.all(docs.map(doc => doc.save()))
      .then(items => {
        return res.status(201).json({ status: 'ok', message: 'Изменения успешно сохранены', items: items });
      })
      .catch(error => {
        res.status(400).json({ status: 'err', message: `При изменении записи произошла ошибка: + ${error.message}` });
      });
  });
};
