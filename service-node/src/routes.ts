import type { Express, Response, Request } from 'express'
import validateResource from './middleware/validateResource'
import { getHandler } from './contorller/user.contorller'
import { getToolsHandle } from './contorller/tools.contorller'
import { getTodoHandler, putTodoHandler } from './contorller/todo.contorller'
import { createUserSchema } from './schema/user.schema'

function routes(app: Express) {
  app.get('/test/success', (req: Request, res: Response) => {
    res.send('hello world')
  })
  /**
   * @openapi
   * '/api/user':
   *  get:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestQuery:
   *      required: true
   *      content:
   *        application/json:
   *           schema:$ref: '#/components/schema/createUserSchema'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   */
  app.get('/api/user', getHandler)
  app.get('/api/tools', getToolsHandle)
  app.get('/api/todo', getTodoHandler)
  app.put('/api/todo', putTodoHandler)
  /**
   * @openapi
   * '/api/user':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   */
  app.post('/api/user', validateResource(createUserSchema), getHandler)
}

export default routes
