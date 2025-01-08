<script lang="ts">
import { basePath } from './utils/base-path';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
	setup() {
		const router = useRouter();

		onMounted(async () => {
			let path = localStorage.getItem('path');
			if (path) {
				await router.isReady();
				localStorage.removeItem('path');
				router.push(`/${path.slice(basePath.length)}`);
			}
		});
	},
};
</script>

<template>
	<RouterView />
</template>
