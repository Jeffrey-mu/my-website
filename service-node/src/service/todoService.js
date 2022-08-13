const MyError = require("../exception");
const dayjs = require("dayjs");
const { Op } = require("sequelize");
const { SUCCESS_RESULT } = require('./')
const {
  NOT_FOUND_ERROR_CODE,
} = require("../exception/errorCode");
const TodoModel = require("../model/todo");



/**
 * 获取当前全部事件
 * @return {Promise<Todo>}
 */
async function getTodo() {
  const allTodo = await TodoModel.findAll();
  if (!allTodo) {
    throw new MyError(NOT_FOUND_ERROR_CODE, "事件为空");
  }
  return allTodo;
}

/**
 * 添加事件
 * @param res
 * @return {Promise<Todo>}
 */
async function addTodo({ name, date, title, }) {
  const allTodo = await TodoModel.create(
    {
      name,
      date,
      title,
      create_date: dayjs().format("YYYY-MM-DD HH:mm:ss")
    }
  )
  if (!allTodo) {
    throw new MyError(NOT_FOUND_ERROR_CODE, "添加失败");
  }
  return allTodo;
}

/**
 * 删除事件
 * @param res
 * @return {Promise<Todo>}
 */
async function delTodo({ id }) {
  const allTodo = await TodoModel.destroy({
    where: {
      id: +id
    }
  })
  if (allTodo === 0) {
    return new MyError(NOT_FOUND_ERROR_CODE, "删除失败");
  }
  return new SUCCESS_RESULT('删除成功');
}
module.exports = {
  getTodo,
  addTodo,
  delTodo
};
