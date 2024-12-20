import { createRouter, createWebHistory } from 'vue-router';
import Main from '../pages/Main.vue';
import Trainings from '../pages/Trainings.vue';
import Blog from '../pages/Blog.vue';
import Account from '../pages/Account.vue';


const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/trainings',
    name: 'Trainings',
    component: Trainings,
  },
    {path: '/blog',
    name: 'Blog',
    component: Blog,
    },
  {
    path:'/account',
    name: 'Account',
    component: Account,
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
