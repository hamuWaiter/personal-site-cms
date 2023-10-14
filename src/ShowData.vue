<template>

	<ul>
		<li v-for="d in data">
			{{ d.name }}?

			<!-- 是哪个显示哪个 -->
			<Input v-if="d.type === 'input'" type="view" :o="d" />
			<Radio v-if="d.type === 'radio'" type="view" :o="d" />
			<CheckBox v-if="d.type === 'checkbox'" type="view" :o="d" />
		</li>
	</ul>

	<!-- 用于调试的按钮，看数据 -->
	<button v-if="showBtn" @click="show">get all data</button>
 
</template>

<script setup>
	import Input from './forms/Input.vue'
	import Radio from './forms/Radio.vue'
	import CheckBox from './forms/CheckBox.vue'

	const p = defineProps({
		data: {
			type: Array,
			required: true
		},
		showBtn: {
			type: Boolean,
			default: false
		}
	})

	function show() {
		if (window.alert)
			alert(JSON.stringify(p.data))
		console.log(p.data)
	}
</script>