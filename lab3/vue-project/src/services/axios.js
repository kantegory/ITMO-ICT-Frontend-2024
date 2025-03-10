// src/services/axios.js
import axios from 'axios';

// Создаем экземпляр axios с базовым URL
const api = axios.create({
  baseURL: 'http://localhost:5503/', // Указываем базовый URL для API
  headers: {
    'Content-Type': 'application/json', // Тип контента, который мы отправляем
  },
});

export default api;