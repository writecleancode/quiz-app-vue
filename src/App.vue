<script lang="ts">
import { handlePageReload } from './utils/ghPagesReloadFix';

export default {
	setup() {
		handlePageReload();
	},
};
</script>

<template>
	<RouterView />
</template>
