var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
//session
var session = require('express-session');
app.use(session({
    secret: 'recommend 128 bytes random string',
    cookie: {
      maxAge: 3600* 1000
    }
    }));
var acl = require('./models/mongodb');
var language = require('./models/language');
//var internation = new language();
//internation.set(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login.js', checkNotLogin);
app.use('/reg', checkNotLogin);

app.use('/logout', checkLogin);

function checkNotLogin(req, res, next) {
    if (req.session.user){
      req.session.err = "已登录";
      return res.redirect('/');
    }
    next();
}

function  checkLogin(req, res, next) {
    if (!req.session.user) {
      req.session.err = "你还没登陆";
      return res.redirect('/login.js');
    }
    next();
}
// 路由分发?

app.use('/', routes);
app.use('/users', users);
app.use('/reg', require('./routes/reg'));
/*
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/language', require('./routes/language'));
app.use('/post', require('./routes/post'));
app.use('/loadblog', require('./routes/users'));*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//dfdf

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log("start at :" + new Date());
module.exports = app;
