<template>
	<div v-if="type === 'form'">
		<p v-for="rd in o.checkbox.box">
			<label>
				&nbsp;&nbsp;{{ rd }}<input type="checkbox" :name="o.name" :value="rd" v-model="o.checkbox.value">
			</label>
		</p>
	</div>
	<div v-if="type === 'view'">
		<ul>
			<li v-for="v in o.checkbox.value">{{ v }}</li>
		</ul>
	</div>
</template>

<script setup>
	defineProps({
		type: String,
		o: Object
	})
</script>