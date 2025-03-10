// document.getElementById("bookingForm").addEventListener("submit", async (event) => {
//     event.preventDefault();
    
//     const userId = 1; // ID пользователя (берем из сессии)
//     const restaurantId = 1; // ID ресторана (из URL)
//     const date = document.getElementById("date").value;
//     const time = document.getElementById("time").value;
//     const guests = document.getElementById("guests").value;
    
//     const result = await bookTable(userId, restaurantId, date, time, guests);
    
//     if (result) {
//         alert("Бронирование успешно отправлено!");
//     } else {
//         alert("Ошибка бронирования!");
//     }
// });

// document.getElementById("bookingForm").addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const userId = 1; // Должен быть из локального хранилища
//     const restaurantId = 1; // Должен быть из URL
//     const date = document.getElementById("date").value;
//     const time = document.getElementById("time").value;
//     const guests = document.getElementById("guests").value;

//     console.log("Форма отправлена, данные:", { userId, restaurantId, date, time, guests });

//     const result = await bookTable(userId, restaurantId, date, time, guests);

//     if (result) {
//         alert("Бронирование успешно отправлено!");
//     } else {
//         alert("Ошибка бронирования!");
//     }
// });

document.getElementById("bookingForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
        alert("Ошибка: пользователь не авторизован!");
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = urlParams.get("id");

    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const guests = document.getElementById("guests").value;

    console.log("Форма отправлена, данные:", { userId, restaurantId, date, time, guests });

    const result = await bookTable(userId, restaurantId, date, time, guests);

    if (result) {
        alert("Бронирование успешно отправлено!");
    } else {
        alert("Ошибка бронирования!");
    }
});
