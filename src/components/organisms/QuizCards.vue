<script lang="ts">
import QuizCard from '@/components/molecules/QuizCard.vue';

import { quizzes } from '@/data/quizzes';
import { basePath } from '@/utils/base-path';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
	components: {
		QuizCard,
	},

	setup() {
		const router = useRouter();
		let path = '/quiz-app-vue/quiz/panstwa-europy';

		onMounted(async () => {
			let path = localStorage.getItem('path');
			if (path) {
				await router.isReady();
				localStorage.removeItem('path');
				console.log(`/${path.slice(basePath.length)}`);
				router.push(`/${path.slice(basePath.length)}`);
			}
		});

		// console.log('/quiz-app-vue'.length);
		// console.log(path?.slice('/quiz-app-vue'.length));

		return {
			quizzes,
		};
	},
};
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
}

.quiz-cards-title {
	margin-bottom: 1.6rem;
	font-size: 2rem;
	text-align: center;
}

.cards-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1.6rem;
}

@media (min-width: 375px) {
	.quiz-cards-wrapper {
		padding-left: 1.6rem;
		padding-right: 1.6rem;
	}
}

@media (min-width: 460px) {
	.quiz-cards-wrapper {
		margin-top: 4rem;
		margin-bottom: 4rem;
		padding-left: 2.4rem;
		padding-right: 2.4rem;
	}

	.quiz-cards-title {
		margin-bottom: 2.4rem;
	}

	.cards-wrapper {
		gap: 2.4rem;
	}
}

@media (min-width: 1200px) {
	.quiz-cards-wrapper {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-bottom: 8rem;
	}
}

@media (min-width: 1400px) {
	.quiz-cards-title {
		font-size: 2.4rem;
	}
}
</style>
