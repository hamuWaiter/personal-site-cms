<template>
  <div class="home">
    <div
      class="item"
      @click="handleClick(item)"
      v-for="(item, i) in data"
      :key="i"
    >
      <div class="title">{{ item.title }}</div>
      <div class="con">
        更新时间：{{ dayjs(item.updateTime).format("YYYY-MM-DD HH:mm:ss") }}
      </div>
    </div>
    <Uploader @complete="handleComplete" />
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import axios from "@/network";
import { onMounted, reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Uploader } from '../../components';

const router = useRouter();
const handleClick = (item) => {
  router.push({
    path: "/blog",
    query: {
      file: item.url,
    },
  });
};

const handleComplete = () => {};

const data = ref(null);
const renderData = computed(() => data.value);

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
.home {
  border-radius: 10px;
  overflow: hidden;
  line-height: 2em;
  cursor: pointer;

  .item {
    padding: 20px;
    background: #f1f1f1;
    margin-bottom: 20px;

    .title {
      font-size: 24px;
      color: #047c3a;
      font-weight: 700;
    }
  }
}
</style>
