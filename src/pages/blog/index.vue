<template>
  <MDPreviewV3 :markdown-content="data"/>
</template>

<script setup>
import axios from "@/network";
import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { MDPreviewV3 } from "../../components";

const data = ref("");
const step = ref(0);
const { value: id } = computed(() => useRoute().params.id ?? "");

const init = async () => {
  const { html, url } = await axios.get(`/blog/${id}`);

  if (html) {
    data.value = html;
  } else if (url) {
    const res = await axios.post("/common/markdown2html", { url });

    data.value = res.html;
  } else {
    data.value = "文章不存在";
  }
};

onMounted(() => {
  init();
});
</script>

<style scoped lang="scss"></style>
