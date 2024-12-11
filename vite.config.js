import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8802,
    proxy: {
      // 将请求地址以 /api 开头的请求代理到 http://localhost:3000/（后端有api前缀，不用复写）
      '/api': {
        target: 'http://localhost:3000',
        // target: 'http://zzw.mingyueforever.cn/',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/static-api': {
        // target: 'http://localhost:4000',
        target: 'http://static-server.mingyueforever.cn/',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
