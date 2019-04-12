const mongoose = require("mongoose");

module.exports.authorize = (req, res) => {
  const User = mongoose.model("user");

  User.findOne({ login: req.body.login })
    .then(user => {
      if (!user) {
        return res.status(404).json({ status: "err", message: "Пользователя не существует" });
      }
      if (!user.validPassword(req.body.password)) {
        return res.status(400).json({ status: "err", message: "Пароль неверен" });
      } else {
        res.status(200).json({ status: "ok", message: "Авторизация успешна" });
      }
    })
    .catch(error => {
      return res.status(400).json({ status: "err", message: "Произошла ошибка: " + error.message });
    });
};
