import { ref } from 'vue';
import axios from 'axios';

const API_URL = 'http://localhost:8081';

export function useRestaurants() {
  const restaurants = ref([]);

  const loadRestaurants = async () => {
    try {
      const response = await axios.get(`${API_URL}/restaurants`);
      restaurants.value = response.data;
    } catch (error) {
      console.error('Ошибка при загрузке ресторанов:', error);
    }
  };

  return { restaurants, loadRestaurants };
}
