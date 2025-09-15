<template>
	<!-- 大纲 -->
	<!-- <MdCatalog :editorId="id" :scrollElement="scrollElement" /> -->
	<!-- 正文 -->
	<MdPreview :id="id" :modelValue="props.markdownContent" :sanitize="handleSanitize" />
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import { lazyLoadImagesWithRetry, QSMYSleep } from '@/utils';
import 'md-editor-v3/lib/preview.css';

const props = defineProps({
	markdownContent: {
		type: String,
		default: '# 默认标题\n\n这是默认的 Markdown 内容。'
	}
});

// 方案一：插件方式
// 懒加载-插件方式（注意：此方式为全局修改，会影响博客编辑页面上传图片的显示）
// import { config } from 'md-editor-v3';
// import { lazyLoadPlugin } from '@/plugins';
//
// // md开启浏览器懒加载模块（需要浏览器支持img标签loading="lazy"）
// // img最终会渲染成类似：<img src="example.png" alt="" title="image title" loading="lazy">
// config({
// 	markdownItConfig: mdIt => {
// 		mdIt.use(lazyLoadPlugin);
// 	}
// });

// 方案二：内容覆写方式
// 图片懒加载处理函数
const handleSanitize = html => {
	const loadingImage = '/loading.gif';
	return html.replace(/<img\s+([^>]*?)src="([^"]+)"([^>]*?)>/gi, (match, beforeSrc, srcValue, afterSrc) => {
		return `<img ${beforeSrc}data-src="${srcValue}"${afterSrc} src="${loadingImage}" />`;
	});
};

// const modelValue = computed(() => props.markdownContent.replace(/\.\/img\//g, 'http://static-server.mingyueforever.cn/uploads/img/'));

const id = 'preview-only';
const text = ref('# Hello Editor');
const scrollElement = document.documentElement;

onMounted(() => {
	nextTick(async () => {
		// 确保 MdPreview 完成渲染
		await QSMYSleep({ timeout: 100 });
		lazyLoadImagesWithRetry();
	});
});
</script>
