import base from './base'; // 导入接口域名列表
import axios from '@/http'; // 导入http中创建的axios实例

const iimg = {
  upload(formData) {
    return axios.post(`${base.uploadImg}/`, formData);
  }
}

export default iimg;