const MyError = require("../exception");
const UserModel = require("../model/users");
const { SUCCESS_RESULT, ERROR_RESULT } = require('./')


/**
 * 验证密码
 * @return {Promise<Todo>}
 */
async function getUser({ password }) {
  const passwordInfo = await UserModel.findOne({
    where: {
      password
    }
  });
  if (!passwordInfo) {
    return new ERROR_RESULT("密码错误");
  }
  return new SUCCESS_RESULT();
}


module.exports = {
  getUser,
};
