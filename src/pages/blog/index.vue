<template>
	<template v-if="loading">
		<div class="loading-box"><div class="loading"></div></div>
	</template>
	<template v-else-if="notFound">
		<NotFound :description="data" :home="home" />
	</template>
	<template v-else-if="data">
		<MDPreviewV3 :markdown-content="data" />
	</template>
	<template v-else>
		<NotFound :description="home === '/admin' ? '当前博客无内容，点击前往编辑博客' : '小二正在加工中，客官稍后再来吧₍˄·͈༝·͈˄*₎◞ ̑̑'" :home="home">
			<template v-if="home === '/admin'" #customAction>
				<el-button
					type="primary"
					@click="
						() =>
							$router.push({
								path: `/blog/${id}/edit`,
								replace: true
							})
					"
				>
					编辑博客
				</el-button>
			</template>
		</NotFound>
	</template>
</template>

<script setup>
import axios from '@/network';
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { MDPreviewV3, NotFound } from '@/components';
import { QSMYSleep } from '@/utils/index.js';

const { home = '/home' } = useRoute().query;
const data = ref('');
const notFound = ref(false);
const loading = ref(false);
const { value: id } = computed(() => useRoute().params.id ?? '');

const init = async () => {
	try {
		loading.value = true;
		notFound.value = false;
		const { markdown, url } = await axios.get(`/blog/${id}`, {
			showLoading: false
		});

		if (markdown) {
			data.value = markdown;
		} else if (url) {
			const res = await axios.post('/common/getMarkdownContent', { url, showLoading: false });

			data.value = res.markdown;
			console.log(res.html, res.markdown);
		}
	} catch (err) {
		data.value = err.message;
		notFound.value = true;
	} finally {
		await QSMYSleep({ timeout: 600 });
		loading.value = false;
	}
};

onMounted(() => {
	init();
});
</script>

<style scoped lang="scss">
.loading-box {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-height: calc(100vh - 80px);

	.loading {
		flex-shrink: 0;
		width: 160px;
		height: 160px;
		border-radius: 999px;
		background: url('/jufufu.gif') center center/100% auto no-repeat;
	}
}
</style>
