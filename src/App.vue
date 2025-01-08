<script lang="ts">
import { handlePageReload } from './utils/ghPagesReloadHandler';

export default {
	setup() {
		handlePageReload();
	},
};
</script>

<template>
	<RouterView />
</template>
