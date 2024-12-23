import axios from 'axios';

// Создаем экземпляр axios
const api = axios.create({
  baseURL: 'http://localhost:3000', // Базовый адрес для JSON-сервера
});

// Интерсептор запросов
api.interceptors.request.use(
  (config) => {
    console.log('Request:', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерсептор ответов
api.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

export default function useApi() {
  return {
    // Users
    getUsers: () => api.get('/users'),
    getUserById: (id) => api.get(`/users/${id}`),
    createUser: (data) => api.post('/users', data),
    updateUser: (id, data) => api.put(`/users/${id}`, data),
    deleteUser: (id) => api.delete(`/users/${id}`),

    // ArcanaList
    getArcanaList: () => api.get('/arcanaList'),

    // Compatibility Messages
    getCompatibilityMessages: () => api.get('/compatibilityMessages'),

    // Results
    getResults: () => api.get('/results'),
    // Sections
    getSections: () => api.get('/sections'),

    // Natal Cards
    getNatalCards: () => api.get('/natal_cards'),
  };
}
