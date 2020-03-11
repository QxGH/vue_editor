let base;

if(process.env.NODE_ENV == 'production') {
  base = {
    http: 'https://iimg.com.cn/api',
    uploadImg: 'http://up.imgapi.com'
  };
} else {
  base = {    
    http: '',
    uploadImg: 'http://up.imgapi.com'
  };
};

export default base;