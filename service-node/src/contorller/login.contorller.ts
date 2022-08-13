import { createToken } from '../auth/token'
import type { Request, Response } from 'express'
import { SuccessResult, ErrorResult } from '../model/resultModel'
import logger from '../utils/logger'
export async function getHandler(req: Request, res: Response) {
  try {
    var user = {
      name: 'zs',
      ps: 123,
    }
    let token = createToken(user)
    res.send(new SuccessResult(token))
  } catch (e: any) {
    res.status(406).send(new ErrorResult(e.message))
    logger.error(e.message)
  }
}
