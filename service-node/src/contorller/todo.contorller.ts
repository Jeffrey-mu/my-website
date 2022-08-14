import type { Request, Response } from 'express'
import {
  getTodo,
  addTodo,
  delTodo,
  AddTodoParams,
} from '../servive/todo.service'
import { SuccessResult, ErrorResult } from '../model/resultModel'
export async function getTodoHandler(req: Request, res: Response) {
  res.send(new SuccessResult(await getTodo()))
}

export async function putTodoHandler(req: Request, res: Response) {
  let query = req.query
  if (Object.keys(query).every((key) => query[key])) {
    return res.send(new ErrorResult('参数错误'))
  }
  res.send(new SuccessResult(await addTodo(query)))
}

export async function deleteTodoHandler(req: Request, res: Response) {
  let id: number = Number(req.query.id)
  if (!id) {
    return res.send(new ErrorResult('id为空！'))
  }
  res.send(new SuccessResult(await delTodo(id)))
}
