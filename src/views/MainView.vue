<script lang="ts">
import Header from '@/components/molecules/Header.vue';
import AppNameTitle from '@/components/atoms/AppNameTitle.vue';
import QuizCards from '@/components/organisms/QuizCards.vue';

export default {
	components: {
		Header,
		AppNameTitle,
		QuizCards,
	},
};
</script>

<template>
	<div class="main-view-wrapper">
		<Header>
			<AppNameTitle />
		</Header>
		<QuizCards />
	</div>
</template>

<style lang="scss" scoped>
.main-view-wrapper {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}
</style>
