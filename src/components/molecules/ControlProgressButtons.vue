<script setup lang="ts">
import type { PropType } from 'vue';
import { basePath } from '@/utils/base-path';

const props = defineProps({
	previousButton: {
		type: String,
	},
	nextButton: {
		type: String,
	},

	showCorrectAnswers: {
		type: Function as PropType<() => void>,
	},

	handleChangeQuestion: {
		type: Function,
		required: true,
	},
	isFirstQuestion: {
		type: Boolean,
	},
	isLastQuestion: {
		type: Boolean,
	},
});
</script>

<template>
	<button class="previous-question-btn" @click="handleChangeQuestion('previous')" :disabled="isFirstQuestion">
		<img :src="`${basePath}/icons/caret-left-fill.svg`" alt="" />
		<span>{{ previousButton }}</span>
	</button>
	<button v-if="nextButton === 'Sprawdzam!'" class="next-question-btn" @click="showCorrectAnswers" data-last="false">
		<span>{{ nextButton }}</span>
	</button>
	<button v-else class="next-question-btn" @click="handleChangeQuestion('next')" :data-last="isLastQuestion ? 'true' : 'false'">
		<span>{{ isLastQuestion ? 'Zakończ Quiz' : nextButton }}</span>
		<img v-if="!isLastQuestion" :src="`${basePath}/icons/caret-right-fill.svg`" alt="" />
	</button>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.previous-question-btn,
.next-question-btn {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.8rem;
	padding: 1.2rem 2.4rem;
	border: none;
	border-radius: 50rem;
	color: $text-color;
	font-size: 1.5rem;
	font-weight: bold;
	line-height: normal;

	img {
		transition: translate 0.2s;
	}

	&:disabled {
		opacity: 0.5;
	}
}

.previous-question-btn {
	background-color: #efefef;

	&:hover {
		img {
			translate: -1rem;
		}

		&:disabled {
			img {
				translate: 0;
			}
		}
	}
}

.next-question-btn {
	background-color: $success-dark;

	&:hover:not([disabled]) {
		img {
			translate: 1rem;
		}
	}
}

[data-last='true'] {
	background-color: $info;
	transition: background-color 0.2s;

	&:hover {
		background-color: $info-light;
	}
}
</style>
