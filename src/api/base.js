let base;

if(process.env.NODE_ENV == 'production') {
  base = {
    http: 'http://iimg.com.cn/api'
  };
} else {
  base = {    
    http: '',
  };
};

export default base;