<script lang="ts">
import { basePath } from '@/utils/base-path';

export default {
	props: {
		quiz: {
			type: Object,
			required: true,
		},
	},

	setup() {
		return {
			basePath,
		};
	},
};
</script>

<template>
	<RouterLink
		:to="`/quiz/${quiz.path}`"
		class="quiz-card-wrapper"
		:style="{ backgroundImage: `url('${basePath}/${quiz.backgroundURL}')` }">
		<p class="quiz-card-title">{{ quiz.title }}</p>
		<p class="quiz-card-description">{{ quiz.description }}</p>
	</RouterLink>
</template>

<style lang="scss" scoped>
.quiz-card-wrapper {
	position: relative;
	display: block;
	z-index: 0;
	padding: 1.6rem;
	border-radius: 8px;
	width: 100%;
	max-width: 540px;
	color: #000;
	background-color: rgba(0, 0, 0, 0.1);
	background-size: cover;
	background-position: center;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.35);
	text-align: center;
	overflow: hidden;
	cursor: pointer;

	&::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background-color: rgba(118, 123, 233, 0.35);
		opacity: 0;
		transition: opacity 0.3s;
	}

	&:hover::after {
		opacity: 1;
	}
}

.quiz-card-title {
	margin-bottom: 0.8rem;
	font-size: 2rem;
	font-weight: bold;
}

@media (min-width: 1400px) {
	.quiz-card-wrapper {
		padding: 2.4rem;
		max-width: 620px;
	}

	.quiz-card-title {
		font-size: 2.4rem;
	}

	.quiz-card-description {
		font-size: 2rem;
	}
}
</style>
