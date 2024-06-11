<template>
	<div class="admin">
		<div class="title"><h2>添加案例</h2></div>
		<div class="body">
			<div class="form">
				<el-form :model="form" label-width="auto" style="min-width: 400px">
					<el-form-item label="Title">
						<el-input v-model="form.title" />
					</el-form-item>
					<el-form-item label="Url">
						<el-input v-model="form.url" />
					</el-form-item>
				</el-form>
			</div>
			<el-button type="primary" @click="onSubmit">Save</el-button>
		</div>
	</div>
</template>

<script setup>
	import axios from '../../network'; 
	import { onMounted, reactive } from 'vue'

	// 是否显示 debug btn
	const form = reactive({
		title: '',
		url: ''
	})

	onMounted(async () => {
		const res = await axios.get('/sites');
		console.log(res);
	})
	const onSubmit = async () => {
		if (form.title && form.url) {
			console.log('submit!', form.title);

			const res = await axios.post('/site', form)
			console.log(res)
		}
	};
</script>

<style scoped lang="scss">
.admin {
	text-align: center;

	.title {
		margin: 20px 0;
	}

	.body {
		display: inline-flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
		padding: 20px;
		border-radius: 6px;
		background-color: #f1f1f1;
	}
}
</style>