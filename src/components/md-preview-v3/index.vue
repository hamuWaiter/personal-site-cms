<template>
	<!-- 大纲 -->
	<!-- <MdCatalog :editorId="id" :scrollElement="scrollElement" /> -->
	<!-- 正文 -->
	<MdPreview :id="id" :modelValue="props.markdownContent" />
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

// const modelValue = computed(() => props.markdownContent.replace(/\.\/img\//g, 'http://static-server.mingyueforever.cn/uploads/img/'));

const id = 'preview-only';
const text = ref('# Hello Editor');
const scrollElement = document.documentElement;

onMounted(() => {
	// 使用 nextTick 确保 DOM 更新完成
	nextTick(async () => {
		// 设置一个合理的延迟，确保 MdPreview 完成渲染
		await QSMYSleep({ timeout: 100 });
		lazyLoadImagesWithRetry();
	});
});
</script>
