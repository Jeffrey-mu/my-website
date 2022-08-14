import axios from 'axios'
const APi = 'http://localhost:3100/api'
// const APi = 'http://101.200.33.150:3100/api'
export function request(method) {
  return function (url: string, params = {}) {
    return axios({
      url: APi + url,
      method,
      params,
    }).then((res) => {
      console.log(params)
      return res.data
    })
  }
}
export default {
  get: request('get'),
  put: request('put'),
  del: request('delete'),
  post: request('post'),
}
