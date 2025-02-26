<script setup lang="ts">
import type { PropType } from 'vue';
import { basePath } from '@/utils/base-path';

defineProps({
	isOpen: {
		type: Boolean,
		default: false,
	},
	userScore: {
		type: Number,
		required: true,
	},
	totalScore: {
		type: Number,
		required: true,
	},
	handleCloseModal: {
		type: Function as PropType<() => void>,
		required: true,
	},
});
</script>

<template>
	<teleport to="body">
		<div class="modal-overlay">
			<div class="score-modal-wrapper">
				<p class="score-title">Twój wynik</p>
				<p class="score-text">{{ userScore }} / {{ totalScore }}</p>
				<div class="buttons-wrapper">
					<RouterLink :to="`${basePath}/`" class="back-btn" aria-label="Powrót do wyboru quizów" id="go-back-btn">
						<img :src="`${basePath}/icons/arrow-double-left.svg`" alt="" />
						<span class="back-btn__text}">Powrót</span>
					</RouterLink>
					<button class="close-btn" @click="handleCloseModal" aria-label="Powrót do wyboru quizów">
						<span class="close-btn__text">Zamknij</span>
						<img :src="`${basePath}/icons/x-circle.svg`" alt="" />
					</button>
				</div>
			</div>
		</div>
	</teleport>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

@keyframes slide-up {
	0% {
		opacity: 0;
		translate: -50% -55%;
	}

	100% {
		opacity: 1;
		translate: -50% -50%;
	}
}

.modal-overlay {
	position: absolute;
	inset: 0;
	background-color: rgba(255, 255, 255, 0.62);
}

.score-modal-wrapper {
	position: absolute;
	top: 50%;
	left: 50%;
	translate: -50% -50%;
	padding: 2.4rem;
	border: 1px solid #666;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
	width: fit-content;
	background-color: #fff;
	text-align: center;
	opacity: 1;

	animation: slide-up 0.5s forwards;

	@media (width >= 1400px) {
		padding: 4rem;
	}
}

.score-title {
	font-size: 1.8rem;

	@media (width >= 1400px) {
		font-size: 2.4rem;
	}
}

.score-text {
	margin-top: 0.8rem;
	font-size: 2rem;
	font-weight: bold;

	@media (width >= 1400px) {
		margin-top: 1.6rem;
		font-size: 3rem;
	}
}

.score-percentage {
	font-size: 1.4rem;
	color: #666;
}

.buttons-wrapper {
	display: flex;
	gap: 0.8rem;
	margin-top: 1.6rem;

	@media (width >= 1400px) {
		gap: 1.6rem;
		margin-top: 2.4rem;
	}
}

.back-btn,
.close-btn {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.8rem;
	padding: 0.8rem 1.6rem;
	border: none;
	border-radius: 8px;
	font-size: 1.6rem;
	color: inherit;
	line-height: inherit;

	img {
		width: 2rem;
		min-height: 2rem;
		translate: 0 1px;
	}

	@media (width >= 1400px) {
		font-size: 1.8rem;

		img {
			translate: 0;
		}
	}
}

.back-btn {
	background-color: $info;
}

.close-btn {
	background-color: $success;
}
</style>
