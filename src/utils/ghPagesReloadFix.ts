import { useRouter } from 'vue-router';
import { basePath } from './base-path';
import { onMounted } from 'vue';

export const handlePageReload = () => {
	const router = useRouter();

	onMounted(async () => {
		let path = localStorage.getItem('path');
		if (path) {
			await router.isReady();
			localStorage.removeItem('path');
			router.push(`/${path.slice(basePath.length)}`);
		}
	});
};
