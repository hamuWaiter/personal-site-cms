import { ElMessage } from 'element-plus';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { QSMYLoading } from '@/utils';

class Request {
	public api: AxiosInstance;

	constructor(baseURL: string) {
		this.api = axios.create({
			baseURL,
			timeout: 10000
		});

		this.api.interceptors.request.use(config => {
			QSMYLoading.open();
			return config;
		});

		// 添加响应拦截器
		this.api.interceptors.response.use(
			response => {
				QSMYLoading.close();
				return response.data;
			},
			error => {
				QSMYLoading.close();
				const { statusCode, message } = error.response.data;

				switch (statusCode) {
					case 401:
						ElMessage.error(message || '无接口权限');
						break;
					case 404:
						ElMessage.error(message || '资源未找到');
						break;
					case 500:
						ElMessage.error(message || '服务繁忙，请稍后重试');
						break;
					default:
						ElMessage.error(message || '请求失败');
				}

				return Promise.reject(error.response.data);
			}
		);
	}

	get<T>(url: string, params: any): Promise<T> {
		return this.api.get(url, {
			params
		});
	}

	post<T>(url: string, params: any, ...args: any[]): Promise<T> {
		return this.api.post(url, params, ...args);
	}

	static create(baseURL: string) {
		return new Request(baseURL);
	}
}

export const staticApi = Request.create('/static-api');

export default Request.create('/api');
