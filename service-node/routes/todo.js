var express = require('express');
var router = express.Router();
const MyError = require("../exception");
const { REQUEST_PARAMS_ERROR_CODE } = require("../exception/errorCode");
var { getTodo, addTodo, delTodo } = require('../service/todoService')

router.get('/', async function (req, res, next) {
  res.send(await getTodo())
});

router.put('/', async function (req, res, next) {
  let { name, date, title } = req.query
  if (!name || !title || !date) {
    return res.send(new MyError(REQUEST_PARAMS_ERROR_CODE, '参数错误'))
  }
  res.send(await addTodo({ name, date, title }))
});

router.delete('/', async function (req, res, next) {
  let { id } = req.query
  if (!id) {
    return res.send(new MyError(REQUEST_PARAMS_ERROR_CODE, 'id为空！'));
  }
  res.send(await delTodo({ id }))
});
module.exports = router;
