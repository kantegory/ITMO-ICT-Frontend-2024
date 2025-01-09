import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/', // Замените на ваш базовый URL
    timeout: 10000, // Тайм-аут запросов
    headers: {
        accept: 'application/json',
    },
});

export default instance;