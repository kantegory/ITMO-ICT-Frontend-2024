<template>
  <div id="restaurant-list" class="row g-3 wid">
  <div id="reviews-container" class="mt-4" v-show="reviews.length > 0">
    <div id="reviews-list" class="row">
      <div v-for="review in reviews" :key="review.id" class="col-md-4">
        <div class="card review-card">
          <img :src="review.image" class="card-img-top review-image" :alt="review.title" />
          <div class="card-body">
            <h3 class="card-title">{{ review.title }}</h3>
            <p class="card-text">{{ review.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import fetchReviews from '@/api/articles';
import axios from 'axios';

export default {
  name: 'Articles',
  data() {
    return {
      reviews: [],
    };
  },
  async mounted() {
    try {
      this.reviews = await fetchReviews();
    } catch (error) {
      console.error('Ошибка при загрузке данных в компоненте:', error);
    }
  },
};
</script>


<style>
.reviews-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: centre;
    width: 40%;
    gap: 50px;
    padding: 0 20px;
}

.review-card {
    flex: 1 1 250px;
    margin: 15px;
    border-radius: 15px;
    transition: transform 0.3s;
    overflow: hidden;
    background-color: transparent;
    border: none;
}

.review-card:hover {
    transform: scale(1.05);
}


.review-image {
    border-radius: 15px;
    width: 100%;
    height: auto;
}

.card-body {
    color: var(--text-color);
    border-radius: 0 0 15px 15px;
}

.card-body p {
    margin: 4px 0;
    line-height: 1.2;
}


.card-title, .card-text {
    margin: 0;
    font-size: 1.1rem;
}

.card-title, .card-text {
    margin: 0;
    font-size: 1.1rem;
}

.reviews-list {
    margin-left: -30px;
}

.wid {
    display: flex;
    width: 100%;
    max-width: 95%;
    justify-content: center;
    margin-left: 35px;
}

#restaurant-reviews h3 {
    margin-bottom: 20px;
}
</style>