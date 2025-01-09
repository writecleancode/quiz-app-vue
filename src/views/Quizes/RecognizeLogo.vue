<script setup lang="ts">
import QuizWrapper from '@/components/templates/QuizWrapper.vue';
import QuizHeader from '@/components/molecules/QuizHeader.vue';
import QuizProgress from '@/components/atoms/QuizProgress.vue';
import ControlProgressButtons from '@/components/molecules/ControlProgressButtons.vue';
import LoadingGif from '@/components/atoms/LoadingGif.vue';
import ScoreModal from '@/components/molecules/ScoreModal.vue';

import type { RecognizeLogoQuestionDataType } from '@/types/types';
import { questionsData as quizData } from '@/data/recognizeLogo';
import { quizzes } from '@/data/quizzes';
import { basePath } from '@/utils/base-path';
import { computed, onMounted, ref, watch } from 'vue';
import { useModal } from '@/composables/useModal';
import cloneDeep from 'lodash.clonedeep';

const maxScore = quizData.length;

// setup():
const questionsData = ref<RecognizeLogoQuestionDataType[]>([]);
const questionIndex = ref(0);
const givenAnswersIndexes = ref<number[]>([]);
const isQuizFinished = ref(false);
const userScore = ref(0);
const isFirstQuestion = computed(() => (questionIndex.value <= 0 ? true : false));
const isLastQuestion = computed(() => (questionIndex.value >= questionsData.value.length - 1 ? true : false));
const { isModalOpen, handleOpenModal, closeModal } = useModal();

const handleAnswersStatus = (clickedCorrectAnswer: boolean) => {
	if (givenAnswersIndexes.value.includes(questionIndex.value)) return;
	givenAnswersIndexes.value.push(questionIndex.value);

	if (clickedCorrectAnswer) userScore.value += 1;
};

const handleFinishQuiz = () => {
	handleOpenModal();
	isQuizFinished.value = true;
};

const handleChangeQuestion = (direction: string) => {
	if (direction === 'next') {
		if (isLastQuestion.value) {
			handleFinishQuiz();
			return;
		}
		questionIndex.value += 1;
	}
	if (direction === 'previous') {
		if (isFirstQuestion.value) return;
		questionIndex.value -= 1;
	}
};

onMounted(() => {
	questionsData.value = cloneDeep(quizData);
});

watch(userScore, () => {
	if (userScore.value >= maxScore) handleFinishQuiz();
});
</script>

<template>
	<QuizWrapper v-if="questionsData.length">
		<QuizHeader :quizTitle="quizzes[1].title" :description="quizzes[1].description" />
		<QuizProgress :text="`${questionIndex + 1} / ${questionsData.length}`" />
		<div class="recognize-logo-wrapper">
			<div class="picture-wrapper">
				<img
					class="picture-wrapper__picture"
					:src="`${basePath}/${questionsData[questionIndex].imageUrl}`"
					:alt="questionsData[questionIndex].imageAlt" />
			</div>
			<div class="controls-wrapper">
				<div class="question-wrapper">
					<p class="question-wrapper__question">To logo należy do:</p>
					<div className="answers-wrapper">
						<button
							v-for="answer in questionsData[questionIndex].answers"
							:key="answer.text"
							class="answers-wrapper__answer"
							:data-correct="givenAnswersIndexes.includes(questionIndex) || isQuizFinished ? answer.isCorrectAnswer : ''"
							@click="handleAnswersStatus(answer.isCorrectAnswer)">
							{{ answer.text }}
						</button>
					</div>
				</div>
				<div class="buttons-wrapper">
					<ControlProgressButtons
						:previousButton="'Poprzednie pytanie'"
						:nextButton="'Następne pytanie'"
						:handleChangeQuestion
						:isFirstQuestion
						:isLastQuestion />
				</div>
			</div>
		</div>
	</QuizWrapper>
	<LoadingGif v-else />
	<ScoreModal v-if="isModalOpen" :isOpen="isModalOpen" :userScore :totalScore="maxScore" :handleCloseModal="closeModal" />
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.recognize-logo-wrapper {
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
}

.picture-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid rgba(0, 0, 0, 0.1);
	aspect-ratio: 1 / 1;

	&__picture {
		width: 100%;
	}
}

.controls-wrapper {
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
}

.question-wrapper {
	display: flex;
	flex-direction: column;
	gap: 0.8rem;

	&__question {
		font-size: 1.9rem;
	}
}

.answers-wrapper {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	gap: 0.8rem;

	&__answer {
		position: relative;
		padding: 0.8rem 1.6rem;
		border: 1px solid #757575;
		border-radius: 2px;
		background-color: transparent;
		color: $text-color;
		font-size: 1.6rem;
		text-align: center;

		&::before:not([data-answer]) {
			content: '';
			position: absolute;
			inset: 0;
			box-shadow: 0 0 8px inset rgba(70, 70, 70, 0.4);
			opacity: 0;
			transition: opacity 0.2s;
		}

		&:hover::before {
			opacity: 1;
		}
	}
}

[data-correct='true'] {
	background-color: $success-light;
	border-color: $success-dark;
}

[data-correct='false'] {
	background-color: $error-extra-light;
	border-color: $error;
}

.buttons-wrapper {
	display: flex;
	flex-direction: column-reverse;
	gap: 0.8rem;
}

@media (min-width: 510px) {
	.buttons-wrapper {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
}

@media (min-width: 1000px) {
	.recognize-logo-wrapper {
		flex-direction: row;
		gap: 2.4rem;
	}

	.picture-wrapper {
		max-width: 320px;
	}

	.controls-wrapper {
		justify-content: center;
		gap: 4rem;
	}

	.question-wrapper {
		gap: 1.6rem;
	}

	.buttons-wrapper {
		gap: 2.4rem;
	}
}

@media (min-width: 1400px) {
	.controls-wrapper {
		gap: 4.8rem;
	}

	.question-wrapper {
		&__question {
			font-size: 2.4rem;
		}
	}

	.answers-wrapper {
		gap: 1.6rem;

		&__answer {
			font-size: 2rem;
		}
	}
}
</style>
