<template>
  <el-upload
    drag
    multiple
    class="upload-demo"
    @before-upload="beforeUpload"
    action="/static-api/common/upload"
    @success="handleSuccess"
    @error="handleError"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        {{ props.tips }}
      </div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue';

const emits = defineEmits(['complete']);
const props = defineProps({
  tips: {
    type: String,
    default: 'jpg/png files with a size less than 500kb'
  }
});

const handleSuccess = (res: any) => {
  toastMessage('上传成功', 'success');
  emits('complete', res);
}

const toastMessage = (message: string, type?: 'success' | 'error') => {
  ElMessage({
    message: message,
    type: type ?? 'error',
    placement: 'top',
  })
};

const handleError = (error: any) => {
    // 提取错误信息
    try {
      const jsonMatch = error.message.match(/\{.*\}/);
      if (jsonMatch) {
        const errorData = JSON.parse(jsonMatch[0]);
        toastMessage(errorData.message || '上传失败');
      } else {
        toastMessage('上传失败');
      }
    } catch (parseError) {
      console.error('解析错误信息失败:', parseError);
      toastMessage('上传失败');
    }
}

const beforeUpload = (res) => {
  console.log(res);
}
</script>
