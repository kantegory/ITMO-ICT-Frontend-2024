document.addEventListener('DOMContentLoaded', async function () {
    const params = new URLSearchParams(window.location.search);
    const restaurantId = params.get('id');

    if (restaurantId) {
        try {
            const response = await axios.get(`http://localhost:3000/restaurants/${restaurantId}`);
            const restaurant = response.data;

            if (restaurant) {
                document.getElementById('restaurant').innerText = restaurant.name;
                document.getElementById('cuisine').innerText = restaurant.cuisine;
                document.getElementById('details').innerText = restaurant.details;
                document.getElementById('restaurant-phone').innerText = restaurant['restaurant-phone'];
                document.getElementById('workingHours').innerText = restaurant.workingHours;
                document.getElementById('description').innerText = restaurant.description;
                document.querySelector('.restaurant-photo').src = restaurant['restaurant-photo'];

                restaurant.menu.forEach(item => {
                    const li = document.createElement('li');
                    li.innerText = item;
                    document.getElementById('menu-items').appendChild(li);
                });

                restaurant.reviews.forEach(review => {
                    const li = document.createElement('li');
                    li.innerText = review;
                    document.getElementById('reviews-list').appendChild(li);
                });
            } else {
                document.getElementById('restaurant').innerText = 'Ресторан не найден';
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных о ресторане:', error);
        }
    }

    const restaurantPhotos = document.querySelectorAll('.restaurant-photo');
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    const fullImage = document.getElementById('fullImage');

    restaurantPhotos.forEach(photo => {
        photo.onclick = function() {
            fullImage.src = this.src;
            modal.show();
        };
    });

    document.getElementById('imageModal').addEventListener('click', function (e) {
        if (e.target.classList.contains('modal')) {
            modal.hide();
        }
    });

    const imageModal = document.getElementById('imageModal');
    imageModal.addEventListener('shown.bs.modal', function () {
        fullImage.focus();
    });
});