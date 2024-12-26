import axios from "axios";

export async function submitReview(review, restaurantId, resetCallback) {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        alert("Пожалуйста, войдите, чтобы оставить отзыв.");
        return;
    }

    const newReview = {
        user: user.username,
        text: review.text,
        rating: review.rating,
        date: new Date().toISOString(),
    };

    try {
        const response = await axios.get(`http://localhost:3000/restaurants/${restaurantId}`);
        const currentReviews = response.data.reviews || [];
        currentReviews.push(newReview);

        await axios.put(`http://localhost:3000/restaurants/${restaurantId}`, {
            ...response.data,
            reviews: currentReviews,
        });

        alert("Спасибо за ваш отзыв!");
        if (typeof resetCallback === "function") {
            resetCallback();
        }
    } catch (error) {
        console.error("Ошибка при отправке отзыва:", error);
        alert("Не удалось отправить отзыв.");
    }
}
