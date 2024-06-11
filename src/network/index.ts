import axios from 'axios';
import { ENV } from './config';

const api = axios.create({
  baseURL: ENV.local
});

// 添加响应拦截器
api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
