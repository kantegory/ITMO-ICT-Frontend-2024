document.addEventListener('DOMContentLoaded', async function () {
    document.querySelector('.button-find').addEventListener('click', async function () {
        const cuisine = document.getElementById('cuisine-input').value.toLowerCase();
        const restaurantName = document.getElementById('name-input').value.toLowerCase();
        const location = document.getElementById('location-input').value.toLowerCase();
        const price = document.getElementById('price-input').value;
        const restaurantList = document.getElementById('restaurant-list');
        restaurantList.innerHTML = '';

        try {
            const response = await axios.get('http://localhost:3000/restaurants');
            const restaurants = response.data;
            const filteredRestaurants = restaurants.filter(restaurant => {
                return (
                    (cuisine === '' || restaurant.cuisine.toLowerCase().includes(cuisine)) &&
                    (restaurantName === '' || restaurant.name.toLowerCase().includes(restaurantName)) &&
                    (location === '' || restaurant.station.toLowerCase().includes(location) || restaurant.location.toLowerCase().includes(location)) &&
                    (price === '' || (parseInt(price) && parseInt(restaurant.price) <= parseInt(price)))
                );
            });

            filteredRestaurants.forEach(restaurant => {
                const card = document.createElement('div');
                card.classList.add('restaurant-card', 'col-12', 'col-md-6', 'col-lg-4');
                card.innerHTML = `
                    <h5>${restaurant.name}</h5>
                    <p>Кухня: ${restaurant.cuisine}</p>
                    <p>Расположение: ${restaurant.details}</p>
                    <p>Цена: ${restaurant.price}</p>
                    <button class="btn btn-outline-light button-book" onclick="goToDetails(${restaurant.id})">Подробнее</button>
                `;
                restaurantList.appendChild(card);
            });

            if (filteredRestaurants.length === 0) {
                const noResults = document.createElement('p');
                noResults.innerText = "Не найдено ресторанов, соответствующих критериям.";
                restaurantList.appendChild(noResults);
            }
        } catch (error) {
            console.error("Ошибка при получении данных: ", error);
            alert("Не удалось загрузить список ресторанов.");
        }
    });
});

function goToDetails(restaurantId) {
    window.location.href = `details.html?id=${restaurantId}`;
}
