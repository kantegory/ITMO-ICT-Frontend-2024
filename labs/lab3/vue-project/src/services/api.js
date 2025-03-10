import axios from 'axios';

const API_URL = "http://localhost:8081";

const api = {
  // Получение информации о конкретном ресторане по ID
  async getRestaurantById(id) {
    try {
      const response = await axios.get(`${API_URL}/restaurants/${id}`);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении ресторана:', error);
      throw error;
    }
  },

  // Получение списка ресторанов
  async getRestaurants() {
    try {
      const response = await axios.get(`${API_URL}/restaurants`);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении списка ресторанов:', error);
      throw error;
    }
  },

  // Авторизация пользователя
  async login(email, password) {
    try {
      const response = await axios.get(`${API_URL}/users?email=${email}&password=${password}`);
      const users = response.data;
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      throw error;
    }
  },

  // Регистрация нового пользователя
  async register(user) {
    try {
      const response = await axios.post(`${API_URL}/users`, user, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      throw error;
    }
  },

  // Отправка бронирования
  async bookTable(bookingData) {
    try {
      console.log('Отправляем запрос на бронирование:', bookingData);
      const response = await axios.post(`${API_URL}/bookings`, bookingData);
      console.log('Ответ от сервера:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
      throw error;
    }
  },

  // Получение истории бронирований для текущего пользователя
  async getUserBookings(userId) {
    try {
      const response = await axios.get(`${API_URL}/bookings?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении истории бронирований:', error);
      throw error;
    }
  },
};

export default api;
