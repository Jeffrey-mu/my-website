import request from '../utils/request'
import json from './mock/index.json'
export interface MyProjectModel {
  name: string
  url: string
  description: string
  type: string
  img: string
  githubLink: string
}
enum Api {
  Project = '/project',
}
/**
 * 查询列表
 */
export function getMyProjectData() {
  return  json.project
  // return request.get(Api.Project)
}
/**
 * 添加项目
 */
export function addMyProjectData(data) {
  return request.put(Api.Project, data)
}
