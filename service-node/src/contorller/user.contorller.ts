import type { Request, Response } from 'express'
import logger from '../utils/logger'
import { getUser } from '../servive/user.service'
import { SuccessResult, ErrorResult } from '../model/resultModel'
export async function getHandler(req: Request, res: Response) {
  try {
    const query = {
      password: req.params.password,
    }
    const user = await getUser(query)
    res.send(new SuccessResult(user))
  } catch (e: any) {
    res.status(406).send(new ErrorResult(e.message))
    logger.error(e.message)
  }
}
