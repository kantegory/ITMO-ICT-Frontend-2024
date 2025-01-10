import { createRouter, createWebHistory } from 'vue-router';
import Search from '@/components/SearchPage.vue';
import PlacePage from "@/components/PlacePage.vue";
import Login from "@/components/LoginPage.vue";
import Register from "@/components/RegisterPage.vue";
import Account from "@/components/AccountPage.vue";
import Reserves from "@/components/ReservesPage.vue";

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
