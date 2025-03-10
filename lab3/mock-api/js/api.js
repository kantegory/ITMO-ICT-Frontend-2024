// const API_URL = "http://localhost:5000";

// // Получение информации о конкретном ресторане по ID
// async function getRestaurantById(id) {
//     const response = await fetch(`${API_URL}/restaurants/${id}`);
//     return response.json();
// }

// // Получение списка ресторанов
// async function getRestaurants() {
//     const response = await fetch(`${API_URL}/restaurants`);
//     return response.json();
// }

// // Авторизация пользователя
// async function login(email, password) {
//     const response = await fetch(`${API_URL}/users?email=${email}&password=${password}`);
//     const users = await response.json();
//     return users.length > 0 ? users[0] : null;
// }

// // Отправка бронирования
// // async function bookTable(userId, restaurantId, date, time, guests) {
// //     const response = await fetch(`${API_URL}/bookings`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ userId, restaurantId, date, time, guests, status: "Ожидание" })
// //     });
// //     return response.json();
// // }
// async function bookTable(userId, restaurantId, date, time, guests) {
//     const bookingData = { userId, restaurantId, date, time, guests, status: "Ожидание" };
    
//     console.log("Отправка бронирования:", bookingData); // Проверка перед запросом

//     const response = await fetch(`${API_URL}/bookings`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bookingData)
//     });

//     console.log("Статус ответа сервера:", response.status); // Проверка статуса

//     const result = await response.json();
//     console.log("Ответ сервера:", result); // Вывод JSON-ответа

//     return result;
// }

const API_URL = "http://localhost:5503";

// Получение информации о конкретном ресторане по ID
async function getRestaurantById(id) {
    const response = await fetch(`${API_URL}/restaurants/${id}`);
    return response.json();
}

// Получение списка ресторанов
async function getRestaurants() {
    const response = await fetch(`${API_URL}/restaurants`);
    return response.json();
}

// Авторизация пользователя
async function login(email, password) {
    const response = await fetch(`${API_URL}/users?email=${email}&password=${password}`);
    const users = await response.json();
    return users.length > 0 ? users[0] : null;
}

// Отправка бронирования
async function bookTable(userId, restaurantId, date, time, guests) {
    const bookingData = { userId, restaurantId, date, time, guests, status: "Ожидание" };
    
    console.log("Отправка бронирования:", bookingData); // Проверка перед запросом

    const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData)
    });

    console.log("Статус ответа сервера:", response.status); // Проверка статуса

    const result = await response.json();
    console.log("Ответ сервера:", result); // Вывод JSON-ответа

    return result;
}

// Получение истории бронирований для текущего пользователя
async function getUserBookings(userId) {
    const response = await fetch(`${API_URL}/bookings?userId=${userId}`);
    return response.json();
}
