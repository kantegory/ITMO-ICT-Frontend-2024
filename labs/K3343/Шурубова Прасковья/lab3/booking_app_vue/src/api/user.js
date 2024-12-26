import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

export const getUserData = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при загрузке данных пользователя:', error);
        throw error;
    }
};

export const updateUserData = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_URL}/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Ошибка при обновлении данных пользователя:', error);
        throw error;
    }
};
