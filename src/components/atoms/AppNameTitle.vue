<script setup lang="ts">
defineProps({
	hasHoverEffect: {
		type: Boolean,
		default: false,
	},
});
</script>

<template>
	<RouterLink to="/">
		<h1 class="h1" :class="{ 'hover-effect': hasHoverEffect }" title="Powrót do wyboru quizów">
			<span class="purple-text">Quiz</span><span>App</span>
		</h1>
	</RouterLink>
</template>

<style lang="scss" scoped>
.h1 {
	margin-left: auto;
	margin-right: auto;
	padding: 0.8rem;
	width: fit-content;
	font-size: 2.4rem;
	font-weight: bold;
	cursor: pointer;

	&.hover-effect {
		span {
			display: inline-block;
			transition: translate 0.3s;
		}

		&:hover :first-child {
			translate: 100%;
		}

		&:hover :last-child {
			translate: -100%;
		}
	}

	@media (width >= 860px) {
		font-size: 3.2rem;
	}

	@media (width >= 1200px) {
		font-size: 4rem;
	}
}

.purple-text {
	color: #4a50dc;
}
</style>
