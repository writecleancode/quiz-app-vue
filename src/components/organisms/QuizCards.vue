<script setup lang="ts">
import QuizCard from '@/components/molecules/QuizCard.vue';

import { quizzes } from '@/data/quizzes';
</script>

<template>
	<div class="quiz-cards-wrapper">
		<p class="quiz-cards-title">Wybierz quiz:</p>
		<div class="cards-wrapper">
			<QuizCard v-for="quiz in quizzes" :quiz :key="quiz.title" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.quiz-cards-wrapper {
	margin-top: 2.4rem;
	margin-bottom: 2.4rem;
	padding-left: 0.8rem;
	padding-right: 0.8rem;

	@media (width >= 375px) {
		padding-left: 1.6rem;
		padding-right: 1.6rem;
	}

	@media (width >= 460px) {
		margin-top: 4rem;
		margin-bottom: 4rem;
		padding-left: 2.4rem;
		padding-right: 2.4rem;
	}

	@media (width >= 1200px) {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-bottom: 8rem;
	}
}

.quiz-cards-title {
	margin-bottom: 1.6rem;
	font-size: 2rem;
	text-align: center;

	@media (width >= 460px) {
		margin-bottom: 2.4rem;
	}

	@media (width >= 1400px) {
		font-size: 2.4rem;
	}
}

.cards-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1.6rem;

	@media (min-width: 460px) {
		gap: 2.4rem;
	}
}
</style>
