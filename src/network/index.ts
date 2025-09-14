import { ElMessage } from 'element-plus';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { jsonParse, QSMYLoading } from '@/utils';

class Request {
	public api: AxiosInstance;

	constructor(baseURL: string) {
		this.api = axios.create({
			baseURL,
			timeout: 10000
		});

		this.api.interceptors.request.use(config => {
			// 处理网络异常
			switch (true) {
				case config.method === 'post' && config.data?.showLoading:
					QSMYLoading.open();
					delete config.data?.showLoading;
					break;
				case config.method === 'get' && config.params?.showLoading:
					QSMYLoading.open();
					delete config.params?.showLoading;
					break;
			}

			return config;
		});

		// 添加响应拦截器
		this.api.interceptors.response.use(
			response => {
				QSMYLoading.close();
				return response.data;
			},
			error => {
				console.log(error);
				QSMYLoading.close();

				// 处理请求超时
				if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
					ElMessage.error('请求超时，请检查网络连接或稍后重试');
					return Promise.reject({
						message: '请求超时，请检查网络连接或稍后重试',
						code: 'TIMEOUT',
						config: error.config
					});
				}

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

	get<T>(url: string, params?: { showLoading?: boolean } & Record<string, any>): Promise<T> {
		const { showLoading, ...rest } = params ?? { showLoading: true };

		return this.api.get(url, {
			params: { ...rest, showLoading: showLoading ?? true }
		});
	}

	post<T>(url: string, params: { showLoading?: boolean } & Record<string, any>, ...args: any[]): Promise<T> {
		const { showLoading, ...rest } = params ?? { showLoading: true };

		return this.api.post(url, { ...rest, showLoading: showLoading ?? true }, ...args);
	}

	static create(baseURL: string) {
		return new Request(baseURL);
	}
}

export const staticApi = Request.create('/static-api');

export default Request.create('/api');
