<template>
  <div>
  <Header />
    <div class="header-container">
      <h3 id="welcomeMessage">Добро пожаловать!</h3>
    </div>

    <div class="row g-5">
      <div class="col-md-9 col-lg-10">
        <h4 class="mb-4">Ваши данные:</h4>
        <form class="needs-validation" novalidate>
          <div class="row g-3">
            <div class="col-6">
              <label for="firstName" class="form-label">Имя</label>
              <input
                type="text"
                class="form-control"
                id="firstName"
                v-model="form.firstName"
                :disabled="!isEditable"
                aria-describedby="nameHelp"
              />
              <div id="nameHelp" class="form-text">Поле для ввода имени</div>
            </div>

            <div class="col-6">
              <label for="lastName" class="form-label">Фамилия</label>
              <input
                type="text"
                class="form-control"
                id="lastName"
                v-model="form.lastName"
                :disabled="!isEditable"
                aria-describedby="lastNameHelp"
              />
              <div id="lastNameHelp" class="form-text">Поле для ввода фамилии</div>
            </div>
            <div class="col-12">
              <label for="email" class="form-label">Электронная почта</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="form.email"
                :disabled="!isEditable"
                placeholder="you@example.com"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" class="form-text">Поле для ввода электронной почты</div>
            </div>
          </div>
          <br />

          <button
            type="button"
            class="btn btn-primary"
            @click="enableEditing"
            aria-label="Редактировать данные профиля"
            tabindex="1"
          >
            Редактировать
          </button>
          <button
            type="button"
            class="btn btn-success"
            @click="saveData"
            :disabled="!isEditable"
            aria-label="Сохранить изменения профиля"
            tabindex="2"
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import Header from '@/components/Header.vue';

export default {
  name: "ProfileForm",
  components: {
    Header,
  },
  data() {
    return {
      isEditable: false, 
      form: {
        firstName: '',
        lastName: '',
        email: '',
      },
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.form.firstName = user.username;
      this.form.email = user.email;
    }
  },
  methods: {
    enableEditing() {
      this.isEditable = true; 
    },
    saveData() {
      this.isEditable = false; 
      alert("Данные сохранены!");
      localStorage.setItem('user', JSON.stringify(this.form));
    },
  },
};
</script>

<style scoped>
.header-container {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
}

#welcomeMessage {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

form {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-control {
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
}

.form-control:focus {
  border-color: #006400; 
  box-shadow: 0 0 5px rgba(0, 128, 0, 0.5);
  outline: none;
}

.form-text {
  font-size: 14px;
  color: #666;
}

/* Кнопки */
.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #218838;
}

.btn:disabled {
  background-color: #ccc;
  border-color: #ccc;
  cursor: not-allowed;
}

.row {
  margin-top: 20px;
}

.col-md-9.col-lg-10 {
  margin: 0 auto;
}

.col-6, .col-12 {
  margin-bottom: 20px;
}
</style>
