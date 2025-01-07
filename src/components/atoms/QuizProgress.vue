<script lang="ts">
export default {
	props: {
		text: {
			type: String,
			required: true,
		},
	},
};
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
}

@media (min-width: 400px) {
	.quiz-progress {
		top: 1.6rem;
		right: 1.6rem;
	}
}

@media (min-width: 1200px) {
	.quiz-progress {
		top: 2.4rem;
		right: 2.4rem;
	}
}

@media (min-width: 1400px) {
	.quiz-progress {
		font-size: 2rem;
	}
}
</style>
