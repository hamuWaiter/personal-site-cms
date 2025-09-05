<template>
  <MdEditor v-model="text" @onSave="onSave" />
</template>

<script setup>
import {effect, ref} from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const emits = defineEmits(['save']);
const props = defineProps({
  html: {
    type: String,
    default: '',
  },
});

const text = ref('');

effect(() => {
  text.value = props.html;
}, [props.html]);

const onSave = (v, h) => {

  h.then((html) => {
    emits('save', { markdown: v, html })
  });
};
</script>
