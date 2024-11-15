import { createRouter, createWebHistory } from 'vue-router';
import RentalView from './components/RentalView.vue';
import MainPage from "@/components/MainPage.vue";
import RegisterLogin from "@/components/RegisterLogin.vue";
import AccountPage from "@/components/AccountPage.vue";
import ChatsPage from "@/components/ChatsPage.vue"; // Импортируйте ваш компонент

const routes = [
    {
        path: '/',
        name: 'Home',
        component: MainPage // Ваш компонент по умолчанию
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
    // Вы можете добавлять другие маршруты здесь
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
