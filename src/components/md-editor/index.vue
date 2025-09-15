<template>
	<MdEditor v-model="text" @onSave="onSave" @onUploadImg="onUploadImg" />
</template>

<script setup>
import { effect, ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { uploadFiles } from '@/utils';

const emits = defineEmits(['save']);
const props = defineProps({
	html: {
		type: String,
		default: ''
	},
	markdown: {
		type: String,
		default: ''
	}
});

const text = ref('');

effect(() => {
	text.value = props.markdown;
}, [props.markdown]);

const onUploadImg = async (files, callback) => {
	const images = await uploadFiles(files);
	// 方式一
	callback(images.map(item => item.path));
	// 方式二
	// callback(
	//   res.map((item: any) => ({
	//     url: item.data.url,
	//     alt: 'alt',
	//     title: 'title'
	//   }))
	// );
};

const onSave = (v, h) => {
	h.then(html => {
		emits('save', { markdown: v, html });
	});
};
</script>
