import { HttpCode } from '../enum/httpCode'
export class SuccessResult<T> {
  public message = "success"
  public result: T
  public code: number
  constructor(result, message?: string) {
    this.code = HttpCode.SUCCESSCODE
    this.message = message;
    this.result = result
  }
}
export class ErrorResult<T> {
  public message
  public result: T
  public code: number
  constructor(ErrorMessage: string) {
    this.code = HttpCode.ERRORCODE
    this.message = ErrorMessage;
  }
}
