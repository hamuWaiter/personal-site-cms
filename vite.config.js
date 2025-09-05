import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCDNImport from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      open: false, // 打包完成后自动打开报告
      gzipSize: true, // 查看gzip压缩大小
      brotliSize: true, // 查看brotli压缩大小
      filename: "stats.html" // 分析报告文件名
    }),
    viteCDNImport({
      modules: [
        // Vue 3
        {
          name: 'vue',
          var: 'Vue',
          path: 'https://unpkg.com/vue@3.5.13/dist/vue.global.prod.js'
        },
        // Vue Router 4 (与 Vue 3 兼容)
        {
          name: 'vue-router',
          var: 'VueRouter',
          path: 'https://unpkg.com/vue-router@4.3.2/dist/vue-router.global.prod.js'
        },
        // Element Plus
        {
          name: 'element-plus',
          var: 'ElementPlus',
          path: 'https://unpkg.com/element-plus@2.7.4/dist/index.full.js',
          css: 'https://unpkg.com/element-plus@2.7.4/dist/index.css'
        },
        // MD Editor
        {
          name: 'md-editor-v3',
          var: 'MdEditor',
          path: 'https://unpkg.com/md-editor-v3@5.8.4/lib/umd/index.js',
          css: 'https://unpkg.com/md-editor-v3@5.8.4/lib/style.css'
        },
        // Day.js
        {
          name: 'dayjs',
          var: 'dayjs',
          path: 'https://unpkg.com/dayjs@1.11.13/dayjs.min.js'
        },
        // Axios
        {
          name: 'axios',
          var: 'axios',
          path: 'https://unpkg.com/axios@1.7.9/dist/axios.min.js'
        }
      ]
    })
  ],
  build: {
    rollupOptions: {
      external: [
        'vue',
        'vue-router',
        'dayjs',
        'axios',
        'md-editor-v3',
        'element-plus'
      ],
      // 注意：如果外部化，则需要确保在index.html中通过CDN引入这些依赖
    }
  },
  server: {
    port: 8802,
    proxy: {
      // 将请求地址以 /api 开头的请求代理到 http://localhost:3000/（后端有api前缀，不用复写）
      '/api': {
        target: 'http://127.0.0.1:3000',
        // target: 'http://zzw.mingyueforever.cn/',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/static-api': {
        target: 'http://127.0.0.1:4000',
        // target: 'http://static-server.mingyueforever.cn/',
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
