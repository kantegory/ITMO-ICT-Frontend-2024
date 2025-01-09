import { createRouter, createWebHistory } from 'vue-router';
import RentalView from '@/views/RentalView.vue';
import MainPage from "@/views/MainPage.vue";
import RegisterLogin from "@/views/RegisterLogin.vue";
import AccountPage from "@/views/AccountPage.vue";
import ChatsPage from "@/views/ChatsPage.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: MainPage
    },
    {
        path: '/rental',
        name: 'Rental',
        component: RentalView
    },
    {
        path: '/login',
        name: 'RegisterLogin',
        component: RegisterLogin
    },
    {
        path: '/account',
        name: 'Account',
        component: AccountPage
    },
    {
        path: '/chats',
        name: 'Chats',
        component: ChatsPage
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
