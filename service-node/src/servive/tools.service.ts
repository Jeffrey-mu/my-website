import ToolsModel from '../model/tools.model'

/**
 * 查询工具推荐数据
 * @return {Promise<Todo>}
 */
export async function getTools() {
  const passwordInfo = await ToolsModel.findAll()
  return passwordInfo
}
