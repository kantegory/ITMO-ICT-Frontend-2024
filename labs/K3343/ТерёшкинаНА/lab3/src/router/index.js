import { createRouter, createWebHistory } from 'vue-router';
import Search from '@/pages/SearchPage.vue';
import PlacePage from "@/pages/PlacePage.vue";
import Login from "@/pages/LoginPage.vue";
import Register from "@/pages/RegisterPage.vue";
import Account from "@/pages/AccountPage.vue";
import Reserves from "@/pages/ReservesPage.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Search
    },
    {
        path: '/place',
        name: 'Place',
        component: PlacePage
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/account',
        name: 'Account',
        component: Account
    },
    {
        path: '/reserves',
        name: 'Book',
        component: Reserves
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
