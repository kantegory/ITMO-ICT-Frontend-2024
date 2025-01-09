<template>
  <BaseLayout>
    <Navbar />

    <div class="p-5 row justify-content-center">
      <img src="/icons/new_account.svg" class="sign-up-image"  alt="New Account" />
      <h1 class="text-center pt-5 fw-bold">Создайте новый аккаунт</h1>

      <form class="col-12 col-md-8" @submit.prevent="registerUser">
        <div class="row">
          <div class="col-md-6">
            <label for="firstName" class="form-label mt-4 fw-medium"
              >Введите ваше имя</label
            >
            <input
              type="text"
              class="form-control"
              id="firstName"
              v-model="form.firstName"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="lastName" class="form-label mt-4 fw-medium"
              >Введите вашу фамилию</label
            >
            <input
              type="text"
              class="form-control"
              id="lastName"
              v-model="form.lastName"
              required
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label for="email" class="form-label mt-3 fw-medium"
              >Введите ваш e-mail</label
            >
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="form.email"
              required
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label for="phone" class="form-label mt-3 fw-medium"
              >Введите номер телефона</label
            >
            <input
              type="tel"
              class="form-control"
              id="phone"
              v-model="form.phone"
              placeholder="+7 (999) 999-99-99"
              required
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label for="password" class="form-label mt-3 fw-medium"
              >Придумайте пароль</label
            >
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="form.password"
              required
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label
              for="confirmPassword"
              class="form-label mt-3 fw-medium"
              >Подтвердите ваш пароль</label
            >
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              v-model="confirmPassword"
              required
            />
          </div>
        </div>

        <div class="mt-3 row">
          <div class="col">
            <input
              type="checkbox"
              class="form-check-input"
              id="terms"
              v-model="form.terms"
              required
            />
            <label class="form-check-label" for="terms"
              >Я согласен на обработку персональных данных</label
            >
          </div>
        </div>

        <div class="text-center mt-4 row">
          <div class="col">
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#sign-in-modal"
            >
              Зарегистрироваться
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Модальное окно -->
    <div
      class="modal fade"
      tabindex="-1"
      id="sign-in-modal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Статус регистрации</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p v-if="registerSuccess">Вы успешно зарегистрировались!</p>
            <p v-else>Ошибка при регистрации.</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Закрыть
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="goToAccount"
            >
              Продолжить
            </button>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/layouts/BaseLayout.vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'RegisterPage',
  components: {
    BaseLayout,
    Navbar,
    Footer
  },
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        terms: false
      },
      confirmPassword: '',
      registerSuccess: false
    }
  },
  methods: {
    async registerUser() {
      if (this.form.password !== this.confirmPassword) {
        alert('Пароли не совпадают!')
        return
      }

      try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          body: JSON.stringify(this.form),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const json = await response.json()
        console.log('response', json)
        if (json.accessToken) {
          localStorage.accessToken = json.accessToken
          localStorage.user = JSON.stringify(json.user)
          this.registerSuccess = true
        } else {
          this.registerSuccess = false
        }
      } catch (err) {
        console.error(err)
        this.registerSuccess = false
      }
    },
    goToAccount() {
      if (this.registerSuccess) {
        this.$router.push('/account')
      }
    }
  }
}
</script>

<style scoped>
.sign-up-image {
  height: 200px;
  width: auto;
}
</style>
