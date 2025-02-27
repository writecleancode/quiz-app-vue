<script setup lang="ts">
import QuizWrapper from '@/components/templates/QuizWrapper.vue';
import QuizHeader from '@/components/molecules/QuizHeader.vue';
import QuizProgress from '@/components/atoms/QuizProgress.vue';
import ControlProgressButtons from '@/components/molecules/ControlProgressButtons.vue';
import LoadingGif from '@/components/atoms/LoadingGif.vue';
import ScoreModal from '@/components/molecules/ScoreModal.vue';

import type { KnowledgeOfMoviesQuestionDataType } from '@/types/types';
import { quizzes } from '@/data/quizzes';
import { questionsData as quizData } from '@/data/knowledgeOfMovies';
import { computed, onMounted, ref, watch } from 'vue';
import { basePath } from '@/utils/base-path';
import { useModal } from '@/composables/useModal';
import cloneDeep from 'lodash.clonedeep';

const initialFormValues: Record<string, string> = {
	answer1: '',
	answer2: '',
	answer3: '',
	answer4: '',
	answer5: '',
};

const maxScore = quizData.reduce((accumulator, currentMovie) => accumulator + currentMovie.answersData.length, 0);

// setup():
const questionsData = ref<KnowledgeOfMoviesQuestionDataType[]>([]);
const questionIndex = ref(0);
const inputValues = ref(initialFormValues);
const userScore = ref(0);
const isFirstQuestion = computed(() => (questionIndex.value <= 0 ? true : false));
const isLastQuestion = computed(() => (questionIndex.value >= questionsData.value.length - 1 ? true : false));
const { isModalOpen, handleOpenModal, closeModal } = useModal();

const handleInputChange = (e: Event, { id, acceptableAnswers }: { id: string; acceptableAnswers: string[] }, index: number) => {
	const target = e.target as HTMLInputElement;
	inputValues.value[id] = target.value;

	if (acceptableAnswers.some(answer => answer.toLowerCase() === target.value.toLowerCase())) {
		questionsData.value[questionIndex.value].answersData[index].hasUserGuessed =
			!questionsData.value[questionIndex.value].answersData[index].hasUserGuessed;

		userScore.value += 1;
	}
};

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

const showCorrectAnswers = () => {
	questionsData.value[questionIndex.value].hasUserAnswered = true;
};

onMounted(() => {
	questionsData.value = cloneDeep(quizData);
});

watch(
	questionsData,
	() => {
		if (
			questionsData.value.length &&
			questionsData.value[questionIndex.value].answersData.every(answer => answer.hasUserGuessed === true) &&
			questionsData.value[questionIndex.value].hasUserAnswered === false
		) {
			showCorrectAnswers();
		}
	},
	{ deep: true }
);

watch(userScore, () => {
	if (userScore.value >= maxScore) handleOpenModal();
});
</script>

<template>
	<QuizWrapper v-if="questionsData.length">
		<QuizHeader :quizTitle="quizzes[2].title" :description="quizzes[2].description" />
		<QuizProgress :text="`${questionIndex + 1} / ${questionsData.length}`" />
		<div class="knowledge-of-movies-wrapper">
			<div class="picture-wrapper">
				<img
					class="picture-wrapper__picture"
					:src="`${basePath}/${questionsData[questionIndex].imageUrl}`"
					:alt="`okładka fimlu ${questionsData[questionIndex].title}`" />
			</div>
			<div class="controls-wrapper">
				<p class="title">{{ questionsData[questionIndex].title }}</p>
				<div class="text-wrapper">
					<p v-for="(answer, index) in questionsData[questionIndex].answersData" :key="answer.correntAnswer" class="text-wrapper__text">
						{{ answer.textFirstPart }}
						<span class="text-wrapper__input-wrapper">
							{{ answer.correntAnswer }}
							<input
								class="text-wrapper__answer-input"
								:name="answer.id"
								:data-status="answer.hasUserGuessed ? 'guessed' : questionsData[questionIndex].hasUserAnswered ? 'failed' : ''"
								:value="answer.hasUserGuessed || questionsData[questionIndex].hasUserAnswered ? answer.correntAnswer : inputValues.id"
								@input="handleInputChange($event, { id: answer.id, acceptableAnswers: answer.acceptableAnswers }, index)"
								:disabled="answer.hasUserGuessed || questionsData[questionIndex].hasUserAnswered" />
						</span>
						{{ answer.textLastPart }}
					</p>
				</div>
				<div class="buttons-wrapper">
					<ControlProgressButtons
						:previousButton="'Poprzedni film'"
						:nextButton="questionsData[questionIndex].hasUserAnswered ? 'Następne pytanie' : 'Sprawdzam!'"
						:showCorrectAnswers
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

.progress {
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
}

.knowledge-of-movies-wrapper {
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	max-width: 460px;

	@media (width >= 900px) {
		display: grid;
		grid-template-columns: auto minmax(auto, 660px);
		max-width: 962px;
	}

	@media (width >= 1400px) {
		grid-template-columns: auto minmax(auto, 860px);
		gap: 2.4rem;
		max-width: 1040px;
	}
}

.picture-wrapper {
	&__picture {
		width: 100%;
	}

	@media (width >= 900px) {
		max-width: 210px;
	}

	@media (width >= 1400px) {
		max-width: 270px;
	}
}

.controls-wrapper {
	display: flex;
	flex-direction: column;
	gap: 0.8rem;

	@media (width >= 1400px) {
		gap: 1.6rem;
	}
}

.title {
	font-size: 1.9rem;
	font-weight: bold;

	@media (width >= 1400px) {
		font-size: 2.2rem;
	}
}

.text-wrapper {
	display: flex;
	flex-direction: column;
	gap: 1.2rem;

	&__input-wrapper {
		display: inline-block;
		position: relative;
		padding: 0 1rem;
		width: -moz-fit-content;
		width: fit-content;
	}

	&__answer-input {
		position: absolute;
		inset: 0;
		padding: 0.2rem 0.8rem;
		border: 1px solid #9e9e9e;
		font-size: inherit;
	}

	@media (width >= 1400px) {
		gap: 2rem;

		&__text {
			font-size: 1.8rem;
		}
	}
}

[data-status='guessed'] {
	background-color: $success-light;
	color: $text-success;
}

[data-status='failed'] {
	background-color: $error-extra-light;
	color: $text-error;
}

.buttons-wrapper {
	display: flex;
	flex-direction: column-reverse;
	gap: 0.8rem;
	margin-top: 0.8rem;

	@media (width >= 440px) {
		flex-direction: row;
		justify-content: space-between;
	}

	@media (width >= 900px) {
		margin-top: auto;
	}
}
</style>
