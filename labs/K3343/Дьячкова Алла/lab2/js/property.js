async function loadPropertyDetails() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const propertyId = urlParams.get('id');

        if (!propertyId) {
            throw new Error('Property ID is missing');
        }

        const response = await fetch(`http://localhost:3000/properties/${propertyId}`);

        if (!response.ok) {
            throw new Error('Property not found');
        }

        const property = await response.json();

        document.getElementById('property-details').textContent = property.title || 'Название объекта отсутствует';
        document.getElementById('property-price').textContent = `${property.price?.toLocaleString() || 'Цена не указана'} ₽/мес`;
        document.getElementById('property-location').textContent = property.location || 'Местоположение не указано';
        document.getElementById('property-rooms').textContent = property.rooms || 'Количество комнат не указано';
        document.getElementById('property-description').textContent = property.description || 'Описание отсутствует';

        const carouselInner = document.querySelector('.carousel-inner');
        if (property.images && property.images.length > 0) {
            carouselInner.innerHTML = property.images.map((image, index) => `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="images/${image}" class="d-block w-100" alt="Фото объекта: ${property.title}">
                </div>
            `).join('');
        } else {
            carouselInner.innerHTML = `
                <div class="carousel-item active">
                    <img src="images/none.png" class="d-block w-100" alt="Фотография отсутствует">
                </div>
            `;
        }

        const showControls = property.images && property.images.length > 1;
        document.querySelectorAll('.carousel-control-prev, .carousel-control-next')
            .forEach(control => {
                control.style.display = showControls ? 'block' : 'none';
            });

    } catch (error) {
        console.error('Error:', error);
        const mainContainer = document.querySelector('main .container');
        mainContainer.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Произошла ошибка при загрузке данных об объекте: ${error.message}
            </div>
            <a href="search.html" class="btn btn-secondary">Вернуться к поиску</a>
        `;
    }
}
document.getElementById('open-dialog').addEventListener('click', function () {
        const token = localStorage.getItem('accessToken');
        const propertyId = new URLSearchParams(window.location.search).get('id');
        const loggedInUserId = localStorage.getItem('loggedInUserId');

        if (loggedInUserId && token) {
            const currentPath = window.location.pathname;
            const basePath = currentPath.split('/property')[0];  // Assuming '/messages' is part of the current path
            window.location.href = `${basePath}/messages.html?property_id=${propertyId}`;
        } else {
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show();
        }
    });
document.getElementById('modalLoginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('modalEmail').value;
        const password = document.getElementById('modalPassword').value;

        fetch('http://localhost:3000/enter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('loggedInUserId', data.userId);

            alert('Вход выполнен успешно!');
            const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            loginModal.hide();

            location.reload();
        })
        .catch(error => {
            console.error('Login error:', error);
            alert(error.message || 'Ошибка при входе в систему');
        });
});
document.getElementById('booking-btn').addEventListener('click', function () {
        const token = localStorage.getItem('accessToken');
        const loggedInUserId = localStorage.getItem('loggedInUserId');

        if (loggedInUserId && token) {
            const today = new Date();
            const minDate = today.toISOString().split('T')[0];
            document.getElementById('stdate').setAttribute('min', minDate);
            document.getElementById('enddate').setAttribute('min', minDate+1);
            const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'));
            const startDateInput = document.getElementById('stdate');
            const endDateInput = document.getElementById('enddate');
            startDateInput.addEventListener('change', function () {
                const startDate = new Date(startDateInput.value);
                const nextDay = new Date(startDate);
                nextDay.setDate(startDate.getDate() + 1);

                const nextDayString = nextDay.toISOString().split('T')[0];
                endDateInput.value = nextDayString;
                endDateInput.setAttribute('min', nextDayString);
            });
            bookingModal.show();
        } else {
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show();
        }
    });
document.getElementById('modalBookingForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const token = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('loggedInUserId');
        if (userId && token) {
            const propertyId = new URLSearchParams(window.location.search).get('id');
            if (!propertyId) {
                throw new Error('Property ID is missing');
            }
            const start_date = document.getElementById('stdate').value;
            const end_date = document.getElementById('enddate').value;
            const timestamp = new Date().toISOString();
            console.log(userId, propertyId, start_date, end_date, timestamp)

            fetch('http://localhost:3000/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, propertyId, start_date, end_date, timestamp })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }

                alert('Заявка подана успешно!');
                const bookingModal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
                bookingModal.hide();
                location.reload();
            }).catch(error => {
                console.error('error:', error);
                alert(error.message || 'Ошибка при бронировании');
        });
        } else {
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show();
        }
});
document.addEventListener('DOMContentLoaded', loadPropertyDetails);