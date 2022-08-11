var express = require('express');
var router = express.Router();
var { getTools, } = require('../service/toolsService')
router.get('/', async function (req, res, next) {
  return res.send(await getTools())
});

module.exports = router;
