<script lang="ts">
import { basePath } from '@/utils/base-path';

export default {
	props: {
		hasHoverEffect: {
			type: Boolean,
			default: false,
		},
	},

	setup() {
		return {
			basePath,
		};
	},
};
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
}

.purple-text {
	color: #4a50dc;
}

@media (min-width: 860px) {
	.h1 {
		font-size: 3.2rem;
	}
}

@media (min-width: 1200px) {
	.h1 {
		font-size: 4rem;
	}
}
</style>
