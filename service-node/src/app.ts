import express, { Express } from 'express'
import config from 'config'
import logger from './utils/logger'
import routes from './routes'
import swaggerDocs from "./utils/swagger";
const port = config.get<string>('port')
const app: Express = express()
app.use(express.json());

app.listen(port, () => {
  routes(app)
  swaggerDocs(app, port);
  logger.info(`App is runing at: http://localhost:${port}`)
})


