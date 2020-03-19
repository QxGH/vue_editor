import base from './base'; // 导入接口域名列表
import axios from '@/http'; // 导入http中创建的axios实例

const editor = {
  getGoodsList() {
    return axios.post(`${base.http}/getGoodsList`);
  },
  getAllGoodsList() {
    return axios.post(`${base.http}/getAllGoodsList`);
  }
}

export default editor;