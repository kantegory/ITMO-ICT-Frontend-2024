import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import SignupPage from '@/views/SignupPage.vue';
import AccountPage from '@/views/AccountPage.vue';
import RestaurantPage from '@/views/RestaurantPage.vue';

const routes = [
  { path: '/', component: MainPage },
  { path: '/login', component: LoginPage },
  { path: '/signup', component: SignupPage },
  { path: '/account', component: AccountPage },
  { path: '/restaurant/:id', component: RestaurantPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;