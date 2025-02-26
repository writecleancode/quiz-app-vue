<script setup lang="ts">
import AppNameTitle from '@/components/atoms/AppNameTitle.vue';
</script>

<template>
	<div class="quiz-wrapper">
		<AppNameTitle :hasHoverEffect="true" />
		<div class="quiz-content-wrapper">
			<slot />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.quiz-wrapper {
	padding-left: 0.8rem;
	padding-right: 0.8rem;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;

	@media (width >= 400px) {
		padding-left: 1.6rem;
		padding-right: 1.6rem;
	}

	@media (width >= 1200px) {
		padding-left: 2.4rem;
		padding-right: 2.4rem;
	}
}

.quiz-content-wrapper {
	position: relative;
	margin-bottom: 0.8rem;
	margin-left: auto;
	margin-right: auto;
	padding: 0.8rem;
	max-width: max-content;
	box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);

	@media (width >= 400px) {
		margin-bottom: 1.6rem;
		padding: 1.6rem;
	}

	@media (width >= 1200px) {
		margin-bottom: 2.4rem;
		padding: 2.4rem;
	}
}
</style>
