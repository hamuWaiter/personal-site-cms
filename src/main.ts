import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router';
import App from './App.vue';

import { config } from 'md-editor-v3';
import { lazyLoadPlugin } from '@/plugins';

// md开启浏览器懒加载模块（需要浏览器支持img标签loading="lazy"）
// img最终会渲染成类似：<img src="example.png" alt="" title="image title" loading="lazy">
config({
	markdownItConfig: mdIt => {
		mdIt.use(lazyLoadPlugin);
	}
});

// import dotenv from 'dotenv';
// dotenv.config();

// 常规流程
createApp(App).use(router).use(ElementPlus).mount('#app');
