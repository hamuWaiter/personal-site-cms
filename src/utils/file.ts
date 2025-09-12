import { staticApi } from '@/network';

export const uploadFile = async (file: File): Promise<string> => {
	try {
		const formData = new FormData();
		formData.append('file', file);

		return await staticApi.post<string>('/common/upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
			// onUploadProgress: progressEvent => {
			// 	const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
			// 	// 更新进度条
			// 	document.getElementById('progressBar').style.width = percent + '%';
			// 	document.getElementById('progressPercent').textContent = percent + '%';
			// }
		});
	} catch (error) {
		console.error('上传失败:', error);
		return '';
	}
};

export const uploadFiles = async (files: File[]): Promise<string[]> => {
	try {
		const formData = new FormData();

		for (let file of files) {
			formData.append('files', file);
		}

		return await staticApi.post<string[]>('/common/uploads', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
			// onUploadProgress: progressEvent => {
			// 	const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
			// 	// 更新进度条
			// 	document.getElementById('progressBar').style.width = percent + '%';
			// 	document.getElementById('progressPercent').textContent = percent + '%';
			// }
		});
	} catch (error) {
		console.error('上传失败:', error);
		return [];
	}
};
