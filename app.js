const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const searchRouter = require('./routes/search');
const infoProjectRouter = require('./routes/info-project');
const infoUserRouter = require('./routes/info-user');
const donateRouter = require('./routes/donate');
const aboutRouter = require('./routes/about');
const loginRouter = require('./routes/log-in');
const signupRouter = require('./routes/sign-up');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.resolve(__dirname, 'public')));

require('dotenv').config();
mongoose.connect(process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (!err) {
      console.log('Connect to database successfully');
    }
    else {
      console.log('Connect to database failed');
    }
  });

app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/user', infoUserRouter);
app.use('/project', infoProjectRouter);
app.use('/donate', donateRouter);
app.use('/about', aboutRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
