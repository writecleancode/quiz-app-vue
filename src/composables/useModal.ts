import { nextTick, ref } from 'vue';

export const useModal = (initialState = false) => {
	const isModalOpen = ref(initialState);

	const openModal = () => (isModalOpen.value = true);

	const closeModal = () => (isModalOpen.value = false);

	const handleOpenModal = () => {
		openModal();
		(async () => {
			await nextTick();
			document.getElementById('go-back-btn')?.focus();
		})();
	};

	return {
		isModalOpen,
		handleOpenModal,
		closeModal,
	};
};
