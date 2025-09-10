<template>
  <div class="blog-edit">
    <MdEditorV3 :html="editorData.markdown" @save="handleSave" placeholder="从这里开始吧~" />

    <el-dialog
      width="30%"
      :title="null"
      v-model="visible"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="container">
        <span>给文章命个名吧~</span>
        <el-input v-model="title" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="() => {
            handleNewBlog();
            visible = false;
          }">
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { MdEditorV3 } from '@/components';
import axios from "@/network";
import {ElMessage} from "element-plus";

const router = useRouter();
const title = ref('');
const editorData = ref({
  html: '',
  markdown: ''
});
const visible = ref(false);
const id = computed(() => useRoute().params.id ?? 'new');

const init = async () => {
  const { url, html, markdown } = await axios.get(`/blog/${id.value}`);

  if (html) {
    editorData.value.html = html;
    editorData.value.markdown = markdown;
  } else if (url) {
    editorData.value = await axios.post("/common/markdown2html", { url });
  }
};

// 修改博客时，初始化博客
if (id.value !== 'new') init();

// 新增
const handleNewBlog = async () => {
  try {
    await axios.post('/blog', {
      url: '',
      title: title.value,
      html: editorData.value.html,
      markdown: editorData.value.markdown,
      isDelete: true
    });
    ElMessage.success('保存成功');
  } catch (err) {
    ElMessage.error('保存失败，请稍后重试');
  }
};

// 修改
const handleSave = async (res) => {
  if (id === 'new') {
    editorData.value = res;
    return visible.value = true;
  }

  try {
    await axios.post(`/blog/${id.value}`, {
      html: res.html,
      markdown: res.markdown,
    });
    ElMessage.success('保存成功');
  } catch (err) {
    ElMessage.error('保存失败，请稍后重试');
  }
};
</script>
