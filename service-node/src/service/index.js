const SUCCESS_CODE = 200
const { REQUEST_PARAMS_ERROR_CODE } = require("../exception/errorCode");
class SUCCESS_RESULT {
  constructor(message, result = []) {
    this.code = SUCCESS_CODE
    this.message = message
    this.result = result
  }
}
class ERROR_RESULT extends SUCCESS_RESULT {
  constructor(message) {
    super(message)
    this.code = REQUEST_PARAMS_ERROR_CODE
  }
}
module.exports = {
  SUCCESS_RESULT,
  ERROR_RESULT
};
