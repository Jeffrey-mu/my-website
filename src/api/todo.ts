import request from '../utils/request'
enum Api {
  Todo = '/todo',
}
/**
 * 查询列表
 */

export function getTodoData() {
  return request.get(Api.Todo)
}

/**
 *添加数据
 @param options 插入数据
*/
export function addTodoData(data) {
  return request.put(Api.Todo, data)
}

/**
 *删除数据
 @param id 删除id
*/
export function delTodoData(data) {
  return request.del(Api.Todo, data)
}

export function getUsers(data) {
  return request.get('/user', data)
}
