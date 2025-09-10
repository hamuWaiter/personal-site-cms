<template>
  <div style="text-align: center; margin-top: 100px; font-size: 20px; color: #999;">
    <el-empty :description="props.description" />
    <div class="button-wrapper">
      <el-button type="primary" @click="() => router.back()">返回上一页</el-button>
      <el-button @click="() => router.push({
      path: props.home,
      replace: true
      })">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
  description: {
    type: String,
    default: '页面未找到'
  },
  home: {
    type: String,
    default: '/home'
  }
});
</script>

<style scoped lang="scss"></style>
