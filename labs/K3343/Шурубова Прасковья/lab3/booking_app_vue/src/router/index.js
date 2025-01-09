import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
  },
  {
    path: '/restaurants/:id',
    name: 'RestaurantDetails',
    component: () => import('../views/RestaurantDetails.vue'), props: true,
  },
  {
    path: '/restaurants/:id',
    name: 'RestaurantDetails',
    component: () => import('../views/RestaurantDetails.vue'), props: true,
  },
  {
    path: '/booking-history',
    name: 'BookingHistory',
    component: () => import('../views/Booking.vue'), props: true,
  },
  {
    path: '/favorite-history',
    name: 'FavoriteHistory',
    component: () => import('../views/Favorites.vue'), props: true,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'), props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
