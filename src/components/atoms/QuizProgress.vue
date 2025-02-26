<script setup lang="ts">
defineProps({
	text: {
		type: String,
		required: true,
	},
});
</script>

<template>
	<span class="quiz-progress">{{ text }}</span>
</template>

<style lang="scss" scoped>
.quiz-progress {
	position: absolute;
	top: 0.8rem;
	right: 0.8rem;
	line-height: 1em;

	@media (width >= 400px) {
		top: 1.6rem;
		right: 1.6rem;
	}

	@media (width >= 1200px) {
		top: 2.4rem;
		right: 2.4rem;
	}

	@media (width >= 1400px) {
		font-size: 2rem;
	}
}
</style>
