// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import UserDashboardView from '../views/UserDashboardView.vue';
import EmployerDashboardView from '../views/EmployerDashboardView.vue';
import JobListView from '../views/JobListView.vue';
import JobDetailView from '../views/JobDetailView.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: LoginView },
    { path: '/register', name: 'Register', component: RegisterView },
    { path: '/user/dashboard', name: 'UserDashboard', component: UserDashboardView },
    { path: '/employer/dashboard', name: 'EmployerDashboard', component: EmployerDashboardView },
    { path: '/jobs', name: 'JobList', component: JobListView },
    { path: '/jobs/:id', name: 'JobDetail', component: JobDetailView, props: true },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;