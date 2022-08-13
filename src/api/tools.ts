import request from '../utils/request'
/**
 * 查询列表
 */
export interface ToolsDataModel {
  title: string
  url: string
  description: string
  type: string
}
export function getToolsData() {
  return request.get('/tools')
}
