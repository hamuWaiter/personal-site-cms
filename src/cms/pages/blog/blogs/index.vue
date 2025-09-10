<template>
  <div class="blogs">
    <div class="actions">
      <el-button type="primary" :icon="Edit" circle @click="() => $router.push('/blog/new')" />
      <el-button type="primary" @click="() => uploadDialogVisible = true">上传本地文档</el-button>
      <el-button type="primary" @click="() => formDialogVisible = true">填写在线链接</el-button>
    </div>

    <el-table
      border
      stripe
      style="width: 100%"
      pagination
      max-height="500"
      :data="renderData"
    >
      <el-table-column label="标题" #default="scope">
        <div class="row-title">
          <template v-if="modify && rowKey === scope.$index">
            <div class="form-item">
              <el-input class="input" v-model="editForm.title" />
              <el-button class="button" size="small" type="primary" @click="async () => {
                await modifyRow({ ...scope.row, ...editForm });
                editComplete();
              }">提交</el-button>
              <el-button class="button" size="small" @click="editComplete">取消</el-button>
            </div>
          </template>
          <template v-else>
            <span>{{ scope.row.title }}</span>
            <el-icon size="small" color="var(--el-color-primary)" @click="() => startEdit(scope)">
              <Edit />
            </el-icon>
          </template>
        </div>
      </el-table-column>
      <el-table-column prop="url" label="原始文档地址" />
      <el-table-column #default="scope" label="更新时间">
        <span>{{ dayjs(scope.row.updateTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
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

    <el-pagination
      background
      class="pagination"
      layout="prev, pager, next"
      :total="pagination.total"
      :page-size="pagination.pageSize"
      @change="(page) => {
        pagination.page = page;
        init();
      }"
    />

    <el-dialog
      center
      width="500"
      :title="null"
      :show-close="false"
      v-model="uploadDialogVisible"
    >
      <Uploader @complete="handleUploadComplete"/>
    </el-dialog>

    <el-dialog
      center
      width="500"
      :title="null"
      :show-close="false"
      v-model="formDialogVisible"
    >
      <el-form-item label="标题:" label-width="100px">
        <el-input v-model="newItemForm.title" />
      </el-form-item>
      <el-form-item label="文档地址:" label-width="100px">
        <el-input v-model="newItemForm.url" />
      </el-form-item>
      <div class="button-wrapper">
        <el-button type="primary" @click="handleNewItem">提交</el-button>
        <el-button @click="() => {
          newItemForm.title = '';
          newItemForm.url = '';
        }">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import axios from "@/network";
import { Uploader } from '@/components';
import { Edit } from "@element-plus/icons-vue";
import {onMounted, reactive, ref, computed, effect} from "vue";

const formDialogVisible = ref(false);
const uploadDialogVisible = ref(false);

const data = ref<any[]>([]);
const pagination = ref({
  total: 0,
  page: 1,
  pageSize: 10,
});

const renderData = computed(() => data.value);

const modify = ref(false);
const rowKey = ref(null);
const editForm = reactive({
  title: '',
  // url: '',
});
const newItemForm = reactive({
  title: '',
  url: '',
})

const startEdit = (scope) => {
  modify.value = true;
  rowKey.value = scope.$index;
  editForm.title = scope.row.title;
};

const editComplete = () => {
  modify.value = false;
  rowKey.value = null;
  editForm.title = '';
};

const handleUploadComplete = () => {
  uploadDialogVisible.value = false;
  init();
};

const handleNewItem = async () => {
  try {
    await axios.post('/blog', {
      ...newItemForm,
      isDelete: true
    });
    await init();
  } finally {
    formDialogVisible.value = false;
    newItemForm.title = '';
    newItemForm.url = '';
  }
};

const modifyRow = async (row) => {
  await axios.post(`/blog/${row.id}`, row);
  await init();
};

const init = async () => {

  const res = await axios.get("/blog", {
    page: pagination.value.page,
    pageSize: pagination.value.pageSize,
  });
  data.value = res.data;

  pagination.value.total = res.total;
};

effect(() => init(), [pagination.value.page]);

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

  .form-item {
    .button {
      margin: 6px 0;
    }
  }

  .pagination {
    margin-top: 10px;
    justify-content: flex-end;
  }

  .button-wrapper {
    text-align: right;
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
