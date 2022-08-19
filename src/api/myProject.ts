import request from '../utils/request'

export interface MyProjectModel {
  name: string
  url: string
  description: string
  type: string
}
enum Api {
  Project = '/project',
}
/**
 * 查询列表
 */
export function getMyProjectData() {
  return request.get(Api.Project)
}
/**
 * 添加项目
 */
export function addMyProjectData(data) {
  return request.put(Api.Project, data)
}
