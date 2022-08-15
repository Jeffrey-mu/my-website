import request from '../utils/request'
enum Api {
  getResourceData = '/resource',
}
export interface ResourceDataModel {
  title: string
  url: string
  description: string
  type: string
  img: string
}
export interface ResourceTypeModel {
  label: string
  id: number
  sort: number
}
/**
 * 查询列表
 */
export function getResourceData() {
  return request.get(Api.getResourceData)
}
export function getResourceType(): ResourceTypeModel[] {
  return [
    {
      label: 'all',
      id: 1,
    },
    {
      label: 'golang',
      id: 2,
    },
    {
      label: 'terminal',
      id: 3,
    },
    {
      label: 'typescript',
      id: 4,
    },
  ] as ResourceTypeModel[]
  // return request.get('/myProject')
}
