import dayjs from 'dayjs'
import TodoModel from '../model/todo.model'

/**
 * 获取当前全部事件
 * @return {Promise<Todo>}
 */
export async function getTodo() {
  const allTodo = await TodoModel.findAll()
  if (!allTodo) {
    throw '事件为空'
  }
  return allTodo
}

/**
 * 添加事件
 * @param res
 * @return {Promise<Todo>}
 */
export interface AddTodoParams {
  name: string
  date: string
  title: string
}
export async function addTodo({ name, date, title }: AddTodoParams) {
  const allTodo = await TodoModel.create({
    name,
    date,
    title,
    create_date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  })
  if (!allTodo) {
    throw '添加失败'
  }
  return allTodo
}

/**
 * 删除事件
 * @param res
 * @return {Promise<Todo>}
 */
export async function delTodo(id: number) {
  const allTodo = await TodoModel.destroy({
    where: {
      id: +id,
    },
  })
  if (allTodo === 0) {
    return '删除失败'
  }
  return '删除成功'
}
