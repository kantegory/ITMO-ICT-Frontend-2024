async function fetchReviews() {
    try {
        const response = await axios.get('http://localhost:3000/articles');
        const reviews = response.data;

        displayReviews(reviews);
    } catch (error) {
        console.error('Ошибка при загрузке отзывов:', error);
    }
}

function displayReviews(reviews) {
    const reviewsContainer = document.getElementById('reviews-container');
    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = '';

    reviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'col-md-4';
        reviewCard.innerHTML = `
            <div class="card review-card">
                <img src="${review.image}" class="card-img-top review-image" alt="${review.title}">
                <div class="card-body">
                    <h3 class="card-title">${review.title}</h3>
                    <p class="card-text">${review.description}</p>
                </div>
            </div>
        `;
        reviewsList.appendChild(reviewCard);
    });

    reviewsContainer.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', fetchReviews);
