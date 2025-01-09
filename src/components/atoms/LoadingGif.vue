<script setup lang="ts">
import { basePath } from '@/utils/base-path';
</script>

<template>
	<div class="loading-gif-wrapper">
		<img :src="`${basePath}/img/loading.gif`" alt="loading" />
	</div>
</template>

<style lang="scss" scoped>
.loading-gif-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
}
</style>
