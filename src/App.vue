<script setup>
	// 导入数据
	import S from './mData.json'
	
	import ShowData from './ShowData.vue'
	import Form from './Form.vue'
	import { ref } from 'vue'

	// 是否显示 debug btn
	const showBtn = ref(true)
	// 导出数据到 :data
	const eq = ref(S)
</script>

<template>
	<div>
		<h1>Form</h1>
		<main>
			<Form :data="eq" />
			<hr>
			<h1>BlackBoard</h1>
			<ShowData :data="eq" :showBtn="showBtn" />
		</main>
	</div>
</template>