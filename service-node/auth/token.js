const jwt = require("jsonwebtoken")
//撒盐，加密时候混淆
const secret = '113Bmongojsdalkfnxcvmas'
const user = {
  id: 10,
  name: "Bmongo",
  age: 16,
}

//生成token
//info也就是payload是需要存入token的信息
function createToken(info) {
  let token = jwt.sign(info, secret, {
    //Token有效时间 单位s
    expiresIn: 60 * 60 * 10
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
    verifyToken(req.headers.authorization).then(res => {
      next()
    }).catch(e => {
      res.status(401).send('invalid token')
    })
  } else {
    next()
  }
}

module.exports = {
  verifyTokenMiddle,
  createToken,
  user
}

