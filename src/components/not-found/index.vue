<template>
	<div class="not-found">
		<el-empty :description="props.description" />
		<div class="button-wrapper">
			<el-button type="primary" @click="() => router.back()">返回上一页</el-button>
			<slot name="customAction">
				<el-button
					@click="
						() => {
							router.push({
								path: props.home,
								replace: true
							});
						}
					"
				>
					返回首页
				</el-button>
			</slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
	description: {
		type: String,
		default: '页面未找到'
	},
	home: {
		type: String,
		default: '/'
	}
});
</script>

<style scoped lang="scss">
.not-found {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-height: calc(100vh - 80px);
	text-align: center;
	font-size: 20px;
	color: #999;
}
</style>
