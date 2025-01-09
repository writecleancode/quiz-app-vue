<script setup lang="ts">
import { basePath } from '@/utils/base-path';

const props = defineProps({
	quizTitle: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});
</script>

<template>
	<div class="quiz-header-wrapper">
		<RouterLink to="/" class="back-btn" aria-label="Powrót do wyboru quizów">
			<img :src="`${basePath}/icons/arrow-double-left.svg`" alt="" />
			<span class="back-btn__text">Powrót</span>
		</RouterLink>
		<div>
			<p class="quiz-header-title">{{ quizTitle }}</p>
			<p class="quiz-header-description">{{ description }}</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.quiz-header-wrapper {
	display: flex;
	gap: 1.6rem;
	margin-bottom: 1.6rem;
}

.back-btn {
	display: flex;
	align-items: center;
	gap: 0.8rem;
	padding: 0.8rem;
	border-radius: 8px;
	background-color: $info;
	font-size: 1.8rem;
	transition: background-color 0.3s;

	&__text {
		display: none;
	}

	&:hover {
		background-color: $info-light;
	}
}

.quiz-header-title {
	font-size: 1.9rem;
	font-weight: bold;
}

@media (min-width: 900px) {
	.back-btn {
		padding-left: 2.4rem;
		padding-right: 2.4rem;

		&__text {
			display: inline;
		}
	}
}

@media (min-width: 1400px) {
	.quiz-header-wrapper {
		gap: 2.4rem;
		margin-bottom: 3.2rem;
	}

	.back-btn {
		padding: 1.6rem 3.2rem;

		&__text {
			line-height: normal;
			font-size: 2rem;
		}
	}

	.quiz-header-title {
		font-size: 2.4rem;
	}

	.quiz-header-description {
		font-size: 2rem;
	}
}
</style>
