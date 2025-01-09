document.addEventListener('DOMContentLoaded', async function() {
    const favoritesList = document.getElementById('favorites-list');

    if (!favoritesList) {
        console.error('Элемент с ID favorites-list не найден.');
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        favoritesList.innerHTML = '<p>Пожалуйста, авторизуйтесь для просмотра избранных ресторанов.</p>';
        return;
    }

    try {
        const response = await axios.get(`http://localhost:3000/users/${currentUser.id}`);
        const favorites = response.data.favorites || [];

        if (favorites.length === 0) {
            favoritesList.innerHTML = '<p>Ваши избранные рестораны пусты.</p>';
        } else {
            favorites.forEach(restaurant => {
                const card = document.createElement('div');
                card.classList.add('favorite-card', 'col-12', 'col-md-6', 'col-lg-4');
                card.innerHTML = `
                    <h2>${restaurant.name}</h2>
                    <p>Кухня: ${restaurant.cuisine}</p>
                    <p>Расположение: ${restaurant.location}</p>
                    <button class="btn btn-outline-light button-det" onclick="goToDetails('${restaurant.id}')">Подробнее</button>
                    <button class="btn btn-danger button-del" onclick="removeFromFavorites('${currentUser.id}', '${restaurant.id}')">Удалить</button>
                `;
                favoritesList.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Ошибка при загрузке избранного:', error);
    }
});


async function removeFromFavorites(userId, restaurantId) {
    try {
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        const user = response.data;

        const index = user.favorites.findIndex(restaurant => restaurant.id === restaurantId);
        if (index !== -1) {
            user.favorites.splice(index, 1);
            await axios.put(`http://localhost:3000/users/${userId}`, user);
            alert('Ресторан удален из избранного!');
            location.reload();
        }
    } catch (error) {
        console.error('Ошибка при удалении из избранного:', error);
        alert('Произошла ошибка при удалении из избранного');
    }
}

function goToDetails(restaurantId) {
    window.location.href = `details.html?id=${restaurantId}`;
}
