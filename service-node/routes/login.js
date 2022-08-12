var express = require('express');
var router = express.Router();
const { createToken } = require('../auth/token')
router.get('/', function (req, res) {
  var user = {
    name: 'zs',
    ps: 123
  }
  let token = createToken(user)
  res.send(token)
})
module.exports = router;

