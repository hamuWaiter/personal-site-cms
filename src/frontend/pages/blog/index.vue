<template>
  <div class="blog">
    <div v-html="data"></div>
    <!-- <iframe class="frame" :src="data"></iframe> -->
  </div>
</template>

<script setup>
import axios from "@/network";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { markdownComb } from "../../components";

const data = ref("");
const step = ref(0);
const file = computed(() => `http://${useRoute().query.file}` ?? "");

const init = async () => {
  const res = await axios.post("/common/markdown2html", {
    file: file.value,
  });

  data.value = res.data;
};

onMounted(() => {
  init();
});
</script>
<style scoped lang="scss">
.blog {
  .frame {
    width: 100%;
    height: 100vh;
  }
}
</style>
