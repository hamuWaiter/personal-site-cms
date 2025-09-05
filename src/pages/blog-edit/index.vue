<template>
  <div class="blog-edit">
    <MdEditorV3 :html="htmlStr" @save="handleSave" placeholder="从这里开始吧~" />
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import { useRoute } from "vue-router";
import { MdEditorV3 } from '@/components';
import axios from "@/network";

const htmlStr = ref('');
const id = computed(() => useRoute().params.id ?? '0');


const init = async () => {
  const { url, html } = await axios.get(`/blog/${id.value}`);

  if (html) {
    htmlStr.value = html;
  } else if (url) {
    const res = await axios.post("/common/markdown2html", { url });
    htmlStr.value = res.html;
  }
};

init();

const handleSave = (res) => {
  console.log(res);
}
</script>
