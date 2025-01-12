document.getElementById('bookingForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;

    console.log(`Бронирование на ${date} в ${time} для ${guests} человек`);
    alert(`Ваш столик забронирован на ${date} в ${time} для ${guests} человек.`);
});