<template>
<!--  <div v-html="parsedMarkdown"></div>-->
</template>

<script setup>
import { computed } from 'vue';
// import marked from 'marked'; // SyntaxError: The requested module '/node_modules/.vite/deps/marked.js?v=d9f6a36d' does not provide an export named 'default'
// import * as marked from 'marked'; // 使用 import * as marked


// 定义 props 并设定默认值
const props = defineProps({
  markdownContent: {
    type: String,
    default: '# 默认标题\n\n这是默认的 Markdown 内容。'
  }
});

// 计算属性，将 Markdown 内容解析为 HTML
// const parsedMarkdown = computed(() => {
//   return marked.parse(props.markdownContent);
// });


</script>