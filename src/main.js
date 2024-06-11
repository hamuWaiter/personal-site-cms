import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import App from './App.vue'

// import dotenv from 'dotenv'
// dotenv.config()

// 常规流程
createApp(App).use(router).use(ElementPlus).mount('#app')
