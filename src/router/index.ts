import { createRouter, createWebHistory } from 'vue-router';

import MainView from '@/views/MainView.vue';
import CountriesOfEurope from '@/views/Quizes/CountriesOfEurope.vue';
import RecognizeLogo from '@/views/Quizes/RecognizeLogo.vue';
import KnowledgeOfMovies from '@/views/Quizes/KnowledgeOfMovies.vue';
import DrivingLicense from '@/views/Quizes/DrivingLicense.vue';

const basePath = import.meta.env.VITE_BASE_PATH;

const routes = [
	{ path: '/', name: 'main-view', component: MainView },
	{ path: '/quiz/panstwa-europy', name: 'countries-of-europe', component: CountriesOfEurope },
	{ path: '/quiz/rozpoznaj-logo', name: 'recognize-logo', component: RecognizeLogo },
	{ path: '/quiz/znajomosc-filmow', name: 'knowledge-of-movies', component: KnowledgeOfMovies },
	{ path: '/quiz/prawo-jazdy', name: 'driving-license', component: DrivingLicense },
	{ path: '/:pathPatch(.*)*', redirect: '/' },
];

export const router = createRouter({
	history: createWebHistory(basePath),
	routes,
});
