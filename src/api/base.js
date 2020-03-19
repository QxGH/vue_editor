let base;

if(process.env.NODE_ENV == 'production') {
  base = {
    http: 'https://www.fastmock.site/mock/bd760dd8ed7013045d3016137fe3801f/api',
    uploadImg: 'https://api.uomg.com/api'
  };
} else {
  base = {    
    http: 'https://www.fastmock.site/mock/bd760dd8ed7013045d3016137fe3801f/api',
    uploadImg: 'https://api.uomg.com/api'
  };
};

export default base;