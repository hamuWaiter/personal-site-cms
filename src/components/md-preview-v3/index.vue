<template>
	<!-- 大纲 -->
	<!-- <MdCatalog :editorId="id" :scrollElement="scrollElement" /> -->
	<!-- 正文 -->
	<MdPreview :id="id" :modelValue="props.markdownContent" />
</template>

<script setup>
import { computed, effect, ref } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
// import 'md-editor-v3/lib/preview.css';
import 'md-editor-v3/lib/style.css';

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
</script>
