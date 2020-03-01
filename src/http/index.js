import axios from 'axios';

let instance = axios.create({
  timeout: 1000 * 20
});

if(process.env.NODE_ENV == 'development') {
  instance.defaults.baseURL = '/api/'
};

export default instance;