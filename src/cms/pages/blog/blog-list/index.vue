<template>
  <div class="blog-list">
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
      <el-table-column fixed="right" label="Operations" width="180">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click.prevent="() => $router.push(`/admin/blog/${scope.row.id}`)"
          >
            修改
          </el-button>
          <template v-if="scope.row.isDelete">
            <el-button
              link
              type="primary"
              size="small"
              @click.prevent="modifyRow({ ...scope.row, isDelete: false })"
            >
              启用
            </el-button>
          </template>
          <template v-else>
            <el-button
              link
              type="danger"
              size="small"
              @click.prevent="modifyRow({ ...scope.row, isDelete: true })"
            >
              禁用
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
// import axios from '@/network/index.js'
import axios from "../../.././../network";
import { useRouter } from "vue-router";
import { onMounted, reactive, ref, computed } from "vue";

const data = ref(null);
const renderData = computed(() => data.value);

// 是否显示 debug btn
const form = reactive({
  current: {
    title: "",
    url: "",
  },
});

const modifyRow = async (row) => {
  await axios.post(`/blog/${row.id}`, row);
  init();
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
.blog-list {
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
}
</style>
