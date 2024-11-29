document.addEventListener('DOMContentLoaded', function () {
    const profileLink = document.getElementById('profile');

    document.getElementById('button-find').addEventListener('click', function() {
        const cuisine = document.getElementById('cuisine-input').value.toLowerCase();
        const name = document.getElementById('name-input').value.toLowerCase();
        const location = document.getElementById('location-input').value.toLowerCase();
        const price = document.getElementById('price-input').value;

        const restaurantList = document.getElementById('restaurant-list');
        restaurantList.innerHTML = '';

        const restaurants = [
            { id: 1, name: 'Mircuccio Osteria', cuisine: 'Итальянская', station: 'Площадь Александра Невского 2', location: 'ул.Моисеенко, д.27', price: '2000' },
            { id: 2, name: 'My Asiatique', cuisine: 'Китайская, Японская, Индийская', station: 'Владимирская, Достоевская, Звенигородская', location: 'ул.Разъезжая, д.3', price: '1000' },
            { id: 3, name: 'Roze & Dance', cuisine: 'Французская', station: 'Гостиный двор, Невский проспект', location: 'ул.Инженерная, д.13', price: '2500' },
            { id: 4, name: 'Meal', cuisine: 'Европейская, Скандинавская', station: 'Чернышевская', location: 'Литейный пр-т, 17-19', price: '1200' },
            { id: 5, name: 'Тбилисо', cuisine: 'Грузинская, Кавказская', station: 'Горьковская', location: 'ул.Сытнинская, д.10', price: '800' },
        ];

        const filteredRestaurants = restaurants.filter(restaurant => {
            return (
                (cuisine === '' || restaurant.cuisine.toLowerCase().includes(cuisine)) &&
                (name === '' || restaurant.name.toLowerCase().includes(name)) &&
                (location === '' || restaurant.station.toLowerCase().includes(location) || restaurant.location.toLowerCase().includes(location)) &&
                (price === '' || (parseInt(price) && parseInt(restaurant.price) <= parseInt(price)))
            );
        });

        filteredRestaurants.forEach(restaurant => {
            const card = document.createElement('div');
            card.classList.add('restaurant-card');
            card.innerHTML = `
                <h5>${restaurant.name}</h5>
                <p>Кухня: ${restaurant.cuisine}</p>
                <p>Станция метро: ${restaurant.station}</p>
                <p>Расположение: ${restaurant.location}</p>
                <p>Цена: ${restaurant.price}</p>
                <button class="btn btn-outline-light btn-block btn-lg btn-custom" id="button-book" onclick="goToDetails(${restaurant.id})">Забронировать</button>
            `;
            restaurantList.appendChild(card);
        });

        if (filteredRestaurants.length === 0) {
            restaurantList.innerHTML = '<p>Рестораны не найдены</p>';
        }
    });
});

function goToDetails(restaurantId) {
    window.location.href = `details.html?id=${restaurantId}`;
}

function addToFavorites(restaurantId) {
    const restaurants = [
        { id: 1, name: 'Mircuccio Osteria', cuisine: 'Итальянская', station: 'Площадь Александра Невского 2', location: 'ул.Моисеенко, д.27', price: '2000' },
        { id: 2, name: 'My Asiatique', cuisine: 'Китайская, Японская, Индийская', station: 'Владимирская, Достоевская, Звенигородская', location: 'ул.Разъезжая, д.3', price: '1000' },
        { id: 3, name: 'Roze & Dance', cuisine: 'Французская', station: 'Гостиный двор, Невский проспект', location: 'ул.Инженерная, д.13', price: '2500' },
        { id: 4, name: 'Meal', cuisine: 'Европейская, Скандинавская', station: 'Чернышевская', location: 'Литейный пр-т, 17-19', price: '1200' },
        { id: 5, name: 'Тбилисо', cuisine: 'Грузинская, Кавказская', station: 'Горьковская', location: 'ул.Сытнинская, д.10', price: '800' },
    ];

    const restaurant = restaurants.find(r => r.id === restaurantId);
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favorites.some(fav => fav.id === restaurantId)) {
        favorites.push(restaurant);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${restaurant.name} добавлен в избранное!`);
    } else {
        alert(`${restaurant.name} уже в избранном!`);
    }
}