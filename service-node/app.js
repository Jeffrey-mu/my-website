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

// 注册路由
setRoutes();
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

/**
 *  注册路由
 */
function setRoutes() {
  const API = '/api/';
  const fileDir = 'routes';
  const noIncludePath = ['index'];
  const getPrefix = (path) => path.split('.')[0];
  require('fs').readdirSync(path.join(__dirname, fileDir)).filter(path => noIncludePath.some(noPath => !path.startsWith(noPath))).forEach(api => {
    app.use(API + getPrefix(api), require(path.join(__dirname, fileDir + '/') + getPrefix(api)));
  });
}

module.exports = app;
