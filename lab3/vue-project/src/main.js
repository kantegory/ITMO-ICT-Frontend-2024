import { createApp } from 'vue'


import App from '@/App.vue'
import router from '@/router'

import 'bootstrap/dist/css/bootstrap.min.css'; // Подключаем стили Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Подключаем JavaScript Bootstrap (например, для модалок)
// import store from '@/stores'

const app = createApp(App)
app.use(router)
app.mount('#app')

// app.use(store)