document.getElementById('booking-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const bookingData = {
        date: document.getElementById('booking-date').value,
        restaurantName: document.getElementById('restaurant').innerText,
        restaurantLocation: document.getElementById('details').innerText,
        people: document.getElementById('number-of-people').value,
        name: document.getElementById('name_book').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        comments: document.getElementById('comments').value
    };

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Пожалуйста, авторизуйтесь, чтобы забронировать стол');
        return;
    }

    try {
        const response = await axios.get(`http://localhost:3000/users/${currentUser.id}`);
        const user = response.data;

        if (!user.bookings) {
            user.bookings = [];
        }

        user.bookings.push(bookingData);

        await axios.put(`http://localhost:3000/users/${currentUser.id}`, user);
        document.getElementById('bookingModal').classList.remove('show');
        document.body.classList.remove('modal-open');
        document.querySelector('.modal-backdrop').remove();
        document.getElementById('booking-form').reset();

        alert('Бронь успешно оформлена!');

    } catch (error) {
        console.error('Ошибка при оформлении бронирования:', error);
        alert('Произошла ошибка при оформлении бронирования');
    }
});

