<template>
	<div v-if="type === 'form'">
	<p v-for="rd in o.radio.radios">
			<label>
				&nbsp;&nbsp;{{ rd }}<input type="radio" :name="o.name" :value="rd" v-model="o.radio.value">
			</label>
		</p>
	</div>
	<div v-if="type === 'view'">
		<mark>{{ o.radio.value }}</mark>
	</div>
</template>


<script setup>
	defineProps({
		type: String,
		o: Object
	})
</script>