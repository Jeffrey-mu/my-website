---
slug: Node Express Token 教程
title: Node Express Token 教程
authors: Jeffrey
tags: [node, token, JYT]
---

# token jwt 介绍

## 一、Token

- 什么是 Token？
  Token 指访问资源的凭据，是一种身份认证的方式，它是解决跨域认证的最流行的一种方式。

- 为什么用 Token？
  以前较为流行的是通过 session 去做身份认证，session 是通过服务器中保存会话数据来做身份认证，这种方式会导致在高并发中服务器压力过大的情况，还有就是，如果是服务器集群，那么就需要这些服务器 session 共享。

Token 不在服务器中保存会话数据，而是保存在客户端。每次请求的 headers 中存入 Token，在服务器中判断 Token 的有效性，是否可以访问资源。

- 传统 Token 和 JWT 的区别

- - 传统 Token
    用户发起登录请求，登录成功之后返回 Token，并且存于数据库，用户访问资源的时候需要携带 Token，服务端获取 Token 之后和数据库中的对比。

- - JWT
    用户发起登录请求，登录成功之后返回 Token，但是不存于数据库，用户访问资源的时候需要携带 Token，服务端获取 Token 之后去校验 Token 的合法性。

## 二、JWT 实现过程

- JWT 分为三个部分 header、payload、verify signature

- header

内部包含有签名算法、Token 类型，然后通过 base64url 算法转成字符串

```js
//明文例子：
{
    "alg":"HS256",
    "typ":"JWT"
}
```

- payload
  内部包含 JWT 标准数据和自定义数据，然后通过 base64url 算法转成字符串
  JWT 标准数据常见的有：

```
iss：提供方。
sub：主题，一般是用户ID。
exp：过期时间。
iat：创建时间。
jti：token的唯一标识。
```

可选择性使用以上标准数据

```js
//明文例子：
{
  "id": 3,
  "name": "Bmongo",
  "age": 18,
  "iat": 1588139323,
  "exp": 1588139333
}
```

> 注意：由于 JWT 是默认不加密的，所以在这边不要存敏感信息

- verify signature
  这部分是对前两部分的签名，防止数据的篡改
  secret 是服务器端保存的密钥，只有服务器端知道，再使用 header 中所指定的签名算法对上面的俩部分进行签名，按照以下公式生成签名

```JS
HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    secret
)
```

复制代码
算出签名之后，把三部分通过.分隔开返回给用户就行了

- 客户端请求

- 每次客户端的请求都需要带上这个 token，一般是把 token 写入到请求的 headers 中

## 三、Node.js 中使用

Node.js 中使用 JWT

### 1.开始使用

通过 npm 包 jsonwebtoken 来完成 token 的生成和验证

```bash
npm install --save jsonwebtoken
```

### 2.生成、验证 Token

```js title="auth/token.js"
const jwt = require('jsonwebtoken')
//撒盐，加密时候混淆
const secret = '113Bmongojsdalkfnxcvmas'

//生成token
//info也就是payload是需要存入token的信息
function createToken(info) {
  let token = jwt.sign(info, secret, {
    //Token有效时间 单位s
    expiresIn: 60 * 60 * 10,
  })
  return token
}

//验证Token
function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}
const whiteList = ['/api/login']

function verifyTokenMiddle(req, res, next) {
  if (!whiteList.includes(req.url)) {
    // 发起请求是headers.authorization 添加token
    verifyToken(req.headers.authorization)
      .then((res) => {
        next()
      })
      .catch((e) => {
        res.status(401).send('invalid token')
      })
  } else {
    next()
  }
}

module.exports = {
  verifyTokenMiddle,
  createToken,
}
```

### 3.使用

```js {55} title="app.js" showLineNumbers
var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const { verifyTokenMiddle } = require('./auth/token')
const expressSession = require('express-session')
const redis = require('redis')
const { redisConfig } = require('./config/config')
// 创建Redis连接配置
const redisClient = redis.createClient(redisConfig)
const RedisStore = require('connect-redis')(expressSession)

redisClient.on('connect', function () {
  console.log('Redis client connected')
})
redisClient.on('error', function (e) {
  console.error(e)
})
var app = express()
app.use(express.static(path.join(__dirname, '/public')))

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

app.use(cookieParser())

app.use(
  expressSession({
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
    },
  })
)
// app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// 添加验证token中间件
app.use(verifyTokenMiddle)

// 注册路由
setRoutes()
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  console.log(2)
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send('error')
})

/**
 *  注册路由
 */
function setRoutes() {
  const API = '/api/'
  const fileDir = 'routes'
  const noIncludePath = ['index']

  const getPrefix = (path) => path.split('.')[0]
  require('fs')
    .readdirSync(path.join(__dirname, fileDir))
    .filter((path) => noIncludePath.some((noPath) => !path.startsWith(noPath)))
    .forEach((api) => {
      app.use(
        API + getPrefix(api),
        require(path.join(__dirname, fileDir + '/') + getPrefix(api))
      )
    })
}

module.exports = app
```

```js title="routers/login"
var express = require('express')
var router = express.Router()
const { createToken } = require('../auth/token')
router.get('/', function (req, res) {
  var user = {
    name: 'zs',
    ps: 123,
  }
  let token = createToken(user)
  res.send(token)
})
module.exports = router
```

## 总结

:::tip

- 登录成功之后 服务端根据用户信息生成 `token`
- 非登录接口发起请求是需设置 `headers.authorization = token`
- 添加`token`验证中间件，除登录接口 其他接口全部验证 token
- 验证成功通过，不成功提示错误
  :::
