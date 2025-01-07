import { createRouter, createWebHistory } from 'vue-router';

import MainView from '../views/MainView.vue';
import CountriesOfEurope from '@/views/Quizes/CountriesOfEurope.vue';
import RecognizeLogo from '@/views/Quizes/RecognizeLogo.vue';
import KnowledgeOfMovies from '@/views/Quizes/KnowledgeOfMovies.vue';
import DrivingLicense from '@/views/Quizes/DrivingLicense.vue';

const basePath = import.meta.env.VITE_BASE_PATH;

const routes = [
	{ path: '/', component: MainView },
	{ path: '/quiz/panstwa-europy', component: CountriesOfEurope },
	{ path: '/quiz/rozpoznaj-logo', component: RecognizeLogo },
	{ path: '/quiz/znajomosc-filmow', component: KnowledgeOfMovies },
	{ path: '/quiz/prawo-jazdy', component: DrivingLicense },
	{ path: '/:pathPatch(.*)*', redirect: '/' },
];

export const router = createRouter({
	history: createWebHistory(basePath),
	routes,
});
