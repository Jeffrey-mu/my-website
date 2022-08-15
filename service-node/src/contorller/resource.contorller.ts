import type { Request, Response } from 'express'
import logger from '../utils/logger'
import { getResource } from '../servive/resource.servic'
import { SuccessResult, ErrorResult } from '../model/resultModel'
export async function getResourceHandler(req: Request, res: Response) {
  try {
    const resourceResult = await getResource()
    res.send(new SuccessResult(resourceResult))
  } catch (e: any) {
    res.status(406).send(new ErrorResult(e.message))
    logger.error(e.message)
  }
}
