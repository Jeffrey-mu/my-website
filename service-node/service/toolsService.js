const ToolsModel = require("../model/tools");

/**
 * 查询工具推荐数据
 * @return {Promise<Todo>}
 */
async function getTools() {
  const passwordInfo = await ToolsModel.findAll();
  return passwordInfo;
}


module.exports = {
  getTools,
};
