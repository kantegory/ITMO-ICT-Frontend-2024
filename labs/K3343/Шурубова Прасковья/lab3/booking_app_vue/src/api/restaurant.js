import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/';

export async function fetchRestaurant(restaurantId) {
    try {
        const response = await axios.get(`${API_BASE_URL}restaurants/${restaurantId}`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при загрузке данных о ресторане:", error);
        throw error;
    }
}

export async function fetchAllRestaurants() {
    try {
        const response = await axios.get(`${API_BASE_URL}restaurants`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при загрузке списка ресторанов:", error);
        throw error;
    }
}
