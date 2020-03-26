let base;

if(process.env.NODE_ENV == 'production') {
  // 正式环境
  base = {
    http: 'https://www.fastmock.site/mock/bd760dd8ed7013045d3016137fe3801f/api',
    uploadImg: 'https://api.uomg.com/api',
    qinxu: 'https://qinxus.com',
    qiniu: 'https://up-z0.qiniup.com',
    qiniuStatic: 'https://cdn.qinxus.com'
  };
} else {
  base = {    
    http: 'https://www.fastmock.site/mock/bd760dd8ed7013045d3016137fe3801f/api',
    uploadImg: 'https://api.uomg.com/api',
    qinxu: 'https://qinxus.com',
    qiniu: 'https://up-z0.qiniup.com',
    qiniuStatic: 'https://cdn.qinxus.com'
  };
};

export default base;