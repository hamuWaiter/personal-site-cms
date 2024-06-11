<template>
	<div class="site">
		<div class="title"><h2>添加案例</h2></div>
		<div class="body">
			<div class="form">
				<el-form :model="form" label-width="auto" style="min-width: 400px">
					<el-form-item label="标题">
						<el-input v-model="form.current.title" />
					</el-form-item>
					<el-form-item label="页面">
						<el-input v-model="form.current.url" />
					</el-form-item>
				</el-form>
			</div>
			<el-button type="primary" @click="onSubmit">Save</el-button>
		</div>
	</div>
</template>

<script setup>
	import axios from '../../network'
	import { useRoute, useRouter } from 'vue-router'
	import { onMounted, reactive, computed } from 'vue'

	const router = useRouter()

	// 是否显示 debug btn
	const form = reactive({
		current: {
			title: '',
			url: ''
		}
	})

	const id = computed(() => useRoute().params.id)

	onMounted(async () => {
		if (id.value) {
			const res = await axios.get(`/site/${id.value}`)
			console.log(form.current)
			form.current = {...form.current, ... res}
			console.log(form.current)
		}
	})

	const onSubmit = async () => {
		try {
			if (Object.values(form.current).every(item => item)) {

				const res = await (id.value ? axios.post(`/site/${id.value}`, form.current) : axios.post('/site', form.current))
				
				router.push('/admin/site')
				console.log(res)
			} else {
				throw new Error('校验失败')
			}
		} catch(err) {
			console.log(err)
		}
	}
</script>

<style scoped lang="scss">
.site {
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