<script setup lang="ts">
import QuizWrapper from '@/components/templates/QuizWrapper.vue';
import LoadingGif from '@/components/atoms/LoadingGif.vue';
import QuizHeader from '@/components/molecules/QuizHeader.vue';
import ScoreModal from '@/components/molecules/ScoreModal.vue';

import type { CountryType } from '@/types/types';
import { basePath } from '@/utils/base-path';
import { quizzes } from '@/data/quizzes';
import { countriesList as quizData } from '@/data/coutriesOfEurope';
import { onMounted, ref, watch } from 'vue';
import { useModal } from '@/composables/useModal';

const initialTime = 120; // initial time in seconds
const maxTime = 600; // max time in seconds
let interval: number;

const timeLeftText = (secondsTotal = initialTime) => {
	const minutes = Math.floor(secondsTotal / 60);
	const seconds = secondsTotal % 60;

	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const prepareCoutriesList = () => quizData.map(country => ({ name: country, isGuessed: false }));

const divideCoutriesList = (coutriesToDivide: CountryType[]) => {
	return {
		firstHalf: coutriesToDivide.slice(0, Math.ceil(coutriesToDivide.length / 2)),
		secondHalf: coutriesToDivide.slice(Math.ceil(coutriesToDivide.length / 2)),
	};
};

const coutriesNumber = quizData.length;

// setup():
const countriesList = ref<string[]>([]);
const hasQuizStarted = ref(false);
const inputValue = ref('');
const guessedCoutriesNumber = ref(0);
const secondsTotal = ref(initialTime);
const timeLeft = ref(timeLeftText());
const isQuizFinished = ref(false);
const isMapDisplayed = ref(true);
const coutriesWithStatus = ref(prepareCoutriesList());
const coutriesToDisplay = ref(divideCoutriesList(coutriesWithStatus.value));
const { isModalOpen, handleOpenModal, closeModal } = useModal();

const handleStartQuiz = () => {
	hasQuizStarted.value = true;

	interval = setInterval(() => {
		secondsTotal.value -= 1;
	}, 1000);
};

const handleCheckCoutries = () => {
	coutriesWithStatus.value.map(country => {
		if (country.isGuessed === true) return;

		if (country.name.toLowerCase() === inputValue.value.toLowerCase().trim()) {
			country.isGuessed = true;
			inputValue.value = '';
			guessedCoutriesNumber.value += 1;
		}
	});
};

const handleEndQuiz = () => {
	isQuizFinished.value = true;
	clearInterval(interval);
	handleOpenModal();
	if (guessedCoutriesNumber.value !== coutriesNumber) secondsTotal.value = 0;
};

const handleExtendTime = (secondsToExtend: number) => (secondsTotal.value += secondsToExtend);

const toggleMapVisibility = () => {
	isMapDisplayed.value = !isMapDisplayed.value;
};

onMounted(() => {
	countriesList.value = quizData;
});

watch(countriesList, () => {
	coutriesWithStatus.value = prepareCoutriesList();
});

watch(coutriesWithStatus, () => {
	coutriesToDisplay.value = divideCoutriesList(coutriesWithStatus.value);
});

watch(secondsTotal, () => {
	timeLeft.value = timeLeftText(secondsTotal.value);

	if (secondsTotal.value <= 0 && !isQuizFinished.value) handleEndQuiz();
	if (secondsTotal.value >= maxTime) secondsTotal.value = maxTime;
});

watch(inputValue, () => {
	handleCheckCoutries();
});

watch(guessedCoutriesNumber, () => {
	if (guessedCoutriesNumber.value === coutriesWithStatus.value.length) {
		isQuizFinished.value = true;
		handleEndQuiz();
	}
});
</script>

<template>
	<QuizWrapper v-if="countriesList.length">
		<QuizHeader :quizTitle="quizzes[0].title" description="wymień jak najwięcej krajów leżących na terenie Europy w ciągu 2 minut" />
		<div class="controls-wrapper">
			<div v-if="hasQuizStarted" class="form-wrapper">
				<div class="form-field">
					<label class="form-field__label" for="country">Wpisz nazwę państwa:</label>
					<input class="form-field__input" v-model="inputValue" :disabled="isQuizFinished" type="text" id="country" name="country" />
				</div>
				<div class="form-info">
					<p class="form-info__progress">{{ guessedCoutriesNumber }} / {{ coutriesNumber }}</p>
					<p class="form-info__timeLeft">{{ timeLeft }}</p>
				</div>
				<div class="form-btns">
					<button
						class="form-btns__add-more-time-btn"
						@click="handleExtendTime(120)"
						:disabled="secondsTotal === 0 || secondsTotal === maxTime || isQuizFinished">
						Chcę jeszcze 2 minuty!
					</button>
					<button class="form-btns__give-up-btn" @click="handleEndQuiz" :disabled="isQuizFinished">Poddaję się 😕</button>
				</div>
			</div>
			<button v-else class="start-btn" @click="handleStartQuiz">Rozpocznij quiz</button>
		</div>
		<div class="helpers-wrapper">
			<div>
				<button class="toggle-map-display-btn" @click="toggleMapVisibility">
					<img :src="`${basePath}/icons/map.svg`" alt="" />
					<span>Pokaż mapę pomocniczą</span>
				</button>
				<img v-if="isMapDisplayed" class="map-img" :src="`${basePath}/img/quiz1/europe_map.jpg`" alt="mapa Europy" />
			</div>
			<div class="results-wrapper">
				<div class="results-wrapper__column">
					<p v-for="country in coutriesToDisplay.firstHalf" :key="country.name" class="result">
						<span :class="{ hidden: secondsTotal > 0, guessed: country.isGuessed, 'not-guessed': !country.isGuessed && secondsTotal <= 0 }">
							{{ country.name }}
						</span>
					</p>
				</div>
				<div class="results-wrapper__column}">
					<p v-for="country in coutriesToDisplay.secondHalf" :key="country.name" class="result">
						<span :class="{ hidden: secondsTotal > 0, guessed: country.isGuessed, 'not-guessed': !country.isGuessed && secondsTotal <= 0 }">
							{{ country.name }}
						</span>
					</p>
				</div>
			</div>
		</div>
	</QuizWrapper>
	<LoadingGif v-else />
	<ScoreModal
		v-if="isModalOpen"
		:isOpen="isModalOpen"
		:userScore="guessedCoutriesNumber"
		:totalScore="coutriesNumber"
		:handleCloseModal="closeModal" />
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

@keyframes highlight {
	from {
		opacity: 1;
	}

	to {
		opacity: 0;
	}
}

.controls-wrapper {
	margin-bottom: 1.6rem;

	@media (width >= 1400px) {
		margin-bottom: 2.4rem;
	}
}

.start-btn {
	display: inline-block;
	width: 100%;
	padding: 1.2rem;
	border: none;
	border-radius: 8px;
	background-color: $success;
	font-size: 1.8rem;
	transition: background-color 0.3s;

	&:hover {
		background-color: $success-light;
	}

	@media (width >= 900px) {
		margin-top: -0.5rem;
		margin-bottom: -0.5rem;
		line-height: 1em;
	}

	@media (width >= 1400px) {
		margin-top: -0.3rem;
		margin-bottom: 0;
		line-height: normal;
	}
}

.form-wrapper {
	display: grid;
	grid-template-rows: repeat(2, auto);
	grid-template-columns: repeat(2, auto);
	gap: 0.8rem;

	@media (width >= 900px) {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	@media (width >= 940px) {
		gap: 2.4rem;
	}

	@media (width >= 1400px) {
		gap: 3.2rem;
	}
}

.form-field {
	grid-row: 1 / 2;
	grid-column: 1 / 2;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 0.4rem;

	&__label {
		font-size: 1.5rem;
	}

	&__input {
		padding: 0.4rem 0.8rem;
		border: 1px solid #bebebe;
		max-width: 200px;
		font-size: 1.4rem;

		&:disabled {
			cursor: not-allowed;
		}
	}

	@media (width >= 600px) {
		flex-direction: row;
		align-items: center;
		gap: 0.8rem;
	}

	@media (width >= 1400px) {
		flex-direction: row;
		align-items: center;
		gap: 0.8rem;

		gap: 1.6rem;

		&__label {
			font-size: 1.7rem;
		}

		&__input {
			padding: 0.5rem 1rem;
			font-size: 1.6rem;
		}
	}
}

.form-info {
	grid-row: 1 / 2;
	grid-column: 2 / 3;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	&__progress {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.4rem;
		line-height: 1.4;
		font-variant-numeric: tabular-nums;
	}

	&__timeLeft {
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 71px;
		font-size: 2rem;
		font-weight: bold;
		line-height: 1.4;
		font-variant-numeric: tabular-nums;
	}

	@media (width >= 440px) {
		flex-direction: row;
		margin-top: 2.5rem;
	}

	@media (width >= 600px) {
		margin-top: 0;
	}

	@media (width >= 900px) {
		gap: 1.6rem;
	}

	@media (width >= 1400px) {
		gap: 2.4rem;

		&__progress {
			font-size: 1.6rem;
		}

		&__timeLeft {
			font-size: 3rem;
			min-width: 91px;
		}
	}
}

.form-btns {
	grid-row: 2 / 3;
	grid-column: 1 / 3;
	display: flex;
	gap: 0.8rem;

	&__add-more-time-btn,
	&__give-up-btn {
		display: inline-block;
		padding: 0.4em 0.8rem;
		border: none;
		border-radius: 8px;
		width: 100%;
		min-width: -moz-fit-content;
		min-width: fit-content;
		transition: background-color 0.3s;
	}

	&__add-more-time-btn {
		background-color: $info;

		&:hover:not([disabled]) {
			background-color: $info-light;
		}
	}

	&__give-up-btn {
		background-color: $error;

		&:hover:not([disabled]) {
			background-color: $error-light;
		}
	}

	@media (width >= 360px) {
		gap: 1.6rem;
	}

	@media (width >= 370px) {
		&__add-more-time-btn,
		&__give-up-btn {
			font-size: 1.4rem;
		}
	}

	@media (width >= 600px) {
		&__add-more-time-btn,
		&__give-up-btn {
			font-size: 1.5rem;
		}
	}

	@media (width >= 940px) {
		flex-grow: 1;
	}

	@media (width >= 1400px) {
		&__add-more-time-btn,
		&__give-up-btn {
			padding: 0.8rem 1.6rem;
			font-size: 1.6rem;
		}
	}
}

.helpers-wrapper {
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	max-width: 597px;

	@media (width >= 860px) {
		display: grid;
		grid-template-columns: 1fr auto;
		max-width: none;
	}

	@media (width >= 1400px) {
		gap: 2.4rem;
	}
}

.toggle-map-display-btn {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1.6rem;
	width: 100%;
	padding: 0.8rem;
	font-size: 1.4rem;

	@media (width >= 860px) {
		display: none;
	}
}

.map-img {
	width: 100%;
}

.results-wrapper {
	display: flex;
	flex-direction: column;

	@media (width >= 370px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 0.8rem;
	}

	@media (width >= 1400px) {
		column-gap: 1.6rem;
	}
}

.result {
	border: 1px solid #e6e6e6;
	border-bottom: none;
	font-size: 1.4rem;
	text-align: center;
	line-height: normal;

	&:last-child {
		border-bottom: 1px solid #e6e6e6;
	}

	span {
		position: relative;
		display: inline-block;
		padding: 0.5rem 0.8rem;
		width: 100%;
		height: 100%;

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			z-index: -1;
			background-color: $success-light;
		}
	}
}

.hidden {
	visibility: hidden;
}

.guessed {
	visibility: visible;
	color: $text-success;

	&::before {
		animation: highlight 1.5s forwards;
	}
}

.not-guessed {
	visibility: visible;
	color: $text-error;

	&::before {
		opacity: 0;
	}
}
</style>
