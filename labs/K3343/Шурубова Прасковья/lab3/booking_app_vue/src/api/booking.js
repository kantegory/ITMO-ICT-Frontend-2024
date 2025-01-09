import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const getCurrentUser = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        throw new Error("Пользователь не авторизован");
    }
    return currentUser;
};

export const fetchUserData = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error("Ошибка при получении данных пользователя");
    }
};

export const updateUserBookings = async (userId, bookingData) => {
    try {
        const user = await fetchUserData(userId);
        if (!user.bookings) {
            user.bookings = [];
        }
        user.bookings.push(bookingData);

        await axios.put(`${API_BASE_URL}/users/${userId}`, user);
    } catch (error) {
        throw new Error("Ошибка при обновлении бронирования");
    }
};
