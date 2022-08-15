import ResourceModel from '../model/resource.model'
import dayjs from 'dayjs'
/**
 * 查询资源
 * @return {Promise<Todo>}
 */
export interface Password {
  password: string
}
export async function getResource() {
  const resourceResult = await ResourceModel.findAll()
  if (!resourceResult) {
    return Promise.reject(new Error(`not found`))
  }
  return resourceResult
}
/**
 * 添加资源
 * @return {Promise<Todo>}
 */
interface AddResourceParams {
  title: string
  description: string
  img: string
  url: string
}
export async function addResource({ title, img, url, description }: AddResourceParams) {
  const Resource = await ResourceModel.create({
    title,
    img,
    url,
    description,
    create_date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  })
  if (!Resource) {
    return Promise.reject(new Error(`添加失败`))
  }
  return Resource
}
