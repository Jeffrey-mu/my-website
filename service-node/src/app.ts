import express, { Express } from 'express'
import config from 'config'
import logger from './utils/logger'
import routes from './routes'
import swaggerDocs from './utils/swagger'
const port = config.get<string>('port')
const app: Express = express()
app.use(express.json())
app.all('*', (req, res, next) => {
  // 开启跨域
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  const origin = req.get('Origin')
  // 允许的地址 http://127.0.0.1:9000 这样的格式
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  // 允许跨域请求的方法
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, OPTIONS, DELETE, PUT'
  )
  // 允许跨域请求 header 携带哪些东西
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since'
  )
  next()
})
app.listen(port, () => {
  routes(app)
  swaggerDocs(app, port)
  logger.info(`App is runing at: http://localhost:${port}`)
})
