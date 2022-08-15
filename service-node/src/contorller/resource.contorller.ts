import type { Request, Response } from 'express'
import logger from '../utils/logger'
import { getResource, addResource } from '../servive/resource.servic'
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

export async function getAddResourceHandler(req: Request, res: Response) {
  try {
    const { title, url, description, img } = req.body
    const resourceResult = await addResource({ title, url, description, img })
    res.send(new SuccessResult(resourceResult, '添加成功！'))
  } catch (e: any) {
    res.status(406).send(new ErrorResult(e.message))
    logger.error(e.message)
  }
}
