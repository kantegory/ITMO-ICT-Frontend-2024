import axios from 'axios';
export async function addToFavorites(restaurant, user) {
    try {
        if (!user) {
            throw new Error("Необходимо авторизоваться, чтобы добавлять в избранное.");
        }

        if (!restaurant || !restaurant.id) {
            throw new Error("Недостаточно данных о ресторане.");
        }

        const response = await axios.get(`http://localhost:3000/users/${user.id}`);
        const userData = response.data;
        const exists = userData.favorites.some(fav => fav.id === restaurant.id);
        if (exists) {
            return "Этот ресторан уже в избранном!";
        }

        userData.favorites.push({
            id: restaurant.id,
            name: restaurant.name,
            details: restaurant.details,
            cuisine: restaurant.cuisine,
        });

        await axios.put(`http://localhost:3000/users/${user.id}`, userData);

        return "Ресторан успешно добавлен в избранное!";
    } catch (error) {
        console.error("Ошибка при добавлении в избранное:", error);
        throw new Error(error.response?.data?.message || "Не удалось добавить в избранное.");
    }
}
