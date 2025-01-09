import { createRouter, createWebHistory } from 'vue-router'

import IndexPage from '@/views/IndexPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import PropertySearchPage from '@/views/PropertySearchPage.vue'
import AccountPage from '@/views/AccountPage.vue'
import PropertyArchivePage from '@/views/PropertyArchivePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/property-search',
      name: 'property-search',
      component: PropertySearchPage
    },
    {
      path: '/account',
      name: 'account',
      component: AccountPage
    },
    {
      path: '/archive',
      name: 'archive',
      component: PropertyArchivePage
    }
  ]
})

export default router
