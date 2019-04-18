const mongoose = require('mongoose');
const readline = require('readline');
const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const config = require('./config/config.json');
mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb+srv://portfolioDB:xbdbrjd@portfoliodb-np11a.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
  })
  .catch(error => {
    console.error('adding user mongoose connect error', error);
    throw error;
  });
// mongoose
//   .connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, { useNewUrlParser: true })
//   .catch(error => {
//     console.error('adding user mongoose connect error', error);
//     throw error;
//   });

let login = '';
let password = '';

r1.question('Логин: ', answer => {
  login = answer;
  r1.question('Пароль: ', answer => {
    password = answer;

    r1.close();
  });
});

r1.on('close', () => {
  require('./api/models/user');

  const User = mongoose.model('user');
  const adminUser = new User({ login: login });
  adminUser.setPassword(password);
  console.log('adminUser', adminUser);
  User.findOne({ login: login })
    .then(user => {
      if (user) {
        throw new Error('Твкой пользователь уже существует');
      }

      return adminUser.save();
    })
    .then(user => console.log('OK!'), error => console.error('Ошибка', error.message))
    .then(() => mongoose.connection.close(() => process.exit(0)));
});
