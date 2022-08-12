var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { verifyTokenMiddle } = require('./auth/token');
const expressSession = require('express-session');
const redis = require('redis');
const { redisConfig } = require('./config/config')
// 创建Redis连接配置
const redisClient = redis.createClient(redisConfig);
const RedisStore = require('connect-redis')(expressSession);

redisClient.on('connect', function () {
  console.log('Redis client connected');
});
redisClient.on('error', function (e) {
  console.error(e);
});
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

app.use(cookieParser());

app.use(expressSession({
  store: new RedisStore({ client: redisClient }),
  name: 'session_id', // 默认connect.sid
  secret: 'yupi996', // 设置签名秘钥  内容可以任意填写
  resave: true, // 强制保存，如果session没有被修改也要重新保存,默认true(推荐false)
  saveUninitialized: true, // 如果原先没有session那么就设置，否则不设置(推荐true)
  rolling: true, // 每次请求更新有效时长
  cookie: {
    domain: '.mianshiya.com',
    // 全局设置cookie,就是访问随便api就会设置cookie，也可以在登录的路由下单独设置
    maxAge: 1000 * 60 * 60 * 24 * 15, // 15 天后过期
    httpOnly: true, // 是否允许客户端修改cookie,(默认true 不能被修改)
  }
}))
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(verifyTokenMiddle)

// 注册路由
setRoutes();
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(2)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

/**
 *  注册路由
 */
function setRoutes() {
  const API = '/api/';
  const fileDir = 'routes';
  const noIncludePath = ["index"];

  const getPrefix = (path) => path.split('.')[0];
  require('fs').readdirSync(path.join(__dirname, fileDir)).filter(path => noIncludePath.some(noPath => !path.startsWith(noPath))).forEach(api => {

    app.use(API + getPrefix(api), require(path.join(__dirname, fileDir + '/') + getPrefix(api)));

  });
}

module.exports = app;
