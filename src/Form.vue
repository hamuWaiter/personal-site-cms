<template>
	<dl>
		<dd v-for="(o,index) in data">
			Question {{ index + 1 }}: {{ o.name }}?
			
			<!-- 是哪个就显示哪个（v-if） -->
			<!-- ":o" 传递原始对象 -->
			<Input type="form" :o="o" v-if="o.type === 'input'" />
			<Radio type="form" :o="o" v-if="o.type === 'radio'" />
			<CheckBox type="form" :o="o" v-if="o.type === 'checkbox'" />
		</dd>
	</dl>
</template>

<script setup>
	import Input from './forms/Input.vue'
	import Radio from './forms/Radio.vue'
	import CheckBox from './forms/CheckBox.vue'
	
	// 定义data
	defineProps({
		data: Array
	})
</script>

<style scoped>
	dd {
		list-style: none inside;
		margin-left: 0;
	}
</style>