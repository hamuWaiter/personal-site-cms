import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import router from './router';
import App from './App.vue';

// 只在开发环境引入样式，生产环境由CDN引入
if (import.meta.env.DEV) {
	try {
		import('element-plus/dist/index.css');
	} catch (err) {
		console.error('Element Plus 样式文件引入失败:', err);
	}
}

// 常规流程
createApp(App).use(router).use(ElementPlus).mount('#app');
