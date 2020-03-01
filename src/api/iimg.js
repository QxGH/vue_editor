import base from './base'; // 导入接口域名列表
import axios from '@/http'; // 导入http中创建的axios实例

const iimg = {
  getToken(formData) {
    return axios.post(`${base.http}/token`, formData);
  },
  upload(formData, token) {
    return axios.post(`${base.http}/upload`, formData, {
      headers: {
        'token': token
      }
    });
  }
}

export default iimg;