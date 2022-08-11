var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();
app.use(express.static(path.join(__dirname, '/public')));

//设置跨域访问 -- 开始 --
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*') //的允许所有域名的端口请求（跨域解决）
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  if (req.method === 'OPTIONS') {
    res.end()
  } else {
    next()
  }
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
var usersRouter = require('./routes/users');
var todoRouter = require('./routes/todo');
var toolsRouter = require('./routes/tools');
const API = '/api'
app.use(API + '/users', usersRouter);
app.use(API + '/todo', todoRouter);
app.use(API + '/tools', toolsRouter);
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
