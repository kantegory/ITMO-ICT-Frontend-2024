import axios from 'axios';

const fetchReviews = async () => {
    try {
        const response = await axios.get('http://localhost:3000/articles');
        return response.data; // Возвращаем данные
    } catch (error) {
        console.error('Ошибка при загрузке отзывов:', error);
        throw error;
    }
};

export default fetchReviews;