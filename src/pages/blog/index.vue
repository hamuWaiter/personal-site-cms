<template>
	<template v-if="notFound">
		<NotFound :description="data" home="/admin" />
	</template>
	<template v-else>
		<MDPreviewV3 :markdown-content="data" />
	</template>
</template>

<script setup>
import axios from '@/network';
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { MDPreviewV3, NotFound } from '@/components';

const data = ref('');
const notFound = ref(false);
const { value: id } = computed(() => useRoute().params.id ?? '');

const init = async () => {
	try {
		notFound.value = false;
		const { markdown, url } = await axios.get(`/blog/${id}`);

		if (markdown) {
			data.value = markdown;
		} else if (url) {
			const res = await axios.post('/common/getMarkdownContent', { url });

			data.value = res.markdown;
		}
	} catch (err) {
		data.value = err.message;
		notFound.value = true;
	}
};

onMounted(() => {
	init();
});
</script>

<style scoped lang="scss"></style>
