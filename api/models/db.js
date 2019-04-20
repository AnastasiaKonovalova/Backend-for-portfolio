const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose
  .connect('mongodb+srv://portfolioDB:xbdbrjd@portfoliodb-np11a.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
  })
  .catch(e => {
    console.error('mongoose connect error', e);
    throw e;
  });

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection opened');
});

mongoose.connection.on('error', err => {
  console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected through app termination');
    process.exit(0);
  });
});

require('./works');
require('./blog');
require('./skills');
require('./user');
