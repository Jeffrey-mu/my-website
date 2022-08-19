import type { Request, Response } from 'express'
import logger from '../utils/logger'
import { getProject, addProject } from '../servive/project.service'
import { SuccessResult, ErrorResult } from '../model/resultModel'
export async function getProjectHandler(req: Request, res: Response) {
  try {
    const project = await getProject()
    res.send(new SuccessResult(project))
  } catch (e: any) {
    res.status(406).send(new ErrorResult(e.message))
    logger.error(e.message)
  }
}

export async function addProjectHandler(req: Request, res: Response) {
  const query = req.query
  try {
    const project = await addProject(query)
    res.send(new SuccessResult(project))
  } catch (e: any) {
    res.status(406).send(new ErrorResult(e.message))
    logger.error(e.message)
  }
}
