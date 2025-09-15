import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCDNImport from 'vite-plugin-cdn-import';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const isProduction = mode === 'production';

	return {
		plugins: [
			vue(),
			visualizer({
				open: false, // 打包完成后自动打开报告
				gzipSize: true, // 查看gzip压缩大小
				brotliSize: true, // 查看brotli压缩大小
				filename: 'stats.html' // 分析报告文件名
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
						// var决定了最终打包的js中，引用md-editor-v3的变量名。需要与CDN提供的全局变量名一致
						var: 'MdEditorV3',
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
			minify: 'terser',
			sourcemap: !isProduction,
			terserOptions: {
				compress: {
					drop_console: isProduction,
					drop_debugger: isProduction
				}
			},
			rollupOptions: {
				output: {
					experimentalMinChunkSize: 20 * 1024,
					chunkFileNames: 'assets/js/[name]-[hash].js', // 引入文件名的名称
					entryFileNames: 'assets/js/[name]-[hash].js', // 包的入口文件名称
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
					manualChunks(id) {
						// 将不会经常变动的三方包打入vendor避免修改业务代码用户重新请求这部分静态内容
						// if (id.includes('node_modules')) {
						// 	return 'vendor';
						// }
						try {
							if (id.includes('node_modules')) {
								const name = id.split('node_modules/')[1].split('/');
								if (name[0] == '.pnpm') {
									return name[1];
								} else {
									return name[0];
								}
							}
						} catch (error) {
							return 'vendor';
						}
					}
				},
				// 排除js中对这些包的引入，使用CDN方式引入
				external: ['vue', 'vue-router', 'dayjs', 'axios', /^md-editor-v3/, /^element-plus/]
			}
		},
		server: {
			port: 8802,
			proxy: {
				// 将请求地址以 /api 开头的请求代理到 http://localhost:3000/（后端有api前缀，不用复写）
				'/api': {
					target: 'http://127.0.0.1:3000',
					// target: 'http://zzw.mingyueforever.cn/',
					changeOrigin: true
					// rewrite: (path) => path.replace(/^\/api/, '')
				},
				'/static-api': {
					target: 'http://127.0.0.1:4000',
					// target: 'http://static-server.mingyueforever.cn/',
					changeOrigin: true
					// rewrite: (path) => path.replace(/^\/api/, '')
				}
			}
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src')
			}
		}
		// css: {
		// 	modules: {
		// 		// 生成哈希类名
		// 		generateScopedName: '[name]__[local]___[hash:base64:5]',
		// 	},
		// 	preprocessorOptions: {
		// 		less: {
		// 			javascriptEnabled: true,
		// 			// less全局变量
		// 			additionalData: `@import "./src/theme/vars.oralsharp.less";`,
		// 		},
		// 	},
		// },
	};
});
