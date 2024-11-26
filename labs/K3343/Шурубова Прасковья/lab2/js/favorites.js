document.querySelector('.add-to-favorites').addEventListener('click', async function(e) {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Для выполнения этой операции требуется авторизация');
        return;
    }

    const restaurantId = new URLSearchParams(window.location.search).get('id');

    if (!restaurantId) {
        alert('Ошибка: недостаточно данных о ресторане');
        return;
    }

    const restaurant = {
        id: restaurantId,
        name: document.getElementById('restaurant').innerText,
        cuisine: document.getElementById('cuisine').innerText,
        location: document.getElementById('details').innerText,
    };

    try {
        const response = await axios.get(`http://localhost:3000/users/${currentUser.id}`);
        const user = response.data;

        if (!user.favorites) {
            user.favorites = [];
        }

        if (!user.favorites.some(fav => fav.id === restaurantId)) {
            user.favorites.push(restaurant);
            await axios.put(`http://localhost:3000/users/${currentUser.id}`, user);
            alert(`${restaurant.name} добавлен в избранное!`);
        } else {
            alert(`${restaurant.name} уже в избранном!`);
        }
    } catch (error) {
        console.error('Ошибка при добавлении в избранное:', error);
        alert('Произошла ошибка при добавлении в избранное');
    }
});

