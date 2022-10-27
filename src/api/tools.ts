import request from '../utils/request'
import json from './mock/index.json'
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
  return json.tools
  // return request.get('/tools')
}
