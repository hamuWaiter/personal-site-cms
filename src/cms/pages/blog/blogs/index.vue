<template>
  <div class="blogs">
    <el-table
      border
      stripe
      :data="renderData"
      style="width: 100%"
      max-height="500"
    >
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="url" label="地址" />
      <el-table-column #default="scope" label="更新时间">
        <span>{{ new Date(scope.row.updateTime).toLocaleString() }}</span>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click.prevent="() => $router.push(`/blog/${scope.row.id}/edit`)"
          >
            修改
          </el-button>
          <el-button
              link
              type="primary"
              size="small"
              @click.prevent="() => $router.push(`/blog/${scope.row.id}`)"
          >
            预览
          </el-button>
          <template v-if="scope.row.isDelete">
            <el-button
              link
              type="primary"
              size="small"
              @click.prevent="modifyRow({ ...scope.row, isDelete: false })"
            >
              发布
            </el-button>
          </template>
          <template v-else>
            <el-button
              link
              type="danger"
              size="small"
              @click.prevent="modifyRow({ ...scope.row, isDelete: true })"
            >
              撤回
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <div class="actions">
      <el-button type="primary" :icon="Edit" circle @click="() => $router.push('/blog/0/edit')" />
      <el-button type="primary" @click="() => dialogVisible = true">上传本地文档</el-button>
      <el-button type="primary" @click="() => {}">填写在线链接</el-button>
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="上传"
      width="500"
    >
      <Uploader @complete="handleComplete"/>
    </el-dialog>
  </div>
</template>

<script setup>
import axios from "@/network";
import { Uploader } from '@/components';
import { Edit } from "@element-plus/icons-vue";
import { onMounted, reactive, ref, computed } from "vue";

const dialogVisible = ref(false);

const data = ref(null);
const renderData = computed(() => data.value);

const handleComplete = () => {
  dialogVisible.value = false;
  init();
};

const modifyRow = async (row) => {
  await axios.post(`/blog/${row.id}`, row);
  await init();
};

const init = async () => {
  data.value = await axios.get("/blog", {
    page: 1,
    pageSize: 10,
  });
};

onMounted(() => {
  init();
});
</script>

<style scoped lang="scss">
.blogs {
  text-align: center;

  .title {
    margin: 20px 0;
  }

  .body {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 20px;
    border-radius: 6px;
    background-color: #f1f1f1;
  }

  .actions {
    margin: 10px 0;
    text-align: right;
  }
}
</style>
