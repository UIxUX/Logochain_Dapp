var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash    = require('connect-flash');
global.passport = require('passport');

var expressValidator = require("express-validator");

// Configuring MongoDB
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/mongoose');

// Configuring Passport
require('./passport/passport')(passport);
var session = require('express-session');
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Global vars
app.use(function(req,res,next){
  res.locals.errors = null;
  next();
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());



// ROUTES
var index = require('./routes/index');
var users = require('./routes/users');
var account = require('./routes/account');
var signup = require('./routes/signup');


app.use('/', index);
app.use('/users', users);


//account site
app.use('/account', account);


//Sign up
app.use('/signup', signup);

//Sign in
app.use('/signin', signup);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
