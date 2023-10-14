<template>
	<!-- 表单 -->
	<div v-if="type === 'form'">
		<input :type="o.input.type" v-model="o.input.value">
	</div>
	<!-- 查看（后台） -->
	<div v-if="type === 'view'">
		<mark>{{ o.input.value }}</mark>
	</div>
</template>

<script setup>
	defineProps({
		type: String,
		o: Object
	})
</script>