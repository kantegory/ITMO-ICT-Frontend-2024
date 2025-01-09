import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const registerUser = async (registerData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, registerData);
    return response.data;
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axios.get(`${API_URL}/users`, { params: loginData });
    return response.data;
  } catch (error) {
    console.error('Ошибка входа:', error);
    throw error;
  }
};

