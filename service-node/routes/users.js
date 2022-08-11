var express = require('express');
var router = express.Router();
const MyError = require("../exception");
const { REQUEST_PARAMS_ERROR_CODE } = require("../exception/errorCode");
var { getUser, } = require('../service/userService')
/* GET users listing. */
router.get('/', async function (req, res, next) {
  let { password } = req.query
  if (!password) {
    return res.send(new MyError(REQUEST_PARAMS_ERROR_CODE, '请输入密码！'))
  }
  return res.send(await getUser({ password }))
});

module.exports = router;
