<template>
  <div class="container mt-5">
    <div class="restaurant-details">
      <div class="restaurant-info">
        <h2>{{ restaurant.name || 'Название ресторана' }}</h2>
        <p>{{ restaurant.description || 'Описание ресторана' }}</p>
        <p>
          <svg class="icon icon-fork-knife" width="24" height="24">
            <use :href="`/sprite.svg#icon-fork-knife`"></use>
          </svg>
          <span>{{ restaurant.cuisine || 'Кухня' }}</span>
        </p>
        <p>
          <svg class="icon icon-location-pin" width="24" height="24">
            <use :href="`/sprite.svg#icon-location-pin`"></use>
          </svg>
          <span>{{ restaurant.details || 'Адрес ресторана' }}</span>
        </p>
        <p>
          <svg class="icon icon-phone-handset" width="24" height="24">
            <use :href="`/sprite.svg#icon-phone-handset`"></use>
          </svg>
          <span>{{ restaurant.phone || 'Телефон ресторана' }}</span>
        </p>
        <p>
          <svg class="icon icon-clock" width="24" height="24">
            <use :href="`/sprite.svg#icon-clock`"></use>
          </svg>
          <span>{{ restaurant.workingHours || 'Часы работы' }}</span>
        </p>
      </div>
      <img
        v-if="restaurant.photo"
        :src="restaurant.photo"
        alt="Фото ресторана"
        class="restaurant-photo"
        @click="openImageModal(restaurant.photo)"
      />
    </div>

    <div id="restaurant-menu" class="mt-3">
      <h3>Меню</h3>
      <div class="d-flex flex-wrap mt-3 menu-gallery">
        <img
          v-for="(item, index) in restaurant.menu"
          :key="index"
          :src="item"
          :alt="`Фото меню ${index + 1}`"
          class="menu-photo"
          @click="openPhotoModal(index)"
        />
      </div>
    </div>

    <div class="modal fade" id="photoModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body text-center position-relative">
            <div class="arrow left-arrow" @click="navigatePhoto('prev')">&#8249;</div>
            <img :src="currentMenuPhoto" alt="Фото меню" class="img-fluid" />
            <div class="arrow right-arrow" @click="navigatePhoto('next')">&#8250;</div>
          </div>
        </div>
      </div>
    </div>

    <div class="location-btn">
      <button class="book-table my-2 my-md-3" @click="openBookingModal">Забронировать</button>
      <button class="write-review my-2 my-md-3" @click="openReviewModal">Написать отзыв</button>
      <button class="add-to-favorites my-2 my-md-3" @click="addToFavorites">Добавить в избранное</button>
      <BookingModal />
      <ReviewModal />
    </div>

      <div id="restaurant-reviews" class="mt-3">
        <h3>Отзывы</h3>
        <div v-for="(review, index) in restaurant.reviews" :key="index" class="review-item">
          <p>
            <strong>{{ review.user || 'Аноним' }}</strong>
            ({{ new Date(review.date).toLocaleDateString('ru-RU') }}):
          </p>
          <p>{{ review.text }}</p>
          <p>
            Оценка: {{review.rating}}
            <span class="rating">
              <svg class="star-icon" width="20" height="20">
                <use :href="`/sprite.svg#icon-star`" v-bind:class="{ 'text-warning': star <= review.rating }"></use>
              </svg>
            </span>
          </p>
        </div>
      </div>
      <review-modal @reviewAdded="handleNewReview"></review-modal>
  </div>
  <div class="modal fade" id="imageModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-fullscreen">
      <div class="modal-content-im p-0 border-0">
        <div class="modal-body p-0 d-flex justify-content-center align-items-center">
          <img :src="selectedImage" alt="Фото ресторана" class="img-fluid modal-img" />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import { fetchRestaurant} from "@/api/restaurant"
import { addToFavorites } from "@/api/favorite";
import BookingModal from "@/components/BookingModal.vue";
import ReviewModal from "@/components/ReviewModal.vue";
import { useModal } from "@/services/useModal";

export default {
  name: "RestaurantDetail",
  components: {
    BookingModal,
    ReviewModal,
  },
  props: ["id"],
  data() {
    return {
      restaurant: {
        name: "",
        description: "",
        cuisine: "",
        details: "",
        phone: "",
        workingHours: "",
        photo: "",
        menu: [],
        reviews: [],
      },
      selectedImage: "",
      currentPhotoIndex: 0,
    };
  },
  computed: {
    currentMenuPhoto() {
      return this.restaurant.menu[this.currentPhotoIndex] || "";
    },
  },
  methods: {
    ...useModal(),

    async fetchRestaurantData() {
      const restaurantId = this.id || this.$route.params.id;
      if (!restaurantId) {
        console.error("Не указан ID ресторана");
        return;
      }

      try {
        const data = await fetchRestaurant(restaurantId);
        this.restaurant = {
          id: data.id,
          name: data.name || "Название не указано",
          description: data.description || "Описание не указано",
          cuisine: data.cuisine || "Кухня не указана",
          details: data.details || "Адрес не указан",
          phone: data["restaurant-phone"] || "Телефон не указан",
          workingHours: data.workingHours || "Часы работы не указаны",
          photo: data["restaurant-photo"] ? `http://localhost:3000/${data["restaurant-photo"]}` : "",
          menu: (data.menu || []).map((item) => `http://localhost:3000/${item}`),
          reviews: data.reviews || [],
        };
      } catch (error) {
        console.error("Ошибка при загрузке данных о ресторане:", error);
      }
    },
    async addToFavorites() {
      try {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const favoriteRestaurant = {
          id: this.restaurant.id,
          name: this.restaurant.name,
          details: this.restaurant.details,
          cuisine: this.restaurant.cuisine,
        };

        const message = await addToFavorites(favoriteRestaurant, currentUser);
        alert(message);
      } catch (error) {
        console.error("Ошибка при добавлении в избранное:", error.message);
        alert(error.message);
      }
    },
    openImageModal(imageUrl) {
      this.selectedImage = imageUrl;
      this.openModal("imageModal");
    },
    openPhotoModal(index) {
      this.currentPhotoIndex = index;
      this.openModal("photoModal");
    },
    navigatePhoto(direction) {
      if (direction === "prev" && this.currentPhotoIndex > 0) {
        this.currentPhotoIndex--;
      } else if (direction === "next" && this.currentPhotoIndex < this.restaurant.menu.length - 1) {
        this.currentPhotoIndex++;
      }
    },
    openBookingModal() {
      this.openModal("bookingModal");
    },
    openReviewModal() {
      this.openModal("reviewModal");
    },
  },
  mounted() {
      this.fetchRestaurantData();
  },
};
</script>


<style >
.restaurant-photo,
.menu-photo {
  cursor: pointer;
}
.modal-img {
  width: 60%;
  height: 50hv;
}
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  cursor: pointer;
  color: #333;
}
.left-arrow {
  left: 10px;
}
.right-arrow {
  right: 10px;
}
.star-icon {
    margin-left: -940px;
    margin-top: -24px;
    fill: #FFD700;
}

.restaurant-details {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.restaurant-info {
  max-width: 65%;
}

.restaurant-photo {
  max-width: 40%;
  height: auto;
  border-radius: 8px;
  margin-top: 60px;
  margin-left: 20px;
  cursor: pointer;
}

.add-to-favorites, .book-table, .write-review, .sent{
    border-color: #352894;
    color: var(--text-color);
    background-color: transparent;
    border: 3px solid var(--border);
    border-radius: 10px;
    padding: 5px 1em;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    outline: none;
    white-space: nowrap;
    max-width: 200px;
}

.modal-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0;
}

.modal-content {
    border: none;
    background-color: var(--background-modal);
    background: transparent;
}

.modal-content-im {
    border: none;
    background-color: transparent;
}

.add-to-favorites, .book-table, .write-review, .sent{
    border-color: #352894;
    color: var(--text-color);
    background-color: transparent;
    border: 3px solid var(--border);
    border-radius: 10px;
    padding: 5px 1em;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    outline: none;
    white-space: nowrap;
    max-width: 200px;
}

.add-to-favorites:hover, .book-table:hover, .write-review:hover, .sent:hover {
    background-color: var(--border);
    color: #000000;
}

</style>
