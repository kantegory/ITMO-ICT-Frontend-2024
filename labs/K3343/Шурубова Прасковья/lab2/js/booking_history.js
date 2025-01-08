async function loadBookingHistory() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Пожалуйста, авторизуйтесь для просмотра истории бронирований');
        return;
    }

    try {
        const response = await axios.get(`http://localhost:3000/users/${currentUser.id}`);
        const user = response.data;

        const bookingHistory = user.bookings || [];
        const bookingHistoryContainer = document.getElementById('booking-history');

        if (!bookingHistoryContainer) {
            console.error('Элемент с id "booking-history" не найден!');
            return;
        }

        bookingHistoryContainer.innerHTML = '';

        if (bookingHistory.length === 0) {
            bookingHistoryContainer.innerHTML = '<p>У вас нет истории бронирований.</p>';
            return;
        }

        bookingHistory.forEach(booking => {
            const bookingCard = `
                <div class='restaurant-card col-md-4'>
                    <div class="card-body">
                        <h2 class="card-title">Бронирование на ${booking.date} в ${booking.restaurantName}</h2>
                        <p class="card-text">Количество человек: ${booking.people}</p>
                        <p class="card-text">Имя: ${booking.name}</p>
                        <p class="card-text">Телефон: ${booking.phone}</p>
                        <p class="card-text">Email: ${booking.email}</p>
                        <p class="card-text">Пожелания: ${booking.comments}</p>
                    </div>
                </div>
            `;
            bookingHistoryContainer.insertAdjacentHTML('beforeend', bookingCard);
        });

    } catch (error) {
        console.error('Ошибка при загрузке истории бронирований:', error);
        alert('Произошла ошибка при загрузке истории бронирований');
    }
}

document.addEventListener('DOMContentLoaded', loadBookingHistory);
