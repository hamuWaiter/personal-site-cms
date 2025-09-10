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
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import axios from "@/network";
import { onMounted, reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const handleClick = (item) => {
  router.push({
    path: `/blog/${item.id}`,
  });
};
const data = ref(null);

const init = async () => {
  const res = await axios.get("/blog/blog4show", {
    page: 1,
    pageSize: 10,
  });

  data.value = res.data;
};

onMounted(() => {
  init();
});
</script>

<style scoped lang="scss">
.home {
  border-radius: 10px;
  line-height: 2em;
  cursor: pointer;

  .item {
    padding: 20px;
    background: #fefefe;
    border-radius: 10px;
    box-shadow: 4px 4px 20px rgba(0,0,0,.1);
    margin-bottom: 20px;

    .title {
      font-size: 24px;
      color: #047c3a;
      font-weight: 700;
    }
  }
}
</style>
