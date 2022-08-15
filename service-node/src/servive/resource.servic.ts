import UserModel from '../model/resource.model'
/**
 * 查询资源
 * @return {Promise<Todo>}
 */
export interface Password {
  password: string
}
export async function getResource() {
  const resourceResult = await UserModel.findAll()
  if (!resourceResult) {
    return Promise.reject(new Error(`not found`))
  }
  return resourceResult
}
