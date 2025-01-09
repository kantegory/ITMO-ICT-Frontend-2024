<template>
  <div class="modal fade" id="bookingModal" tabindex="-1" aria-labelledby="bookingModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content profile-card">
        <div class="modal-header">
          <h5 class="modal-title" id="bookingModalLabel">Бронирование стола</h5>
          <button type="button" class="btn-close cross" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitBooking">
            <div class="mb-3">
              <label for="booking-date" class="form-label">Дата</label>
              <input
                type="date"
                class="form-control"
                id="booking-date"
                v-model="bookingData.date"
                required
              />
            </div>
            <div class="mb-3">
              <label for="number-of-people">Количество человек</label>
              <input
                type="number"
                class="form-control"
                id="number-of-people"
                v-model="bookingData.people"
                required
              />
            </div>
            <div class="mb-3">
              <label for="name_book">Имя Фамилия</label>
              <input
                type="text"
                class="form-control"
                id="name_book"
                v-model="bookingData.name"
                required
              />
            </div>
            <div class="mb-3">
              <label for="phone">Телефон</label>
              <input
                type="tel"
                class="form-control"
                id="phone"
                v-model="bookingData.phone"
                required
              />
            </div>
            <div class="mb-3">
              <label for="email">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="bookingData.email"
              />
            </div>
            <div class="mb-3">
              <label for="comments">Пожелания</label>
              <textarea
                class="form-control"
                id="comments"
                v-model="bookingData.comments"
              ></textarea>
            </div>
            <button type="submit" class="btn button-b">Оформить бронь</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentUser, updateUserBookings } from "@/api/booking";

export default {
  name: "BookingModal",
  data() {
    return {
      bookingData: {
        date: "",
        restaurantName: "Название ресторана",
        restaurantLocation: "Адрес ресторана",
        people: 1,
        name: "",
        phone: "",
        email: "",
        comments: "",
      },
    };
  },
  methods: {
    async submitBooking() {
      try {
        const currentUser = getCurrentUser();
        await updateUserBookings(currentUser.id, this.bookingData);

        this.resetForm();
        alert("Бронь успешно оформлена!");
      } catch (error) {
        console.error(error.message);
        alert(error.message);
      }
    },
    resetForm() {
      this.bookingData = {
        date: "",
        restaurantName: "Название ресторана",
        restaurantLocation: "Адрес ресторана",
        people: 1,
        name: "",
        phone: "",
        email: "",
        comments: "",
      };

      const modalElement = document.getElementById("bookingModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) modalInstance.hide();
    },
  },
};
</script>


<style>
.modal-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0;
}

.modal-content.profile-card {
    background-color: var(--back);
}

.modal-content.profile-card {
    background-color: var(--back);
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
</style>