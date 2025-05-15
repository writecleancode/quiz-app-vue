import { useRoute } from "vue-router"

export const getPath = () => {
	const route = useRoute()
	const path = route.path.split('/').pop()
	return path ? path : ''
}