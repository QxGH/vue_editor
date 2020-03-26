import base from './base'; // 导入接口域名列表
import axios from '@/http'; // 导入http中创建的axios实例

const qiniu = {
  upload(formData) {
    return axios.post(`${base.uploadImg}/image.ali`, formData, {
      headers: {
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryuNl5vDgZ1PlpBttj'
      }
    });
  },
  getTempToken() {
    return axios.post(`${base.qinxu}/qiniu/getTempToken`);
  },
  uploadFile(data) {
    return axios.post(`${base.qiniu}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
}

export default qiniu;