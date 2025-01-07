<script lang="ts">
import QuizWrapper from '@/components/templates/QuizWrapper.vue';
import QuizHeader from '@/components/molecules/QuizHeader.vue';
import QuizProgress from '@/components/atoms/QuizProgress.vue';
import ControlProgressButtons from '@/components/molecules/ControlProgressButtons.vue';
import LoadingGif from '@/components/atoms/LoadingGif.vue';
import ScoreModal from '@/components/molecules/ScoreModal.vue';

import type { DrivingLicenseQuestionDataType } from '@/types/types';
import { quizzes } from '@/data/quizzes';
import { questionsData as quizData } from '@/data/drivingLicense';
import { basePath } from '@/utils/base-path';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useModal } from '@/composables/useModal';
import cloneDeep from 'lodash.clonedeep';

const maxScore = quizData.length;

export default {
	components: {
		QuizWrapper,
		QuizHeader,
		QuizProgress,
		ControlProgressButtons,
		LoadingGif,
		ScoreModal,
	},

	setup() {
		const questionsData = ref<DrivingLicenseQuestionDataType[]>([]);
		const questionIndex = ref(0);
		const userScore = ref(0);
		const isFirstQuestion = computed(() => questionIndex.value <= 0);
		const isLastQuestion = computed(() => questionIndex.value >= questionsData.value.length - 1);
		const { isModalOpen, handleOpenModal, closeModal } = useModal();

		const handleChangeQuestion = (direction: string) => {
			if (direction === 'next') {
				if (isLastQuestion.value) {
					handleOpenModal();
					return;
				}
				questionIndex.value += 1;
			}
			if (direction === 'previous') {
				if (isFirstQuestion.value) return;
				questionIndex.value -= 1;
			}
		};

		const highlightClickedAnswer = (answerIndex: number) => {
			if (questionsData.value[questionIndex.value].hasUserAnswered) return;

			questionsData.value[questionIndex.value].answers[answerIndex].hasUserChecked =
				!questionsData.value[questionIndex.value].answers[answerIndex].hasUserChecked;
		};

		const handleAddPoint = () => (userScore.value += 1);

		const showCorrectAnswers = () => {
			questionsData.value[questionIndex.value].hasUserAnswered = true;

			if (questionsData.value[questionIndex.value].answers.every(answer => answer.hasUserChecked === answer.isCorrectAnswer)) {
				handleAddPoint();
			}
		};

		onMounted(() => {
			questionsData.value = cloneDeep(quizData);
		});

		return {
			quizzes,
			maxScore,
			basePath,
			questionsData,
			questionIndex,
			userScore,
			isFirstQuestion,
			isLastQuestion,
			handleChangeQuestion,
			highlightClickedAnswer,
			showCorrectAnswers,
			isModalOpen,
			closeModal,
		};
	},
};
</script>

<template>
	<QuizWrapper v-if="questionsData.length">
		<div>
			<QuizHeader :quizTitle="quizzes[3].title" :description="quizzes[3].description" />
			<QuizProgress :text="`${questionIndex + 1} / ${maxScore}`" />
			<div class="driving-license-wrapper">
				<div class="picture-wrapper">
					<img
						class="picture-wrapper__picture"
						:src="`${basePath}/${questionsData[questionIndex].imageUrl}`"
						:alt="questionsData[questionIndex].imageAlt" />
				</div>
				<div class="controls-wrapper">
					<div class="question-wrapper">
						<p class="question-wrapper__question">{{ questionsData[questionIndex].title }}</p>
						<div class="answers-wrapper">
							<button
								v-for="(answer, index) in questionsData[questionIndex].answers"
								:key="answer.text"
								class="answers-wrapper__answer"
								:data-selected="answer.hasUserChecked ? 'true' : 'false'"
								:data-correct="questionsData[questionIndex].hasUserAnswered ? answer.isCorrectAnswer : ''"
								@click="highlightClickedAnswer(index)">
								<img
									:data-visible="answer.hasUserChecked && questionsData[questionIndex].hasUserAnswered ? 'true' : 'false'"
									class="answers-wrapper__answer-icon"
									:src="answer.isCorrectAnswer ? `${basePath}/icons/check.svg` : `${basePath}/icons/x.svg`"
									alt="" />
								<span>{{ answer.text }}</span>
							</button>
						</div>
					</div>
					<p class="instruction-text">test wielokrotnego wyboru - zaznacz <span class="text-bold">wszystkie poprawne</span> odpowiedzi</p>
					<div className="buttons-wrapper">
						<ControlProgressButtons
							:previousButton="'Poprzednie pytanie'"
							:nextButton="questionsData[questionIndex].hasUserAnswered ? 'Następne pytanie' : 'Sprawdzam!'"
							:showCorrectAnswers
							:handleChangeQuestion
							:isFirstQuestion
							:isLastQuestion />
					</div>
				</div>
			</div>
		</div>
	</QuizWrapper>
	<LoadingGif v-else />
	<ScoreModal v-if="isModalOpen" :userScore :totalScore="maxScore" :handleCloseModal="closeModal" />
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.text-bold {
	font-weight: bold;
}

.driving-license-wrapper {
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	max-width: 492px;
}

.picture-wrapper {
	aspect-ratio: 1 / 1;

	&__picture {
		width: 100%;
		min-height: 100%;
		object-fit: cover;
		object-position: 80%;
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
	display: flex;
	flex-direction: column;
	gap: 0.8rem;

	&__answer {
		position: relative;
		padding: 0.8rem;
		padding-left: calc(0.8rem + 1rem + 1.6rem);
		padding-right: calc(0.8rem + 1rem + 1.6rem);
		font-size: 1.4rem;
		border: 1px solid #757575;
		border-radius: 2px;
		background-color: #fff;
		color: $text-color;
	}

	&__answer-icon {
		position: absolute;
		top: 50%;
		left: 1rem;
		translate: 0 -50%;
		pointer-events: none;
		visibility: hidden;
	}
}

[data-selected='true'] {
	background-color: $info-extra-light;
	border-color: $info;
}

[data-correct='true'] {
	background-color: $success-light;
	border-color: $success-dark;
}

[data-correct='false'][data-selected='true'] {
	background-color: $error-extra-light;
	border-color: $error;
}

[data-visible='true'] {
	visibility: visible;
}

.instruction-text {
	color: #9a9a9a;
	font-size: 1.2rem;
	text-align: center;
}

.buttons-wrapper {
	display: flex;
	flex-direction: column-reverse;
	gap: 0.8rem;
}

@media (min-width: 380px) {
	.answers-wrapper {
		&__answer {
			font-size: 1.5rem;
		}
	}
}

@media (min-width: 510px) {
	.controls-wrapper {
		gap: 2.4rem;
	}

	.instruction-text {
		font-size: 1.4rem;
	}

	.buttons-wrapper {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
}

@media (min-width: 900px) {
	.driving-license-wrapper {
		max-width: 592px;
	}
}

@media (min-width: 1000px) {
	.driving-license-wrapper {
		max-width: 876px;
		flex-direction: row;
		gap: 2.4rem;
	}

	.picture-wrapper {
		max-width: 400px;
	}

	.controls-wrapper {
		justify-content: space-between;
	}

	.question-wrapper {
		gap: 1.6rem;
	}

	.answers-wrapper {
		gap: 1.6rem;
	}

	.instruction-text {
		font-size: 1.5rem;
	}

	.buttons-wrapper {
		gap: 2.4rem;
	}
}

@media (min-width: 1400px) {
	.driving-license-wrapper {
		max-width: 954px;
	}

	.question-wrapper {
		&__question {
			font-size: 2.2rem;
		}
	}

	.answers-wrapper {
		&__answer {
			font-size: 1.8rem;
		}
	}

	.instruction-text {
		font-size: 1.8rem;
	}
}
</style>
