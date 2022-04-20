var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// import flash
const flash = require('connect-flash');
//import sesion
const sesion = require('express-session');
const mongoose = require("mongoose");
const methodOverride = require('method-override');
mongoose.connect('mongodb://localhost:27017/db_pijarcamp');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const pijarcampRoutes =  require("./routes/pijarcamp");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// method override
app.use(methodOverride('_method'));
// menggunakan sesion
app.use(
  sesion(
    {
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: {maxAge: 6000},
    }
  )
);
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pijarcamp', pijarcampRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
