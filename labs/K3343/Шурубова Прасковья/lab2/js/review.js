function getRestaurantIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

const ratingStars = document.querySelectorAll('.star');
let selectedRating = 0;

ratingStars.forEach(star => {
    star.addEventListener('mouseover', () => {
        const value = Number(star.dataset.value);
        highlightStars(value);
    });

    star.addEventListener('mouseout', () => {
        highlightStars(selectedRating);
    });

    star.addEventListener('click', () => {
        selectedRating = Number(star.dataset.value);
        document.getElementById('review-rating').value = selectedRating;
        highlightStars(selectedRating);
    });
});

function highlightStars(rating) {
    ratingStars.forEach(star => {
        star.classList.remove('text-warning', 'selected');
        const starValue = Number(star.dataset.value);
        if (starValue <= rating) {
            star.classList.add('text-warning');
        }
        if (starValue <= selectedRating) {
            star.classList.add('selected');
        }
    });
}

document.getElementById('review-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        alert("Пожалуйста, войдите, чтобы оставить отзыв.");
        return;
    }

    const reviewText = document.getElementById('review-text').value;
    const reviewRating = selectedRating;

    const restaurantId = getRestaurantIdFromUrl();
    if (!restaurantId) {
        alert("Не удалось получить ID ресторана.");
        return;
    }

    const newReview = {
        user: user.username,
        text: reviewText,
        rating: reviewRating,
        date: new Date().toISOString()
    };

    try {
        const restaurantResponse = await axios.get(`http://localhost:3000/restaurants/${restaurantId}`);
        const currentReviews = restaurantResponse.data.reviews || [];
        currentReviews.push(newReview);

        await axios.put(`http://localhost:3000/restaurants/${restaurantId}`, {
            ...restaurantResponse.data,
            reviews: currentReviews
        });

        alert("Спасибо за ваш отзыв!");
        loadReviews(restaurantId);
    } catch (error) {
        console.error("Ошибка при отправке отзыва:", error);
        alert("Не удалось отправить отзыв.");
    }
});

async function loadReviews(restaurantId) {
    try {
        const response = await axios.get(`http://localhost:3000/restaurants/${restaurantId}`);
        const reviews = response.data.reviews || [];

        const reviewsContainer = document.getElementById('reviews-list');
        reviewsContainer.innerHTML = '';

        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review-item');

            reviewElement.innerHTML = `
                <p><strong>${review.user ? review.user : "Аноним"}</strong> (${new Date(review.date).toLocaleDateString()}):</p>
                <p>${review.text}</p>
                <p>Рейтинг: ${review.rating}</p>
            `;

            reviewsContainer.appendChild(reviewElement);
        });
    } catch (error) {
        console.error("Ошибка при загрузке отзывов:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const restaurantId = getRestaurantIdFromUrl();

    if (restaurantId) {
        loadReviews(restaurantId);
    } else {
        console.error("Не удалось получить ID ресторана.");
    }
});