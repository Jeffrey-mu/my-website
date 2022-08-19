import ProjectModel from '../model/project.model'
import dayjs from 'dayjs'
/**
 * 获取全部项目
 * @return {Promise<Todo>}
 */
export async function getProject() {
  const projectResult = await ProjectModel.findAll()
  return projectResult
}

/**
 * 添加项目
 * @param res
 * @return {Promise<Todo>}
 */
export interface AddProjectParams {
  name: string
  url: string
  description: string
}
export async function addProject({ name, url, description }: AddProjectParams) {
  const projecInfo = await ProjectModel.create({
    name,
    url,
    description,
    create_date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  })
  if (!projecInfo) {
    throw '添加失败'
  }
  return projecInfo
}
