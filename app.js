const createError = require('http-errors');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

require('./api/models/db');

const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const indexRouter = require('./routes/index');
const indexApiRouter = require('./api/routes/index');

const app = express();
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: 'portfolio',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: null
    },
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', indexApiRouter);

// //send react html, needs testing
const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    return next();
  }
  res.redirect('/');
};

app.use('/admin', isAdmin, (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/admin', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log('app err', err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  res.render('error');
});

module.exports = app;
