<template>
	<div class="appView">
		<router-view></router-view>
	</div>
</template>

<script setup></script>

<style>
.appView {
	box-sizing: border-box;
	color: #333;
	padding: 20px;
}

* {
	padding: 0;
	margin: 0;
}

body {
	background-color: #fff;
}
</style>
