import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from 'express'
//撒盐，加密时候混淆
const secret = '113Bmongojsdalkfnxcvmas'

//生成token
//info也就是payload是需要存入token的信息
export function createToken(info: object) {
  let token = jwt.sign(info, secret, {
    //Token有效时间 单位s
    expiresIn: 60 * 60 * 10
  })
  return token
}

//验证Token
export function verifyToken(token: string) {
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

export function verifyTokenMiddle(req: Request, res: Response, next: NextFunction) {
  if (!whiteList.includes(req.url)) {
    // @ts-ignore
    verifyToken(req.headers.authorization).then(res => {
      next()
    }).catch(e => {
      res.status(401).send('invalid token')
    })
  } else {
    next()
  }
}

