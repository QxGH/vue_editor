let base;

if(process.env.NODE_ENV == 'production') {
  base = {
    http: 'https://iimg.com.cn/api',
    uploadImg: 'https://api.uomg.com/api'
  };
} else {
  base = {    
    http: '',
    uploadImg: 'https://api.uomg.com/api'
  };
};

export default base;