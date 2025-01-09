<template>
  <div class="modal fade" id="reviewModal" tabindex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content profile-card">
        <div class="modal-header">
          <h5 class="modal-title" id="reviewModalLabel">Оставить отзыв</h5>
          <button type="button" class="btn-close cross" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="review-text" class="form-label">Ваш отзыв</label>
              <textarea
                class="form-control"
                id="review-text"
                v-model="review.text"
                required
              ></textarea>
            </div>
            <div class="mb-3">
              <label>Рейтинг</label>
              <div class="rating">
                <span
                  v-for="star in [1, 2, 3, 4, 5]"
                  :key="`star-${star}`"
                  class="star"
                  :class="{ 'text-warning': star <= hoverRatingValue || star <= review.rating, selected: star === review.rating }"
                  @mouseover="hoverRating(star)"
                  @mouseout="resetHover"
                  @click="selectRating(star)">&#9733;
                </span>
              </div>
            </div>
            <button type="submit" class="sent">Отправить отзыв</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { submitReview } from "@/api/review";

export default {
  name: "ReviewModal",
  data() {
    return {
      review: {
        text: "",
        rating: 0,
      },
      hoverRatingValue: 0,
      restaurantId: null,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await submitReview(this.review, this.restaurantId, this.resetForm);

        this.$emit("reviewAdded", {
          ...this.review,
          user: JSON.parse(localStorage.getItem("currentUser")).username,
          date: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Ошибка при отправке отзыва:", error);
        alert("Не удалось отправить отзыв. Попробуйте ещё раз.");
      }
    },
    hoverRating(star) {
      this.hoverRatingValue = star;
    },
    resetHover() {
      this.hoverRatingValue = 0;
    },
    selectRating(star) {
      this.review.rating = star;
    },
    resetForm() {
      this.review.text = "";
      this.review.rating = 0;
      this.hoverRatingValue = 0;
    },
  },
  mounted() {
    this.restaurantId = this.$route.params.id || new URLSearchParams(window.location.search).get("id");
    if (!this.restaurantId) {
      console.error("Не удалось получить ID ресторана.");
    }
  },
};
</script>

<style>
.modal-body .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1050;
    user-select: none;
    transition: background-color 0.3s;
}
.profile-card{
    background-color: var(--back);
}

.modal-content.profile-card {
    background-color: var(--back);
}

.rating {
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
}

.star-icon {
    margin-right: 5px;
    margin-top: -5px;
    fill: #FFD700;
}


.star {
    font-size: 24px;
    color: gray;
    transition: color 0.2s;
}

.star.selected {
    color: gold;
}

.star.text-warning {
    color: gold;
}

.form-control {
    border: 2px solid var(--border);
    transition: border-color 0.3s;
    width: 100%;
    max-width: 450px;
    height: 45px;
    padding: 10px;
}

.form-control:focus {
    border-color: var(--border-hover);
    color: #000000;
    outline: none;
}

.form-control:focus-visible {
    outline: none;
    color: #000000;
}
@media (max-width: 768px) {
    .form-control {
        margin-bottom: 10px;
    }
}

.modal-content {
    border: none;
    background-color: var(--background-modal);
}
</style>
