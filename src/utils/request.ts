import axios from 'axios'
export function get(url: string, params = {}) {
  return axios({
    url,
    method: 'get',
    params
  }).then(res => {
    console.log(params);
    return res.data
  })
}
export function post(url: string, data = {}) {
  return axios.post(url, data).then(res => {
    return res.data
  })
}
