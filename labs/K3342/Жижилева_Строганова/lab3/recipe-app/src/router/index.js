import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/log_in.vue';
import Register from '../components/registerComponent.vue';
import Profile from '../components/profileComponent.vue';
import Recipe from '../components/recipeComponent.vue';
import Search from '../components/searchComponent.vue';
import Subscribes from '../components/subscribesComponent.vue';

const routes = [
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/recipe', name: 'Recipe', component: Recipe },
    { path: '/search', name: 'Search', component: Search },
    { path: '/subs', name: 'Subscribes', component: Subscribes },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
