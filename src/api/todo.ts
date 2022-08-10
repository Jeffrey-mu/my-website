import request from '../utils/request'
/**
 * 查询列表
*/
export function getTodoData() {
  return request.get('/todo')
}

/**
 *添加数据
 @param options 插入数据
*/
export function addTodoData(data) {
  return request.put('/todo', data)
}

/**
 *删除数据
 @param id 删除id
*/
export function delTodoData(data) {
  return request.del('/todo', data)
}

export function getUsers(data) {
  return request.get('/users', data)
}
