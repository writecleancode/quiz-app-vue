<script lang="ts">
import { useRouter } from 'vue-router';

export default {
	setup() {
		const router = useRouter();

		router.isReady();

		let path = localStorage.getItem('path');
		console.log(path);
		if (path) {
			localStorage.removeItem('path');
			router.push(path);
		}
	},
};
</script>

<template>
	<RouterView />
</template>
