import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomePage.vue';
import Login from '@/views/LoginPage.vue';
import Profile from '@/views/ProfilePage.vue';
import Arcans from '@/views/ArcansPage.vue';
import Natal from '@/views/NatalPage.vue';
import DestinyMatrix from '@/views/DestinyMatrixPage.vue';
import CompatibilityMatrix from '@/views/CompatibilityMatrixPage.vue';
import Info from '@/views/InfoPage.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/arcans', name: 'Arcans', component: Arcans },
  { path: '/natal', name: 'Natal', component: Natal },
  { path: '/destiny-matrix', name: 'DestinyMatrix', component: DestinyMatrix },
  { path: '/compatibility-matrix', name: 'CompatibilityMatrix', component: CompatibilityMatrix },
  { path: '/info', name: 'Info', component: Info },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Добавляем глобальный охранник маршрутов
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Если маршрут требует авторизации, но пользователь не авторизован, перенаправляем на вход
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
