import axios, { AxiosInstance } from 'axios';
import { ENV } from './config';

class Request {
  public api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL
    });

    // 添加响应拦截器
    this.api.interceptors.response.use(
      response => {
        return response.data;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  get(url: string, params: any) {
    return this.api.get(url, {
      params
    });
  }

  post(url: string, params: any) {
    return this.api.post(url, params);
  }

  static create(baseURL: string) {
    return new Request(baseURL);
  }
};

export default Request.create(ENV.local);