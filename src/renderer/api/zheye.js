import axios from 'axios'
const api = 'http://www.iuehtml.cn/api/'
export async function getCate () {
  return axios.get(api + 'zheye/cate')
}
export async function getList () {
  return axios.get(api + 'zheye/list')
}
