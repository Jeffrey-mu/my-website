const MyError = require("../exception");
const dayjs = require("dayjs");
const { Op } = require("sequelize");

const {
  NO_AUTH_ERROR_CODE,
  REQUEST_PARAMS_ERROR_CODE,
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
async function delTodo({ name, date, title, }) {
  const allTodo = await TodoModel.destroy({ id })
  if (!allTodo) {
    throw new MyError(NOT_FOUND_ERROR_CODE, "添加失败");
  }
  return allTodo;
}
module.exports = {
  getTodo,
  addTodo,
  delTodo
};
