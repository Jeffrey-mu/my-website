import type { Request, Response } from 'express'
import logger from '../utils/logger'
import { getTools as getToolsService } from '../servive/tools.service'
import { SuccessResult, ErrorResult } from '../model/resultModel'
export async function getToolsHandle(req: Request, res: Response) {
  try {
    res.send(new SuccessResult(await getToolsService()))
  } catch (e: any) {
    res.status(406).send(new ErrorResult(e.message))
    logger.error(e.message)
  }
}
